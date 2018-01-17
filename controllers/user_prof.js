/**User profile view  */

const Edit = require("../model/users");

exports.profileEditView = function(req, res) {
    /** referred from: https://www.npmjs.com/package/express-session
 *  to authenticate user by creating sessions and holding session info in cookies
 * checking if valid looged in user
 */
    if (req.session && req.session.email  && req.session.userid)
         res.render('useredit');
    else
      res.render('errorSignup', { message:'You can only see this after you have logged in.'});
};


exports.profileUpdate = function(req, res) {
console.log("in function");    
            Edit.findById(req.session.userid, function(err, edit) {  
                // Handle any possible database errors
                if (err) {
                    res.status(500).send(err);
                } else {
                    // Update each attribute with any possible attribute that may have been submitted in the body of the request
                    // If that attribute isn't in the request body, default back to whatever it was before.
                    edit.address = req.body.addr || edit.address;
                    edit.status = req.body.status || edit.status;
                    edit.phone_no = req.body.ph || edit.phone_no;
                    edit.university = req.body.uni || edit.university;
            
                    // Save the updated document back to the database
                    edit.save(function(err, edit) {
                        if (err) {
                            res.status(500).send(err)
                        }
                        res.send({msg:' ',user: edit});
                    });
                }
            });
         
     }

     exports.homeview=function(req,res){
          /** referred from: https://www.npmjs.com/package/express-session
 *  to authenticate user by creating sessions and holding session info in cookies
 * checking if valid looged in user
 */
         if(req.session && req.session.email  && req.session.userid){
            console.log("In profile view");
            Edit.findById(req.session.userid,function(err,user){
            console.log("In profile view mongo find fn");  
            res.render('profile');
         }) } 
         else  
         {
            res.render('errorsession'); 
         }
     }



