// Hook for benjaminrh:event-hooks 
// Unmark the bellow lines if you want to turn on the auto logout functionality 


// Hooks.onLoggedOut = function () {
//     var user = Plans.findOne({userId: Meteor.userId()});
//          console.log(user);
//              if (user) {   
//                  Plans.update(user._id , {$unset : {userId : true}});                    
//                 }

//        Meteor.users.update(Meteor.userId() , {$set: {'services.resume.loginTokens': []},
//                          $unset: {heartbeat:1}});          
             
// }