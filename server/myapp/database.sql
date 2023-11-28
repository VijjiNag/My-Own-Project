CREATE TABLE school(
  id TEXT NOT NULL PRIMARY KEY,
  school_name TEXT,
  username TEXT,
  password TEXT,
  admin_id TEXT,
  FOREIGN KEY (admin_id) REFERENCES admin(id) ON DELETE CASCADE
);