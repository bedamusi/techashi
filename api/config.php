<?php
declare(strict_types=1);

function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) return $pdo;

    $envFile = dirname(__DIR__) . '/.env';
    $fileSettings = is_file($envFile) ? (parse_ini_file($envFile, false, INI_SCANNER_RAW) ?: []) : [];
    $setting = static function (string $key, string $default = '') use ($fileSettings): string {
        $environmentValue = getenv($key);
        return $environmentValue !== false ? $environmentValue : (string)($fileSettings[$key] ?? $default);
    };
    $requestHost = strtolower(explode(':', (string)($_SERVER['HTTP_HOST'] ?? 'localhost'))[0]);
    $isLocalRequest = PHP_SAPI === 'cli' || in_array($requestHost, ['localhost', '127.0.0.1'], true);
    $host = $setting('DB_HOST', '127.0.0.1');
    $name = $setting('DB_NAME', 'techashi');
    $user = $setting('DB_USER', $isLocalRequest ? 'root' : '');
    $password = $setting('DB_PASS');
    if ($user === '') throw new RuntimeException('Set DB_USER in the server environment before connecting.');
    $pdo = new PDO("mysql:host={$host};dbname={$name};charset=utf8mb4", $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    ensure_schema($pdo);
    return $pdo;
}

function ensure_schema(PDO $pdo): void
{
    static $checked = false;
    if ($checked) return;
    $checked = true;
    try {
        $cols = $pdo->query('SHOW COLUMNS FROM products')->fetchAll(PDO::FETCH_COLUMN);
        if (!in_array('offer_price', $cols, true)) {
            $pdo->exec('ALTER TABLE products ADD COLUMN offer_price DECIMAL(12,2) NULL DEFAULT NULL AFTER price');
        }
    } catch (Throwable) {
        // Schema already updated or table not ready
    }
}

function api_json(int $status, array $data): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function api_body(): array
{
    $data = json_decode(file_get_contents('php://input'), true);
    if (!is_array($data)) api_json(400, ['error' => 'Send valid JSON data.']);
    return $data;
}

function require_admin(): array
{
    $admin = $_SESSION['admin'] ?? null;
    if (!$admin || empty($admin['id'])) api_json(401, ['error' => 'Administrator sign-in required.']);
    $stmt = db()->prepare('SELECT id, email FROM admins WHERE id = ? LIMIT 1');
    $stmt->execute([(int)$admin['id']]);
    $currentAdmin = $stmt->fetch();
    if (!$currentAdmin) {
        unset($_SESSION['admin']);
        api_json(401, ['error' => 'Administrator sign-in required.']);
    }
    $_SESSION['admin'] = ['id' => (int)$currentAdmin['id'], 'email' => $currentAdmin['email']];
    return $_SESSION['admin'];
}

function require_csrf(): void
{
    $provided = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    $expected = $_SESSION['csrf_token'] ?? '';
    if (!$expected || !$provided || !hash_equals($expected, $provided)) api_json(419, ['error' => 'Your session expired. Refresh and try again.']);
}

function product_row(array $row): array
{
    $row['price'] = (float)$row['price'];
    $row['offer_price'] = isset($row['offer_price']) && $row['offer_price'] !== null ? (float)$row['offer_price'] : null;
    $row['stock'] = $row['stock'] === null ? null : (int)$row['stock'];
    $row['specs'] = json_decode((string)$row['specs'], true) ?: [];
    $row['images'] = json_decode((string)$row['images'], true) ?: [];
    $row['updatedAt'] = $row['updated_at'];
    unset($row['updated_at'], $row['is_published']);
    return $row;
}
