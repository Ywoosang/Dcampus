CREATE DATABASE wlearn DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

USE wlearn;

DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Post;
DROP TABLE IF EXISTS File;
DROP TABLE IF EXISTS Comment;

CREATE TABLE User(
    id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL,
    nickId VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(30) NOT NULL UNIQUE,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE Post(
    id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    content TEXT NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NULL,
    user_id INT(11) UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    PRIMARY KEY(id)
);

CREATE TABLE File(
    id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    filename VARCHAR(100) NOT NULL,
    mimetype VARCHAR(20) NOT NULL,
    url VARCHAR(300) NOT NULL,
    owner_id INT(11) UNSIGNED NOT NULL,
    post_id INT(11) UNSIGNED NOT NULL, 
    FOREIGN KEY(owner_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY(post_id) REFERENCES Post(id) ON DELETE CASCADE,
    PRIMARY KEY(id)
); 

CREATE TABLE Comment(
    id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    content TEXT NOT NULL,
    created_at DATE NOT NULL,
    user_id INT(11) UNSIGNED NOT NULL,
    post_id INT(11) UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES Post(id) ON DELETE CASCADE,
    PRIMARY KEY(id)
); 

DELIMITER $$
    CREATE TRIGGER autoPostDate 
    BEFORE INSERT ON Post 
    FOR EACH ROW
    BEGIN
        SET NEW.created_at = NOW();
        SET NEW.updated_at = NOW();
    END $$
 
    CREATE TRIGGER autoCommentDate 
    BEFORE INSERT ON Comment 
    FOR EACH ROW
    BEGIN
        SET NEW.created_at = NOW();
    END $$
DELIMITER ;    


INSERT INTO User (name,nickId,email) VALUES ('윤우상','Ywoosang','opellong13@gmail.com'); 
INSERT INTO Post (title,content,user_id) VALUES ('Docker-MYSQL 예제','Docker-Node.js-MYSQL 연동 및 테스트 진행',1);
INSERT INTO File (filename,mimetype,url,owner_id,post_id) VALUES('testfile','.txt','xxxx.com',1,1);
INSERT INTO Comment (content,user_id,post_id) VALUES('예제 댓글1',1,1);


