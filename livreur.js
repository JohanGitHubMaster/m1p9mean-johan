var MongoClient = require('mongodb').MongoClient;
var MongoDb = require('mongodb');
var connectionString = 'mongodb+srv://johan:johan@cluster0.yv7eh.mongodb.net/test?retryWrites=true&w=majority';
var db = {};

MongoClient.connect(connectionString,{useUnifiedTopology: true}).then(client => {
    console.log('Connected to Database');
    db = client.db('Ekaly');
    });

function inscriptionlivreur(req, res,next){
    db.collection('livreur').insertOne(req.body).then(result=>
        {
            console.log('insertion fait');
            res.json(result);
        }).catch(error=>{console.log(error)});       
    console.log(req.body);
}
exports.inscriptionlivreur = inscriptionlivreur;

function findlivreur(req,res,next)
{
    console.log(req.body);
    db.collection('livreur').findOne(
        {
            nom:req.body.nom,
            password:req.body.password
        },
        {}
        ).then(result=>
            {
                
                res.json(result);
                console.log(result);
            })
}
exports.findlivreur = findlivreur;

function listlivreur(req, res,next){
    db.collection('livreur').find().toArray().then(results =>
        {
            res.json(results);
            console.log(results);
        }).catch(error=> console.error(error));
}
exports.listlivreur = listlivreur;