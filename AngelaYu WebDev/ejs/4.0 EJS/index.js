import express from "express" ;
import { dirname } from "path";
import { fileURLToPath } from "url";

const Dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

const date = new Date();
let day =date.getDay();


app.get("/",(req,res)=>{
    // res.sendFile(Dirname + "/views/index.ejs");
    
    if (day === 0 || day === 6){
        res.render("index.ejs",{
        daytype:"Its weekend today ",
        advice:"Just chill"
    });
    }   
    else {
        res.render("index.ejs",{
            daytype:"Its weekday today ",
            advice:"Must work hard"
        });
        
    }    


});

app.listen(port ,()=>{
    console.log(`Server started on port ${port}`);  
});
