// const asciiArt = require("ascii-art"); // remove '"type": "module"' in package.json to use require
import asciiArt from "ascii-art";
import fs from "node:fs";

const text = "Hello NodeJS!";

// printing text
console.log(text);


// printing text with ascii art
asciiArt.font(text, "Doom", function (err, rendered) {
  console.log(asciiArt.style(rendered, "red"));
});


// reading JSON file

const options = { encoding: "utf-8" };
const filename = "sayings.json";

// reading file with fs module
try {
  const jsonData = JSON.parse(fs.readFileSync(filename, options));
  console.log("Data from Json file (fs module):\n", jsonData);
} catch (error) {
  console.error("Error while reading file: ", error);
}

// reading file with stream
const readStream = fs.createReadStream(filename, options);

let jsonData = "";

readStream.on("data", (chunk) => {
  jsonData += chunk;
});

readStream.on("end", () => {
  const data = JSON.parse(jsonData);
  console.log("Data from JSON file (fs.createReadStream):\n", data);
});

readStream.on("error", (error) => {
  console.error("Error while reading file: ", error);
});

// reading file using a file descriptor and a buffer
fs.open(filename, "r", (err, fd) => {
  if (err) {
    console.error("Error opening file:", err);
    return;
  }

  const buffer = Buffer.alloc(1024);

  fs.read(fd, buffer, 0, buffer.length, 0, (err, bytesRead, buffer) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    const jsonData = JSON.parse(
      buffer.toString(options.encoding, 0, bytesRead)
    );

    console.log(
      "Data from JSON file (file descriptor and buffer):\n",
      jsonData
    );
  });
});
