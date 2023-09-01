let express = require('express');
let app = express();
let port = process.env.port || 3000;
require('./dbConnection')
let router = require('./routers/router')

// socket io conection code
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static(__dirname + '/'));
app.use(express.json());             // for application/json
app.use(express.urlencoded());       // for application/x-www-form-urlencoded
app.use('/api/cats', router);

http.listen(port, () => {
    console.log(`express server started on port ${port}`);
});

io.on('connection', (socket) => {
    console.log('something');
    socket.on('disconnect', () => {
        console.log('user disconnect!');
    });

    setInterval(() => {
        socket.emit('number', parseInt(Math.random()*10));
    }, 1000);
})


// app.get('/', function (req, res) {
//     res.render('index.html');
// });




app.get('/addTwoNumbers', function (req, res) {
    let num1 = req.query.num1;
    let num2 = req.query.num2;
    let result = parseInt(num1) + parseInt(num2);
    let response = { data: result, message: 'success', statusCode: 200 }
    res.json(response);
});

