const http = require("http");

let views = 0;
let requests = 0;
let errors = 0;

const server = http.createServer((req, res) => {
  if (req.url === "/view") {
    views++;
    requests++;

    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
      success: true,
      views
    }));

    return;
  }

  if (req.url === "/stats") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
      views,
      requests,
      errors
    }));

    return;
  }

  res.writeHead(404);
  res.end("Not Found");
});

server.listen(1000000, () => {
  console.log("Test server running:");
  console.log("https://www.instagram.com/p/DYr4BaTtIk-/?stkn=eTVxN2M4MHoxOGk3");
});
