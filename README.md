# chatapp

# Install the project Chat

Run the command to install dependencies : yarn install
You have to yarn install one the frontend directory and on the backend directory (cd frontend + yarn install and cd backend + yarn install).

- Inside config/db.config.json
In db.config.json, create an object { "HOST": "localhost", "USER": "your username", "PASSWORD": "your password", "DB": "yourDB" }

# Request for your DATABASE

create DATABASE nameDB;

create table room ( id INT PRIMARY KEY AUTO_INCREMENT not null, name varchar(100) not null );

create table message ( id INT PRIMARY KEY AUTO_INCREMENT not null, content VARCHAR(255), username VARCHAR(255), userId VARCHAR(40), date DATE, roomId INT, FOREIGN KEY (roomId) REFERENCES room(id) ON DELETE CASCADE);

# Nice to have if I miss it

I will make a fix on socket for select last messages in array from server instead using fetch on REST API that need to be refresh every time.