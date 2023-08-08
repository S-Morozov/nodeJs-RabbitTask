# Asynchronous HTTP Request Processing with RabbitMQ

This project demonstrates the asynchronous processing of HTTP requests using Node.js and RabbitMQ. It consists of two microservices, M1 and M2, which work together to process incoming HTTP requests.

## Requirements

- Node.js (version x.x.x)
- RabbitMQ server (running locally or on a server)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/S-Morozov/nodeJs-RabbitTask.git

2. Install the required dependencies for both microservices:

cd m1 and m2 
npm install

npm init -y
npm install express amqplib

3. Start the services 
cd m1
node app.js

cd m2
node worker.js


