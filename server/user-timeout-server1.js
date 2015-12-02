// //
// // Server side activity detection for the session timeout
// //
// // Meteor settings:
// // - staleSessionInactivityTimeout: the amount of time (in ms) after which, if no activity is noticed, a session will be considered stale
// // - staleSessionPurgeInterval: interval (in ms) at which stale sessions are purged i.e. found and forcibly logged out
// //
// // var staleSessionPurgeInterval = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionPurgeInterval || (1*60*1000); // 1min
// // var inactivityTimeout = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionInactivityTimeout || (4*60*1000); // 30mins

//     // var test =  Plans.findOne({userId: this.userId});
//     // console.log(test);
       

// //
// // provide a user activity heartbeat method which stamps the user record with a timestamp of the last
// // received activity heartbeat.
// //
// Meteor.userlogout = function(user){
//         var logoutUser = user;
//         if (!logoutUser) {
//             logoutUser = Meteor.user();
//         }
//         if (!logoutUser || !logoutUser.heartbeat) { return; }

//         // var now = new Date(), overdueTimestamp = new Date(now-inactivityTimeout);
//     var user = Plans.findOne({userId: logoutUser});
//     console.log("userLogout heartbeat:" + logoutUser.heartbeat);
//     // console.log("overdueTimestamp:" + overdueTimestamp);

//     // need to be fixed to start work at condition 
//     // overdueTimestamp > Meteor.user().heartbeat
//      // if (overdueTimestamp  > Meteor.user().heartbeat) {
//             // if (user) {   
//         // Plans.update(user._id , {$unset : {userId : true}}, {multi: true}); 
//          Plans.update(logoutUser , {$unset : {userId : logoutUser._id}}); 

//        // Router.go('search', Plans.findOne());     
//             // }
//     // }
//     }

// Meteor.methods({
//     heartbeat: function(options) {
//     // console.log("heartbeat:" + logoutUser.heartbeat);
//         if (!this.userId) { return; }
//         var user = Meteor.users.findOne(this.userId);
//         if (user) {
//         console.log("heartbeat:" + user.heartbeat);       
//             Meteor.users.update(user._id, {$set: {heartbeat: new Date()}});
//         }
//     }
//     ,
//     userlogout: function(user){
//        Meteor.userlogout(user);
//     //     var logoutUser = userId;
//     //     if (!logoutUser) {
//     //         logoutUser = Meteor.userId();
//     //     }
//     //     if (!logoutUser) { return; }

//     //     // var now = new Date(), overdueTimestamp = new Date(now-inactivityTimeout);
//     // var user = Plans.findOne({userId: logoutUser});
//     // console.log("heartbeat:" + logoutUser.heartbeat);
//     // console.log("overdueTimestamp:" + overdueTimestamp);

//     // // need to be fixed to start work at condition 
//     // // overdueTimestamp > Meteor.user().heartbeat
//     //  // if (overdueTimestamp  > Meteor.user().heartbeat) {
//     //         // if (user) {   
//     //     // Plans.update(user._id , {$unset : {userId : true}}, {multi: true}); 
//     //      Plans.update(logoutUser , {$unset : {userId : true}}); 

//     //    // Router.go('search', Plans.findOne());     
//     //         // }
//     // // }
//     }

   
// });


// //
// // periodically purge any stale sessions, removing their login tokens and clearing out the stale heartbeat.
// //
// Meteor.setInterval = (function() {
//     Meteor.setTimeout(function(){
//         Meteor.setInterval();}, 
//     10000);

//     var now = new Date(), overdueTimestamp = new Date(now-(30*1000));

//   console.log("set interval :" + overdueTimestamp);

//     var users = Meteor.users.find({} , { heartbeat : {$lt: overdueTimestamp}});
//     console.log(users.count());
//    users.forEach(function(user) { Meteor.userlogout(user);  });  
       
   
// });

// Meteor.setTimeout(function(){Meteor.setInterval();}, 10000);

