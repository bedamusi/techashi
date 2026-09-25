CREATE TABLE IF NOT EXISTS orders (
  id CHAR(36) NOT NULL PRIMARY KEY,
  order_number VARCHAR(24) NOT NULL UNIQUE,
  idempotency_key CHAR(36) NOT NULL UNIQUE,
  customer_name VARCHAR(120) NOT NULL,
  customer_email VARCHAR(254) NOT NULL,
  customer_phone VARCHAR(40) NOT NULL,
  fulfillment VARCHAR(16) NOT NULL,
  delivery_address VARCHAR(500) NULL,
  payment_method VARCHAR(32) NOT NULL DEFAULT 'arranged_with_store',
  payment_status VARCHAR(16) NOT NULL DEFAULT 'unpaid',
  status VARCHAR(24) NOT NULL DEFAULT 'pending',
  subtotal DECIMAL(12,2) NOT NULL,
  delivery_fee DECIMAL(12,2) NOT NULL DEFAULT 0,
  total DECIMAL(12,2) NOT NULL,
  customer_notes VARCHAR(1000) NULL,
  inventory_reserved TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX orders_status_created (status, created_at),
  INDEX orders_email_created (customer_email, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS order_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_id CHAR(36) NOT NULL,
  product_id CHAR(36) NULL,
  product_name VARCHAR(100) NOT NULL,
  category VARCHAR(40) NOT NULL,
  sku VARCHAR(40) NOT NULL DEFAULT '',
  image_src VARCHAR(1000) NULL,
  unit_price DECIMAL(12,2) NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  INDEX order_items_order (order_id),
  CONSTRAINT order_items_order_fk FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT order_items_product_fk FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
