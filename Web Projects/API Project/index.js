import express, { request } from 'express';
import axios from 'axios';


const app =express();

const port=3000;

app.get('/',(req,res)=>{
    let response = null;
    console.log(req);

new Promise(async (resolve, reject) => {
  try {
    response = await axios.get('', {
      headers: {
        'X-CMC_PRO_API_KEY': '9bbd70c5-cbf6-4f12-88d9-ef869caa1605',
      },
      
    });
  } catch(ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    const json = response.data;
    console.log(json);
    resolve(json);
  }
});
})
console.log(request);
app.listen(port,()=>{
    console.log(`server is running on port ${port}.`)
})