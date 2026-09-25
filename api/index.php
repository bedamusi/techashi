<?php
declare(strict_types=1);
require __DIR__ . '/config.php';

$isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
$sessionDir = __DIR__ . '/sessions';
if (!is_dir($sessionDir)) mkdir($sessionDir, 0700, true);
session_save_path($sessionDir);
session_set_cookie_params(['lifetime' => 0, 'path' => '/', 'secure' => $isHttps, 'httponly' => true, 'samesite' => 'Strict']);
session_start();
if (empty($_SESSION['csrf_token'])) $_SESSION['csrf_token'] = bin2hex(random_bytes(32));

$route = (string)($_GET['route'] ?? '');
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    if ($route === 'session' && $method === 'GET') {
        $admin = null;
        if (!empty($_SESSION['admin']['id'])) {
            $stmt = db()->prepare('SELECT id,email FROM admins WHERE id = ? LIMIT 1');
            $stmt->execute([(int)$_SESSION['admin']['id']]);
            $row = $stmt->fetch();
            if ($row) $admin = $_SESSION['admin'] = ['id' => (int)$row['id'], 'email' => $row['email']];
            else unset($_SESSION['admin']);
        }
        api_json(200, ['user' => $admin, 'csrfToken' => $_SESSION['csrf_token']]);
    }

    if ($route === 'login' && $method === 'POST') {
        require_csrf();
        $body = api_body();
        $email = strtolower(trim((string)($body['email'] ?? '')));
        $password = (string)($body['password'] ?? '');
        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $password === '') api_json(422, ['error' => 'Enter a valid email and password.']);
        $stmt = db()->prepare('SELECT id, email, password_hash FROM admins WHERE email = ? LIMIT 1');
        $stmt->execute([$email]);
        $admin = $stmt->fetch();
        if (!$admin || !password_verify($password, $admin['password_hash'])) api_json(401, ['error' => 'Email or password is incorrect.']);
        session_regenerate_id(true);
        $_SESSION['admin'] = ['id' => (int)$admin['id'], 'email' => $admin['email']];
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        api_json(200, ['user' => $_SESSION['admin'], 'csrfToken' => $_SESSION['csrf_token']]);
    }

    if ($route === 'logout' && $method === 'POST') {
        require_admin();
        require_csrf();
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'] ?? '', $params['secure'], $params['httponly']);
        }
        session_destroy();
        api_json(200, ['ok' => true]);
    }

    if ($route === 'admins' && $method === 'POST') {
        require_admin();
        require_csrf();
        $body = api_body();
        $email = strtolower(trim((string)($body['email'] ?? '')));
        $password = (string)($body['password'] ?? '');
        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
            api_json(422, ['error' => 'Enter a valid email address.']);
        }
        if (strlen($password) < 12 || strlen($password) > 200) {
            api_json(422, ['error' => 'Use a password between 12 and 200 characters.']);
        }
        try {
            $stmt = db()->prepare('INSERT INTO admins (email,password_hash) VALUES (?,?)');
            $stmt->execute([$email, password_hash($password, PASSWORD_DEFAULT)]);
        } catch (PDOException $error) {
            if ($error->getCode() === '23000') api_json(409, ['error' => 'An administrator already exists with that email.']);
            throw $error;
        }
        api_json(201, ['ok' => true, 'email' => $email]);
    }

    if ($route === 'products' && $method === 'GET') {
        $id = trim((string)($_GET['id'] ?? ''));
        $category = trim((string)($_GET['category'] ?? 'all'));
        if ($id !== '') {
            $stmt = db()->prepare('SELECT * FROM products WHERE id = ? AND category = ? AND is_published = 1 LIMIT 1');
            $stmt->execute([$id, $category]);
            $row = $stmt->fetch();
            api_json(200, ['product' => $row ? product_row($row) : null]);
        }
        if ($category === 'all') {
            $stmt = db()->query('SELECT * FROM products WHERE is_published = 1 ORDER BY updated_at DESC');
        } else {
            $stmt = db()->prepare('SELECT * FROM products WHERE category = ? AND is_published = 1 ORDER BY updated_at DESC');
            $stmt->execute([$category]);
        }
        api_json(200, ['products' => array_map('product_row', $stmt->fetchAll())]);
    }

    if ($route === 'orders' && $method === 'GET') {
        require_admin();
        $orders = db()->query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 200')->fetchAll();
        $itemStmt = db()->prepare('SELECT product_id,product_name,category,sku,image_src,unit_price,quantity FROM order_items WHERE order_id = ? ORDER BY id');
        foreach ($orders as &$order) {
            $itemStmt->execute([$order['id']]);
            $order['items'] = $itemStmt->fetchAll();
            $order['subtotal'] = (float)$order['subtotal'];
            $order['delivery_fee'] = (float)$order['delivery_fee'];
            $order['total'] = (float)$order['total'];
            foreach ($order['items'] as &$item) {
                $item['unit_price'] = (float)$item['unit_price'];
                $item['quantity'] = (int)$item['quantity'];
            }
            unset($item);
        }
        unset($order);
        api_json(200, ['orders' => $orders]);
    }

    if ($route === 'orders' && $method === 'POST') {
        require_csrf();
        $body = api_body();
        $customer = $body['customer'] ?? [];
        $name = trim((string)($customer['name'] ?? ''));
        $email = strtolower(trim((string)($customer['email'] ?? '')));
        $phone = trim((string)($customer['phone'] ?? ''));
        $fulfillment = (string)($body['fulfillment'] ?? '');
        $address = trim((string)($customer['address'] ?? ''));
        $notes = trim((string)($customer['notes'] ?? ''));
        $idempotencyKey = strtolower(trim((string)($body['idempotencyKey'] ?? '')));
        $expectedSubtotal = filter_var($body['expectedSubtotal'] ?? null, FILTER_VALIDATE_FLOAT);
        $items = $body['items'] ?? null;
        if ($name === '' || mb_strlen($name) > 120 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254 || !preg_match('/^[+0-9()\-\s]{7,40}$/', $phone) || !in_array($fulfillment, ['delivery', 'pickup'], true) || ($fulfillment === 'delivery' && $address === '') || mb_strlen($address) > 500 || mb_strlen($notes) > 1000 || !preg_match('/^[a-f0-9-]{36}$/', $idempotencyKey) || $expectedSubtotal === false || $expectedSubtotal < 0 || !is_array($items) || count($items) < 1 || count($items) > 30) {
            api_json(422, ['error' => 'Check your contact details, fulfillment information, and order items.']);
        }

        $quantities = [];
        foreach ($items as $item) {
            $productId = strtolower(trim((string)($item['productId'] ?? '')));
            $quantity = filter_var($item['quantity'] ?? null, FILTER_VALIDATE_INT);
            if (!preg_match('/^[a-f0-9-]{36}$/', $productId) || $quantity === false || $quantity < 1 || $quantity > 99) api_json(422, ['error' => 'One or more order quantities are invalid.']);
            $quantities[$productId] = ($quantities[$productId] ?? 0) + $quantity;
            if ($quantities[$productId] > 99) api_json(422, ['error' => 'A product quantity cannot exceed 99.']);
        }

        $pdo = db();
        $pdo->beginTransaction();
        try {
            $existingStmt = $pdo->prepare('SELECT order_number,total,status FROM orders WHERE idempotency_key = ? LIMIT 1 FOR UPDATE');
            $existingStmt->execute([$idempotencyKey]);
            $existing = $existingStmt->fetch();
            if ($existing) {
                $pdo->commit();
                api_json(200, ['order' => ['orderNumber' => $existing['order_number'], 'total' => (float)$existing['total'], 'status' => $existing['status']]]);
            }
            if (!empty($_SESSION['last_order_at']) && time() - (int)$_SESSION['last_order_at'] < 5) {
                $pdo->rollBack();
                api_json(429, ['error' => 'Please wait a few seconds before submitting another order.']);
            }

            $productStmt = $pdo->prepare('SELECT id,name,category,sku,price,offer_price,stock,images FROM products WHERE id = ? AND is_published = 1 LIMIT 1 FOR UPDATE');
            $orderProducts = [];
            $subtotal = 0.0;
            foreach ($quantities as $productId => $quantity) {
                $productStmt->execute([$productId]);
                $product = $productStmt->fetch();
                if (!$product) {
                    $pdo->rollBack();
                    api_json(409, ['error' => 'A product in your bag is no longer available. Refresh your bag and try again.']);
                }
                if ($product['stock'] !== null && (int)$product['stock'] < $quantity) {
                    $pdo->rollBack();
                    api_json(409, ['error' => $product['name'] . ' has only ' . (int)$product['stock'] . ' available. Update the quantity and try again.']);
                }
                $effectivePrice = ($product['offer_price'] !== null && (float)$product['offer_price'] > 0) ? (float)$product['offer_price'] : (float)$product['price'];
                $unitPrice = $effectivePrice;
                $subtotal += $unitPrice * $quantity;
                $images = json_decode((string)$product['images'], true) ?: [];
                $product['image_src'] = isset($images[0]['src']) ? (string)$images[0]['src'] : null;
                $product['quantity'] = $quantity;
                $product['unit_price'] = $unitPrice;
                $orderProducts[] = $product;
            }

            if (abs($subtotal - (float)$expectedSubtotal) > 0.01) {
                $pdo->rollBack();
                api_json(409, ['error' => 'A product price changed. Your bag has been refreshed; review the updated total and submit again.']);
            }

            $orderId = sprintf('%s-%s-%s-%s-%s', bin2hex(random_bytes(4)), bin2hex(random_bytes(2)), '4' . substr(bin2hex(random_bytes(2)), 1), '8' . substr(bin2hex(random_bytes(2)), 1), bin2hex(random_bytes(6)));
            $orderNumber = 'TA-' . date('ymd') . '-' . strtoupper(bin2hex(random_bytes(3)));
            $insertOrder = $pdo->prepare('INSERT INTO orders (id,order_number,idempotency_key,customer_name,customer_email,customer_phone,fulfillment,delivery_address,payment_method,payment_status,status,subtotal,delivery_fee,total,customer_notes,inventory_reserved) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1)');
            $insertOrder->execute([$orderId, $orderNumber, $idempotencyKey, $name, $email, $phone, $fulfillment, $fulfillment === 'delivery' ? $address : null, 'arranged_with_store', 'unpaid', 'pending', $subtotal, 0, $subtotal, $notes === '' ? null : $notes]);
            $insertItem = $pdo->prepare('INSERT INTO order_items (order_id,product_id,product_name,category,sku,image_src,unit_price,quantity) VALUES (?,?,?,?,?,?,?,?)');
            $reserveStock = $pdo->prepare('UPDATE products SET stock = stock - ? WHERE id = ? AND stock IS NOT NULL AND stock >= ?');
            foreach ($orderProducts as $product) {
                $insertItem->execute([$orderId, $product['id'], $product['name'], $product['category'], $product['sku'], $product['image_src'], $product['unit_price'], $product['quantity']]);
                if ($product['stock'] !== null) {
                    $reserveStock->execute([$product['quantity'], $product['id'], $product['quantity']]);
                    if ($reserveStock->rowCount() !== 1) throw new RuntimeException('Stock changed before the order could be reserved.');
                }
            }
            $pdo->commit();
            $_SESSION['last_order_at'] = time();
            api_json(201, ['order' => ['orderNumber' => $orderNumber, 'total' => $subtotal, 'status' => 'pending']]);
        } catch (Throwable $error) {
            if ($pdo->inTransaction()) $pdo->rollBack();
            throw $error;
        }
    }

    if ($route === 'orders' && $method === 'PATCH') {
        require_admin();
        require_csrf();
        $id = strtolower(trim((string)($_GET['id'] ?? '')));
        $changes = api_body();
        $status = (string)($changes['status'] ?? '');
        $paymentStatus = (string)($changes['paymentStatus'] ?? '');
        if (!preg_match('/^[a-f0-9-]{36}$/', $id)) api_json(422, ['error' => 'Invalid order identifier.']);
        if ($status === '' && $paymentStatus === '') api_json(422, ['error' => 'Choose an order or payment update.']);
        $transitions = [
            'pending' => ['confirmed', 'cancelled'],
            'confirmed' => ['processing', 'cancelled'],
            'processing' => ['ready_for_pickup', 'out_for_delivery', 'cancelled'],
            'ready_for_pickup' => ['completed', 'cancelled'],
            'out_for_delivery' => ['completed', 'cancelled'],
            'completed' => [],
            'cancelled' => [],
        ];
        $pdo = db();
        $pdo->beginTransaction();
        try {
            $findOrder = $pdo->prepare('SELECT id,status,fulfillment,inventory_reserved,payment_status FROM orders WHERE id = ? FOR UPDATE');
            $findOrder->execute([$id]);
            $order = $findOrder->fetch();
            if (!$order) {
                $pdo->rollBack();
                api_json(404, ['error' => 'Order not found.']);
            }
            if ($status !== '' && !in_array($status, $transitions[$order['status']] ?? [], true)) {
                $pdo->rollBack();
                api_json(409, ['error' => 'That order status transition is not allowed.']);
            }
            if (($status === 'ready_for_pickup' && $order['fulfillment'] !== 'pickup') || ($status === 'out_for_delivery' && $order['fulfillment'] !== 'delivery')) {
                $pdo->rollBack();
                api_json(422, ['error' => 'Choose the fulfillment status that matches this order.']);
            }
            if ($paymentStatus !== '' && ($paymentStatus !== 'paid' || $order['payment_status'] !== 'unpaid' || $order['status'] === 'cancelled' || $status === 'cancelled')) {
                $pdo->rollBack();
                api_json(409, ['error' => 'Payment can only be marked received for an active unpaid order.']);
            }
            if ($status === 'cancelled' && (int)$order['inventory_reserved'] === 1) {
                $restore = $pdo->prepare('UPDATE products p JOIN order_items i ON i.product_id = p.id SET p.stock = p.stock + i.quantity WHERE i.order_id = ? AND p.stock IS NOT NULL');
                $restore->execute([$id]);
            }
            if ($status !== '') {
                $update = $pdo->prepare('UPDATE orders SET status = ?, inventory_reserved = IF(? = \'cancelled\', 0, inventory_reserved) WHERE id = ?');
                $update->execute([$status, $status, $id]);
            }
            if ($paymentStatus !== '') {
                $updatePayment = $pdo->prepare('UPDATE orders SET payment_status = ? WHERE id = ?');
                $updatePayment->execute([$paymentStatus, $id]);
            }
            $pdo->commit();
            api_json(200, ['ok' => true, 'status' => $status, 'paymentStatus' => $paymentStatus]);
        } catch (Throwable $error) {
            if ($pdo->inTransaction()) $pdo->rollBack();
            throw $error;
        }
    }

    if ($route === 'upload' && $method === 'POST') {
        require_admin();
        require_csrf();
        if (empty($_FILES['images'])) api_json(422, ['error' => 'Choose one or more images.']);
        $files = $_FILES['images'];
        $names = is_array($files['name']) ? $files['name'] : [$files['name']];
        $temps = is_array($files['tmp_name']) ? $files['tmp_name'] : [$files['tmp_name']];
        $sizes = is_array($files['size']) ? $files['size'] : [$files['size']];
        $errors = is_array($files['error']) ? $files['error'] : [$files['error']];
        if (count($names) > 5) api_json(422, ['error' => 'Upload up to five images at a time.']);
        $uploadDir = __DIR__ . '/uploads/products';
        if (!is_dir($uploadDir) && !mkdir($uploadDir, 0755, true) && !is_dir($uploadDir)) api_json(500, ['error' => 'Could not prepare image storage.']);
        $allowed = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/avif' => 'avif'];
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $uploaded = [];
        foreach ($names as $index => $originalName) {
            if ($errors[$index] !== UPLOAD_ERR_OK || $sizes[$index] > 5 * 1024 * 1024) api_json(422, ['error' => 'Each image must be valid and no larger than 5 MB.']);
            $mime = $finfo->file($temps[$index]);
            if (!isset($allowed[$mime])) api_json(422, ['error' => 'Use JPG, PNG, WEBP, or AVIF product images.']);
            $filename = bin2hex(random_bytes(18)) . '.' . $allowed[$mime];
            if (!move_uploaded_file($temps[$index], $uploadDir . '/' . $filename)) api_json(500, ['error' => 'Could not save an uploaded image.']);
            $uploaded[] = ['src' => '/api/index.php?route=image&name=' . $filename, 'path' => $filename, 'name' => basename((string)$originalName)];
        }
        api_json(201, ['images' => $uploaded]);
    }

    if ($route === 'image' && $method === 'GET') {
        $name = (string)($_GET['name'] ?? '');
        if (!preg_match('/^[a-f0-9]{36}\.(jpg|png|webp|avif)$/', $name)) api_json(404, ['error' => 'Image not found.']);
        $path = __DIR__ . '/uploads/products/' . $name;
        if (!is_file($path)) api_json(404, ['error' => 'Image not found.']);
        $mime = (new finfo(FILEINFO_MIME_TYPE))->file($path) ?: 'application/octet-stream';
        header('Content-Type: ' . $mime);
        header('X-Content-Type-Options: nosniff');
        header('Cache-Control: public, max-age=2592000, immutable');
        readfile($path);
        exit;
    }

    if ($route === 'products' && in_array($method, ['POST', 'PUT', 'DELETE'], true)) {
        require_admin();
        require_csrf();
        if ($method === 'DELETE') {
            $id = trim((string)($_GET['id'] ?? ''));
            $stmt = db()->prepare('DELETE FROM products WHERE id = ?');
            $stmt->execute([$id]);
            api_json(200, ['ok' => true]);
        }
        $body = api_body();
        $categories = ['laptops', 'desktops', 'servers', 'refurbished', 'accessories', 'cctv', 'networking'];
        $name = trim((string)($body['name'] ?? ''));
        $category = (string)($body['category'] ?? '');
        $description = trim((string)($body['description'] ?? ''));
        $price = filter_var($body['price'] ?? null, FILTER_VALIDATE_FLOAT);
        $offerPriceRaw = $body['offer_price'] ?? ($body['offer'] ?? null);
        $offerPrice = ($offerPriceRaw === null || $offerPriceRaw === '') ? null : filter_var($offerPriceRaw, FILTER_VALIDATE_FLOAT);
        $specs = $body['specs'] ?? null;
        $sku = trim((string)($body['sku'] ?? ''));
        $stock = $body['stock'] ?? null;
        $images = $body['images'] ?? [];
        if ($name === '' || mb_strlen($name) > 100 || !in_array($category, $categories, true) || $description === '' || mb_strlen($description) > 700 || $price === false || $price < 0 || ($offerPrice !== null && ($offerPrice === false || $offerPrice < 0)) || !is_array($specs) || !count($specs) || !is_array($images) || count($images) > 5 || ($stock !== null && (!filter_var($stock, FILTER_VALIDATE_INT) || (int)$stock < 0))) api_json(422, ['error' => 'Check the required fields, category, price, offer price, stock, specifications, and images.']);
        $id = $method === 'PUT' ? (string)($body['id'] ?? '') : sprintf('%s-%s-%s-%s-%s', bin2hex(random_bytes(4)), bin2hex(random_bytes(2)), '4' . substr(bin2hex(random_bytes(2)), 1), '8' . substr(bin2hex(random_bytes(2)), 1), bin2hex(random_bytes(6)));
        if (!preg_match('/^[a-f0-9-]{36}$/i', $id)) api_json(422, ['error' => 'Invalid product identifier.']);
        $stmt = db()->prepare('INSERT INTO products (id,name,category,description,price,offer_price,specs,sku,stock,images,is_published) VALUES (?,?,?,?,?,?,?,?,?,?,1) ON DUPLICATE KEY UPDATE name=VALUES(name),category=VALUES(category),description=VALUES(description),price=VALUES(price),offer_price=VALUES(offer_price),specs=VALUES(specs),sku=VALUES(sku),stock=VALUES(stock),images=VALUES(images),updated_at=CURRENT_TIMESTAMP');
        $stmt->execute([$id, $name, $category, $description, $price, $offerPrice, json_encode(array_values($specs)), $sku, $stock === null ? null : (int)$stock, json_encode(array_values($images))]);
        $read = db()->prepare('SELECT * FROM products WHERE id = ?');
        $read->execute([$id]);
        api_json($method === 'POST' ? 201 : 200, ['product' => product_row($read->fetch())]);
    }

    api_json(404, ['error' => 'API route not found.']);
} catch (Throwable $error) {
    error_log($error->__toString());
    api_json(500, ['error' => 'The database service is temporarily unavailable.']);
}
