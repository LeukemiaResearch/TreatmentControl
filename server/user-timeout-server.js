//
// Server side activity detection for the session timeout
//
// Meteor settings:
// - staleSessionInactivityTimeout: the amount of time (in ms) after which, if no activity is noticed, a session will be considered stale
// - staleSessionPurgeInterval: interval (in ms) at which stale sessions are purged i.e. found and forcibly logged out
//
var staleSessionPurgeInterval = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionPurgeInterval || (1*30*1000); // 1min
var inactivityTimeout = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionInactivityTimeout || (2*60*1000); // 30mins
var overdueTimestamp = undefined;
    // var test =  Plans.findOne({userId: this.userId});
    // console.log(test);
       

//
// provide a user activity heartbeat method which stamps the user record with a timestamp of the last
// received activity heartbeat.
//
Meteor.methods({
    heartbeat: function(options) {
        if (!this.userId) { return; }
        var user = Meteor.users.findOne(this.userId);
        if (user) {
            Meteor.users.update(user._id, {$set: {heartbeat: new Date()}});
        }
    }
    ,
    userlogout: function(){
      
         if (! Meteor.userId()) { return; }

        var now = new Date();
         overdueTimestamp = new Date(now-inactivityTimeout);
    var user = Plans.find({userId: Meteor.userId()});
    user.forEach(function(i) {
        console.log("number of users" + i._id);

    });
    // console.log("number of users" + user);
    console.log("heartbeat:" + Meteor.user().heartbeat);
    console.log("overdueTimestamp:" + overdueTimestamp);

    // need to be fixed to start work at condition 
    // overdueTimestamp > Meteor.user().heartbeat
     if (overdueTimestamp  >= Meteor.user().heartbeat) {
           
               user.forEach(function(u) {
                console.log("hiden plan:" + u);
                Plans.update(u._id , {$unset : {userId : true}}); 
               }); 
                // Plans.update(user._id , {$unset : {userId : true}}, {multi: true}); 
               // Router.go('search', Plans.findOne()); 
               // Session.set("userlogout" , true);    
                    // var current = Router.current();
                    // Router.go('home');
           
    }
    },
    manualout: function() {
          
         var user = Plans.findOne({userId: Meteor.userId()});
         console.log(user);
             if (user) {   
                 Plans.update(user._id , {$unset : {userId : true}}); 
            
                // Session.set("userlogout" , true);    
                }
    }

   
});


//
// periodically purge any stale sessions, removing their login tokens and clearing out the stale heartbeat.
//
Meteor.setInterval(function() {
    var now = new Date();
     overdueTimestamp = new Date(now-inactivityTimeout);
      console.log('server overdueTimestamp' + overdueTimestamp);
    Meteor.users.update({heartbeat: {$lt: overdueTimestamp}},
                        {$set: {'services.resume.loginTokens': []},
                         $unset: {heartbeat:1}},
                        {multi: true});
                        if (this.heartbeat < overdueTimestamp) {logout = true;} 
       
   
}, staleSessionPurgeInterval);

