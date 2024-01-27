import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
let date = new Date();
let month=["January","February","March","April","May","June","July","August","September","October","November","December"];
let day=[date.getDate(),month[date.getMonth()],date.getFullYear()];
let today;
let task=[];
for(let i=0;i<day.length;i++){
    today= day[0]+" "+day[1]+" "+day[2];
  }
let data={
    today,
    task

}
app.get("/", (req, res) => {
  res.render("index.ejs", data);
});

app.post("/add-task",(req,res)=>{  
    task.push(req.body["newTask"]);
    res.render("index.ejs",data);
    
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}   );