const calculateSum= (a,b,fun)=>{
    return fun(a,b);
}

const result= calculateSum( 3, 4, function(num1,num2){
    return num1+num2
})
console.log(result);