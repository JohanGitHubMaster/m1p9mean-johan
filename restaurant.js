var MongoClient = require('mongodb').MongoClient;
var MongoDb = require('mongodb');
var connectionString = 'mongodb+srv://johan:johan@cluster0.yv7eh.mongodb.net/test?retryWrites=true&w=majority';
var db = {};

MongoClient.connect(connectionString,{useUnifiedTopology: true}).then(client => {
    // console.log('Connected to Database');
    db = client.db('Ekaly');
    });


function inscriptionadminresto(req, res,next){
        db.collection('restaurant').insertOne(req.body).then(result=>
            {
                console.log('insertion fait');
                res.json(result);
            }).catch(error=>{console.log(error)});       
        console.log(req.body);
    }
exports.inscriptionadminresto = inscriptionadminresto;

    function findUserAdminResto(req,res,next)
    {
    console.log(req.body.nom);
    console.log(req.body.password);
    db.collection('restaurant').findOne(
        {
            nom:req.body.nom,
            password:req.body.password
            //name:"Johan",
            //password:"gg"
            
        },
        {}
        ).then(result=>
            {
                console.log('find admin');
                res.json(result);
                console.log(result);
            })
    //console.log(req.body.name);
    }
exports.findUserAdminResto = findUserAdminResto; 