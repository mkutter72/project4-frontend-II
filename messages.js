'use strict';

var externAppsFunctions = externAppsFunctions || {};

var allEvents;

var socket = io('http://localhost:3030');



var form2object = function(form) {
  var data = {};
  $(form).find("input").each(function(index, element) {
    var type = $(this).attr('type');
    if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
      data[$(this).attr('name')] = $(this).val();
    }
  });
  return data;
};

$(document).ready(function () {
  $('#showEvents').on('click',function (event){
    var resultString = JSON.stringify(allEvents.options.events);
    $('#result').val(resultString);
  });

  $('#createBoardID').on('click',function (e){
    var boardData = {
      "boardname": $('#boardNameID').val()
        };

    e.preventDefault();
    api.createMessageBoard(boardData,generalCallback);
    });

 $('#postMessageID').on('click',function (e){
   var messageData = {
      "boardname": $('#boardNameID').val(),
      "messagetext": $('#messageTextID').val()
        };

    e.preventDefault();
    api.updateMessageBoard(messageData,generalCallback);
    socket.emit('chat message', $('#messageTextID').val());
  });

  $('#seleectBoardID').on('click',function (e){
    e.preventDefault();
    api.getMessageBoard($('#boardNameID').val(),displayMessagesCallback);
  });

  socket.on('chat message', function(msg){
      $('#chatspace').val(msg);
    });

});



