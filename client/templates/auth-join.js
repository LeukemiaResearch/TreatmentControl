var ERRORS_KEY = 'joinErrors';

Template.join.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});

Template.join.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.join.events({
  'submit': function(event, template) {
    event.preventDefault();
    var email = template.$('[name=email]').val();
    var password = template.$('[name=password]').val();
    var confirm = template.$('[name=confirm]').val();
    // var FirstName = template.$('[name=firstname]').val();
    // var LastName = template.$('[name=lastname]').val();

    var errors = {};

    if (! email) {
      errors.email = 'Email required';
    }

    if (! password) {
      errors.password = 'Password required';
    }

    if (confirm !== password) {
      errors.confirm = 'Please confirm your password';
    }

    // if (  ! FirstName) {
    //   errors.FirstName = 'Please Enter First Name';
    // }

    // if (  ! LastName) {
    //   errors.LastName = 'Please Enter Last Name';
    // }

    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }

    Accounts.createUser({
      email: email,
      password: password
      // firstname: FirstName,
      // lastname: LastName
    }, function(error) {
      if (error) {
        return Session.set(ERRORS_KEY, {'none': error.reason});
      }

      Router.go('home');
    });
  }
});
