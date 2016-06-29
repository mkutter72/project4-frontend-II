'use strict';

var imageHeight,imageWidth;
var filesSelected = 0;

$(document).on('change', '.btn-file :file', function() {
    var file,img;
    imageWidth = 0;
    imageHeight = 0;
    var _URL = window.URL || window.webkitURL;
    if ((file = this.files[0])) {
        img = new Image();
        img.onload = function() {
            imageWidth = this.width;
            imageHeight = this.height;
        };
        img.onerror = function() {
            alert( "not a valid file: " + file.type);
        };
        img.src = _URL.createObjectURL(file);
      };


  var input = $(this),
  numFiles = input.get(0).files ? input.get(0).files.length : 1,
  label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  input.trigger('fileselect', [numFiles, label]);
  filesSelected = numFiles;
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

    api.getWallPosts(displayWallPostsCallback);

    $('#upload-form').on('submit', function(e) {
      e.preventDefault();

      if (filesSelected === 0 && $('#wallTitle').val() === "" && $('#wallText').val() === "")
        alert("Enter a least one input");
      else {
        var formData = new FormData(e.target);

        formData.append("imageHeight",imageHeight);
        formData.append("imageWidth",imageWidth);

        api.createWallPost(formData,createWallPostsCallback);
        $('#upload-form').trigger("reset");
        filesSelected = 0;
      }
  });


});
