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

function updateplat(req, res,next){
    res.header('Access-Control-Allow-Origin: *');
    db.collection('plat').findOneAndUpdate(
        {_id: MongoDb.ObjectId(req.body._id)},
        {
            $set:
            {
                nom: req.body.nom,
                prix: req.body.prix,
                type: req.body.type,
                description: req.body.description,
                noteclient:req.body.noteclient,
                quantite: req.body.quantite,             
                image: req.body.image
            }
        },
        {
            upsert: false
        }
        
    ).then(result=>{  res.json(result); console.log(result);})
    .catch(error=> console.error(error))
}
exports.updateplat = updateplat;


function updatequantityplat(req, res,next){
    res.header('Access-Control-Allow-Origin: *');
    db.collection('plat').findOneAndUpdate(
        {_id: MongoDb.ObjectId(req.body._id)},
        {
            $set:
            {
                quantitevendu: req.body.quantitevendu,             
            }
        },
        {
            upsert: false
        }
        
    ).then(result=>{  res.json(result); console.log(result);})
    .catch(error=> console.error(error))
}
exports.updatequantityplat = updatequantityplat;

function deleteplat(req, res, next){
    
    console.log(req.body);
    db.collection('plat').deleteOne(
        { _id: MongoDb.ObjectId(req.body._id)}
        
    )
    .then(result=>{  
    res.json(result);
})
.catch(error=> console.error(error))
}
exports.deleteplat = deleteplat;


function searchplat(req, res, next){
    
    console.log('manomboka eto');
    console.log(req.body.nom);
    console.log(req.body.prix);
    console.log(req.body.type);
    
    db.collection('plat').find(
        {
             nom:new RegExp(req.body.nom, 'i'),
             //prix:{'$lt':req.body.prix},
            
            type:new RegExp(req.body.type, 'i'),
            id_restaurant:req.body.id_restaurant,
            // prix:{$lt:20000},
        }).toArray().then(results =>
        {
            if(req.body.prix!=null)
            results = results.filter(x=>x.prix<=req.body.prix);
            
            res.json(results);
            console.log(results);
        }).catch(error=> console.error(error));
}
exports.searchplat = searchplat;




function listplatsbyorder(req, res,next){
    var resultplat = [];
    var resultorder = [];
    console.log(req.body);
    db.collection('order').find().toArray().then(results =>
        {
            console.log(results);
            resultinscription = results;
            db.collection('inscription').find().toArray().then(resultorders =>
                {
                    resultorder = resultorders;
                    console.log(typeof(resultorder))
                    let mergedSubjects = resultinscription.map(subject => {
                        let otherSubject = resultorder.find(element => element._id == subject.id_client)
                        console.log(otherSubject);
                        return { ...subject, ...otherSubject }
                       
                    })
                    

                    db.collection('plat').find().toArray().then(resultplat =>
                        {
                            resultatplat = resultplat;

                            let resultfinal = mergedSubjects.map(subject =>{
                                let resultatplatother = resultatplat.find(element => element._id == subject.id_plat)
                                console.log(resultatplatother);
                                return { ...subject, ...resultatplatother }
                            })
                            // res.json(resultfinal.filter(x=>x.id_client == req.body._id));

                            res.json(resultfinal.filter(x=>x.id_client == req.body.id_client && x.id_livraison==req.body.id_livraison));
                            console.log(resultfinal);
                        }).catch(error=> console.error(error));

                    
                }).catch(error=> console.error(error));

           
        }).catch(error=> console.error(error));
}
exports.listplatsbyorder = listplatsbyorder;



function listplatsbyorderrestaurant(req, res,next){
    var resultplat = [];
    var resultorder = [];
    db.collection('order').find().toArray().then(results =>
        {
            console.log(results);
            resultrestaurant = results;
            db.collection('restaurant').find().toArray().then(resultorders =>
                {
                    resultorder = resultorders;
                    console.log(typeof(resultorder))
                    let mergedSubjects = resultrestaurant.map(subject => {
                        let otherSubject = resultorder.find(element => element._id == subject.id_restaurant)
                        console.log(otherSubject);
                        return { ...subject, ...otherSubject }
                       
                    })
                    

                    db.collection('plat').find().toArray().then(resultplat =>
                        {
                            resultatplat = resultplat;

                            let resultfinal = mergedSubjects.map(subject =>{
                                let resultatplatother = resultatplat.find(element => element._id == subject.id_plat)
                                console.log(resultatplatother);
                                return { ...subject, ...resultatplatother }
                            })
                            // res.json(resultfinal.filter(x=>x.id_restaurant == req.body._id));
                            res.json(resultfinal.filter(x=>x.id_restaurant == req.body._id));
                            
                            // res.json(resultfinal);
                            console.log(resultfinal);
                        }).catch(error=> console.error(error));

                    
                }).catch(error=> console.error(error));

           
        }).catch(error=> console.error(error));
}
exports.listplatsbyorderrestaurant = listplatsbyorderrestaurant;

function searchplatglobal(req, res, next){
    
  
    
    db.collection('plat').find(
        {
              nom:new RegExp(req.body.nom, 'i'),            
             type:new RegExp(req.body.type, 'i')
        }).toArray().then(results =>
        {
            // var price = req.body.prix;
            // console.log(typeof(price));
            // console.log(typeof(1));
             if(typeof(req.body.prix)==typeof(1))
             {
                 console.log("miditra ato");
                 console.log(typeof(price));
                 results = results.filter(x=>x.prix<=req.body.prix);  
               //console.log('null le prix'); 
               //console.log(results);       
             }
            res.json(results);
            
        }).catch(error=> console.error(error));
}
exports.searchplatglobal = searchplatglobal;



function convertimage(req, res, next){
  var resizebase64 = require('resize-base64');  
  
  console.log(req.body);
var  img = resizebase64("base64", "100", "100"); 
res.json(img);
}
exports.convertimage = convertimage;

