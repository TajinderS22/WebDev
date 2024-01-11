const fs = require("fs");
// fs.writeFile("Message.txt","Hi Tajinder SIngh This is Node Js!",(err)=>{
//     if (err) throw err;
//     console.log("The file has been saved!");
// });

fs.readFile("/media/kali/FBA9-8BB7/Tajinder shared/skillex/CODING/WebDev/AngelaYu WebDev/Backend/native module/Message.txt","utf8",(err,data)=>{
    if (err) throw err;
    console.log(data);
});


