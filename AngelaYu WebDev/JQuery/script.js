
    $("h1").addClass("big-title");
    $("h1").text("This is JQuery");
    $("button").text("Don't Click Me");

    // $("button").click(function(){
    //     $("h1").css("color","red");
    // })
    $("input").keypress(function(event){
        $("h1").text(event.key);
    });

    $("h1").on("mouseover",function(){
        setTimeout(function(){
            $("h1").css("color","green");
        },100);
    });

    $("h1").after("<button>New</button>");

        ///pend adds element after in the tag    ///prepend adds element before in the tag

    // $("button").click(function(){
    //     $("h1").animate({opacity:0.3});
    // });


    /// chaining in Jquery
    $("button").click(function(){
        $("h1").slideUp().slideDown().animate({opacity:0.3});
    });