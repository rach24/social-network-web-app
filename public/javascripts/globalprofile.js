// DOM Ready =============================================================
/*global $*/
$(document).ready(function(event) {
    console.log("profile working");
    $("#postview").hide();
    $("#editView").hide();
    $("#createView").hide();
    var user = localStorage.getItem('userDetails');
    //pase the value 
    var uservalue = JSON.parse(user);
    var details=uservalue.details;
    console.log(user);
   // Populate the user details on initial page load
   //welcome msg
   $('h5').append(details.email);
   //Populate Info Box
   $('#fname').text(details.first_name);
   $('#lname').text(details.last_name);
   $('#dob').text(details.dob);
   $('#addr').text(details.address);
   $('#ph_no').text(details.phone_no);
   $('#stat').text(details.status);
   $('#uni').text(details.university);
   
   // bind links
  $('#view').on('click',ViewPost);
  $('#create').on('click',CreatePostView);
  $('#edit').on('click',EditProfile);
  $('#editbtn').on('click', editUser);
  $('#createpost').on('click', createUser);
});



// navigate to Posts page
function ViewPost(event){
  event.preventDefault();
  $("#postview").hide();
  $('#homeView').hide();
  $("#postview").show();
  $("#editview").hide();
  $("#createView").hide();
  window.location.href='/home/posts';
}


//nav to CreatePost
function CreatePostView(){
  event.preventDefault();
  console.log("in createview");
  $('#homeView').hide();
  $("#postview").hide();
  $("#editView").hide();
  $("#createView").show();
}

// nav to edit
function EditProfile(){
  event.preventDefault();
  console.log("in edit")
  $('#homeView').hide();
  $("#postview").hide();
  $("#editView").show();
  $("#createView").hide();
}
// Add User on sign up button click


// edit User function
function editUser(event) {
   event.preventDefault();
   console.log("in edit profile");
   var errorCount = 0;
  if($('#editView form input#addr').val()===''&& $('#editView form input#status').val()===''&& $('#editView form input#ph').val()==='' && $('#editView form input#uni').val()==='')
    errorCount=1; 
  console.log(errorCount);
  if(errorCount == 0) {
   // compile all user info into one object
       var User = {
           'addr': $('#editView form input#addr').val(),
           'status': $('#editView form input#status').val(),
           'ph': $('#editView form input#ph').val(),
           'uni': $('#editView form input#uni').val()
            }
       console.log(User);

       // Use AJAX to post the object to our adduser service
       $.ajax({
           type: 'POST',
           data: User,
           url: '/profile',
           dataType: 'JSON'
       }).done(function( response ) {
           console
           // Check for successful (blank) response
           if (response.msg === ' ') {
                alert("Profile successfully updated");
               // Clear the form inputs
               $('#editView form input').val('');
               localStorage.setItem('userDetails', JSON.stringify({"details":response.user}));
               window.location.href='/home';
           }
           else {

               // If something goes wrong, alert the error message that our service returned
               console.log('Please go to error page');
               console.log("message"+response.msg);
               localStorage.setItem('errormsg', JSON.stringify({"err":response.msg}));
               window.location.href='error.pug';
               

           }
       });}
       else {
           console.log("error"+errorCount);
           
           // If errorCount is more than 0, error out
           alert('Please fill in atleast one field');
           
           errorCount=0;
           return;
           
       }
};

function createUser(event){
  event.preventDefault();
  var errorcode=0;
  if($('form textarea#user_post').val()==='')
     errorcode=1;
  else if($("form input#hide").val().toLowerCase()!="yes" && $("form input#hide").val().toLowerCase()!="no")
    errorcode=2;
  if(errorcode===0)
  {
      var newPost = {
      'user_post': $('form textarea#user_post').val(),
      'hide': $("form input#hide").val()
       }
  console.log(newPost);

  // Use AJAX to post the object to our adduser service
  $.ajax({
      type: 'POST',
      data: newPost,
      url: '/create',
      dataType: 'JSON'
  }).done(function( response ) {
      console
      // Check for successful (blank) response
      if (response.msg === ' ') {
          alert('Successful post creation.\nPost:\nmessage: '+response.post.user_post+"\nhide:"+response.post.hide);
          // Clear the form inputs
          $('#createView form input').val('');
          $('form textarea#user_post').val(''); 
      }
      else {

          // If something goes wrong, alert the error message that our service returned
          console.log('Please go to error page');
          console.log("message"+response.msg);
          localStorage.setItem('errormsg', JSON.stringify({"err":response.msg}));
          window.location.href='error.pug';
          

      }
  });}
  else {
      
      console.log("error"+errorcode);
      if(errorcode==1)
      // If errorCount is more than 0, error out
      alert('Please fill post text');
      else
      alert('Please fill hide option as either yes/no');
      errorcode=0;
      return;
      
  }
}
