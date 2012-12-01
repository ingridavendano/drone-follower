var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var express = require('express');
var app     = express();

var timeAtTarget = 0;

client.after(10000, function(){
  client.takeoff();

});

function processDelta(currentHeading, headingDelta, distance){
  if(headingDelta < 10){
    if (distance < 10){
      //at target
      client.stop();
      dtimeAtTarget ++;
      if (timeAtTarget > 3000){
        client.land();
      }
    }else{
      //go to target
      client.frontspeed(0.3);
    }
  }else if (headingDelta < 0){
    //need to turn left
    client.couterclockwise(0.2);
  }else{
    //need to turn right
    client.clockwise(0.2);
  }
}

app.get('/', function(req, res){
  res.send('hello world');
});

app.post('/', function(req, res){
  console.log(req);
});

app.listen(8000);
