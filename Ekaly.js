var MongoClient = require('mongodb').MongoClient;
var MongoDb = require('mongodb');
var connectionString = 'mongodb+srv://johan:johan@cluster0.yv7eh.mongodb.net/test?retryWrites=true&w=majority';
var db = {};

MongoClient.connect(connectionString,{useUnifiedTopology: true}).then(client => {
    console.log('Connected to Database');
    db = client.db('Ekaly');
    });


function inscriptionadminEkaly(req, res,next){
        db.collection('AdminEkaly').insertOne(req.body).then(result=>
            {
                console.log('insertion fait');
                res.json(result);
            }).catch(error=>{console.log(error)});       
        console.log(req.body);
    }
exports.inscriptionadminEkaly = inscriptionadminEkaly;

    function findUserAdminEkaly(req,res,next)
    {
    console.log("miditra finduser admin ekaly");
    console.log(req.body.nom);
    console.log(req.body.password);
    db.collection('AdminEkaly').findOne(
        {
            nom:req.body.nom,
            password:req.body.password
            //name:"Johan",
            //password:"gg"
            
        },
        {}
        ).then(result=>
            {
                console.log('find admin ekaly');
                res.json(result);
                console.log(result);
            })
    //console.log(req.body.name);
    }
exports.findUserAdminEkaly = findUserAdminEkaly; 

function listplatsalivrerbyrestoanduser(req, res,next){
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

                            let resultorderplat = mergedSubjects.map(subject =>{
                                let resultatplatother = resultatplat.find(element => element._id == subject.id_plat)
                                console.log(resultatplatother);
                                return { ...subject, ...resultatplatother }
                            })
                            // res.json(resultfinal.filter(x=>x.id_restaurant == req.body._id));
                            // res.json(resultfinal.filter(x=>x.id_restaurant == req.body._id));
                            
                            // res.json(resultfinal);
                            console.log(resultorderplat);



                            //livraison
                            db.collection('livraison').find().toArray().then(resultlivraison =>
                                {
                                    resultatlivraison = resultlivraison;
        
                                    let resultfinalorderplatlivraison = resultorderplat.map(subject =>{
                                        let resultlivraisonother = resultatlivraison.find(element => element._id == subject.id_livraison)
                                        console.log(resultlivraisonother);
                                        return { ...subject, ...resultlivraisonother }
                                    })
                                    



                                    db.collection('inscription').find().toArray().then(resultinscription =>
                                        {
                                            resultatinscription = resultinscription;
                
                                            let resultfinalorderplatlivraisoninscription = resultfinalorderplatlivraison.map(subject =>{
                                                let resultinscriptionother = resultatinscription.find(element => element._id == subject.id_client)
                                                console.log(resultinscriptionother);
                                                return { ...subject, ...resultinscriptionother }
                                            })
                                            
                                            res.json(resultfinalorderplatlivraisoninscription);
                                            // res.json(resultfinalorderplatlivraison.filter(x=>x.id_restaurant == req.body._id));
                                            //res.json(resultfinal.filter(x=>x.id_restaurant == req.body._id));
                                            
                                            // res.json(resultfinal);
                                            // console.log(resultfinal);
                
                
                
                                            
                                        }).catch(error=> console.error(error));


                                    // res.json(resultfinalorderplatlivraison);
                                    // res.json(resultfinalorderplatlivraison.filter(x=>x.id_restaurant == req.body._id));
                                    //res.json(resultfinal.filter(x=>x.id_restaurant == req.body._id));
                                    
                                    // res.json(resultfinal);
                                    // console.log(resultfinal);
        
        
        
                                    
                                }).catch(error=> console.error(error));

                            
                        }).catch(error=> console.error(error));

                    
                }).catch(error=> console.error(error));

           
        }).catch(error=> console.error(error));
}
exports.listplatsalivrerbyrestoanduser = listplatsalivrerbyrestoanduser;