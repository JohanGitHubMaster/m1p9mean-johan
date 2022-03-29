var MongoClient = require('mongodb').MongoClient;
var MongoDb = require('mongodb');
var connectionString = 'mongodb+srv://johan:johan@cluster0.yv7eh.mongodb.net/test?retryWrites=true&w=majority';
var db = {};

MongoClient.connect(connectionString,{useUnifiedTopology: true}).then(client => {
    console.log('Connected to Database');
    db = client.db('Ekaly');
    });

    function insertionorder(req, res,next){
        db.collection('order').insertOne(req.body).then(result=>
            {
                console.log('insertion fait');
                res.json(result);
            }).catch(error=>{console.log(error)});       
        console.log(req.body);
    }   
    exports.insertionorder = insertionorder;

    function findOrderUser(req,res,next)
    {
        db.collection('order').find({id_client:req.body.id_client}).toArray().then(results =>
            {
                res.json(results);
                console.log(results);
            }).catch(error=> console.error(error));
    }
    exports.findOrderUser = findOrderUser;