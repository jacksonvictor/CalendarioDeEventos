DROP DATABASE IF exists CALENDAR;
CREATE DATABASE IF NOT EXISTS CALENDAR;
USE CALENDAR;

CREATE TABLE IF NOT EXISTS USERS (
  ID int NOT NULL AUTO_INCREMENT,
  USERNAME varchar(220) DEFAULT NULL,
  PASS varchar(220) DEFAULT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS EVENTS (
  ID int NOT NULL AUTO_INCREMENT,
  DESCRIPTION_EVENT varchar(220) DEFAULT NULL,
  COLOR varchar(10) DEFAULT NULL,
  START_EVENT datetime DEFAULT NULL,
  END_EVENT datetime DEFAULT NULL,
  ID_USER int not null,
  FOREIGN KEY (ID_USER) REFERENCES USERS ( ID ),
  PRIMARY KEY (ID)
);


