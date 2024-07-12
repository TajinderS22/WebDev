import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 3000;

const db =new pg.Client({
  user: "tajinder",
  host:"localhost",
  database: "security",
  password: "kawal9646",
  port :5432
});
db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password =req.body.password;

  try{
    const checkuser= await db.query("SELECT * FROM users WHERE email = $1",[email]);
    if(checkuser.rows.length>0){
      setTimeout(()=>{

       res.redirect("/login");
       },2000)
    }
    
    else{
      if (password.length>6){
      const adduser = await db.query("INSERT INTO users (email,password) VALUES ($1,$2)",[email,password]);
      console.log(adduser.rows);
      res.render("secrets.ejs");
      }else{
        res.send("Password must be greater than 6 characters");
      }
    }

  }catch(err){
    console.log(err);
}});

app.post("/login", async (req, res) => {
  const email =req.body.username;
  const password =req.body.password;
  
  try{
    const checkuser = await db.query("SELECT * FROM users WHERE email =$1",[email]);
    if(checkuser.rows.length>0){
      if (checkuser.rows[0].password === password){
        res.render("secrets.ejs");
      }else{
        res.send("incorrect Password");
      }
    }else{
      res.send("User is Not Registered Please Register First");
    }
  }catch(err){
    console.log(err);
  }


});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
