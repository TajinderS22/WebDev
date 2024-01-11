for (var i =0 ; i<(document.querySelectorAll(".drum").length);i++){
    document.querySelectorAll(".drum")[i].addEventListener("click",function(){

        var InnerHtmlOfButton=this.innerHTML;
        awaz(InnerHtmlOfButton);
        buttonAnimation(InnerHtmlOfButton);
       
        
    });
}


addEventListener("keydown",(event)=>{
    awaz(event.key);
    buttonAnimation(event.key);

});




function awaz(key){
    
    switch (key) {
        case "w" :
                var crash =new Audio("./sounds/crash.mp3");
                crash.play();   
            break;
            case "a" :
                var kick =new Audio("./sounds/kick-bass.mp3");
                kick.play();   
            break;
            case "s" :
                var snare =new Audio("./sounds/snare.mp3");
                snare.play();   
            break;
            case "d" :
                var tom1 =new Audio("./sounds/tom-1.mp3");
                tom1.play();   
            break;
            case "j" :
                var crash =new Audio("./sounds/tom-2.mp3");
                crash.play();   
            break;
            case "k" :
                var crash =new Audio("./sounds/tom-3.mp3");
                crash.play();   
            break;
            case "l" :
                var crash =new Audio("./sounds/tom-4.mp3");
                crash.play();   
            break;
            
        default:
            console.log(key);
            
    }

}


function buttonAnimation(currentkey){
    let activeButton=document.querySelector("."+currentkey);
    activeButton.classList.add("pressed");
    setTimeout(()=>activeButton.classList.remove("pressed"), 100);

}