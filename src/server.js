
const http = require('http');




const server = http.createServer((req, res) => {

    if (req.url = "/") { res.end("Home Page") }

    if (req.url = "/edit") { res.end("Edit Page") }
})

server.listen(5000);
