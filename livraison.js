var MongoClient = require('mongodb').MongoClient;
var MongoDb = require('mongodb');
var connectionString = 'mongodb+srv://johan:johan@cluster0.yv7eh.mongodb.net/test?retryWrites=true&w=majority';
var db = {};

MongoClient.connect(connectionString,{useUnifiedTopology: true}).then(client => {
    console.log('Connected to Database');
    db = client.db('Ekaly');
    });

    function insertionlivraison(req, res,next){
        db.collection('livraison').insertOne(req.body).then(result=>
            {
                console.log('insertion fait');
                res.json(result);
            }).catch(error=>{console.log(error)});       
        console.log(req.body);
    }   
    exports.insertionlivraison = insertionlivraison;


function listlivraison(req, res,next){
        db.collection('livraison').find().toArray().then(results =>
            {
                res.json(results);
                console.log(results);
            }).catch(error=> console.error(error));
    }
    exports.listlivraison = listlivraison;   
    

    function listplatsbyorderclientlivraison(req, res,next){
        var resultplat = [];
        var resultorder = [];
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
                        // res.json(mergedSubjects);
    
                        db.collection('livraison').find().toArray().then(resultplat =>
                            {
                                resultatplat = resultplat;
    
                                let resultfinal = mergedSubjects.map(subject =>{
                                    let resultatplatother = resultatplat.find(element => element._id == subject.id_livraison)
                                    console.log(resultatplatother);
                                    return { ...subject, ...resultatplatother }
                                })
                                // res.json(resultfinal.filter(x=>x.id_client == req.body._id));
                                res.json(resultfinal);                                
                                // res.json(resultfinal.filter(x=>x.id_livraison == req.body._id));
                                console.log(resultfinal);
                            }).catch(error=> console.error(error));
    
                        
                    }).catch(error=> console.error(error));
    
               
            }).catch(error=> console.error(error));
    }
    exports.listplatsbyorderclientlivraison = listplatsbyorderclientlivraison;


    function listplatsbyorderrestaurantlivraison(req, res,next){
        var resultplat = [];
        var resultorder = [];
        db.collection('order').find().toArray().then(results =>
            {
                console.log(results);
                resultinscription = results;
                db.collection('restaurant').find().toArray().then(resultorders =>
                    {
                        resultorder = resultorders;
                        console.log(typeof(resultorder))
                        let mergedSubjects = resultinscription.map(subject => {
                            let otherSubject = resultorder.find(element => element._id == subject.id_restaurant)
                            console.log(otherSubject);
                            return { ...subject, ...otherSubject }
                           
                        })
                        // res.json(mergedSubjects);
    
                        db.collection('livraison').find().toArray().then(resultplat =>
                            {
                                resultatplat = resultplat;
    
                                let resultfinal = mergedSubjects.map(subject =>{
                                    let resultatplatother = resultatplat.find(element => element._id == subject.id_livraison)
                                    console.log(resultatplatother);
                                    return { ...subject, ...resultatplatother }
                                })
                                // res.json(resultfinal.filter(x=>x.id_client == req.body._id));
                                res.json(resultfinal);                                
                                // res.json(resultfinal.filter(x=>x.id_livraison == req.body._id));
                                console.log(resultfinal);
                            }).catch(error=> console.error(error));
    
                        
                    }).catch(error=> console.error(error));
    
               
            }).catch(error=> console.error(error));
    }
    exports.listplatsbyorderrestaurantlivraison = listplatsbyorderrestaurantlivraison;


    function listbyorderclientlivraison(req, res,next){      
        var resultorder = [];
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
                        // res.json(mergedSubjects);
    
                        db.collection('livraison').find().toArray().then(resultplat =>
                            {
                                resultatplat = resultplat;
    
                                let resultfinal = mergedSubjects.map(subject =>{
                                    let resultatplatother = resultatplat.find(element => element._id == subject.id_livraison)
                                    console.log(resultatplatother);
                                    return { ...subject, ...resultatplatother }
                                })
                                // res.json(resultfinal.filter(x=>x.id_client == req.body._id));
                                res.json(resultfinal.filter(x=>x.id_client == req.body._id));                                
                                // res.json(resultfinal.filter(x=>x.id_livraison == req.body._id));
                                console.log(resultfinal);
                            }).catch(error=> console.error(error));
    
                        
                    }).catch(error=> console.error(error));
    
               
            }).catch(error=> console.error(error));
    }
    exports.listbyorderclientlivraison = listbyorderclientlivraison;


    function searchlistplatsbyorderclientlivraison(req, res,next){
        var resultorder = [];
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
                        db.collection('livraison').find().toArray().then(resultplat =>
                            {
                                resultatplat = resultplat;
                                let resultfinal = mergedSubjects.map(subject =>{
                                    let resultatplatother = resultatplat.find(element => element._id == subject.id_livraison)
                                    console.log(resultatplatother);
                                    return { ...subject, ...resultatplatother }
                                })
                                if(req.body.date_de_commande!='')
                                res.json(resultfinal.filter(y=>new Date(y.date_de_commande).getTime() <= new Date(req.body.date_de_commande).getTime()));  
                                else 
                                res.json(resultfinal)

                                console.log(resultfinal);
                            }).catch(error=> console.error(error));
    
                        
                    }).catch(error=> console.error(error));
    
               
            }).catch(error=> console.error(error));
    }
    exports.searchlistplatsbyorderclientlivraison = searchlistplatsbyorderclientlivraison;


    function searchlistplatsbyorderrestaurantlivraison(req, res,next){
        var resultorder = [];
        db.collection('order').find().toArray().then(results =>
            {
                console.log(results);
                resultinscription = results;
                db.collection('restaurant').find().toArray().then(resultorders =>
                    {
                        resultorder = resultorders;
                        console.log(typeof(resultorder))
                        let mergedSubjects = resultinscription.map(subject => {
                            let otherSubject = resultorder.find(element => element._id == subject.id_restaurant)
                            console.log(otherSubject);
                            return { ...subject, ...otherSubject }
                           
                        })
    
                        db.collection('livraison').find().toArray().then(resultplat =>
                            {
                                resultatplat = resultplat;
    
                                let resultfinal = mergedSubjects.map(subject =>{
                                    let resultatplatother = resultatplat.find(element => element._id == subject.id_livraison)
                                    console.log(resultatplatother);
                                    return { ...subject, ...resultatplatother }
                                })
                                // res.json(resultfinal.filter(x=>x.id_client == req.body._id));
                                res.json(resultfinal.filter(y=>new Date(y.date_de_commande).getTime() <= new Date(req.body.date_de_commande).getTime()));                                
                                // res.json(resultfinal.filter(x=>x.id_livraison == req.body._id));
                                console.log(resultfinal);
                            }).catch(error=> console.error(error));
    
                        
                    }).catch(error=> console.error(error));
    
               
            }).catch(error=> console.error(error));
    }
    exports.searchlistplatsbyorderrestaurantlivraison = searchlistplatsbyorderrestaurantlivraison;