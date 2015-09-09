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

 // checkbox dev
 checkedClass  :  function(list, template) {

   if(this.treatments.two.checked === true)  {   
     $(".content-scrollable form.treatment").next().siblings().not(".treatment").addClass('blue');
 //     $(".content-scrollable form.treatment").next().next().addClass('blue');
  // console.log(p);
 //    if($(".content-scrollable form").hasClass('blue')) {
 //       $(".content-scrollable form.blue").next().addClass('blue');
    //}
    // $("form.treatment").css("background-color" , "gray");
       // $("#first").addClass('treatment');
        // $(this).parent().parent().addClass('treatment');
       // $(this).closest('form').addClass('treatment');
    // Lists.update(this.listId, {$inc: {incompleteCount: checked ? -1 : 1}});
    
  return 'treatment';

   }   
   else {
    //$(".content-scrollable form.treatment").next().siblings().not(".treatment").removeClass('blue');
    $(".content-scrollable form").removeClass('blue');
    //return;
   }  
    // $(".content-scrollable form").removeClass('blue');
  // $(".content-scrollable form.treatment").removeClass('treatment')
      // $("form.treatment").css("background-color" , "white"); 
      // $("#first").removeClass('treatment');
       // $(this).parent().parent().removeClass('treatment');
        // $(this).closest('form').removeClass('treatment');
    return Session.get('checkedClass');
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
  // 'click [type=checkbox]' : function(event, template){
  //    colorchange(this);
  // },

   
  'change [type=checkbox]': function(event, template) {
    var checked = $(event.target).is(':checked');
    Plans.update(this._id, {$set: {"treatments.two.checked": checked , "treatments.two.userId" : Meteor.userId()}});
    // colorchange(this);
     console.log(checked);
     if (checked === true) {     
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

    if( this.treatments.two.userId ) {
          Plans.update(this._id, {$unset: {"treatments.two.userId" : true}});
    }

  },
  // 'submit .js-todo-new': function(event) {
  //   event.preventDefault();

  //   var $input = $(event.target).find('[type=text]');
  //   if (! $input.val())
  //     return;
    
  //   Todos.insert({
  //     listId: this._id,
  //     text: $input.val(),
  //     checked: false,
  //     createdAt: new Date()
  //   });
  //   Lists.update(this._id, {$inc: {incompleteCount: 1}});
  //   $input.val('');
  // } ,

  // 'focus input[name=patientname]': function(event) {
  //   Session.set(EDITING_KEY, this._id);
  // },

  // 'focus input[name=mtx]': function(event) {
  //   Session.set(EDITING_KEY, this._id);
  // },
  
  
  'blur input[name=patientname] input[name=mtx] input[name=semtx] input[name=semtx1] input[name=semtx2] input[name=semtx3] input[name=semtx4] input[name=semtx5] input[name=semtx6] input[name=semtx7] input[name=semtx8] input[name=docname] input[name=docname1] input[name=docname2] input[name=docname3] input[name=docname4] input[name=docname5]': function(event) {
    if (Session.equals(EDITING_KEY, this._id))
      Session.set(EDITING_KEY, null);
  },

  'blur input[name=cpr]': function(event) {
    if (Session.equals(EDITING_KEY, this._id))
      Session.set(EDITING_KEY, null);
  },
  
  'blur input[name=mtx]': function(event) {
    if (Session.equals(EDITING_KEY, this._id))
      Session.set(EDITING_KEY, null);
  },

  'blur input[name=height]': function(event) {
    if (Session.equals(EDITING_KEY, this._id))
      Session.set(EDITING_KEY, null);
  },

  'blur input[name=weight]': function(event) {
    if (Session.equals(EDITING_KEY, this._id))
      Session.set(EDITING_KEY, null);
  },

  'blur input[name=pcreatin] input[name=pcreatin1] input[name=pcreatin2] input[name=pcreatin3] input[name=pcreatin4]': function(event) {
    if (Session.equals(EDITING_KEY, this._id))
      Session.set(EDITING_KEY, null);
  },

  'keydown input[name=patientname]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  'keydown input[name=cpr]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  'keydown input[name=mtx]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  'keydown input[name=semtx]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  'keydown input[name=semtx1]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  'keydown input[name=semtx2]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  'keydown input[name=semtx3]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  'keydown input[name=semtx4]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  'keydown input[name=semtx5]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  'keydown input[name=semtx6]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  'keydown input[name=semtx7]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },


  'keydown input[name=height]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  'keydown input[name=weight]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  'keydown input[name=pcreatin]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  'keydown input[name=pcreatin1]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  'keydown input[name=pcreatin2]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  'keydown input[name=pcreatin3]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  'keydown input[name=pcreatin4]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },
  
  'keydown input[name=docname]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  'keydown input[name=docname1]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  'keydown input[name=docname2]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  'keydown input[name=docname3]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  'keydown input[name=docname4]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  'keydown input[name=docname5]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  // update the text of the item on keypress but throttle the event to ensure
  // we don't flood the server with updates (handles the event at most once 
  // every 300ms)
  'keyup input[name=patientname]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"patient.name": event.target.value}});
  }, 300),

  'keyup input[name=cpr]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"patient.cpr": event.target.value}});
  }, 300),

  'keyup input[name=mtx]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"header.mtx": event.target.value}});
  }, 300),

  'keyup input[name=height]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"patient.height": event.target.value}});
  }, 300),

  'keyup input[name=weight]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"patient.weight": event.target.value}});
  }, 300),

  'keyup input[name=pcreatin]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"header.pcreatin": event.target.value}});
  }, 300),

  'keyup input[name=pcreatin1]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"treatments.tree.field4.pcreatin": event.target.value}});
  }, 300),

  'keyup input[name=pcreatin2]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"treatments.five.field2.pcreatin": event.target.value}});
  }, 300),

  'keyup input[name=pcreatin3]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"treatments.seven.field2.pcreatin": event.target.value}});
  }, 300),

  'keyup input[name=pcreatin4]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"treatments.nine.normal.third.field2.pcreatin": event.target.value}});
  }, 300),

  'keyup input[name=semtx]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"treatments.five.field1.semtx": event.target.value}});
  }, 300),

  'keyup input[name=semtx1]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"treatments.five.field3.semtx": event.target.value}});
  }, 300),

  'keyup input[name=semtx2]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"treatments.seven.field1.semtx": event.target.value}});
  }, 300),

  'keyup input[name=semtx3]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"treatments.eight.field1.semtx": event.target.value}});
  }, 300),

  'keyup input[name=semtx4]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"treatments.nine.hurtig.first.field1.semtx": event.target.value}});
  }, 300),

  'keyup input[name=semtx5]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"treatments.nine.hurtig.second.field1.semtx": event.target.value}});
  }, 300),

  'keyup input[name=semtx6]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"treatments.nine.normal.first.field1.semtx": event.target.value}});
  }, 300),

  'keyup input[name=semtx7]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"treatments.nine.normal.second.field1.semtx": event.target.value}});
  }, 300),

  'keyup input[name=semtx8]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"treatments.nine.normal.third.field1.semtx": event.target.value}});
  }, 300),


  'keyup input[name=docname]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"treatments.eight.field2.name": event.target.value}});
  }, 300),

  'keyup input[name=docname1]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"treatments.nine.hurtig.first.field2.name": event.target.value}});
  }, 300),

  'keyup input[name=docname2]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"treatments.nine.hurtig.second.field2.name": event.target.value}});
  }, 300),

  'keyup input[name=docname3]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"treatments.nine.normal.first.field2.name": event.target.value}});
  }, 300),

  'keyup input[name=docname4]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"treatments.nine.normal.second.field2.name": event.target.value}});
  }, 300),

  'keyup input[name=docname5]': _.throttle(function(event) {
    Plans.update(this._id, {$set: {"treatments.nine.normal.third.field4.name": event.target.value}});
  }, 300),


});


// V MOMENTA TRQBVA DA NAPRAVQ KOREKCIQ NA DATABASE-A, TREATMENTS VAV VSEKI FIELD DA {METHOD, VALUE , TEXT} 

 // FRONT END  -   DIV KADETO SA OTDELNITE <FORM CLASS="{{HELPER + SMENQ6TA SE SAS SESSION}}"> 
 // DA REAGIRA NA CHECK-BOX INPUT SAS VALIDACIQ   + SMENQ BACCKGROUND COLOR

 // NA POVTARQ6TIE SE KATO POZICIQ ELEMENTI DA ZADAM EDNAKAV CLASS ZA DA MOGA DA GI MESTQ PO VIEW-TO EDNOVREMENNO 
 //  NAPRIMER DIV CLASS TIME ZA DA KORIGIRAM POZICIQTA NA VSI4KIT TEXTOVE DATO PO FRONT-END-A 



// DA VKARAM PLANA ZA NORMAL EXTRACTION NA HIMIKALITE I DA VIDQ KAK DA NAPRAVQ LOGIKATA DA RABOTI I PRI "" STOINOSTI !!! -   PO VAZMOJNOST ZA UTRE  -- DONE


// Da NE ZABRAVQ DA OPRAVQ REF NA DATETIME ATRIBUTIRE NA VSI4KI POLETA PREDI DA PRODALJA


   // 38 + 275  CHECKBOX -- STATUS: USERID - DA , BACKGROUND - COLOR - DA ,  /////////////////    TRQBVA DA SE NARAVI LOGIC ZA SLEDVASHTITE FORM-S I INPUT FIELSD TO BE 
   // SETTED DISABLE I ALERT BOX KOQTO DA PROVERI DALI VSI4KI INPUT-I SA POPALNENI !!!   