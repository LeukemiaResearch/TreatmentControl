


// if (Meteor.isClient) {

var MENU_KEY = 'menuOpen';
Session.setDefault(MENU_KEY, false);

var USER_MENU_KEY = 'userMenuOpen';
Session.setDefault(USER_MENU_KEY, false);

var SHOW_CONNECTION_ISSUE_KEY = 'showConnectionIssue';
Session.setDefault(SHOW_CONNECTION_ISSUE_KEY, false);

var CONNECTION_ISSUE_TIMEOUT = 5000;

Meteor.startup(function () {
  // set up a swipe left / right handler
  $(document.body).touchwipe({
    wipeLeft: function () {
      Session.set(MENU_KEY, false);
      // $("#wrapper").toggleClass("toggled");
    },
    wipeRight: function () {
      Session.set(MENU_KEY, true);
      // $("#wrapper").toggleClass("toggled");
    },
    preventDefaultEvents: false
  });

  // Only show the connection error box if it has been 5 seconds since
  // the app started
  setTimeout(function () {
    // Launch screen handle created in lib/router.js
    dataReadyHold.release();

    // Show the connection error box
    Session.set(SHOW_CONNECTION_ISSUE_KEY, true);
  }, CONNECTION_ISSUE_TIMEOUT);

  //Hook for benjaminrh:event-hooks 
    Hooks.init();
    Hooks.treatCloseAsLogout = true;
    // updateFocus: 4000; 
    // Hooks.onLoggedOut = function () {
    // Meteor.logout();
    // }
    
});

Template.appBody.onRendered(function() {
  this.find('#page-content-wrapper')._uihooks = {
    insertElement: function(node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .fadeIn(function () {
          planFadeInHold.release();
           // listFadeInHold.release();
          
        });
    },
    removeElement: function(node) {
      $(node).fadeOut(function() {
        $(this).remove();
      });
    }
  };
  //this.find('#wrapper').hammer();
});

  // Meteor.methods({
  //     'insertNewList' : function (list_id) {
  //       Todos.insert
  //     }


  // });



Template.appBody.helpers({


  // We use #each on an array of one item so that the "list" template is
  // removed and a new copy is added when changing lists, which is
  // important for animation purposes. #each looks at the _id property of it's
  // items to know when to insert a new item and when to update an old one.
  thisArray: function() {
    return [this];
  },
  menuOpen: function() {
    return Session.get(MENU_KEY) && 'menu-open';
  },
  cordova: function() {
    return Meteor.isCordova && 'cordova';
  },
  emailLocalPart: function() {
    var email = Meteor.user().emails[0].address;
    return email.substring(0, email.indexOf('@'));
  },
  usernameLocalPart: function() {
     
    
    var email = Meteor.user().emails[0].address;
    if(Meteor.user().profile) { return Meteor.user().profile.name; }
    else {     
    return email.substring(0, email.indexOf('@')); 
  }   
  },
  userMenuOpen: function() {
    return Session.get(USER_MENU_KEY);
  },
  lists: function() {
    return Lists.find();
  },
  todos: function() {
    return Todos.find();
  },
  plans: function() {
    
    // return Plans.findOne("GENERAL-PLAN"); 
     // return Plans.findOne(Session.get("searchplan"));
     // var tempsearch = Plans.findOne({tempsearch : {$exists : true} , userId : this.userId});
     // var tempsearch = Plans.findOne({ userId : this.userId});
     //  console.log(tempsearch);
    
    // var temp = Plans.findOne({userId: Meteor.userId()});
    //   console.log(temp);
     // if ( temp ) {
      if ( Meteor.user()) {
      return Plans.find({ $or : [ { _id : "GENERAL-PLAN"} , { userId : Meteor.userId() }  ] } );  
      }
      
    // } 
    else {
      return Plans.find('GENERAL-PLAN').fetch(); 
    }
      
     //  console.log(this.patient.cpr);
     // if ( this.patient.cpr === undefined )  {  
     //      return Plans.find({ $or : [ { _id : { $in: [ "GENERAL-PLAN", Session.get("searchplan") ]}} , { "patient.cpr" : search }  ] } );
     // }
     // else {
     //    return Plans.find({ $or : [ { _id : { $in: [ "GENERAL-PLAN", this._id ]}} , { "patient.cpr" : this.patient.cpr }  ] } );
     // }
      
  },
  activeListClass: function() {
    var current = Router.current();
    if (current.route.name === 'listsShow' && current.params._id === this._id) {
      return 'active';
    }
  },
  activePlanClass: function() {
    var current = Router.current();
    if (current.route.name === 'plansShow' && current.params._id === this._id) {
      return 'active';

    }
  },
  connected: function() {
    if (Session.get(SHOW_CONNECTION_ISSUE_KEY)) {
      return Meteor.status().connected;
    } else {
      return true;
    }
  }
 
  });

  

Template.appBody.events({
  'click .js-menu': function() {
    Session.set(MENU_KEY, ! Session.get(MENU_KEY));
  },

  'click .content-overlay': function(event) {
    Session.set(MENU_KEY, false);
    event.preventDefault();
  },

  'click .js-user-menu': function(event) {
    Session.set(USER_MENU_KEY, ! Session.get(USER_MENU_KEY));
    // stop the menu from closing
    event.stopImmediatePropagation();
  },

  'click #menu a': function() {
    Session.set(MENU_KEY, false);
  },

  'click .js-logout': function() {
    Meteor.call('manualout');
    Meteor.logout();
    
    // if we are on a private list, we'll need to go to a public one
    var current = Router.current();
    Router.go('signin');
  },

   'click #menu-toggle': function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    },


      // Mobile wipe development  // 
    // 'panleft panright #wrapper' :function(e) {
    //   e.preventDefault();
    //   $("#wrapper").toggleClass("toggled");
    // },

    // 'swipe #wrapper' :function() {
    //   //e.preventDefault();
    //   $("#wrapper").toggleClass("toggled");
    // },

     'click a.hashroot'  : function() {
    
      Router.go('plansShow', {_id : this._id} ,  {hash: Session.get('hash')});
      console.log(this._id);
     
      },

    'click li.wiped': function() {
      if (Meteor.isCordova) {  
         $("#wrapper").toggleClass("toggled");
      }   
      if ( Meteor.isMobile || $(window).width() < 768  ) {  
         $("#wrapper").toggleClass("toggled");
      }   
      
    },

 //  'click .js-new-list': function() {
 //    var task =  Todos.findOne("uz9XR5NZuqtkTuoj2")
 //    var list = {name: Lists.defaultName(), incompleteCount: 0};    
 //    list._id = Lists.insert(list);
 //    //  task  = function() {
 //    //  return  Todos.findOne({_id: "QCgkZXnA7cc6Pdtff" });
 //    // };
 //     // console.log(task);
    
       
    
 // //    console.log(task.text);
         
 //    Todos.insert({
 //      listId: list._id,
 //      text: task.text,
 //      checked: false,
 //      createdAt: new Date()
 //    });

 //    Router.go('listsShow', list);
 //  },
  'click .js-new-plan': function() {
    var task =  Plans.findOne({"header.name":"General Plan"});
    var list1 = {name: Plans.defaultName(), incompleteCount: 0};    
   // list._id = Plans.insert(list);
    //  task  = function() {
    //  return  Todos.findOne({_id: "QCgkZXnA7cc6Pdtff" });
    // };
     // console.log(task);
    
       
    
     console.log(list1);
  if (! Meteor.user()) {
    // return alert("Please sign in or create an account to make plans.");
     return  Notifications.addNotification("Warning", "Please sign in to create plans", {type:parseInt(1, 10), timeout: parseInt(3000, 10), userCloseable: true  }); 
  } 
  if(Plans.find({"patient.cpr": "", userId: Meteor.userId() }).count()>=1 && Plans.find({"patient.cpr": ""})._id !== "GENERAL-PLAN") {
      return Notifications.addNotification("Warning", "Please insert to the already open  plan CPR! or delete it before create a new plan!", {type:parseInt(1, 10), timeout: parseInt(3000, 10), userCloseable: true  });
    }

     var message = "Are you sure you want to create new plan ";
  if (confirm(message)) {
 
    var t  = new Date();
   t .setHours(t.getHours() + 2);

    var time = t.toISOString().substring(0,16);
   // time.setHours(time.getDate() + 2);
    //var time = ((time1.toISOString().substring(0,16)) + (time1.toISOString().substring(23,24))); 
    
    // console.log(t);
    // console.log(time);
    
    

    list1_id = Plans.insert({
      incompleteCount: 0,
      header: {
        createdAt: time, 
        name: Plans.defaultName(),
        mtx: "",
        pcreatin: ""
      },
      patient : {
        name: "",
        cpr:"",
        height: "",
        weight: "",
        surface: Plans.findOne({"header.name": "General Plan"}).patient.surface
      }, 
      treatments: Plans.findOne({"header.name" :"General Plan"}).treatments
      // treatments: Plans.findOne({name:"General Plan"}).treatments[1],
      // treatments: Plans.findOne({name:"General Plan"}).treatments[2]
        // { 
        //   id: Plans.findOne({name:"General Plan"}).treatments[0].id,
        //   createdAt: new Date(),
        //  field1: Plans.findOne({name:"General Plan"}).treatments[0].field1 ,
        //  value1: Plans.findOne({name:"General Plan"}).treatments[0].value1,
        //  field2: Plans.findOne({name:"General Plan"}).treatments[0].field2 ,
        //  value2: Plans.findOne({name:"General Plan"}).treatments[0].value2,
        //  field3: Plans.findOne({name:"General Plan"}).treatments[0].field3 ,
        //  value3: Plans.findOne({name:"General Plan"}).treatments[0].value3,
        //  field4: Plans.findOne({name:"General Plan"}).treatments[0].field4 ,
        //  field5: Plans.findOne({name:"General Plan"}).treatments[0].field5  
        // },
        // {
        //   id: Plans.findOne({name:"General Plan"}).treatments[1].id,
        //   createdAt: new Date(),
        //   field1: Plans.findOne({name:"General Plan"}).treatments[1].field1 ,
        //  value1: Plans.findOne({name:"General Plan"}).treatments[1].value1
        // },
        // {
        //   id: Plans.findOne({name:"General Plan"}).treatments[2].id,
        //   createdAt: new Date(),
        //   field1: Plans.findOne({name:"General Plan"}).treatments[2].field1 ,
        //  value1: Plans.findOne({name:"General Plan"}).treatments[2].value1,
        //  field2: Plans.findOne({name:"General Plan"}).treatments[2].field2 ,
        //  value2: Plans.findOne({name:"General Plan"}).treatments[2].value2,
        //  field3: Plans.findOne({name:"General Plan"}).treatments[2].field3 ,
        //  value3: Plans.findOne({name:"General Plan"}).treatments[2].value3,
        //  field4: Plans.findOne({name:"General Plan"}).treatments[2].field4 ,
        //  value4: Plans.findOne({name:"General Plan"}).treatments[2].value4,
        //  field5: Plans.findOne({name:"General Plan"}).treatments[2].field5,
        //  value5: Plans.findOne({name:"General Plan"}).treatments[2].value5,
        //  field6: Plans.findOne({name:"General Plan"}).treatments[2].field6 ,
        //  value6: Plans.findOne({name:"General Plan"}).treatments[2].value6,
        //  field7: Plans.findOne({name:"General Plan"}).treatments[2].field7 ,
        //  value7: Plans.findOne({name:"General Plan"}).treatments[2].value7,
        //  field8: Plans.findOne({name:"General Plan"}).treatments[2].field8 ,
        //  value8: Plans.findOne({name:"General Plan"}).treatments[2].value8 
          
        // }
      // ]
    });
    
    // var temp = Plans.findOne({tempsearch : {$exists : true}});
    // if (temp) {
    // Plans.update({_id: temp._id } , {$unset : {tempsearch : ""}});  
    // }
    
    var temp = Plans.findOne({userId: Meteor.userId()});

    if (temp) {
    Plans.update({_id: temp._id } , {$unset : {tempsearch : "" , userId : true}});  
    }

     Plans.update(list1_id, {$set: {tempsearch : list1_id , userId: Meteor.userId()}});
     console.log(list1_id);
    //  return  Notifications.addNotification("Success", "New Tretment Plan been created", {type:parseInt(4, 10), timeout: parseInt(5000, 10), userCloseable: true  });
   Router.go('plansShow', {_id: list1_id});
 //  Session.set("searchplan" , list1_id );
     Notifications.addNotification("Success", "New Tretment Plan been created", {type:parseInt(4, 10), timeout: parseInt(5000, 10), userCloseable: true  });;
  } else {
    return false;
  }
    
    // Router.go('plansShow', list1);
    
    // Router.go('plansShow');
  },


});
//Meteor.methods - last work on




// http://projectricochet.com/blog/meteor-js-performance#.Ve_pqxGqqko  --Which templates are being reprocessed? TIPS FOR Debugging METEOR JS //
                                        // OR  http://stackoverflow.com/questions/15422456/detecting-which-reactive-query-was-triggered //
  //   _.each(Template, function (template, name) {
  //     var oldRender = template.rendered;
  //     var counter = 0;
 
  //     template.rendered = function () {
  //       console.log(name, "render count: ", ++counter);
  //       oldRender && oldRender.apply(this, arguments);
  //     };
  //   });
  // }



  //LIST//
  //DA probvam da pokazvam vremeto bez input  
  // disable helper za mtx , patient 