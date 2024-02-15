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



let data={
    blogName:"Myfirst Blog",
    blogContent:" This my first test blog for my blogpostd website. I am just writing to see how mycontent will look on my blogpost website which I made using node js express js HTML CSS bootsrtap ,I really dont know what i am writing . ",
    blogTitle: "My first Blog",
}