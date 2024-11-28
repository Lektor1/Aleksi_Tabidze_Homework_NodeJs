import fetch from "node-fetch";
import fs from "fs";
import FormData from "form-data";

const url = "http://localhost:3000/upload";
const filePath = "client/test.txt";

const form = new FormData();
form.append("file", fs.createReadStream(filePath));

fetch(url, { method: "POST", body: form })
  .then((response) => response.json())
  .then((data) => {
    console.log("File uploaded successfully:");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
