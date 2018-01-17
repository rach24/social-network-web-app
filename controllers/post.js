var Post=require('../model/posts');
var User=require('../model/users');
global.hidevar;

exports.createPost= function(req, res) {
     /** referred from: https://www.npmjs.com/package/express-session
     *  to authenticate user by creating sessions and holding session info in cookies
     * checking if valid looged in user
     */
    if (req.session && req.session.email  && req.session.userid)
            res.render('createpost',{message:""}); 
    else
        res.render('errorSignup', { message:'You can only see this after you have logged in.'});

};

exports.submitPost = function(req,res){
   
User.findById(req.session.userid,function(err,user){
    
    var post = new Post(
        { user_post: req.body.user_post,
          email: user.email,
          hide: (req.body.hide).toLowerCase()
        });
    console.log(post);
                console.log("in create part");
                  Post.create(post,function (err,post) {
                      if (err) {console.log(err); return err; }
                         console.log(req.session);
                         console.log("post"+post)
                         res.send({msg:' ',post: post});
                         });
    
});
}


exports.ViewPost=function(req,res){
     /** referred from: https://www.npmjs.com/package/express-session
     *  to authenticate user by creating sessions and holding session info in cookies
     * checking if valid looged in user
     */
    if(req.session && req.session.email && req.session.userid)
    {
        
        Post.find({}).exec(function (err, list_posts) {
         if (err) { return (err); }
         var posts = {
            title: 'All posts Visible to this user', 
            post_list: list_posts,
            note:'Disclaimer: Some authors have set their post settings as - visibility restricted beyond all visitors to the web app - i.e. logged in users. If you can View view the post you are a valid logged in User. Cheers!!'
        }
         
         res.json(posts);
        });
    }
    else
    {
        Post.find({'hide':'no'}).exec(function(err, list_posts){
            if(err){return (err);}
             var posts = {
                title: 'All posts Visible to this user', 
                post_list: list_posts,
                note:'Disclaimer: Some authors have set their post settings as - visibility restricted beyond all visitors to the web app - i.e. logged in users. As you are not a valid logged in User you cant view those posts.You can only see them after you have logged in.'                
            }
             
             res.json(posts);
            });
    }
}

exports.ViewPostDetail=function(req,res){
    var posts,id=req.originalUrl.split("/");
    console.log(id[3]);
    console.log(req.session);
    Post.findById(id[3],function(err,post){
        if (err) { return (err); }
    //check post settings
    if(post!= undefined)
    {
    if(post.hide=="yes")     
    {
         /** referred from: https://www.npmjs.com/package/express-session
         *  to authenticate user by creating sessions and holding session info in cookies
         * checking if valid looged in user
         */
      if(req.session && req.session.email && req.session.userid)
        {
         console.log(post);
          posts = {
            post: post,
            note:'Disclaimer : As per Post Author this post visibility is restricted beyond all visitors to the web app - i.e. logged in users. If you can View this message you are a valid logged in User. Cheers!!' 
         }
         
         
         
        }
        else
        {
             posts = {
                post: undefined,
                note:'Cannot view when user is not logged in' 
             }
        }
        
    }
    else 
    {
        console.log(post);
         posts = {
            post: post,
            note:'Disclaimer : As per Post Author, there is no visibility restriction on this post.' 
         }
         }   
    
  }
  res.json(posts);    
})
}
// json = {'username':1 , 'pwd' : 2}
exports.DeletePost=function(req,res){
  /** referred from: https://www.npmjs.com/package/express-session
 *  to authenticate user by creating sessions and holding session info in cookies
 * checking if valid looged in user
 */
if(req.session && req.session.email && req.session.userid)
   {
    console.log("In delete\n\n"+req.body.id+"\n\n"+req.session.email)  ; 
    Post.findOne({'_id':req.body.id,'email':req.session.email},function(err,post){
        if(err) throw err;
        if(post)
        {
        console.log(post);
        Post.findByIdAndRemove(req.body.id,function(err){
        if(err){
            res.send({msg: 'Something went wrong'});
            
        }
        else
        {
        res.send({ msg: '' });
        console.log(req.session);
    }});
}
else
 res.send({msg: 'Cannot delete'});   }
    
);}
else
res.send({msg: 'Cannot delete when user is not logged in'}); 
}

exports.renderPostPage=function(req,res){
    res.render('posts');
}
