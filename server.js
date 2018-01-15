let express = require('express');
let app = express();
let PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/src'));

app.listen(PORT);