import { test } from 'node:test';
import assert from 'assert';
import fetch from 'node-fetch';
import fs from 'fs';
import FormData from 'form-data';

const baseUrl = 'http://localhost:3000';

test('should upload a file successfully', async (t) => {
  const url = `${baseUrl}/upload`;
  const filePath = 'client/test.txt'; // Adjust the path to your test file

  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  const response = await fetch(url, { method: 'POST', body: form });
  const data = await response.json();

  assert.strictEqual(response.status, 200);
  assert.strictEqual(data.message, 'File uploaded successfully');
});

test('should list files in the current directory', async (t) => {
  const url = `${baseUrl}/files`;

  const response = await fetch(url);
  const data = await response.json();

  assert.strictEqual(response.status, 200);
  assert(Array.isArray(data));
});