
/****** LOGIN.CREATE *****/
$('#switch-to-create').click(function(e){
    e.preventDefault();

    $('#user-login-form').fadeOut(function(){
        $('#user-create-form').fadeIn()
    });
    
})

$('#switch-to-login').click(function(e){
    e.preventDefault();

    $('#user-create-form').fadeOut(function(){
        $('#user-login-form').fadeIn()
    });
    
})

/***** Post Admin *****/
$('.edit_post_link').click(function(e){
    e.preventDefault();
    var id = $(this).parent().attr('data-post-id');

    $.get('/blog/posts/' + id + '/json/', function(result){
        console.log(result);

        $('#submit-button').html('Save Post')
        $('#cancel-button').show();

        var text = result[0].fields.text
        var title = result[0].fields.title
        var id = result[0].pk
        var author = result[0].fields.author
        var featured_image = result[0].fields.featured_image

        $('#post_form input[name="author"').val(author);
        $('#post_form input[name="title"').val(title);
        $('#post_form textarea[name="text"').val(text);
        $('#post_form input[name="id"').val(id);

        if(featured_image.length > 0) {
            $('#featured-image-form').attr('src', '/media/' + featured_image).show();
        }else{
            $('#featured-image-form').attr('src', '').hide();
        }

    });
});

$('#cancel-button').click(function(e){
    e.preventDefault();

    clearForm();

});

function clearForm() {
    $('#post_form input[name="author"').val(global_author);
    $('#post_form input[name="title"').val('');
    $('#post_form textarea[name="text"').val('');
    $('#post_form input[name="id"').val('');
    $('#featured-image-form').attr('src', '').hide();

    $('#submit-button').html('Create Post');
    $('#cancel-button').hide();
}




/***** DELETE POSTS *****/

var page = 0
loadPosts(page);

$('.delete-post-link').click(function(e){
    e.preventDefault();
        console.log('success')
    if (confirm('Are you sure you want to delete this post?')) {
        var id = $(this).parent().attr('data-post-id');

        $.ajax({
            url: '/blog/posts/' + id + '/',
            method: 'DELETE',
            beforeSend: function(xhr){
                xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'))
            },
            success: function() {
                $('li[data-post-id=' + id + ']').remove();
                var current_id = $('#post_form input[name="id"').val();

                if (id === current_id) {
                    clearForm();
                }
            }
        })
    }
})

$('#older-posts').click(function(e){
    e.preventDefault();
    page++
    loadPosts(page);
})

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function loadPosts(page) {

    $.ajax({
        url: '/blog/post-previews/',
        data: {
            page: page
        },
        success: function(result) {

            if (result.length === 0) {
                $('#post-previews').append("That's the last one")
                $('#older-posts').hide();
            } else {
                $('#post-previews').append(result);
            }
        }
    })
}