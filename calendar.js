'use strict';

var externAppsFunctions = externAppsFunctions || {};

var allEvents;

//var socket = io('http://localhost:3030');
var socket = io('https://intense-cove-9531.herokuapp.com');

function addLeadingZero (num) {
 if (num < 10) {
   return "0" + num;
 } else {
   return "" + num;
 }
};

function addCalendarEvent(key,userName,description,time)
{
  var events = allEvents.options.events;
  var currentAppointments = {}
  currentAppointments[key] = events[key];

  if (events[key]) {
    currentAppointments[key].number +=  1;
    var newindex = currentAppointments[key].dayEvents.length;
    var newAppointment = {
      "userName": userName,
      "description": description,
      "time": time
    };

    currentAppointments[key].dayEvents[newindex] = newAppointment;

    $(".responsive-calendar").responsiveCalendar('edit', currentAppointments);
  } else {

    var editData = {};
    editData[key] = {
      "number": 1,
      "dayEvents": [{
        "userName": userName,
        "description": description,
        "time": time
      }]
    };

    $(".responsive-calendar").responsiveCalendar('edit', editData);
  };
};



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




  $('#create-appointment').on('submit', function(e) {
    e.preventDefault();
    var appointmentData = form2object(this);

    $('#create-appointment').trigger("reset");

    api.createAppointment(appointmentData,generalCallback);

    // the database will insert username for us.   Insert it
    // after the db call so the socket message will have all the info
    appointmentData["userName"] = sessionStorage.currentUser;
    var msg =JSON.stringify(appointmentData);
    socket.emit('chat message', msg);
  });

$('#clearEvents').on('click',function (){
  console.log("got click");

  $(".responsive-calendar").responsiveCalendar('clearAll');

});

$('#eventClearButton').on('click',function (){

  var clearDatestr =  "CLEAR" + $('#appointment-date').val();

  socket.emit('chat message', clearDatestr);
});


socket.on('chat message', function(msg){
  if (msg.startsWith("CLEAR")) {
    var clearDate = msg.replace("CLEAR","");
    $(".responsive-calendar").responsiveCalendar('clear', [clearDate]);
  }
  else {
    var data =   JSON.parse(msg);
    addCalendarEvent(data["appDate"],data["userName"],data["appDescription"],data["appTime"]);
  };

});



$(".responsive-calendar").responsiveCalendar({
  time: '2015-12',
  startFromSunday: true,
  allRows: false,

  onDayHover: function(events) {
    var key = $(this).data('year')+'-'+addLeadingZero( $(this).data('month') )+'-'+addLeadingZero( $(this).data('day') );
    var  thisDayEvent = events[key];

    var resultString = "";

    if (thisDayEvent) {
      var eventsArray = thisDayEvent.dayEvents;
      for (var i=0; i < eventsArray.length; ++i) {
          resultString += eventsArray[i].userName + " ";
          resultString += eventsArray[i].time + " ";
          resultString += eventsArray[i].description + "\n";
        }
      }
    $('#hoverEvents').val(resultString);
    },


  onDayClick: function(events) {
    var key = $(this).data('year')+'-'+addLeadingZero( $(this).data('month') )+'-'+addLeadingZero( $(this).data('day') );

    $("#appointment-date").val(key);

    },

  onInit: function() {
   allEvents = this;
   api.getCalendar(fillCalendarCallback);
    }

  })
});


externAppsFunctions['addCalendarEvent'] = addCalendarEvent;

