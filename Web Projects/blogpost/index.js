import express from 'express';
import bodyparser from 'body-parser';



const app =express();
const port = 3000;




app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs",data);

});




app.listen(port,()=>{
    console.log(`app is running on port ${port}.`)
});

let data ={
    blogtitle:blogtitle,
    blogcontent:blogcontent

}
let blogtitle =["my first blog to my site ","2nd blog to my site"]