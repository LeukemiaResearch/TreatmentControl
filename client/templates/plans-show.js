var EDITING_KEY = 'editingPlan';
Session.setDefault(EDITING_KEY, false);

// Track if this is the first time the list template is rendered
var firstRender = true;
var planRenderHold = LaunchScreen.hold();
planFadeInHold = null;


Template.plansShow.onRendered(function() {
  if (firstRender) {
    // Released in app-body.js
    planFadeInHold = LaunchScreen.hold();

    // Handle for launch screen defined in app-body.js
    planRenderHold.release();    
    firstRender = false;

  }

  // $(".content-scrollable form").not('.treatment').slice(1, 20).addClass('blue');
 // $(".content-scrollable form.treatment").next().siblings().not(".treatment").addClass('blue');


   
 

  this.find('.js-title-nav')._uihooks = {
    insertElement: function(node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .fadeIn();
    },
    removeElement: function(node) {
      $(node).fadeOut(function() {
        this.remove();
      });
    }
  };
});





Template.plansShow.helpers({

  //hidden the Treatment plan if mtx Nr not been register
  hidden : function(list) {
    if(!this.header.mtx) {
       return 'hidden'; 
    }
    else 
      return;
  },
 
  disabled : function (list) {
    // if(this.treatments.tree.field4.pcreatin && this.treatments.tree.createdAt) {
    //   Session.set("disabled", "ready");
    // }
    if(this.treatments.tree.checked || Session.equals("third" , "blue")) { Session.set("disabled", "disabled"); }
    else { Session.set("disabled", ""); }

    return Session.get("disabled");
  },

  disabled1 : function (list) {
    // if(this.treatments.five.field1.semtx && this.treatments.five.field2.pcreatin && this.treatments.five.createdAt && this.treatments.five.field3.semtx) {
    //   Session.set("disabled", "ready");
    // }
    if(this.treatments.five.checked || Session.equals("fifth" , "blue")) { Session.set("disabled", "disabled"); }
    else { Session.set("disabled", ""); }

    return Session.get("disabled");
  },

  disabled2 : function (list) {
    // if(this.treatments.seven.field1.semtx && this.treatments.seven.createdAt && this.treatments.seven.field2.pcreatin) {
    //   Session.set("disabled", "ready");
    // }
    if(this.treatments.seven.checked || Session.equals("seven" , "blue")) { Session.set("disabled", "disabled"); }
    else { Session.set("disabled", ""); }

    return Session.get("disabled");
  },

  disabled3 : function (list) {
    // if(this.treatments.eight.field1.semtx && this.treatments.eight.createdAt && this.treatments.eight.field2.name) {
    //   Session.set("disabled", "ready");
    // }
    if(this.treatments.eight.checked || Session.equals("eight" , "blue")) { Session.set("disabled", "disabled"); }
    else { Session.set("disabled", ""); }

    return Session.get("disabled");
  },

  disabled4 : function (list) {
    // if(this.treatments.nine.hurtig.first.field1.semtx && this.treatments.nine.hurtig.first.createdAt && this.treatments.nine.hurtig.first.field2.name) {
    //   Session.set("disabled", "ready");
    // }
    if(this.treatments.nine.hurtig.first.checked || Session.equals("nine" , "blue")) { Session.set("disabled", "disabled"); }
    else { Session.set("disabled", ""); }

    return Session.get("disabled");
  },

  disabled5 : function (list) {
    // if(this.treatments.nine.hurtig.second.field1.semtx && this.treatments.nine.hurtig.second.createdAt && this.treatments.nine.hurtig.second.field2.name) {
    //   Session.set("disabled", "ready");
    // }
    if(this.treatments.nine.hurtig.second.checked || Session.equals("ten" , "blue")) { Session.set("disabled", "disabled"); }
    else { Session.set("disabled", ""); }

    return Session.get("disabled");
  },

  disabled6 : function (list) {
    // if(this.treatments.nine.normal.first.field1.semtx && this.treatments.nine.normal.first.createdAt && this.treatments.nine.normal.first.field2.name) {
    //   Session.set("disabled", "ready");
    // }
    if(this.treatments.nine.normal.first.checked || Session.equals("eleven" , "blue")) { Session.set("disabled", "disabled"); }
    else { Session.set("disabled", ""); }

    return Session.get("disabled");
  },

  disabled7 : function (list) {
    // if(this.treatments.nine.normal.second.field1.semtx && this.treatments.nine.normal.second.createdAt && this.treatments.nine.normal.second.field2.name) {
    //   Session.set("disabled", "ready");
    // }
    if(this.treatments.nine.normal.second.checked || Session.equals("twelve" , "blue")) { Session.set("disabled", "disabled"); }
    else { Session.set("disabled", ""); }

    return Session.get("disabled");
  },

  disabled8 : function (list) {
    // if(this.treatments.nine.normal.third.field1.semtx && this.treatments.nine.normal.third.createdAt && this.treatments.nine.normal.third.field2.pcreatin && this.treatments.nine.normal.third.field4.name) {
    //   Session.set("disabled", "ready");
    // }
    if(this.treatments.nine.normal.third.checked || Session.equals("thirdteen" , "blue")) { Session.set("disabled", "disabled"); }
    else { Session.set("disabled", ""); }

    return Session.get("disabled");
  },





   // FIRST FORM //
  checkedClass1 : function(list) {
   
  if (this.treatments.one.checked === true) { 
      Session.set("first" , "treatment");
      Session.set("second" , "");
  } 
  else {
    Session.set("first" , "");
    Session.set("second" , "blue");
  } 
    return Session.get("first");
  },

   // SECOND FORM //
  checkedClass2 : function(list) {
    
    if(this.treatments.two.checked === true)  {    
     Session.set("second" , "treatment");
     Session.set("third" , "");     
   }   
   else  {
        if (Session.equals("first", "treatment")) {
          Session.set("second" , "");
         }      
          else {  Session.set("second" , "blue");  }       
     Session.set("third" , "blue");      
   }
    return Session.get("second");
  },

  // THIRD FORM //
  checkedClass3 : function(list) {
    
   if(this.treatments.tree.checked === true)  {   
     Session.set("third" , "treatment");
     Session.set("forth" , "");            
   }   
   else  {
      if (Session.equals("second", "treatment")) { Session.set("third" , ""); } else { Session.set("third" , "blue"); }
      Session.set("forth" , "blue");
   }
    return Session.get("third");
  },

   // FORTH FORM //
  checkedClass4 : function(list) {
   
   if(this.treatments.four.checked === true)  {   
     Session.set("forth" , "treatment");
     Session.set("fifth" , "");            
   }   
   else  {
      if (Session.equals("third", "treatment")) { Session.set("forth" , ""); } else { Session.set("forth" , "blue"); }
      Session.set("fifth" , "blue");
   }
    return Session.get("forth");
  },

  // FIFTH FORM //
  checkedClass5 : function(list) {
    
   if(this.treatments.five.checked === true)  {   
     Session.set("fifth" , "treatment");
     Session.set("six" , "");            
   }   
   else  {
      if (Session.equals("forth", "treatment")) { Session.set("fifth" , ""); } else { Session.set("fifth" , "blue"); }
      Session.set("six" , "blue");
   }
    return Session.get("fifth");
  },

  // SIXTH FORM //
  checkedClass6 : function(list) {
      
   if(this.treatments.six.checked === true)  {   
     Session.set("six" , "treatment");
     Session.set("seven" , "");            
   }   
   else  {
      if (Session.equals("fifth", "treatment")) { Session.set("six" , ""); } else { Session.set("six" , "blue"); }
      Session.set("seven" , "blue");
   }
    return Session.get("six");
    },

     // SEVEN FORM //
  checkedClass7 : function(list) {
     
   if(this.treatments.seven.checked === true)  {   
     Session.set("seven" , "treatment");
     Session.set("eight" , "");            
   }   
   else  {
      if (Session.equals("six", "treatment")) { Session.set("seven" , ""); } else { Session.set("seven" , "blue"); }
      Session.set("eight" , "blue");
   }
    return Session.get("seven");
  },

     // EIGHT FORM //
  checkedClass8 : function(list) {
     
   if(this.treatments.eight.checked === true)  {   
     Session.set("eight" , "treatment");
     Session.set("nine" , "");            
   }   
   else  {
      if (Session.equals("seven", "treatment")) { Session.set("eight" , ""); } else { Session.set("eight" , "blue"); }
      Session.set("nine" , "blue");
   }
    return Session.get("eight");
  },

  // NINE FORM  HURTIG FIRST
  checkedClass9 : function(list) {
    if(this.treatments.nine.hurtig.first.checked === true)  {   
     Session.set("nine" , "treatment");
     Session.set("ten" , "");            
   }   
   else  {
      if (Session.equals("eight", "treatment")) { Session.set("nine" , ""); } else { Session.set("nine" , "blue"); }
      Session.set("ten" , "blue");
   }
    return Session.get("nine");
  },

  // NINE FORM  HURTIG SECOND LAST  
  checkedClass10 : function(list) {
    if(this.treatments.nine.hurtig.second.checked === true)  {   
     Session.set("ten" , "treatment");
    // Session.set("ten" , "");            
   }   
   else  {
      if (Session.equals("nine", "treatment")) { Session.set("ten" , ""); } else { Session.set("ten" , "blue"); }
     // Session.set("ten" , "blue");
   }
    return Session.get("ten");
  },


  // NINE FORM NORMAL FIRST
  checkedClass11 : function(list) {
     if(this.treatments.nine.normal.first.checked === true)  {   
     Session.set("eleven" , "treatment");
     Session.set("twelve" , "");            
   }   
   else  {
      if (Session.equals("eight", "treatment")) { Session.set("eleven" , ""); } else { Session.set("eleven" , "blue"); }
      Session.set("twelve" , "blue");
   }
    return Session.get("eleven");
  },


  // NINE FORM NORMAL SECOND
  checkedClass12 : function(list) {
    if(this.treatments.nine.normal.second.checked === true)  {   
     Session.set("twelve" , "treatment");
     Session.set("thirdteen" , "");            
   }   
   else  {
      if (Session.equals("eleven", "treatment")) { Session.set("twelve" , ""); } else { Session.set("twelve" , "blue"); }
      Session.set("thirdteen" , "blue");
   }
    return Session.get("twelve");
  },

  // NINE FORM NORMAL THIRD
  checkedClass13 : function(list) {
    if(this.treatments.nine.normal.third.checked === true)  {   
     Session.set("thirdteen" , "treatment");
     //Session.set("thirdteen" , "");            
   }   
   else  {
      if (Session.equals("twelve", "treatment")) { Session.set("thirdteen" , ""); } else { Session.set("thirdteen" , "blue"); }
     // Session.set("thirdteen" , "blue");
   }
    return Session.get("thirdteen");
  },


 // checkbox dev
 checkedClass  :  function(list, template) {
  //if(this.header.mtx>0) {
   //  $(".content-scrollable form").not('.treatment').slice(1, 15).addClass('blue'); // GENERAL STATE 
  //}
 
  // // FIRST FORM //
  // if (this.treatments.one.checked === true) {
  //    // $(".content-scrollable form:first").removeClass('blue'); 
  //    // $(".content-scrollable form:first").addClass('treatment');
  //    // $(".content-scrollable form:first").next().removeClass('blue');   
  //     Session.set("first" , "treatment");
  //     Session.set("second" , "");
  // } 
  // else {
  //  // $(".content-scrollable form:first").removeClass('treatment');
  //  // $(".content-scrollable form:first").next().addClass('blue');
  //   Session.set("first" , "");
  //   Session.set("second" , "blue");
  // } 
  
  // // SECOND FORM //
  //   if(this.treatments.two.checked === true)  {   
  //   // $(".content-scrollable form.treatment:last").next().siblings().not(".treatment").addClass('blue');
     
  //    // $(".content-scrollable form:first").next().addClass('treatment');
  //    // $(".content-scrollable form:first").next().next().removeClass('blue'); 
  //    Session.set("second" , "treatment");
  //    Session.set("third" , "");     
  //  }   
  //  else  {
  //   // $(".content-scrollable form:first").next().removeClass('treatment');
  //   // $(".content-scrollable form:first").next().next().addClass('blue');
  //    // if (Session.equals("first", "treatment")) { // PROBA DALI E PO-BARZO SAS SESSION
  //       if (Session.equals("first", "treatment")) {
  //         Session.set("second" , "");
  //        }      
  //         else {  Session.set("second" , "blue");  } 
       
    
  //    Session.set("third" , "blue");      
  //  }


   // // THIRD FORM //
   // if(this.treatments.tree.checked === true)  {   
        
   //   // $(".content-scrollable form:first").next().next().addClass('treatment');
   //   // $(".content-scrollable form:first").next().next().next().removeClass('blue');
   //   Session.set("third" , "treatment");
   //   Session.set("forth" , "");            
   // }   
   // else  {
   //  // $(".content-scrollable form:first").next().next().removeClass('treatment');
   //  // $(".content-scrollable form:first").next().next().next().addClass('blue');
   //    if (Session.equals("second", "treatment")) { Session.set("third" , ""); } else { Session.set("third" , "blue"); }
   //    Session.set("forth" , "blue");
   // }

   // //FORTH FORM //
   // if(this.treatments.four.checked === true)  {   
        
   //   $(".content-scrollable form:first").next().next().next().addClass('treatment');
   //   $(".content-scrollable form:first").next().next().next().next().removeClass('blue');
          
   // }   
   // else  {
   //  $(".content-scrollable form:first").next().next().next().removeClass('treatment');
   //  $(".content-scrollable form:first").next().next().next().next().addClass('blue');
     
   // }
   // // FIFTH FORM //
   // if(this.treatments.five.checked === true)  {   
        
   //   $(".content-scrollable form:first").next().next().next().next().addClass('treatment');
   //   $(".content-scrollable form:first").next().next().next().next().next().removeClass('blue');
          
   // }   
   // else  {
   //  $(".content-scrollable form:first").next().next().next().next().removeClass('treatment');
   //  $(".content-scrollable form:first").next().next().next().next().next().addClass('blue');
     
   // }
   // //SIX FORM
   // if(this.treatments.six.checked === true)  {   
        
   //   $(".content-scrollable form:first").next().next().next().next().next().addClass('treatment');
   //   $(".content-scrollable form:first").next().next().next().next().next().next().removeClass('blue');
          
   // }   
   // else  {
   //  $(".content-scrollable form:first").next().next().next().next().next().removeClass('treatment');
   //  $(".content-scrollable form:first").next().next().next().next().next().next().addClass('blue');
     
   // }
   // //SEVEN FORM
   // if(this.treatments.seven.checked === true)  {   
        
   //   $(".content-scrollable form:first").next().next().next().next().next().next().addClass('treatment');
   //   $(".content-scrollable form:first").next().next().next().next().next().next().next().removeClass('blue');
          
   // }   
   // else  {
   //  $(".content-scrollable form:first").next().next().next().next().next().next().removeClass('treatment');
   //  $(".content-scrollable form:first").next().next().next().next().next().next().next().addClass('blue');
     
   // }
   // //EIGHT FORM //
   // if(this.treatments.eight.checked === true)  {   
        
   //  $(".content-scrollable form:first").next().next().next().next().next().next().next().addClass('treatment');
   //  $(".content-scrollable form:first").next().next().next().next().next().next().next().next().next().next().next().removeClass('blue');
          
   // }   
   // else  {
   //  $(".content-scrollable form:first").next().next().next().next().next().next().next().removeClass('treatment');
   //  $(".content-scrollable form:first").next().next().next().next().next().next().next().next().next().next().next().addClass('blue');
     
   // }   
   
     
    // return Session.get('checkedClass');  // STAROTO 
  },

  editing: function() {
    return Session.get(EDITING_KEY);
  },

  todosReady: function() {
    return Router.current().todosHandle.ready();

  },

  todos: function(listId) {
   // return Todos.find({listId: listId}, {sort: {createdAt : -1}});
   var a = Plans.find({_id: listId });
   return Plans.find({_id: listId });
   console.log(a);
  },
  
  
   
  
   

});

//  // checkbox dev
// var checkedClass =  function(list, template) {
//    if(this.treatments.two.checked) {   
//      $(".content-scrollable form.treatment").next().siblings().not(".treatment").addClass('blue');
 
//  //     $(".content-scrollable form.treatment").next().next().addClass('blue');
//   // console.log(p);
//  //    if($(".content-scrollable form").hasClass('blue')) {
//  //       $(".content-scrollable form.blue").next().addClass('blue');
//     //}
//     // $("form.treatment").css("background-color" , "gray");
//        // $("#first").addClass('treatment');
//         // $(this).parent().parent().addClass('treatment');
//        // $(this).closest('form').addClass('treatment');
//     // Lists.update(this.listId, {$inc: {incompleteCount: checked ? -1 : 1}});
//     return 'treatment';
    
//    } else  {  
//     $(".content-scrollable form").removeClass('blue');
//   // $(".content-scrollable form.treatment").removeClass('treatment')
//       // $("form.treatment").css("background-color" , "white"); 
//       // $("#first").removeClass('treatment');
//        // $(this).parent().parent().removeClass('treatment');
//         // $(this).closest('form').removeClass('treatment');
//     //      return;
//   } 
  
//   };

var editPlan = function(list, template) {
  Session.set(EDITING_KEY, true);
  
  // force the template to redraw based on the reactive change
  Tracker.flush();
  
  template.$('.js-edit-form input[type=text]').focus();
};

var savePlan = function(list, template) {
  Session.set(EDITING_KEY, false);
  Plans.update(list._id, {$set: {name: template.$('[name=name]').val()}});
}

var deletePlan = function(list) {
  // ensure the last public list cannot be deleted.
  if (! list.userId && Plans.find({userId: {$exists: false}}).count() === 1) {
    return alert("Sorry, you cannot delete the final public plan!");
  }
  
  var message = "Are you sure you want to delete the plan " + list.name + "?";
  if (confirm(message)) {
    // we must remove each item individually from the client
    // Todos.find({listId: list._id}).forEach(function(todo) {
    //   Todos.remove(todo._id);
    // });
    Plans.remove(list._id);

    Router.go('home');
    return true;
  } else {
    return false;
  }
};

var togglePlanPrivacy = function(list) {
  if (! Meteor.user()) {
    return alert("Please sign in or create an account to make private plans.");
  }

  if (list.userId) {
    Plans.update(list._id, {$unset: {userId: true}});
  } else {
    // ensure the last public list cannot be made private
    if (Plans.find({userId: {$exists: false}}).count() === 1) {
      return alert("Sorry, you cannot make the final public plan private!");
    }

    Plans.update(list._id, {$set: {userId: Meteor.userId()}});
  }
};

// var jey = function() {
//   return $(".content-scrollable form").not('.treatment').slice(1, 15).addClass('blue'); // GENERAL STATE 
// };

// var colorchange = function(plan) {
//    var a =  $(".content-scrollable form.treatment").next().next().hasClass('blue');
//    var b = $(".content-scrollable form").hasClass('treatment'); 
//    var c = plan.treatments.two.checked;
//     if ( b == false) {
//       console.log(b);
//     return $(".content-scrollable form.treatment").next().siblings().not(".treatment").removeClass('blue'); 
//     } 
//      else  {
//       console.log(b);
//        return $(".content-scrollable form.treatment").next().siblings().not(".treatment").addClass('blue'); 
     
//      }
// };

Template.plansShow.events({
  'click .js-cancel': function() {
    Session.set(EDITING_KEY, false);
  },
  
  'keydown input[type=text]': function(event) {
    // ESC
    if (27 === event.which) {
      event.preventDefault();
      $(event.target).blur();
    }
  },
  
  'blur input[type=text]': function(event, template) {
    // if we are still editing (we haven't just clicked the cancel button)
    if (Session.get(EDITING_KEY))
      savePlan(this, template);
  },

  'submit .js-edit-form': function(event, template) {
    event.preventDefault();
    savePlan(this, template);
  },
  
  // handle mousedown otherwise the blur handler above will swallow the click
  // on iOS, we still require the click event so handle both
  'mousedown .js-cancel, click .js-cancel': function(event) {
    event.preventDefault();
    Session.set(EDITING_KEY, false);
  },

  'change .list-edit': function(event, template) {
    if ($(event.target).val() === 'edit') {
      editPlan(this, template);
    } else if ($(event.target).val() === 'delete') {
      deletePlan(this, template);
    } else {
      togglePlanPrivacy(this, template);
    }

    event.target.selectedIndex = 0;
  },
  
  'click .js-edit-list': function(event, template) {
    editPlan(this, template);
  },
  
  'click .js-toggle-list-privacy': function(event, template) {
    togglePlanPrivacy(this, template);
  },
  
  'click .js-delete-list': function(event, template) {
    deletePlan(this, template);
  },
  
  'click .js-todo-add': function(event, template) {
    template.$('.js-todo-new input').focus();
  },

  



// CHECKBOX DEVELOPMENT //
   

   // 'change [name=checked]': function(event, template) {
  'click [name=checked]': function(event, template) {
    // var checked = $(event.target).is(':checked');
    if( this.treatments.one.checked  && this.treatments.two.checked) {

      return alert("You cannot unregister this treatment before unregister the next one!");
    }
    if (!this.header.pcreatin || !this.patient.name || !this.patient.cpr || !this.patient.surface.value) { return alert("You must register the patient details first");}

     Plans.update(this._id, {$set: {"treatments.one.checked": ! this.treatments.one.checked , "treatments.one.userId" : Meteor.userId()}});  
    // colorchange(this);
     console.log(this.treatments.one.checked);
     console.log(Meteor.userId());
     if (this.treatments.one.checked === true) {     
      Session.set('checkedClass', 'treatment');
      
      // var b = $(".content-scrollable form").hasClass('treatment'); 
      // console.log(b);
       // var c = $(".content-scrollable form.treatment").next().siblings().not(".treatment").addClass('blue');
       // console.log(c);
         
     }
     else {
       //var d =  $(".content-scrollable form").next().siblings().not(".treatment").removeClass('blue');
       //  var d =  $(".content-scrollable form").removeClass('blue');
       // console.log(d);
         Session.set('checkedClass','');   
     }
     
   // var a =  $(".content-scrollable form.treatment");
   // var b =  $(".content-scrollable form:last");   
    // $(".content-scrollable form.treatment").next().siblings().not(".treatment").addClass('blue');
   // console.log(a);
   // console.log(b);
   // console.log(c);  
     
    //  else {
    //     // $(".content-scrollable form").removeClass('blue');
    //  $(".content-scrollable form.treatment").next().siblings().not(".treatment").addClass('blue');
    //  }

    if( this.treatments.one.userId && this.treatments.one.checked === true) {
          Plans.update(this._id, {$unset: {"treatments.one.userId" : true}});
    }

  },

  'click [name=checked1]': function(event, template) {
    var checked = $(event.target).is(':checked');
    if( !this.treatments.one.checked ) {

      return alert("You cannot register this treatment before the previous one!");
    }
    if( this.treatments.tree.checked ) {

      return alert("You cannot unregister this treatment before when next one is registered!");
    }
    else {     
      Plans.update(this._id, {$set: {"treatments.two.checked": ! this.treatments.two.checked , "treatments.two.userId" : Meteor.userId()}});  
    }
      
     if (this.treatments.two.checked === true) {     
      Session.set('checkedClass', 'treatment');         
     }
     else {       
         Session.set('checkedClass','');   
     }    
    if( this.treatments.two.userId && this.treatments.two.checked === true) {
          Plans.update(this._id, {$unset: {"treatments.two.userId" : true}});
    }
  },

// OPIT S BUTTON
  // 'click [name=checking]': function(event, template) {
  //   event.preventDefault();
  //   var checked = $(event.target).is(':submit');
  //   console.log(checked);
  //   if( !this.treatments.one.checked ) {
  //     checked = false;
  //     return alert("You cannot register this treatment before the previous one!");
  //   }
  //   Plans.update(this._id, {$set: {"treatments.two.checked": checked , "treatments.two.userId" : Meteor.userId()}});    
  //    if (checked === true) {     
  //     Session.set('checkedClass', 'treatment');         
  //    }
  //    else {       
  //        Session.set('checkedClass','');   
  //    }    
  //   if( this.treatments.two.userId && checked === true ) {
  //         Plans.update(this._id, {$unset: {"treatments.two.userId" : true}});
  //   }
  // },

  'click [name=checked2]': function(event, template) {
    var checked = $(event.target).is(':checked');
    if(!this.treatments.two.checked) {

      return alert("You cannot register this treatment before the previous one!");
    }
    if( this.treatments.four.checked ) {

      return alert("You cannot unregister this treatment before when next one is registered!");
    }
    else {
      if (!this.treatments.tree.field5.pcreatin) { return alert("You need to fill-in all fields first!");}
      Plans.update(this._id, {$set: {"treatments.tree.checked": ! this.treatments.tree.checked , "treatments.tree.userId" : Meteor.userId()}});  
    }
      
     if (this.treatments.tree.checked === true) {     
      Session.set('checkedClass', 'treatment');         
     }
     else {       
         Session.set('checkedClass','');   
     }    
    if( this.treatments.tree.userId && this.treatments.tree.checked === true) {
          Plans.update(this._id, {$unset: {"treatments.tree.userId" : true}});
    }
  },

  'click [name=checked3]': function(event, template) {
    // var checked = $(event.target).is(':checked');
    if(!this.treatments.tree.checked) {

      return alert("You cannot register this treatment before the previous one!");
    }
    if( this.treatments.five.checked ) {

      return alert("You cannot unregister this treatment before when next one is registered!");
    }
    else {
      Plans.update(this._id, {$set: {"treatments.four.checked": ! this.treatments.four.checked , "treatments.four.userId" : Meteor.userId()}});  
    }
      
     if (this.treatments.four.checked === true) {     
      Session.set('checkedClass', 'treatment');         
     }
     else {       
         Session.set('checkedClass','');   
     }    
    if( this.treatments.four.userId && this.treatments.four.checked === true) {
          Plans.update(this._id, {$unset: {"treatments.four.userId" : true}});
    }
  },

  'click [name=checked4]': function(event, template) {
    // var checked = $(event.target).is(':checked');
    if(!this.treatments.four.checked) {

      return alert("You cannot register this treatment before the previous one!");
    }
    if( this.treatments.six.checked ) {

      return alert("You cannot unregister this treatment before when next one is registered!");
    }
    else {
      if (!this.treatments.five.field1.semtx || !this.treatments.five.field2.pcreatin || !this.treatments.five.field3.semtx) { return alert("You need to fill-in all fields first!");}
      Plans.update(this._id, {$set: {"treatments.five.checked": ! this.treatments.five.checked , "treatments.five.userId" : Meteor.userId()}});  
    }
      
     if (this.treatments.five.checked === true) {     
      Session.set('checkedClass', 'treatment');         
     }
     else {       
         Session.set('checkedClass','');   
     }    
    if( this.treatments.five.userId && this.treatments.five.checked === true) {
          Plans.update(this._id, {$unset: {"treatments.five.userId" : true}});
    }
  },

  'click [name=checked5]': function(event, template) {
    // var checked = $(event.target).is(':checked');
    if(!this.treatments.five.checked) {

      return alert("You cannot register this treatment before the previous one!");
    }
    if( this.treatments.seven.checked ) {

      return alert("You cannot unregister this treatment before when next one is registered!");
    }
    else {
      Plans.update(this._id, {$set: {"treatments.six.checked": ! this.treatments.six.checked , "treatments.six.userId" : Meteor.userId()}});  
    }
      
     if (this.treatments.six.checked === true) {     
      Session.set('checkedClass', 'treatment');         
     }
     else {       
         Session.set('checkedClass','');   
     }    
    if( this.treatments.six.userId  && this.treatments.six.checked === true) {
          Plans.update(this._id, {$unset: {"treatments.six.userId" : true}});
    }
  },

  'click [name=checked6]': function(event, template) {
    // var checked = $(event.target).is(':checked');
    if(!this.treatments.six.checked) {

      return alert("You cannot register this treatment before the previous one!");
    }
    if( this.treatments.eight.checked ) {

      return alert("You cannot unregister this treatment before when next one is registered!");
    }
    else {
      if (!this.treatments.seven.field1.semtx || !this.treatments.seven.field2.pcreatin) { return alert("You need to fill-in all fields first!");}
      Plans.update(this._id, {$set: {"treatments.seven.checked": ! this.treatments.seven.checked , "treatments.seven.userId" : Meteor.userId()}});  
    }
      
     if (this.treatments.seven.checked === true) {     
      Session.set('checkedClass', 'treatment');         
     }
     else {       
         Session.set('checkedClass','');   
     }    
    if( this.treatments.seven.userId && this.treatments.seven.checked === true) {
          Plans.update(this._id, {$unset: {"treatments.seven.userId" : true}});
    }
  },

  'click [name=checked7]': function(event, template) {
    // var checked = $(event.target).is(':checked');
    if(!this.treatments.seven.checked) {

      return alert("You cannot register this treatment before the previous one!");
    }
    if( this.treatments.nine.hurtig.first.checked || this.treatments.nine.normal.first.checked ) {

      return alert("You cannot unregister this treatment before when next one is registered!");
    }
    else {
      if (!this.treatments.eight.field1.semtx || !this.treatments.eight.field2.name) { return alert("You need to fill-in all fields first!");}
      Plans.update(this._id, {$set: {"treatments.eight.checked": ! this.treatments.eight.checked , "treatments.eight.userId" : Meteor.userId()}});  
    }
      
     if (this.treatments.eight.checked === true) {     
      Session.set('checkedClass', 'treatment');         
     }
     else {       
         Session.set('checkedClass','');   
     }    
    if( this.treatments.eight.userId && this.treatments.eight.checked === true) {
          Plans.update(this._id, {$unset: {"treatments.eight.userId" : true}});
    }
  },

  'click [name=checked8]': function(event, template) {
    // var checked = $(event.target).is(':checked');
    if(!this.treatments.eight.checked) {

      return alert("You cannot register this treatment before the previous one!");
    }
    if( this.treatments.nine.hurtig.second.checked ) {

      return alert("You cannot unregister this treatment before when next one is registered!");
    }
    else {
      if (!this.treatments.nine.hurtig.first.field1.semtx || !this.treatments.nine.hurtig.first.field2.name) { return alert("You need to fill-in all fields first!");}
      Plans.update(this._id, {$set: {"treatments.nine.hurtig.first.checked": ! this.treatments.nine.hurtig.first.checked , "treatments.nine.hurtig.first.userId" : Meteor.userId()}});  
    }
      
     if (this.treatments.nine.hurtig.first.checked === true) {     
      Session.set('checkedClass', 'treatment');         
     }
     else {       
         Session.set('checkedClass','');   
     }    
    if( this.treatments.nine.hurtig.first.userId && this.treatments.nine.hurtig.first.checked === true) {
          Plans.update(this._id, {$unset: {"treatments.nine.hurtig.first.userId" : true}});
    }
  },

  'click [name=checked9]': function(event, template) {
    // var checked = $(event.target).is(':checked');
    if(!this.treatments.nine.hurtig.first.checked) {

      return alert("You cannot register this treatment before the previous one!");
    }
    // if( this.treatments.nine.hurtig.second.checked ) {

    //   return alert("You cannot unregister this treatment before when next one is registered!");
    // }
    else {
      if (!this.treatments.nine.hurtig.second.field1.semtx || !this.treatments.nine.hurtig.second.field2.name) { return alert("You need to fill-in all fields first!");}
      Plans.update(this._id, {$set: {"treatments.nine.hurtig.second.checked": ! this.treatments.nine.hurtig.second.checked , "treatments.nine.hurtig.second.userId" : Meteor.userId()}});  
    }
      
     if (this.treatments.nine.hurtig.second.checked === true) {     
      Session.set('checkedClass', 'treatment');         
     }
     else {       
         Session.set('checkedClass','');   
     }    
    if( this.treatments.nine.hurtig.second.userId && this.treatments.nine.hurtig.second.checked === true) {
          Plans.update(this._id, {$unset: {"treatments.nine.hurtig.second.userId" : true}});
    }
  },

  'click [name=checked10]': function(event, template) {
    // var checked = $(event.target).is(':checked');
    if(!this.treatments.eight.checked) {

      return alert("You cannot register this treatment before the previous one!");
    }
    if( this.treatments.nine.normal.second.checked ) {

      return alert("You cannot unregister this treatment before when next one is registered!");
    }
    else {
      if (!this.treatments.nine.normal.first.field1.semtx || !this.treatments.nine.normal.first.field2.name) { return alert("You need to fill-in all fields first!");}
      Plans.update(this._id, {$set: {"treatments.nine.normal.first.checked": ! this.treatments.nine.normal.first.checked , "treatments.nine.normal.first.userId" : Meteor.userId()}});  
    }
      
     if (this.treatments.nine.normal.first.checked === true) {     
      Session.set('checkedClass', 'treatment');         
     }
     else {       
         Session.set('checkedClass','');   
     }    
    if( this.treatments.nine.normal.first.userId && this.treatments.nine.normal.first.checked === true) {
          Plans.update(this._id, {$unset: {"treatments.nine.normal.first.userId" : true}});
    }
  },

  'click [name=checked11]': function(event, template) {
    // var checked = $(event.target).is(':checked');
    if(!this.treatments.nine.normal.first.checked) {

      return alert("You cannot register this treatment before the previous one!");
    }
    if( this.treatments.nine.normal.third.checked ) {

      return alert("You cannot unregister this treatment before when next one is registered!");
    }
    else {
      if (!this.treatments.nine.normal.second.field1.semtx || !this.treatments.nine.normal.second.field2.name) { return alert("You need to fill-in all fields first!");}
      Plans.update(this._id, {$set: {"treatments.nine.normal.second.checked": ! this.treatments.nine.normal.second.checked , "treatments.nine.normal.second.userId" : Meteor.userId()}});  
    }
      
     if (this.treatments.nine.normal.second.checked === true) {     
      Session.set('checkedClass', 'treatment');         
     }
     else {       
         Session.set('checkedClass','');   
     }    
    if( this.treatments.nine.normal.second.userId && this.treatments.nine.normal.second.checked === true) {
          Plans.update(this._id, {$unset: {"treatments.nine.normal.second.userId" : true}});
    }
  },

  'click [name=checked12]': function(event, template) {
    // var checked = $(event.target).is(':checked');
    if(!this.treatments.nine.normal.second.checked) {

      return alert("You cannot register this treatment before the previous one!");
    }
    // if( this.treatments.nine.normal.third.checked ) {

    //   return alert("You cannot unregister this treatment before when next one is registered!");
    // }
  
      if (!this.treatments.nine.normal.third.field1.semtx || !this.treatments.nine.normal.third.field2.pcreatin || !this.treatments.nine.normal.third.field4.name) { return alert("You need to fill-in all fields first!");}
      Plans.update(this._id, {$set: {"treatments.nine.normal.third.checked": ! this.treatments.nine.normal.third.checked , "treatments.nine.normal.third.userId" : Meteor.userId()}});  
    
      
     if (this.treatments.nine.normal.third.checked === true) {     
      Session.set('checkedClass', 'treatment');         
     }
     else {       
         Session.set('checkedClass','');   
     }    
    if( this.treatments.nine.normal.third.userId && this.treatments.nine.normal.third.checked === true) {
          Plans.update(this._id, {$unset: {"treatments.nine.normal.third.userId" : true}});
    }
  },
  
  
  
  // 'blur input[name=patientname] input[name=mtx] input[name=semtx] input[name=semtx1] input[name=semtx2] input[name=semtx3] input[name=semtx4] input[name=semtx5] input[name=semtx6] input[name=semtx7] input[name=semtx8] input[name=docname] input[name=docname1] input[name=docname2] input[name=docname3] input[name=docname4] input[name=docname5]': function(event) {
  //   if (Session.equals(EDITING_KEY, this._id))
  //     Session.set(EDITING_KEY, null);
  // },

  // 'blur input[name=cpr]': function(event) {
  //   if (Session.equals(EDITING_KEY, this._id))
  //     Session.set(EDITING_KEY, null);
  // },
  
  // 'blur input[name=mtx]': function(event) {
  //   if (Session.equals(EDITING_KEY, this._id))
  //     Session.set(EDITING_KEY, null);
  // },

  // 'blur input[name=height]': function(event) {
  //   if (Session.equals(EDITING_KEY, this._id))
  //     Session.set(EDITING_KEY, null);
  // },

  // 'blur input[name=weight]': function(event) {
  //   if (Session.equals(EDITING_KEY, this._id))
  //     Session.set(EDITING_KEY, null);
  // },

  // 'blur input[name=pcreatin] input[name=pcreatin1] input[name=pcreatin2] input[name=pcreatin3] input[name=pcreatin4]': function(event) {
  //   if (Session.equals(EDITING_KEY, this._id))
  //     Session.set(EDITING_KEY, null);
  // },

  'blur .inputfield': function(event) {
    if (Session.equals(EDITING_KEY, this._id))
      Session.set(EDITING_KEY, null);
  },

  'keydown .inputfield': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },


  // 'keydown input[name=patientname]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // 'keydown input[name=cpr]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // 'keydown input[name=mtx]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // 'keydown input[name=semtx]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // 'keydown input[name=semtx1]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // 'keydown input[name=semtx2]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // 'keydown input[name=semtx3]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // 'keydown input[name=semtx4]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // 'keydown input[name=semtx5]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // 'keydown input[name=semtx6]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // 'keydown input[name=semtx7]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },


  // 'keydown input[name=height]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // 'keydown input[name=weight]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // 'keydown input[name=pcreatin]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // 'keydown input[name=pcreatin1]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // 'keydown input[name=pcreatin2]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // 'keydown input[name=pcreatin3]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // 'keydown input[name=pcreatin4]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },
  
  // 'keydown input[name=docname]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // 'keydown input[name=docname1]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // 'keydown input[name=docname2]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // 'keydown input[name=docname3]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // 'keydown input[name=docname4]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // 'keydown input[name=docname5]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // 'keydown input[name=docname5]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },

  // update the text of the item on keypress but throttle the event to ensure
  // we don't flood the server with updates (handles the event at most once 
  // every 300ms)
  // 'keyup input[name=patientname]': _.throttle(function(event) {
  //   Plans.update(this._id, {$set: {"patient.name": event.target.value}});
  // }, 300),


  'keyup input.inputfield': _.debounce(function(event) {
    var DbFieldName = $(":focus").attr("name");
    console.log(DbFieldName);
    console.log(event.target.value);
    var param = {};
    param[DbFieldName] = event.target.value;
    Plans.update(this._id, {$set: param});
  }),

  // 'keyup input[name=patientname]': _.throttle(function(event) {
  //   Plans.update(this._id, {$set: {"patient.name": event.target.value}});
  // }),

  // 'keyup input[name=cpr]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"patient.cpr": event.target.value}});
  // }),

  

  // 'keyup input[name=mtx]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"header.mtx": event.target.value}});
  // }),
  

  // 'keyup input[name=height]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"patient.height": event.target.value}});
  // }),

  // 'keyup input[name=weight]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"patient.weight": event.target.value}});
  // }),

  // 'keyup input[name=pcreatin]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"header.pcreatin": event.target.value}});
  // }),

  // 'keyup input[name=pcreatin1]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"treatments.tree.field5.pcreatin": event.target.value}});
  // }),

  // 'keyup input[name=pcreatin2]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"treatments.five.field2.pcreatin": event.target.value}});
  // }),

  // 'keyup input[name=pcreatin3]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"treatments.seven.field2.pcreatin": event.target.value}});
  // }),

  // 'keyup input[name=pcreatin4]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"treatments.nine.normal.third.field2.pcreatin": event.target.value}});
  // }),

  // 'keyup input[name=semtx]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"treatments.five.field1.semtx": event.target.value}});
  // }),

  // 'keyup input[name=semtx1]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"treatments.five.field3.semtx": event.target.value}});
  // }),

  // 'keyup input[name=semtx2]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"treatments.seven.field1.semtx": event.target.value}});
  // }),

  // 'keyup input[name=semtx3]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"treatments.eight.field1.semtx": event.target.value}});
  // }),

  // 'keyup input[name=semtx4]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"treatments.nine.hurtig.first.field1.semtx": event.target.value}});
  // }),

  // 'keyup input[name=semtx5]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"treatments.nine.hurtig.second.field1.semtx": event.target.value}});
  // }),

  // 'keyup input[name=semtx6]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"treatments.nine.normal.first.field1.semtx": event.target.value}});
  // }),

  // 'keyup input[name=semtx7]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"treatments.nine.normal.second.field1.semtx": event.target.value}});
  // }),

  // 'keyup input[name=semtx8]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"treatments.nine.normal.third.field1.semtx": event.target.value}});
  // }),


  // 'keyup input[name=docname]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"treatments.eight.field2.name": event.target.value}});
  // }, 300),

  // 'keyup input[name=docname1]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"treatments.nine.hurtig.first.field2.name": event.target.value}});
  // }, 300),

  // 'keyup input[name=docname2]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"treatments.nine.hurtig.second.field2.name": event.target.value}});
  // }, 300),

  // 'keyup input[name=docname3]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"treatments.nine.normal.first.field2.name": event.target.value}});
  // }, 300),

  // 'keyup input[name=docname4]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"treatments.nine.normal.second.field2.name": event.target.value}});
  // }, 300),

  // 'keyup input[name=docname5]': _.debounce(function(event) {
  //   Plans.update(this._id, {$set: {"treatments.nine.normal.third.field4.name": event.target.value}});
  // }, 300),


});


// V MOMENTA TRQBVA DA NAPRAVQ KOREKCIQ NA DATABASE-A, TREATMENTS VAV VSEKI FIELD DA {METHOD, VALUE , TEXT} 

 // FRONT END  -   DIV KADETO SA OTDELNITE <FORM CLASS="{{HELPER + SMENQ6TA SE SAS SESSION}}"> 
 // DA REAGIRA NA CHECK-BOX INPUT SAS VALIDACIQ   + SMENQ BACCKGROUND COLOR

 // NA POVTARQ6TIE SE KATO POZICIQ ELEMENTI DA ZADAM EDNAKAV CLASS ZA DA MOGA DA GI MESTQ PO VIEW-TO EDNOVREMENNO 
 //  NAPRIMER DIV CLASS TIME ZA DA KORIGIRAM POZICIQTA NA VSI4KIT TEXTOVE DATO PO FRONT-END-A 



// DA VKARAM PLANA ZA NORMAL EXTRACTION NA HIMIKALITE I DA VIDQ KAK DA NAPRAVQ LOGIKATA DA RABOTI I PRI "" STOINOSTI !!! -   PO VAZMOJNOST ZA UTRE  -- DONE


// Da NE ZABRAVQ DA OPRAVQ REF NA DATETIME ATRIBUTIRE NA VSI4KI POLETA PREDI DA PRODALJA


   // 38 + 275  CHECKBOX -- STATUS: USERID - DA , BACKGROUND - COLOR - DA ,  /////////////////    TRQBVA DA SE NARAVI LOGIC ZA SLEDVASHTITE FORM-S I INPUT FIELSD TO BE 
   // SETTED DISABLE I ALERT BOX KOQTO DA PROVERI DALI VSI4KI INPUT-I SA POPALNENI !!!   ====  DONE


   // DA NAPRAVQ CHECKBOX-OVETE NA POSLEDNITE HURTIG NORMAL INPUT-I   !!!! ====DONE

   // DA DOVARSHA disabled form validation POSLEDNO WORK ON


   