var MongoClient = require('mongodb').MongoClient;
var MongoDb = require('mongodb');
var connectionString = 'mongodb+srv://johan:johan@cluster0.yv7eh.mongodb.net/test?retryWrites=true&w=majority';
var db = {};

MongoClient.connect(connectionString,{useUnifiedTopology: true}).then(client => {
    console.log('Connected to Database');
    db = client.db('Ekaly');
    var quotesCollection = db.collection('quotes');
    });

function inscriptionclient(req, res,next){
    db.collection('inscription').insertOne(req.body).then(result=>
        {
            console.log('insertion fait');
            res.json(result);
        }).catch(error=>{console.log(error)});       
    console.log(req.body);
}
exports.inscriptionclient = inscriptionclient;


function listclient(req, res,next){
    db.collection('inscription').find().toArray().then(results =>
        {
            res.json(results);
            console.log(results);
        }).catch(error=> console.error(error));
}
exports.listclient = listclient;

function findUser(req,res,next)
{
    console.log(req.body);
    db.collection('inscription').findOne(
        {
            name:req.body.name,
            password:req.body.password
            //name:"Johan",
            //password:"gg"
        },
        {}
        ).then(result=>
            {
                
                res.json(result);
                console.log(result);
            })
    //console.log(req.body.name);
}
exports.findUser = findUser;