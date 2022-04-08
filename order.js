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


    function findpricelivraison(req,res,next)
    {
    db.collection('livraison').find({_id:MongoDb.ObjectId(req.body._id)}).toArray().then(results =>
        {
            res.json(results)
            console.log(results);
        }).catch(error=> console.error(error));
    }
    exports.findpricelivraison = findpricelivraison;


    function updateallorder(req, res,next){

        const filterid_livraison = { id_livraison:req.body._id};
        // const filterid_livraison = { id_livraison:"625001ab99fce11c4151ae30"};

        const updateid_livreur = {
            $set: {
                id_livreur:req.body.id_livreur,
                etats:"traité",
                },
              };  
        db.collection('order').updateMany(filterid_livraison,updateid_livreur).then(result=>
            {
                console.log(result);
                res.json(result)
            });
          
        }   
    exports.updateallorder = updateallorder;