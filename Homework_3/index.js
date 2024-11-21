import { spawn } from "child_process";
import { exec } from "child_process";
import fs from "fs";

// listing all elements in folder
// Testing comand: node index.js C:/....../NodeHomeWork/homework_1_Aleksi_Tabidze/Homework_3

/*
  const folder = process.argv[2];

  const ls = spawn('ls', ['-la', folder]);

  ls.stdout.on('data', (data) => {
    console.log(`Output: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
*/

// listing all elements in folder with size more than second argument
// Testing comand: node index.js C:/....../NodeHomeWork/homework_1_Aleksi_Tabidze/Homework_3 100

/*
  const folder = process.argv[2];
  const minSize = parseInt(process.argv[3], 10);

  const ls = spawn('ls', ['-la', folder]);

  ls.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      const parts = line.split(/\s+/);
      if (parts.length >= 9) {
        const size = parseInt(parts[4], 10);
        if (!isNaN(size) && size > minSize) {
          console.log(line);
        }
      }
    });
  });

  ls.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
*/

// gets system information and saves it to a file
// Testing comand: node index.js systemInfo.json

// /*
  const outputFileName = process.argv[2];

  exec("systeminfo", (error, stdout, stderr) => {
    const result = {};

    if (error) {
      result.error = error.message;
    } else {
      const lines = stdout.split("\n");
      lines.forEach((line) => {
        const parts = line.split(":");
        if (parts.length === 2) {
          const key = parts[0].trim();
          const value = parts[1].trim();
          result[key] = value;
        }
      });
    }

    if (stderr) {
      result.stderr = stderr;
    }

    fs.writeFile(outputFileName, JSON.stringify(result, null, 2), (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log(`System information saved to ${outputFileName}`);
      }
    });
  });
// */