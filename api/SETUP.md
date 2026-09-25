# Local PHP + MySQL setup

The frontend talks to `api/index.php`; PHP connects to MySQL with PDO. The browser never receives MySQL credentials. The checked-in `.env.example` documents local XAMPP settings; the ignored `.env` is for this machine only. Do not deploy XAMPP's `root` account with an empty password.

## Start the app locally

1. Start Apache and MySQL from XAMPP.
2. For a new database, run `api/schema.sql`. For an existing catalog, run `api/migrations/20260924_create_orders.sql` against the `techashi` database once to add order storage.
3. In one terminal run `npm run dev:api` to start PHP on `127.0.0.1:8081`.
4. In another terminal run `npm run dev` and open the Vite address (usually `http://localhost:3000`). Vite proxies `/api` requests to PHP.
5. Create an administrator once with `php api/create-admin.php admin@example.com`. The script prints a random one-time password; keep it private. Running it again for the same email resets that account's password.
6. Visit `/admin/login`, sign in, and use `/admin/products` to manage products or `/admin/orders` to review and fulfill orders. Published products appear on their public category pages.

The storefront supports product bags and order submission. Prices and stock are rechecked against MySQL when an order is placed; tracked stock is reserved until an order is completed or cancelled. Delivery charges and payment are arranged directly with the customer. An online payment provider has not been configured, so the site does not collect card or mobile-money credentials.

## Hosting

Deploy the built frontend, the `api/` PHP code, and the API image storage together on a host with PHP 8+, PDO MySQL, `fileinfo`, sessions, and MySQL/MariaDB. Point the web root at the built site and set `DB_HOST`, `DB_NAME`, `DB_USER`, and `DB_PASS` for a dedicated MySQL user with access only to this database. Run `api/schema.sql` once against that database. Configure HTTPS so admin session cookies are secure. Static-only hosts cannot run this PHP API.
