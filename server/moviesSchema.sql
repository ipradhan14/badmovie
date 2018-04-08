DROP DATABASE IF EXISTS badmovies;
CREATE DATABASE IF NOT EXISTS badmovies;
USE badmovies;

DROP TABLE IF EXISTS favorites;

CREATE TABLE favorites (
    id          INT             NOT NULL    AUTO_INCREMENT,
    title       VARCHAR(255)    NOT NULL,
    year        INT             NOT NULL,
    rating      VarChar(255)    NOT NULL,
    img_url     VARCHAR(255)    NOT NULL,
    PRIMARY KEY (id)
);