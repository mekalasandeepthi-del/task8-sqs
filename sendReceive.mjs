import {
  SQSClient,
  SendMessageCommand,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from "@aws-sdk/client-sqs";

const client = new SQSClient({ region: "ap-south-1" });

// 👉 PUT YOUR QUEUE URL HERE
const queueUrl = "https://sqs.ap-south-1.amazonaws.com/669468173289/task8-queue";

async function main() {
  // Send
  const sendRes = await client.send(
    new SendMessageCommand({
      QueueUrl: queueUrl,
      MessageBody: "Task 8 message from SDK",
    })
  );
  console.log("Sent:", sendRes.MessageId);

  // Receive (poll)
  const recvRes = await client.send(
    new ReceiveMessageCommand({
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 1,
      WaitTimeSeconds: 5,
    })
  );

  if (!recvRes.Messages || recvRes.Messages.length === 0) {
    console.log("No messages");
    return;
  }

  const msg = recvRes.Messages[0];
  console.log("Received:", msg.Body);

  // Delete
  await client.send(
    new DeleteMessageCommand({
      QueueUrl: queueUrl,
      ReceiptHandle: msg.ReceiptHandle,
    })
  );
  console.log("Deleted");
}

main().catch(console.error);