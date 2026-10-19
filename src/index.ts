process.loadEnvFile();

import http from "node:http";

console.log(process.env.DB_URL);

const server = http.createServer(async(req, resp) => {
  const response = await fetch("https://api.github.com/users/oyejideoyetunji/repos?per_page=3");
  const data = await response.json();
  const body = JSON.stringify(data)

  resp.writeHead(
    200,
    {
      "content-type": "application/json",
      "content-length": Buffer.byteLength(body),
    }
  )
  resp.end(body);
});

server.listen(8080, "localhost", () => {
  console.log(`server listening on port 8080`)
});
