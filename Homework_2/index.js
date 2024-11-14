import fs from "node:fs";

const options = { encoding: "utf-8" };
const filename = "large_file.json";

let totalSize = 0;

const readStream = fs.createReadStream(filename, options);

// data event for reading large file
readStream.on("data", (chunk) => {
  // console.log("Chunk data from large file:\n", chunk);
  totalSize += chunk.length;
});

// end event for reading large file
readStream.on("end", () => {
  console.log("End event on large file");
});

// reading file with fs module
fs.lstat(filename, (err, stats) => {
  // comparing file size
  console.log("File size in bytes (.size): ", stats.size);
  console.log("Total size in bytes (.length): ", totalSize);

  // create new buffer
  const buffer = Buffer.alloc(256);

  // write text to buffer
  const text = "I'm learning NodeJS and node:fs module.";
  buffer.write(text);
  console.log("Buffer content: ", buffer.toString());

  // changing buffer content using indexes
  buffer[0] = 74; // J
  buffer[1] = 32; // space
  buffer[2] = 97; // a
  console.log("Modified buffer content: ", buffer.toString());
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// promise which resolves at random after 2 seconds. If the number is even it's resolved if the number is odd it's rejected.
function randomEvenOddPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = getRandomInt(100);
      if (randomNumber % 2 === 0) {
        resolve(randomNumber);
      } else {
        reject(new Error(`Odd number: ${randomNumber}`));
      }
    }, 2000);
  });
}

// handling promise
randomEvenOddPromise()
  .then((number) => {
    console.log("Even number:", number);
  })
  .catch((error) => {
    console.error("Rejected with error:", error.message);
  });

// promise that returns 100 after 1 second.
function returnHundredPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(100);
    }, 1000);
  });
}

// executing promises one after another
randomEvenOddPromise()
  .then((number) => {
    console.log("First promise resolved with even number:", number);
    return returnHundredPromise().then((secondNumber) => [
      number,
      secondNumber,
    ]);
  })
  .then((finalResult) => {
    console.log("Final result:", finalResult);
  })
  .catch((error) => {
    console.error("Error occurred:", error.message);
  });

//   async function to handle promise
async function asyncRandomEvenOdd() {
  try {
    const result = await randomEvenOddPromise();
    console.log("Async resolved with even number: ", result);
  } catch (error) {
    console.error("Async rejected with error: ", error.message);
  }
}

asyncRandomEvenOdd();
