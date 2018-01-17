// DOM Ready =============================================================
/*global $*/
$(document).ready(function() {
         console.log("working");
        // Populate the user table on initial page load
        $("#signup").hide();
 });

 // log user in
 $('#btnLogin').on('click',function(event){
    event.preventDefault();
    console.log("in ajax");
    var errorCount = 0;
    $('#signin form input').each(function(index, val) {
      if($(this).val() === '') { errorCount++; }
  });
    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
        var User = {
            'email': $('#signin form input#emailid').val(),
            'password': $('#signin form input#pwd').val()
        }
        console.log(User);
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: User,
            url: '/home',
            dataType: 'JSON'
        }).done(function( response ) {
            
            // Check for successful (blank) response
            if (response.msg === ' ') {
                console.log("success");
                console.log('Please go to home page');
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
        });
    }
    else {
        
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        errorCount=0;
        return;
        
    }
 });

// navigate to sign up
$('#signuplink').on('click',function(event){
    event.preventDefault();
    $('#signin').hide();
    $("#signup").show();
    console.log("please work");
 })

 // Add User on sign up button click
 $('#btnAddUser').on('click', addUser);
 
  // Add User function
 function addUser(event) {
     event.preventDefault();
     console.log("in ajax");
     var errorCount = 0;
     
     var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
     if (!(filter.test($('#signup form input#email').val())))
       {
           console.log("email"+$('#signup form input#email').val());
           errorCount=-1;
       }
       else
     
     if($('#signup form input#pw').val()!=$('#signup form input#pw2').val())
          errorCount=-2;
          $('#signup form input').each(function(index, val) {
            if($(this).val() === '') { errorCount++; }
        });
       
     
 
     // Check and make sure errorCount's still at zero
     if(errorCount === 0) {
     // compile all user info into one object
         var newUser = {
             'first_name': $('#signup form input#first_name').val(),
             'last_name': $('#signup form input#last_name').val(),
             'email': $('#signup form input#email').val(),
             'dob': $('#signup form input#dob').val(),
             'password': $('#signup form input#pw').val(),
             'confirmPassword': $('#signup form input#pw2').val()
         }
         console.log(newUser);
 
         // Use AJAX to post the object to our adduser service
         $.ajax({
             type: 'POST',
             data: newUser,
             url: '/signup',
             dataType: 'JSON'
         }).done(function( response ) {
             
             // Check for successful (blank) response
             if (response.msg === '') {
 
                 // Clear the form inputs
                 $('#signup form input').val('');
                 location.reload();
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
             if(errorCount>-1)
             {
             // If errorCount is more than 0, error out
             alert('Please fill in all fields');
             
             }
             else if(errorCount==-1)
             {
             alert('email invalid');
             
             }
             else
             {
             alert('passwords should match');
             }
             errorCount=0;
             return;
             
         }
 };