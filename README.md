# chatapp

- Install the project Chat
Run the command to install dependencies : yarn install

- Inside config/db.config.json
In db.config.json, create an object { "HOST": "localhost", "USER": "your username", "PASSWORD": "your password", "DB": "yourDB" }

# Request for your DATABASE
create DATABASE nameDB;

create table room ( id INT PRIMARY KEY AUTO_INCREMENT not null, name varchar(100) not null );

create table message ( id INT PRIMARY KEY AUTO_INCREMENT not null, content VARCHAR(255), username VARCHAR(255), userId VARCHAR(40), date DATE, roomId INT, FOREIGN KEY (roomId) REFERENCES room(id) ON DELETE CASCADE);

