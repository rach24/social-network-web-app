
var User=require('../model/users');


// Display Home page on GET- sign in
exports.sign_in = function(req, res) {
    console.log(req.session);
    /* from https://github.com/ctavan/express-validator 
       installation npm install express-validator
       to validate user input and sanitize against XSS */
    // req.sanitize('email').escape();
    // req.sanitize('email').trim();
    // req.sanitize('password').escape();
    // req.sanitize('first_name').escape();
    // req.sanitize('last_name').escape();
    // req.sanitize('dob').escape();
    

    //Run the express validators
    //var errors = req.validationErrors();
    
        // if (errors) {
        //     res.send({ msg: 'Input Error.'});
        //     console.log(errors)
        // return;
        // } 
        // else
        // {
            User.findOne({ 'email': req.body.email })
            .exec( function(err, found_user) {
                console.log('found_user: ' + found_user);
                if (err) { return err; }
                
                if (found_user) { 
                    //User exists, check password
                    if(found_user.password==req.body.password)
                        {
                            
                            /** referred from: https://www.npmjs.com/package/express-session
                            *  to authenticate user by creating sessions and holding session info in cookies
                            */
                            req.session.email = req.body.email;
                            req.session.userid=found_user.id;
                            console.log(req.session);
                            console.log(req.cookies);
                            res.send({msg:' ',user: found_user});
                        }
                        else
                        {
                            res.send({msg:'password incorrect. Please go back to get back to sign in page'});
                            console.log("password incorrect");
                        }
                }
                else
                {
                    res.send({msg:'Email doesnt exist.'});
                    console.log(" email not registered. ");
                }
        });
    }


// Handle user registration on POST
exports.sign_up = function(req, res) {
   
  /* from https://github.com/ctavan/express-validator 
       installation npm install express-validator
       to validate user input and sanitize against XSS */
       console.log("in here/n/n");
       
       var date= new Date();
       // create new user object with sanitized input
       var user = new User(
           { first_name: req.body.first_name, 
             last_name: req.body.last_name, 
             dob: req.body.dob,
             email: req.body.email,
             password: req.body.password,
             address: "",
             status: "",
             phone_no: "",
             university: "",
             date_activated:date.getDate()
           });
           
        
           console.log("passes!!\n\nUser:\n"+user);
           // Data from form is valid.
           //Check if Genre with same name already exists
           User.findOne({ 'email': req.body.email })
           .exec( function(err, found_user) {
               console.log('found_user: ' + found_user);
               if (err) { return err; }
               
               if (found_user) { 
                   //User exists, error page
                   res.send({ msg: 'Email already exists.'});
                   //console.log("same email not allowed.");
               }
               else {
                   console.log("in create");
                   User.create(user,function (err,user) {
                     if(err){console.log(err);
                       res.send({msg: 'Something went wrong'});}
                       else
                       res.send({ msg: '' });
                     }
                   );
                   
               
             
             // }
           
         }
       });
  };


//landing page
 exports.index = function(req, res,err) {
        console.log("in here");
        res.render('registration', { title: 'FriendsNearMe'});
 };

 //log out and session destroy
 exports.logout=function(req,res){
    /** referred from: https://www.npmjs.com/package/express-session
 *  to authenticate user by creating sessions and holding session info in cookies
 *  destroying cookie on log out and clearing cookie
 */
    req.session.destroy();
    res.clearCookie("connect.sid'");
    console.log(req.session);
    console.log(req.cookies);
    res.redirect('/');
 }