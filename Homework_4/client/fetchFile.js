import fetch from "node-fetch";

const url = "http://localhost:3000/files";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error fetching files:", error);
  });
