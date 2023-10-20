var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
//Iniciando a aplicação
var app = express();
//carregando as views
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': false}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req,res)=>{
    res.render('index.pug');
});
app.get('/sobre', (req,res)=>{
    res.render('about.pug');
});
app.get('/contato', (req,res)=>{
    res.render('contact.pug');
});
//Formulario com Node
app.post('/contato/enviar', (req,res)=>{
    var transport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'stravatione.oliveira@gmail.com',
            pass: ''
        }
    });
    //construção do email
    var mailoptions = {
        from:'JPTeste<stravatione.oliveira@gmail.com>',
        to:req.body.email,
        subject:'Express Website',
        text:'You have a submission with the following details... Nome: '+req.body.nome+'Email: '+req.body.email+'Mensagem: '+req.body.mensagem,
    };
    transport.sendMail(mailoptions, (error,info) =>{
        if(error){
            console.log(error);
            res.redirect('/');
        } else {
            console.log('Mensagem enviada'+info.response);
            console.log(mailoptions);
            res.redirect('/');
        }
    })
});

//req.body é o $_POST[] do node.js

//req.body.nome é igual ao $_POST['nome'] = $nome
//req.body.email é igual a $_POST['email'] = $email
//req.body.mensagem é igual $_POST['mensagem'] = $mensagem

app.listen(8000);