'use strict';

var externAppsFunctions = externAppsFunctions || {};

var allEvents;

var socket = io('https://intense-cove-9531.herokuapp.com/:3030');



$(document).ready(function () {
  $('#showEvents').on('click',function (event){
    e.preventDefault();
    var resultString = JSON.stringify(allEvents.options.events);
    $('#result').val(resultString);
  });

  $('#createBoardID').on('click',function (e){
    e.preventDefault();
    var boardData = {
      "boardname": $('#boardNameID').val()
        };

    api.createMessageBoard(boardData,generalCallback);
    });

 $('#postMessageID').on('click',function (e){
    e.preventDefault();
    var messageData = {
      "boardname": $('#boardNameID').val(),
      "messagetext": $('#messageTextID').val()
      };

    var d = new Date();
    var newMessage = sessionStorage.currentUser + " " + d.toLocaleString() + "\n" + $('#messageTextID').val() + "\n\n";
    socket.emit('chat message', newMessage);
    api.updateMessageBoard(messageData,generalCallback);
    });

  $('#seleectBoardID').on('click',function (e){
    e.preventDefault();
    api.getMessageBoard($('#boardNameID').val(),displayMessagesCallback);
    });

  socket.on('chat message', function(msg){
      allMessages += msg;
      $('#chatspace').val(allMessages);

    });

});



