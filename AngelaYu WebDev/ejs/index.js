import express from "express";


const app=express();
const port =3000;

const d = new Date();
let day = d.getDay();

app.get("/",(req,res)=>{
    if (day==0||day==6){
        res.render("index.ejs",{daytype:"weekend",advice:"You must Enjoy" });
    }
    else{
       
     res.render("index.ejs",{daytype:"weekday",advice:"You must Work" });
    } 
})

app.listen(port,()=>{
    console.log(`Server is Running on port ${port}`);
})