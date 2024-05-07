DROP TABLE IF EXISTS employee_info CASCADE;

CREATE TABLE IF NOT EXISTS employee_info (
 employee_number INTEGER NOT NULL,
 employee_id VARCHAR(255) NOT NULL,
 employee_name VARCHAR(255),
 employee_full_name VARCHAR(255),
 hobbies VARCHAR(255),
 image bytea,
 password VARCHAR(255) NOT NULL,
 is_admin INTEGER NOT NULL DEFAULT 0,
 PRIMARY KEY (employee_number)
);