// DOM Ready =============================================================
/*global $*/
$(document).ready(function() {
    $('#postview h3').hide();
    $('#postview table').hide();
    $('#PostViewByID').hide();
    console.log('in post view separate');
    var tableContent='';
    $.getJSON('/viewposts',function(data){
    //console.log(data);})
    $('#postview h1').text(data.title);
    $('#postview p').text(data.note);
      
      console.log(data.post_list );
      if(data.post_list.length >0){
        $('#postview h3').hide();
        $('#postview table').show();
        console.log("inside");
       // For each item in our JSON, add a table row and cells to the content string
       $.each(data.post_list, function(){
        tableContent += '<tr>';
        tableContent += '<td  ><a href="" class="linkselectpost"rel="' + this._id + '" >' + '/viewposts/detail/'+this._id + '</a></td>';
        tableContent += '<td >' + this.email + '</td>';
        tableContent += '<td>' + this.hide +'</td>';
        tableContent += '<td><a href="" class="linkdeletepost" rel="' + this._id + '">delete</a></td>';
        tableContent += '</tr>';
    });
    

       
    // Inject the whole content string into our existing HTML table
    $('#postview table tbody').html(tableContent);}
    else
    {
        $('#postview table').hide();
        $('#postview h3').text("There are no posts created yet.");
        $('#postview h3').show();
    }

    
 });
 $('#postview table tbody').on('click', 'td a.linkdeletepost', deletePost);   
 $('#postview table tbody').on('click', 'td a.linkselectpost', GetPost);   
});

function GetPost(event){
    event.preventDefault();
    $('#postview').hide();
    $('#PostViewByID').show();
    console.log("inside indi post")
    $.getJSON('/viewposts/detail/' + $(this).attr('rel'),function(data){
        $('#PostViewByID p').append(data.note);
        console.log(data.post.length);
        if(data.post!=undefined)
        {
            console.log("inside post array");
        $('#PostViewByID h1').append(data.post._id);
        $('#PostViewByID h5').append(data.post.email);
        $('#PostViewByID p1').append(data.post.user_post);
        $('#PostViewByID p2').append(data.post.hide);
        }
    })


}


// Delete Post
function deletePost(event) {
    
        event.preventDefault();
    
        // Pop up a confirmation dialog
        var confirmation = confirm('Are you sure you want to delete this user?');
    
        // Check and make sure the user confirmed
        if (confirmation === true) {
            var Post = {
                'id':$(this).attr('rel')
            }
            // If they did, do our delete
            $.ajax({
                type: 'POST',
                url: '/viewposts/detail/' + $(this).attr('rel'),
                data: Post
            }).done(function( response ) {
    
                // Check for a successful (blank) response
                if (response.msg === '') {
                    console.log("deleted");
                    location.reload();
                }
                else {
                    localStorage.setItem('errormsg', JSON.stringify({"err":response.msg}));
                    window.location.href='error.pug';
                }
    
                
    
            });
    
        }
        else {
    
            // If they said no to the confirm, do nothing
            return false;
    
        }
    
    };