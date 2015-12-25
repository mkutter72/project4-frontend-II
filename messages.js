 'use strict';

var externAppsFunctions = externAppsFunctions || {};

var allEvents;

var socket = io('http://localhost:3000');

var messageToBeSent = "";

function sendBoardMessage()
{
  socket.emit('chat message', messageToBeSent);
};

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

    api.createMessageBoard(boardData,addOrRemoveBoardCallback);
    });

 $('#postMessageID').on('click',function (e){
    e.preventDefault();
    var messageData = {
      "boardname": $('#boardNameID').val(),
      "messagetext": $('#messageTextID').val()
      };

    // Get the message ready.   It will be sent after the database transaction has completed
    var d = new Date();
    messageToBeSent = "MSG" + sessionStorage.currentUser + " " + d.toLocaleString() + "\n" + $('#messageTextID').val() + "\n\n";

    sendBoardMessage();
    api.updateMessageBoard(messageData,generalCallback);
    $('#messageTextID').val("");
    });

  $('#selectBoardID').on('click',function (e){
    e.preventDefault();
    api.getMessageBoard($('#boardNameID').val(),displayMessagesCallback);
    });

 $('#listBoardsID').on('click',function (e){
    e.preventDefault();
    api.getMessageBoardNames(displayBoardNamesCallback);
    });


 $('#deleteBoardID').on('click',function (e){
    e.preventDefault();
    api.deleteMessageBoard($('#boardNameID').val(),addOrRemoveBoardCallback);
    });



  socket.on('chat message', function(msg){
    if (msg.startsWith("MSG")) {
      var newMessage = msg.replace("MSG","");
      allMessages += newMessage;
      $('#chatspace').val(allMessages);
      console.log(newMessage);
      }
    });

});

externAppsFunctions['sendBoardMessage'] = sendBoardMessage;


