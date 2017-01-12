
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id          serial,
  name        varchar(25),
  age         smallint,
  mobile      varchar(11)
);
