Meteor.publish('publicLists', function() {
  return Lists.find({userId: {$exists: false}});
});

Meteor.publish('privateLists', function() {
  if (this.userId) {
    return Lists.find({userId: this.userId});
  } else {
    this.ready();
  }
});

// Meteor.publish('todos', function(listId) {
//   check(listId, String);

//   return Todos.find({listId: listId});
// });

Meteor.publish('todos', function() {
  

  return Todos.find({});
});



 // --------------------------------------------------------------------------

 // DA NAPRAVQ VSI4KI  PLANOVE OSVEN GRENERAL TREATMENT PLAN PRIVATE !!!
// Meteor.publish('treatmentplans', function() {
  

//   return Plans.find({});
// });

Meteor.publish('publicPlans', function() {
 	 // var tempsearch = Plans.findOne({tempsearch : {$exists : true} , userId : this.userId});
     // var tempsearch = Plans.findOne({ userId : this.userId});
     //  console.log(tempsearch);
    //  if ( tempsearch ) {
    //   return Plans.find({ $or : [ { _id : "GENERAL-PLAN"} , { userId : this.userId }  ] } );
    // } 
    // else {
    //  //  return Plans.find({ $or : [ { _id : { $in: [ "GENERAL-PLAN", Session.get("searchplan") ]}} , { "patient.cpr" : Session.get("searchplan") }  ] } ); 
    //   //return Plans.find({ $or : [ { _id : "GENERAL-PLAN"} , { userId : {$exists : false} }  ] } );
    //   return Plans.find();
    // }




   return Plans.find();
});

// Meteor.publish('privatePlans', function() {
//   if (this.userId) {
//     return Plans.find({userId: this.userId});
//   } else {
//     this.ready();
//   }
// });