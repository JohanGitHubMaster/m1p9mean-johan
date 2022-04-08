var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const res = require('express/lib/response');
var MongoDb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var connectionString = 'mongodb+srv://johan:johan@cluster0.yv7eh.mongodb.net/test?retryWrites=true&w=majority';
// app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
// app.use(bodyParser.json());
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
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

MongoClient.connect(connectionString,{useUnifiedTopology: true}).then(client => {
    console.log('Connected to Database');
    db = client.db('star-wars-quotes');
    // var quotesCollection = db.collection('quotes');
    });

app.get('/',(req,res)=>
{
//  res.send('Hello world');
//  res.sendFile(__dirname+'/index.html');
 db.collection('quotes').find().toArray().then(results =>
    {
        res.render('index.ejs',{quotes : results});
        console.log(results);
    }).catch(error=> console.error(error));
    
});

app.use('/listquotes',cors(corsOptions),(req,res)=>
{
    db.collection('quotes').find().toArray().then(results =>
        {
            res.json(results);
            console.log(results);
        }).catch(error=> console.error(error));
})

app.post('/quotes', (req, res) => {
        db.collection('quotes').insertOne(req.body).then(result=>
            {
                res.redirect('/');
                console.log(result);
            }).catch(error=>{console.log(error)});
        // console.log('insertion fait');
        // console.log(req.body);
    });


    app.post('/quotesinsertangular', (req, res,next) => {
        // const doc = {
        //     name: req.body.quotes.name,
        //     quote: req.body.quotes.quote,
        //   }
        db.collection('quotes').insertOne(req.body).then(result=>
            {
                console.log('insertion fait');
                res.json(result);
                // res.redirect("http://localhost:4200/");
            }).catch(error=>{console.log(error)});       
        console.log(req.body);
    });

app.put('/quotes', (req, res) => {
    
    db.collection('quotes').findOneAndUpdate(
        {name: req.body.name},
        {
            $set:
            {
                name: req.body.namenode,
                quote: req.body.quote
            }
        },
        {
            upsert: true
        }
        
    ).then(result=>{  res.redirect('/'); console.log(req.body.name);})
    .catch(error=> console.error(error))
});

app.delete('/quotes',(req,res)=>
{
    console.log(req.body.name);
    db.collection('quotes').deleteOne(
        {name: req.body.name}
        
    )
    .then(result=>{
    if(result.deletedCount ===0){
        //return res.json('No quote to delete');
        
        console.log("No quote to delete");
    }
    else
    {
        console.log("deleted quote");
    }
    res.redirect('/');
})
    .catch(error=> console.error(error))
});

app.delete('/deletequotes/:id',(req, res, next) => {
    
    console.log(req.params.id);
    db.collection('quotes').deleteOne(
        { _id: MongoDb.ObjectId(req.params.id)}
        
    )
    .then(result=>{
    if(result.deletedCount ===0){
        //return res.json('No quote to delete');
        
        console.log("No quote to delete");
    }
    else
    {
        console.log("deleted quote");
    }
    res.json(result);
})
    .catch(error=> console.error(error))
})


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

app.post('/insertorder',order.insertionorder);

app.get('/findorderUser',order.findOrderUser);

//api restaurant
app.post('/insertadminresto',restoadmin.inscriptionadminresto);

app.post('/findUserAdminResto',restoadmin.findUserAdminResto);

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
    // console.log(multipartMiddleware.uploadDir);
    
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
        //   user: "rakotovaojohan516@gmail.com",
          user: req.body.useremail,
          pass: req.body.password,

        //   pass: "toujourplushaut",

         
        }
      });
    var mailOptions = {
        from: req.body.nomekaly,
        // from: "Admintest",
        // to: "rakotovaokaren5@gmail.com",
        to: req.body.emailtosend,
        subject: 'Mis a jour du prix de Livraison',
        text: 'Merci pour l\'attente monsieur '+req.body.nameclient+' le prix de votre livraison est a ete mis a jour de '+req.body.prix+' ariary'
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

  
  



// app.get('/sendmail',function(req,res)
// {
   
    
// })

app.post('/insertadminEkaly',cors(corsOptions),Ekaly.inscriptionadminEkaly);

app.post('/findadminekaly',cors(corsOptions),Ekaly.findUserAdminEkaly);

// app.get('/listplatlivraisontest',cors(corsOptions),Ekaly.listplatsalivrerbyrestoanduser)

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

app.listen(process.env.PORT || 3000,function loadserver()
{
    console.log('listening on 3000');
});



