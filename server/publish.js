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
Meteor.publish('treatmentplans', function() {
  

  return Plans.find({});
});

// Meteor.publish('publicPlans', function() {
//   return Plans.find({userId: {$exists: false}});
// });

// Meteor.publish('privatePlans', function() {
//   if (this.userId) {
//     return Plans.find({userId: this.userId});
//   } else {
//     this.ready();
//   }
// });