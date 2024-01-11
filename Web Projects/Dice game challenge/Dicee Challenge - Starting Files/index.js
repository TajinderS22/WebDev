var num = (Math.floor(Math.random()*6))+1;

document.querySelector(".img1").setAttribute( "src","./images/dice"+num+".png");

var num1 = (Math.floor(Math.random()*6))+1;


document.querySelector(".img2").setAttribute( "src","./images/dice"+num1+".png");

if (num1>num){
    document.querySelector("h1").innerHTML ="Player 2 wins";
}
else if(num>num1){
    document.querySelector("h1").innerHTML ="Player 1 wins";
}
else {
    document.querySelector("h1").innerHTML ="Draw";
}