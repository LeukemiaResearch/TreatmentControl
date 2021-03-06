Router.configure({

  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'appBody',

  // the appNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'appLoading',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  waitOn: function() {
    return [
      Meteor.subscribe('publicLists'),
      Meteor.subscribe('privateLists'),
    //  Meteor.subscribe('treatmentplans')
      Meteor.subscribe('publicPlans'),
      Meteor.subscribe('plans1')
    ];
  }
});

dataReadyHold = null;

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();

  // Show the loading screen on desktop
  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});

  var scrollSpeed = 700;
  
//Session.set('hash', '#tree');

    Router.onRun(function() {

      Meteor.setTimeout(function () {
        var hash = $(window.location.hash);
        var headerHeight = $("header").outerHeight();
        var scrollTo = hash.length ? hash.offset().top - headerHeight : 0;
        $("html, body").animate({ scrollTop: scrollTo }, scrollSpeed);
      }, 0);
      this.next();
    });

    Router._scrollToHash = function (hashValue) {
      try {
        var hash = $(hashValue);
        var headerHeight = $("header").outerHeight();
        var scrollTo = hash.length ? hash.offset().top - headerHeight : 0;
        $("html, body").animate({ scrollTop: scrollTo }, scrollSpeed);
      } catch (e) {
        // in case the hashValue is bogus just bail out
      }
    };

}

Router.map(function() {
  
  this.route('join');
  this.route('signin');
  this.route('search');

  this.route('listsShow', {
    path: '/lists/:_id',
    // subscribe to todos before the page is rendered but don't wait on the
    // subscription, we'll just render the items as they arrive
    onBeforeAction: function () {

      this.todosHandle = Meteor.subscribe('todos', this.params._id);

      if (this.ready()) {
        // Handle for launch screen defined in app-body.js
        dataReadyHold.release();
      }
    },
    data: function () {
      return Lists.findOne(this.params._id);
    },
    action: function () {
      this.render();
    }
  });

  this.route('plansShow', {
    path: '/plans/:_id',
    
    onBeforeAction: function () {
   //   this.todosHandle = Meteor.subscribe('treatmentplans', this.params._id);
       this.next();
      if (this.ready()) {
        // Handle for launch screen defined in app-body.js
        dataReadyHold.release();
      }

    },
    data: function () {
     
         return Plans.findOne(this.params._id);
     

    },
    action: function () {
      if (Meteor.user()){
      this.render();  
      }
      else { Router.go('signin');}
      // console.log(this.todosHandle); 
    } 
      // hash: function() { hash: Session.get('hash')}

       
  });
  

  this.route('home', {
    path: '/',
    action: function() {
      //Router.go('plansShow', Plans.findOne());
    //  Router.go('listsShow', Lists.findOne());
    if(Meteor.user()){
      Router.go('search', Plans.findOne());
    }
     else { Router.go('signin');}
    }
  });

  
});
