 //tempsearch = {} 

Template.search.events({
  'submit': function(event, template) {
    event.preventDefault();
     search = template.$('[name=search]').val();
    
    if (! Meteor.user()) {
    return alert("You need to be sign in order to search for patient.");
  }
    var searchplan = Plans.findOne({"patient.cpr": search});
   console.log(search); 
   if (searchplan) {
    // Session.set("multi", true);
   // Session.set("searchplan", search);
    var temp = Plans.findOne({tempsearch : {$exists : true}});
    if (temp) {
    Plans.update({_id: temp._id } , {$unset : {tempsearch : ""}});  
    }
    
     Plans.update(searchplan._id, {$set: {tempsearch : search}});
    // tempsearch = searchplan.tempsearch; 
    Router.go('plansShow', {_id : searchplan._id});
   }
   else { return alert("Patient plan not exist!");}
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
