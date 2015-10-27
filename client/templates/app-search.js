 //tempsearch = {} 
 
Template.search.events({
  'submit': function(event, template) {
    event.preventDefault();
     search = template.$('[name=search]').val();
    
    if (! Meteor.user()) {
   // return alert("You need to be sign in order to search for patient.");
   template.$('[name=search]').val('');
     return  Notifications.addNotification("Warning", "You need to be sign in order to search for patient", {type:parseInt(1, 10), timeout: parseInt(3000, 10), userCloseable: true  });
  }

  if(Plans.find({"patient.cpr": "", userId: Meteor.userId() }).count()>=1 && Plans.find({"patient.cpr": ""})._id !== "GENERAL-PLAN") {
      return Notifications.addNotification("Warning", "Please insert to the already open  plan CPR! or delete it before create a new plan!", {type:parseInt(1, 10), timeout: parseInt(3000, 10), userCloseable: true  });
    }


    var searchplan = Plans.findOne({"patient.cpr": search});
   console.log(search); 
   if (searchplan) {
      if(searchplan.userId) { return Notifications.addNotification("Warning", "The Plan you searching is used at the moment from another user!", {type:parseInt(1, 10), timeout: parseInt(3000, 10), userCloseable: true  });}
    // Session.set("multi", true);
   // Session.set("searchplan", search);
     var temp = Plans.findOne({userId: Meteor.userId()});

    if (temp) {
      if (Plans.find({"patient.cpr": temp.patient.cpr}).count()>1) {
        return Notifications.addNotification("Warning", "The plan you already open has existing CPR, place correct the CPR of the opened plan before searching for other plan!", {type:parseInt(1, 10), timeout: parseInt(3000, 10), userCloseable: true  });
       }
    Plans.update({_id: temp._id } , {$unset : {tempsearch : "" , userId : true}});  
    }
     
      
      
     if (searchplan._id === "GENERAL-PLAN") {
      Router.go('plansShow', {_id : searchplan._id});
     }
     else {
      Plans.update(searchplan._id, {$set: {tempsearch : search , userId : Meteor.userId()}});
    // tempsearch = searchplan.tempsearch; 
    Router.go('plansShow', {_id : searchplan._id} ,  {hash: searchplan.hash});
     }
     
   }
   else { 
   // return alert("Patient plan not exist!");
   template.$('[name=search]').val('');
    return  Notifications.addNotification("Warning", "Patient plan not exist!", {type:parseInt(3, 10), timeout: parseInt(2000, 10), userCloseable: true  });
 }
  // Router.go('home');

    // var FirstName = template.$('[name=firstname]').val();
    // var LastName = template.$('[name=lastname]').val();

    // var errors = {};

    // if (! email) {
    //   errors.email = 'Email required';
    // }

    // if (! password) {
    //   errors.password = 'Password required';
    // }

    // if (confirm !== password) {
    //   errors.confirm = 'Please confirm your password';
    // }

    // if (  ! FirstName) {
    //   errors.FirstName = 'Please Enter First Name';
    // }

    // if (  ! LastName) {
    //   errors.LastName = 'Please Enter Last Name';
    // }

    // Session.set(ERRORS_KEY, errors);
    // if (_.keys(errors).length) {
    //   return;
    // }

    // Accounts.createUser({
    //   email: email,
    //   password: password
    //   // firstname: FirstName,
    //   // lastname: LastName
    // }, function(error) {
    //   if (error) {
    //     return Session.set(ERRORS_KEY, {'none': error.reason});
    //   }

    //   Router.go('home');
    // });
  }
});
