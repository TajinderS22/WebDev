import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import ejs from "ejs";
import pg from "pg";


const app =express();
app.use(express.static("public"))
const port =3000;
const db=new pg.Client({
    user:"tajinder",
    host:"localhost",
    database:"miniProject",
    password:"kawal9646",
    port:5432
});

app.use(bodyParser.urlencoded({extended:true}));
db.connect();


app.set('view engine','ejs');



app.get("/",async (req,res)=>{
    try {
        
        // let result = await axios.get("https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest&CMC_PRO_API_KEY=826f468b-676a-4ace-8571-0c5bbfb96e19")

        // console.log(result)
        res.render("index",{data:[]})   

    } catch (error) {
        
    }
})

app.get("/app",async (req,res)=>{
    let response = await axios.get('https://api-pub.bitfinex.com/v2/tickers?symbols=ALL',
    {
      headers:{accept:'application/json'}
    
    }
)
    
    let result=response.data;
    let BTCUSDT , ETHUSDT , SOLUSDT;
    for(let i=0;i<result.length;i++){
      if (result[i][0]=='tBTCUSD'){
        BTCUSDT=result[i][7];
      }
      else if (result[i][0]=='tETHUSD')
      {
        ETHUSDT=result[i][7];
      }
      else if (result[i][0]=='tSOLUSD')
      {
        SOLUSDT=result[i][7];
      }
    }
    console.log(BTCUSDT);

    res.render("app.ejs",{
      BTCUSDT,
      ETHUSDT, 
      SOLUSDT
    })

})


app.get("/register",async(req,res)=>{
    res.render("register")
})
app.get("/login",async(req,res)=>{
    res.render("login")
})

app.post("/register",(req,res)=>{
    let email =req.body.email;
    let password =req.body.password;
    console.log(email);
    console.log(password);
    res.redirect("/app")
  
})

app.post("/login",async (req,res)=>{
    let email =req.body.email;
    let password =req.body.password;
    console.log(email);
    console.log(password);
    let result =await db.query("SELECT * FROM users WHERE email=$1",[email]);
    console.log(result)
    let users=result.rows;
    console.log(users)
    try {
        if (users.email==email && users.password==password);
        res.redirect("/app")
        
    } catch (error) {
        
    }

   
})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})