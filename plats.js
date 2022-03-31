var MongoClient = require('mongodb').MongoClient;
var MongoDb = require('mongodb');
var connectionString = 'mongodb+srv://johan:johan@cluster0.yv7eh.mongodb.net/test?retryWrites=true&w=majority';
var db = {};

MongoClient.connect(connectionString,{useUnifiedTopology: true}).then(client => {
    console.log('Connected to Database');
    db = client.db('Ekaly');
    });

function insertionplat(req, res,next){
    db.collection('plat').insertOne(req.body).then(result=>
        {
            console.log('insertion fait');
            res.json(result);
        }).catch(error=>{console.log(error)});       
    console.log(req.body);
}
exports.insertionplat = insertionplat;


function listplats(req, res,next){
    db.collection('plat').find().toArray().then(results =>
        {
            res.json(results);
            console.log(results);
        }).catch(error=> console.error(error));
}
exports.listplats = listplats;

function listplatsbyresto(req, res,next){

    db.collection('plat').find({id_restaurant:req.body._id}).toArray().then(results =>
        {
            res.json(results);
            console.log(results);
        }).catch(error=> console.error(error));
}
exports.listplatsbyresto = listplatsbyresto;