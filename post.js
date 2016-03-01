'use strict';

$(document).on('change', '.btn-file :file', function() {
  var input = $(this),
      numFiles = input.get(0).files ? input.get(0).files.length : 1,
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  input.trigger('fileselect', [numFiles, label]);
});

$(document).ready( function() {
    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {

        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;

        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }

    });

  $("#wallStart").append("<h2 class=\"section-heading\">A Huge Thanks!</h2><p>Hello everyone,  it's Stan.   I wanted to let you all know how greatful I am that you have created this web community.   I'm feeling better so I think the treatments are working.   Looking forward to see you soon</p><span class=\"caption text-muted\">Posted by StanC on December 14, 2015</span><hr>");

  $("#wallStart").append("<h2 class=\"section-heading\">Happy Memories</h2><p>Stan.  I came across this photo from our biking trip in Italy last fall.  What an amazing adventure.   Get well soon so we can have plan our next Journey.</p><a><img class=\"img\" src=\"https://kutter-001.s3.amazonaws.com/2016-02-15/d19c93a0ec72b689206843e11d3fe024.png\"></a><span class=\"caption text-muted\">Posted by Mike on December 14, 2015</span><hr>");

  $("#wallStart").append("<h2 class=\"section-heading\">Sending Healing Love</h2><p>Stan,  I was really sad to get your news. Let me know if there is anything you need help with.</p><span class=\"caption text-muted\">Posted by Sarah on December 14, 2015</span><hr>");

});
