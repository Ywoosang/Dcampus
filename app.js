const express = require('express');
const path = require('path'); 
const morgan = require('morgan') 
const nunjucks = require('nunjucks');
const app = express();


app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});


app.set('port',process.env.PORT || 8080);
app.use(morgan('dev')); 
app.use(express.static(path.join(__dirname,'/public ')))

app.get('/',(req,res)=>{
    res.render('index')
}); 



app.listen(app.get('port'),()=>{
    console.log('express start');
}); 


