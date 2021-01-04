# chatapp

Chat app is made with Node.js + Express and Socket.io
frontend with React.js

# Install the project Chat

Run the command to install dependencies : yarn install
You have to yarn install one the frontend directory and on the backend directory (cd frontend + yarn install and cd backend + yarn install).

- Inside config/db.config.json
In db.config.json, create an object { "HOST": "localhost", "USER": "your username", "PASSWORD": "your password", "DB": "yourDB" }

# Request for your DATABASE

create DATABASE nameDB;

create table room ( id INT PRIMARY KEY AUTO_INCREMENT not null, name varchar(100) not null );

create table message ( id INT PRIMARY KEY AUTO_INCREMENT not null, content VARCHAR(255), username VARCHAR(255), userId VARCHAR(40), date DATE, roomId INT, FOREIGN KEY (roomId) REFERENCES room(id) ON DELETE CASCADE);

INSERT INTO room (id, name) VALUES(1, "Breaking Bad"); 
INSERT INTO room (id, name) VALUES(1, "Game of Thrones"); 

# Start the project

Once you install dependencies on frontend and backend directories and make your db configuration,
notice that all works on the same port (5000), so you have to : 
cd frontend + yarn start for starting the project.

# Nice to have if I miss it

- Number of users in a room
- Checking if user have same name in same room (forbidden)
- Other optional bonus I didnt have time to perform. 