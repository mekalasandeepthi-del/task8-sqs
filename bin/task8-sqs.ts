import {
  SQSClient,
  SendMessageCommand,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from "@aws-sdk/client-sqs";

const client = new SQSClient({ region: "ap-south-1" });

// 👉 Replace with your Queue URL
const queueUrl = "https://sqs.ap-south-1.amazonaws.com/669468173289/task8-queue";

async function sendMessage() {
  const command = new SendMessageCommand({
    QueueUrl: queueUrl,
    MessageBody: "Task 8 message from SDK",
  });

  const response = await client.send(command);
  console.log("Message sent successfully");
  console.log("Message ID:", response.MessageId);
}

async function pollMessage() {
  const command = new ReceiveMessageCommand({
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 5,
  });

  const response = await client.send(command);

  if (response.Messages && response.Messages.length > 0) {
    const message = response.Messages[0];
    console.log("Message received:", message.Body);

    if (message.ReceiptHandle) {
      const deleteCommand = new DeleteMessageCommand({
        QueueUrl: queueUrl,
        ReceiptHandle: message.ReceiptHandle,
      });

      await client.send(deleteCommand);
      console.log("Message deleted successfully");
    }
  } else {
    console.log("No messages available in the queue");
  }
}

async function main() {
  await sendMessage();
  await pollMessage();
}

main().catch((error) => {
  console.error("Error:", error);
});