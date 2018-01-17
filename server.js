let express = require('express');
let app = express();
let PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/src'));

app.get('/todos', function(req, res){
    res.send('API: all todos');
})

app.listen(PORT);