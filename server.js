let express = require('express');
let app = express();
let port = process.env.port || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');
let collection

app.use(express.static(__dirname + '/'));

app.use(express.json());             // for application/json
app.use(express.urlencoded());       // for application/x-www-form-urlencoded



const uri = "mongodb+srv://admin:admin@project.efwork4.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        collection = client.db().collection('Cat')
        console.log("Collection assigned");
        // console.log("Collections: ", collection);
    } catch (err) {
        console.error(err);
    }
}
run().catch(console.dir);


app.get('/', function (req, res) {
    res.render('index.html');
});

function addCat(data, callback) {
    collection.insertOne(data, callback)
}

app.post('/api/cat', (req, res) => {
    addCat(req.body, (err, result) => {
        if (!err) {
            res.json({ statusCode: 201, data: result, message: 'success' })
        }
    });
})

async function getAllCats(callback) {
    // collection.find({}).toArray(callback);    //Scenario: 1 -> This is not working (without callback())
    collection.find({}).toArray(callback);    //Scenario: 2 -> This is working but not getting the data inside the callback
    // const test = await collection.find({}).toArray();
    // console.log(":::::::::::", test);
}


app.get('/api/cats', (req, res) => {
    console.log("CAlled");
    getAllCats((err, result) => {
        console.log("Callback");
        // if we want use callback with () then we are coming here but if we use then come here but without data
        if (!err) {
            console.log("TEST:", result);
            res.json({ statusCode: 200, data: result, message: 'success!!' });
        } else {
            // Handle the error if needed
            console.error("Error while fetching cats:", err);
            res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
        }
    });
});



app.get('/addTwoNumbers', function (req, res) {
    let num1 = req.query.num1;
    let num2 = req.query.num2;
    let result = parseInt(num1) + parseInt(num2);
    let response = { data: result, message: 'success', statusCode: 200 }
    res.json(response);
});

app.listen(port, () => {
    console.log('express server started');
});