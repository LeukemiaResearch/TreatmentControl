// //
// // Client side activity detection for the session timeout
// // - depends on jquery
// //
// // Meteor settings:
// // - staleSessionHeartbeatInterval: interval (in ms) at which activity heartbeats are sent up to the server
// // - staleSessionActivityEvents: the jquery events which are considered indicator of activity e.g. in an on() call.
// //
// // var heartbeatInterval = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionHeartbeatInterval || (1*60*1000); // 3mins
//  var activityEvents = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionActivityEvents || 'mousemove click keydown';
// var lastHeartbeat = undefined;

// Meteor.startup(function() {

//     //
//     // periodically send a heartbeat if activity has been detected within the interval
//     //
//     // Meteor.setInterval(function() {
//     //     if (Meteor.userId() && activityDetected) {
//     //         Meteor.call('heartbeat');
           
//     //         activityDetected = false;
//     //     }
//     //     Meteor.call('userlogout');
//     // }, 10000);

//     // Meteor.setInterval(function() {
//     //     if (Meteor.userId() ) {
//     //             Meteor.call('userlogout');
//     //         }


//     // }, heartbeatInterval  );
        
       
    
     
//     //
//     // detect activity and mark it as detected on any of the following events
//     //

// });

//     function heartbeatActivity() {
//          console.log("new heartbeat"); 
//             var now = new Date(); 
//             if (!lastHeartbeat || now > (lastHeartbeat + 10000) ) {
//                  lastHeartbeat = now;
//                  console.log("timestamp:" + lastHeartbeat);
//                  Meteor.call('heartbeat');
//             }
        
//     };