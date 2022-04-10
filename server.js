var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const res = require('express/lib/response');
var MongoDb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var connectionString = 'mongodb+srv://johan:johan@cluster0.yv7eh.mongodb.net/test?retryWrites=true&w=majority';
app.use(express.static('public'));
app.set('view engine','ejs');
var db = {};
var cors = require('cors');
var inscription = require('./inscription');
var plats = require('./plats');
var order = require('./order');
var restoadmin = require('./restaurant');
var livraison = require('./livraison');
var nodemailer = require('nodemailer');
var Ekaly = require('./Ekaly');
var livreur = require('./livreur');
app.use(bodyParser.urlencoded(
    {
        extended: true,
        limit: '50mb',
    }));

    app.use(bodyParser.json({limit: "50mb"}));
    app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

const multipart = require('connect-multiparty');

app.use(cors());
var corsOptions = {
    origin: ["http://localhost:4200","https://angularappekaly.herokuapp.com"],
    optionsSuccessStatus: 200
  }

MongoClient.connect(connectionString,{useUnifiedTopology: true}).then(client => {
    console.log('Connected to Database');
    // db = client.db('star-wars-quotes');
    });

// app.get('/',(req,res)=>
// {
//  db.collection('quotes').find().toArray().then(results =>
//     {
//         res.render('index.ejs',{quotes : results});
//         console.log(results);
//     }).catch(error=> console.error(error));
    
// });

// app.use('/listquotes',cors(corsOptions),(req,res)=>
// {
//     db.collection('quotes').find().toArray().then(results =>
//         {
//             res.json(results);
//             console.log(results);
//         }).catch(error=> console.error(error));
// })

// app.post('/quotes', (req, res) => {
//         db.collection('quotes').insertOne(req.body).then(result=>
//             {
//                 res.redirect('/');
//                 console.log(result);
//             }).catch(error=>{console.log(error)});
//     });


//     app.post('/quotesinsertangular', (req, res,next) => {
//         db.collection('quotes').insertOne(req.body).then(result=>
//             {
//                 console.log('insertion fait');
//                 res.json(result);
//             }).catch(error=>{console.log(error)});       
//         console.log(req.body);
//     });

// app.put('/quotes', (req, res) => {
    
//     db.collection('quotes').findOneAndUpdate(
//         {name: req.body.name},
//         {
//             $set:
//             {
//                 name: req.body.namenode,
//                 quote: req.body.quote
//             }
//         },
//         {
//             upsert: true
//         }
        
//     ).then(result=>{  res.redirect('/'); console.log(req.body.name);})
//     .catch(error=> console.error(error))
// });

// app.delete('/quotes',(req,res)=>
// {
//     console.log(req.body.name);
//     db.collection('quotes').deleteOne(
//         {name: req.body.name}
        
//     )
//     .then(result=>{
//     if(result.deletedCount ===0){
//         //return res.json('No quote to delete');
        
//         console.log("No quote to delete");
//     }
//     else
//     {
//         console.log("deleted quote");
//     }
//     res.redirect('/');
// })
//     .catch(error=> console.error(error))
// });

// app.delete('/deletequotes/:id',(req, res, next) => {
    
//     console.log(req.params.id);
//     db.collection('quotes').deleteOne(
//         { _id: MongoDb.ObjectId(req.params.id)}
        
//     )
//     .then(result=>{
//     if(result.deletedCount ===0){      
//         console.log("No quote to delete");
//     }
//     else
//     {
//         console.log("deleted quote");
//     }
//     res.json(result);
// })
//     .catch(error=> console.error(error))
// })


//inscriptionclient
app.post('/inscriptionclient',inscription.inscriptionclient);

//listclient
app.get('/listclient',cors(corsOptions),inscription.listclient);

//insertionplat
app.post('/insertionplats',plats.insertionplat);

//liste des plats
app.get('/listplats',cors(corsOptions),plats.listplats);

//api finduser to connect
app.post('/finduser',cors(corsOptions),inscription.findUser);

app.post('/insertorder',cors(corsOptions),order.insertionorder);

app.get('/findorderUser',cors(corsOptions),order.findOrderUser);

//api restaurant
app.post('/insertadminresto',cors(corsOptions),restoadmin.inscriptionadminresto);

app.post('/findUserAdminResto',cors(corsOptions),restoadmin.findUserAdminResto);

app.post('/platsbyresto',cors(corsOptions),plats.listplatsbyresto);

app.post('/updateplat',cors(corsOptions),plats.updateplat);

app.post('/deleteplat',cors(corsOptions),plats.deleteplat);

app.post('/searchplat',plats.searchplat);

app.post('/orderplatandclient',cors(corsOptions),plats.listplatsbyorder);

//test get client order
app.get('/testorderplatandclient',cors(corsOptions),plats.listplatsbyorder);

app.post('/listplatsbyorderrestaurant',cors(corsOptions),plats.listplatsbyorderrestaurant);

//test get
app.get('/listplatsbyorderrestauranttest',cors(corsOptions),plats.listplatsbyorderrestaurant);

app.post('/searchplatglobal',cors(corsOptions),plats.searchplatglobal);

app.post('/convertimage',cors(corsOptions),plats.convertimage);

app.post('/livraison',cors(corsOptions),livraison.insertionlivraison)

const multipartMiddleware = multipart({
    uploadDir: './uploads'
});

app.post('/api/upload', multipartMiddleware, (req, res) => {
    
    let file = req['files'].thumbnail;
    console.log(file.path.split('\\').slice(-1).pop());
    var finalresult = file.path.split('/').slice(-1).pop();
    res.json(finalresult);

})

app.use(express.static('public')); 
app.use('/imagesupload', express.static('uploads'));







  app.post('/sendmail',cors(corsOptions),function(req,res)
  {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {          
          user: req.body.useremail,
          pass: req.body.password,         
        }
      });
    var mailOptions = {
        from: req.body.nomekaly,
        to: req.body.emailtosend,
        subject: 'Mis a jour de votre prix de Livraison',
        text: 'Merci pour l\'attente monsieur(madame) '+req.body.nameclient+' le prix de votre livraison à ete mis à jour de '+req.body.prix+' ariary\n Cordialement L\'administrateur d\'Ekaly'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            res.json("email effectuer");
          console.log('Email sent: ' + info.response);
        }
      });
  })


app.post('/insertadminEkaly',cors(corsOptions),Ekaly.inscriptionadminEkaly);

app.post('/findadminekaly',cors(corsOptions),Ekaly.findUserAdminEkaly);


app.post('/listplatlivraison',cors(corsOptions),Ekaly.listplatsalivrerbyrestoanduser);

app.get('/listlivraison',cors(corsOptions),livraison.listlivraison);

app.post('/updateprixlivraison',cors(corsOptions),Ekaly.updateprixlivraison);

app.post('/findpricelivraison',cors(corsOptions),order.findpricelivraison);

app.get('/getlivraisonuser',cors(corsOptions),livraison.listplatsbyorderclientlivraison);

app.get('/getlivraisonrestaurant',cors(corsOptions),livraison.listplatsbyorderrestaurantlivraison);

app.post('/listbyorderclientlivraison',cors(corsOptions),livraison.listbyorderclientlivraison);

app.post('/searchlistplatsbyorderclientlivraison',cors(corsOptions),livraison.searchlistplatsbyorderclientlivraison);

app.post('/searchlivraisonresto',cors(corsOptions),livraison.searchlistplatsbyorderrestaurantlivraison);

app.post('/insertlivreur',cors(corsOptions),livreur.inscriptionlivreur);

app.post('/findlivreur',cors(corsOptions),livreur.findlivreur);

app.get('/listlivreur',cors(corsOptions),livreur.listlivreur)

app.post('/updatelivreur',order.updateallorder);

app.post('/deliveredplat',cors(corsOptions),Ekaly.listplattodelivered);

app.post('/livredlivraison',cors(corsOptions),order.updateorderlivredlivraison);

app.post('/updatequantityplat',cors(corsOptions),plats.updatequantityplat);

app.listen(process.env.PORT || 3000,function loadserver()
{
    console.log('listening on 3000');
});



