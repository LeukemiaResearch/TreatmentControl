// Hook for benjaminrh:event-hooks 

// Hooks.onLoggedOut = function () {
//     var user = Plans.findOne({userId: Meteor.userId()});
//          console.log(user);
//              if (user) {   
//                  Plans.update(user._id , {$unset : {userId : true}});                    
//                 }

//        Meteor.users.update(Meteor.userId() , {$set: {'services.resume.loginTokens': []},
//                          $unset: {heartbeat:1}});          
             
// }