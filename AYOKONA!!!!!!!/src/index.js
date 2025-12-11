const express=require('express');
const session=require('express-session');
const app=express();
const path=require('path');
const hbs=require('hbs');
const collection=require('./mongodb');

const templatePath=path.join(__dirname,'../templates');

app.use(express.json());
app.set("view engine","hbs");
app.set("views",templatePath);
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret:'mysecret',
    resave:false,
    saveUninitialized:true,
    cookie: {secure: false }
}));

app.get("/",(req,res)=>{
    res.render("login")
});

app.get("/signup",(req,res)=>{
    res.render("signup")
});

app.get('/login', (req, res) => {
  res.render('login'); // renders login.hbs
});

app.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        console.log(err);
        res.status(500).send("Error logging out");
      } else {
        res.redirect('/login');
      }
    });
  } else {
    res.redirect('/login');
  }
});

app.get("/table",(req,res)=>{
    res.render("table");
});

app.get("/home",(req,res)=>{
    res.render("home");
});

app.get("/day",(req,res)=>{
    res.render("day");
});

app.post("/signup", async(req,res)=>{
    const data={
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    }
    await collection.insertMany([data]);

    res.render("home");


});

app.post("/login", async(req,res)=>{
    
    try{
        const check=await collection.findOne({username:req.body.username});
        if(check.password===req.body.password){
            res.render("home");
        }
        else{
            res.send("Password incorrect");
        }
    }


    catch{
        res.send("Wrong Details");
    }
});


app.listen(3000,()=>{
    console.log('Port connected');
});