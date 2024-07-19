import express from 'express';
import bcrypt from 'bcrypt';
import ejs from 'ejs';
import passport from 'passport';
import session from 'express-session';
import pg from'pg';
import bodyParser from 'body-parser';
import { Strategy } from 'passport-local';
import GoogleStrategy from 'passport-google-oauth2';
import env from 'dotenv';


env.config();
const app= express();
const port =3000;
const saltRounds =10;
const db = new pg.Client({
    user:"tajinder",
    host:"localhost",
    database:"MakeLinks",
    password:"kawal9646",
    port:5432,
})

db.connect();
app.set('view engine','ejs');




app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.use(session({
    secret : 'This can be anything for Localhost',
    resave: false,
    saveUninitialized:true
}

))

app.use(passport.initialize());
app.use(passport.session());

let user;
let userdata;
let username1;
let userisregistered = 'false';


app.get('/',(req,res)=>{
    res.render("home.ejs")
})

let feed;

app.get('/feed', async (req,res)=>{    
    if(req.isAuthenticated()){
        console.log(user);
        
    
        let result = await db.query('SELECT u.username,u.name,u.image,ud.skills,p.post_text,p.post_image,p.post_time FROM users AS u JOIN user_details AS ud ON u.id = ud.userid JOIN posts AS p  ON u.id = p.userid');
        username1 = user.username;
        console.log(username1)
        let data = await db.query('SELECT u.name,u.image,ud.designation,ud.location,ud.school,ud.gender FROM users AS u JOIN user_details AS ud ON u.id = ud.userid WHERE u.username=$1',[username1]);
        userdata = data.rows[0];
        
        
        feed = result.rows;
        // console.log(feed);
        res.render("index.ejs",{
            feed:feed,
            userdata:userdata
        })

    }else{
        res.redirect('/login');
    }

    // try {
    //     let result = await db.query('SELECT u.username,u.name,u.image,ud.designation,ud.location,ud.school,ud.gender,ud.skills,p.post_text,p.post_image,p.post_time FROM users AS u JOIN user_details AS ud ON u.id = ud.userid JOIN posts AS p  ON u.id = p.userid');
    //     username1 = user.username;
    //     let data = await db.query('SELECT u.name,u.image,ud.designation,ud.location,ud.school,ud.gender FROM users AS u JOIN user_details AS ud ON u.id = ud.userid WHERE u.username=$1',[username1]);
    //     userdata = data.rows[0];
        
    //     feed = result.rows;
    //     res.render("index.ejs",{
    //         feed:feed,
    //         userdata:userdata
    //     })
    // } catch (error) {
    //     console.log(error);
    // }


})

app.get('/SignUp',async (req,res)=>{
    res.render("register.ejs")

})
app.get('/auth/google',passport.authenticate('google',{
    scope:['profile',"email"]
}))
app.get('/auth/google/feed',passport.authenticate('google',{
    successRedirect:'/profile',
    failureRedirect:'/login'
}))

app.post('/makepost',async(req,res)=>{
    const post_text = req.body.post_text;
    let userid = user.id;
    let post_time = new Date();
    await db.query('INSERT INTO posts(userid,post_text,post_time) VALUES($1,$2,$3)',[userid,post_text,post_time]);
    res.redirect('/feed');
        
})

app.get('/login',(req,res)=>{
    res.render("login.ejs")
})

app.get('/profile',(req,res)=>{
    res.render('userdetails.ejs');
})

app.post('/SignUp',async (req,res)=>{
    const username1 = req.body.username;
    const password = req.body.password.trim();
    let username = username1;

    console.log(username,password);
    var checkUser =await db.query('SELECT * FROM users WHERE username=$1',[username]);
    checkUser = checkUser.rows;



    if(checkUser.length>0){
        res.redirect('/login');
    }else{
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        let newUser= await db.query('INSERT INTO users(username,password) VALUES($1,$2) RETURNING * ',[username,hashedPassword]);
        user = newUser.rows[0];
        req.login(user,(err)=>{
            console.log('User Logged in');
            res.redirect('/profile');
        })

    }

})


app.post('/profile',async(req,res)=>{
    console.log(user);
    const designation =req.body.Designation;
    const skills =req.body.Skills;
    const education =req.body.education;
    const address =req.body.address;
    const gender =req.body.Gender;
    const Name =req.body.Name;
    console.log(Name,designation,skills,education,address,gender)
    let result = await db.query('SELECT * from users WHERE username=$1',[user.username]);
    let  userid=result.rows[0].id;
    await db.query('INSERT INTO user_details(userid,designation,skills,location,school,gender) VALUES($1,$2,$3,$4,$5,$6)',[userid,designation,skills,address,education,gender]);
    await db.query('UPDATE users SET name = $1 WHERE id =$2',[Name,userid]);
    res.redirect('/feed');
})

app.post('/login',
            passport.authenticate('local',{
                successRedirect:'/feed',
                failureRedirect:'/'
            }),)




passport.use('local',
    new Strategy( async function verify(username,password,cb){
        try {
            const getUser = await db.query('SELECT * FROM users WHERE username=$1',[username]);

            if(getUser.rows.length>0){
                user = getUser.rows[0];
                const storedHash = user.password;
                await bcrypt.compare(password,storedHash,(err,present)=>{
                    if(err){
                        console.log('Error in comparing password',err);
                        return cb(err);
                    }else{
                        if(present){
                            return cb(null,user);
                        }else{
                            return cb(null,false);
                        }
                    }})
            }else{
                console.log('No user found');
            }
                 
        } catch (error) {
            console.log(error);
        }
    })
)


passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/feed",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
        },async (accesstoken,refreshtoken,profile,cb)=>{
            try {
                // console.log(profile);
            let result = await db.query ('SELECT * FROM users WHERE username=$1',[profile.email]);
            result  = result.rows;
            if (result.length==0){
                user = await db.query('INSERT INTO users(username,password,image) VALUES($1,$2,$3) RETURNING *',[profile.email,'google',profile.picture]);
                user = user.rows[0];
                cb (null,user)
                console.log(user);
            }else{
                userisregistered = 'true' ;
                user= result[0];
                cb(null,user);
            }

            } catch (error) {
                console.log(error);
            }
        }
    )
)

















passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });




app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

