const passport = require('passport');
const localStrategy = require("passport-local").Strategy;
const model = require('../models/login');


passport.serializeUser((user , done )=>{
    console.log("serializing user :");
    done(null,user);
});

passport.deserializeUser((user,done)=> {
   console.log("deserializeUser");
   done(null , user);
});

passport.use(new localStrategy(
    async function(username ,password , done){
       const bodydata = {username : username ,password : password};
       try{      
       let result = await model.checkLogin(bodydata);
       if(result){
        return done(null,result);
       }
       else{        
        return done(null,result);
       }
    }catch(err){
        console.error("Error in Passport Local Strategy:", err);
        return done(err); 
    }
    }
));

passport.use('register' , new localStrategy(
    async function(username , password , done){
        const bodydata = {username : username , password : password};
        try{
          let result = await model.createAccount(bodydata);
          if(result){
            return done(null , result);
          }
          else{
            return done(null,result);
          }
        }catch (err){
            console.error("Error in Passport Local Strategy register:", err);
            return done(err);
        }
    }
))

module.exports = passport;
