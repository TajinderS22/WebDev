import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user:"tajinder",
  database:"world",
  password:"kawal9646",
  host:"localhost",
  port:5432

});
db.connect();
let country_code=[];
let error;

// async function checkCountry( input ){
//   let cc= await db.query("SELECT country_name FROM countries");
//   cc=cc.rows;
//   for(let i=0; i<cc.length;i++){
//     if(input == cc[i]){
//       return;
//     }else{
//       error="Country doesnot exist."
//     }
//   }
// }

// async function checkVisited(input){
//   let cc= await db.query("SELECT *  FROM countries");
//   cc=cc.rows;
//   let code;
//   for(let i=0;i<cc.length;i++){
//     if(input == cc.country_name){
//       code=cc.country_code;
//     }
//   }
//   let vs= await db.query("SELECT country_code FROM visited_countries");
//   vs=vs.rows;
//   for(let i=0;i<vs.length;i++){
//     if(code == vs[i]){
//       error="Country already Visited.";
//     }
//   }
// }


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  let result = await db.query("SELECT country_code FROM visited_countries");
  result=result.rows;
  let countries = [];
  result.forEach((country)=>{
    countries.push(country.country_code)
  });
  res.render('index.ejs',{
    countries,
    total : countries.length,
    error
  })
});

app.post('/add',async(req,res)=>{
  let input = req.body.country;
  // checkCountry(input);
  let code = (await db.query("SELECT country_code FROM countries WHERE country_name = $1",[input])).rows[0].country_code;
  console.log(code);


  await db.query("INSERT INTO visited_countries(country_code) VALUES($1)",[code]);

  res.redirect('/');


  
  

})




app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
