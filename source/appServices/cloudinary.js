//$.cloudinary.config({ cloud_name: 'reaktivate', api_key: '126867996133227'});
$.cloudinary.config({"api_key":"584952392728183","cloud_name":"hzxyensd5","private_cdn":false});

$(function() {
    // Send image identifier, user's name & message to the server that will publish it to the channel.
    $('.share_form').submit(function() {
        $.ajax({
            type: "POST",
            url: $(this).attr('action'),
            dataType: 'json',
            data: $(this).serialize()
        });
        $('.upload_section').removeClass('uploaded');
        return false;
    });
    // Display the upload progress bar when uploading starts.
    $('.cloudinary-fileupload').bind('fileuploadstart', function(e, data) {
        $('.progress_bar .completed').css('width', '0%');
        $('.upload_section').addClass('uploading');
    });
    // Update the progress bar.
    $('.cloudinary-fileupload').bind('fileuploadprogress', function(e, data) {
        var percent = Math.round((data.loaded * 100.0) / data.total);
        $('.progress_bar .completed').css('width', percent + '%');
        if (percent == 100) {
            $('.upload_section').removeClass('uploading').addClass('processing');
        }
    });
    // Handle failed uploading (e.g., not a valid image)
    $('.cloudinary-fileupload').bind('fileuploadfail', function(e, data) {
        $('.upload_section').removeClass('uploading processing');
    });
});