create table certs (
  uploader varchar(250) not null,
  email varchar(250) not null,
  id varchar(250) primary key not null,
  transactionHash varchar(250) default null,
  uploaded boolean default false not null,
  notify boolean default false not null,
  jsonString text,
  cert_id VARCHAR(250) not null UNIQUE,
  svg varchar(250) not null
);
create table users (
  email varchar(250) primary key not null,
  fname varchar(250) not null,
  lname varchar(250) not null,
  phone varchar(10) not null,
  password varchar(250) not null,
  verified boolean default false not null,
  email_token varchar(250)
);
create table admins (
  email varchar(250) primary key not null,
  password varchar(250) not null,
  verified boolean default false not null,
  email_token varchar(250)
);
CREATE TABLE svg_templates (
  svg_id varchar(250) primary key not null,
  svg_slug varchar(250) not null,
  uploader varchar(250) not null
);
ALTER TABLE svg_templates
ADD CONSTRAINT svg_templates_fk0 FOREIGN KEY ("uploader") REFERENCES admins ("email");
ALTER TABLE certs
ADD CONSTRAINT certs_fk0 FOREIGN KEY ("uploader") REFERENCES admins ("email");
ALTER TABLE certs
ADD CONSTRAINT certs_fk2 FOREIGN KEY ("svg") REFERENCES svg_templates ("svg_id");
-- ALTER TABLE certs ADD CONSTRAINT certs_fk1 FOREIGN KEY ("email") REFERENCES users ("email");