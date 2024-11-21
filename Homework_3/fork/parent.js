import { fork } from "child_process";

const numWorkers = parseInt(process.argv[2], 10);

let completedWorkers = 0;
let totalSum = 0;

for (let i = 0; i < numWorkers; i++) {
  const worker = fork("./worker.js");
  const number = i + 1;

  worker.send(number);

  worker.on("message", (result) => {
    totalSum += result;
    completedWorkers++;

    if (completedWorkers === numWorkers) {
      console.log(`Total sum of factorials: ${totalSum}`);
    }
  });

  worker.on("error", (err) => {
    console.error(`Worker error: ${err}`);
  });
}

// test command: node parent.js 5
// result: Total sum of factorials: 153
