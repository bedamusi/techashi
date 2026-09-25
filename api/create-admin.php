<?php
declare(strict_types=1);
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
require __DIR__ . '/config.php';
$email = strtolower(trim($argv[1] ?? ''));
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fwrite(STDERR, "Usage: php api/create-admin.php admin@example.com\n");
    exit(2);
}
$password = bin2hex(random_bytes(16));
$stmt = db()->prepare('INSERT INTO admins (email,password_hash) VALUES (?,?) ON DUPLICATE KEY UPDATE password_hash=VALUES(password_hash)');
$stmt->execute([$email, password_hash($password, PASSWORD_DEFAULT)]);
echo "Admin account ready for {$email}\nTemporary password (save this now): {$password}\n";
