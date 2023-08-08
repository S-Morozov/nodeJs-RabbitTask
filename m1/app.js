// serverM1.js
const express = require('express');
const amqp = require('amqplib');

const app = express();
const port = 3000;

// Function to establish a connection to RabbitMQ

async function connectToRabbitMQ() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'message_queue_m2';

    // Assert the queue (create if not exists)

  await channel.assertQueue(queue, { durable: false });

  return { channel, queue }; // Возвращаем и канал, и имя очереди
}

app.get('/m1', async (req, res) => {
  try {
    const { channel, queue } = await connectToRabbitMQ(); // Destructure the channel and queue

    // Consume messages from the queue and handle them

    channel.consume(queue, async (msg) => {
      const message = msg.content.toString();
      console.log('Received message:', message);

      await res.send(message);
    }, { noAck: true }); // Set noAck: true since we won't manually acknowledge receipt
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log('Microserver m1 started on port', port);
});
