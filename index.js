var express = require("express");

var server = express();
server.use(express.static("public"));
var port = 8000;
server.listen(port, () => {
    console.log("web server running on port " + port);
});