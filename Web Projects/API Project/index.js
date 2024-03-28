import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import ejs from 'ejs';


const port =3000;
const app=express();
app.use(express.static('public'));


let BTC,ETH,SOL;

app.set('view engine','ejs');






app.get('/',async (req,res)=>{
  try {

    let response =await axios.get('https://api-pub.bitfinex.com/v2/tickers?symbols=ALL',{
      headers:{accept:'application/json'}
    })
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

    res.render('index.ejs',{
      BTCUSDT,
      ETHUSDT, 
      SOLUSDT
    })

      // let weather = await axios.get('https://api.weatherapi.com/v1/forecast.json?key=e136f9519de64f9d98d182911242703&q=amritsar&days=3&aqi=no&alerts=no');
      // console.log(weather.data);
      // let W=weatherResponse.data;
      // console.log(W)
      
      // let WeatherIcon=W.current.condition.icon;
      // let wTxt=W.current.condition.text;
      // let temp=W.current.temp_c;
      // let tomIcon=W.forcast.forcastday[1].condition.icon;
      // let tomTxt=W.forcast.forcastday[1].condition.text;
      // console.log(WeatherIcon);
    } catch (error) {
      console.log(error);
    }



})


app.listen(port,()=>{
  console.log(`server is running on port ${port}.`);
})