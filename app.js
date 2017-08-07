/*
    menendezg 19:44 6/08/2017 
    template de rest api para users
    Sigo las instrucciones de plurasight course.. how crete rest api with nodejs

    Instalamos express - 
    instalamos gulp - 
    instalamos mongo 
    instalamos mongoose


*/
var express  = require('express'),
    mongoose = require('mongoose');   // es como un orm de mongo


// sino entendi mal. mangoose se va a intentar conectar
// sino encuentra la base, te la crea de prepo

var db = mongoose.connect('mongodb://localhost/users');
var User = require('./models/userModel');

var app = express ();
var port = process.env.PORT ||3000
app.get ('/', function(req,res){
    res.send("welcome API");
})



//----ruta para users -


var usersRouter = express.Router();

usersRouter.route('/Users')
    .get(function(req,res){
        //var responseJson = {hello: "this is  my fist rest api"};
        // manda lo que tiene declarado en el objeto en json
        
        var query = {}; // en esta linea le dice que la query entera la guarda en objeto json

        if(req.query.nombre){                   // entonces pregunta si del request, dentro de la query
            query.nombre = req.query.nombre;    // nombre hay y busca donde sea igual a lo que le pedimos.
        }

        User.find(query, function(err,users){
            if(err)
                //para imprimir por consola local el error
                //console.log(err);
                
                // para imprimir algo mas prolijito.
                res.status(500).send(err);
            else
                res.json(users);
            
        });

        //res.json(responseJson);
    });

//----------------------

// en esta linea le digo que a esta direccion localhost/api/ use el objeto usersRouter declarado arriba

usersRouter.route('/Users/:userId')
        .get(function(req,res){
        //var responseJson = {hello: "this is  my fist rest api"};
        // manda lo que tiene declarado en el objeto en json
        
       

        User.findById(req.params.userId, function(err,user){
            if(err)
                //para imprimir por consola local el error
                //console.log(err);
                
                // para imprimir algo mas prolijito.
                res.status(500).send(err);
            else
                res.json(user);
            
        });

        //res.json(responseJson);
    });










app.use('/api', usersRouter);


app.listen(port, function(){
    console.log("gulp runinng on port: " + port)
})