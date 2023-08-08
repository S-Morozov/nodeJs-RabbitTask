// serverM2.js
const express = require('express');
const amqp = require('amqplib');

const app = express();
const port = 3001;

app.get('/m2', async (req, res) => {
  try {
    const data = {
      id: 100,
      name: 'Semen',
      age: 35
    };

    // Connect to RabbitMQ

    const connection = await amqp.connect('amqp://localhost');

    // Create a channel to work with queues

    const channel = await connection.createChannel();
    const queue = 'message_queue_m2';
    const msg = JSON.stringify(data);

       // Assert the queue (create if not exists)
    await channel.assertQueue(queue, { durable: false });

       // Send the message to the queue
    await channel.sendToQueue(queue, Buffer.from(msg));

    console.log(`Sent ${msg} to ${queue}`);

    res.send('Message from m2 microserver');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log('Microserver m2 started on port', port);
});















