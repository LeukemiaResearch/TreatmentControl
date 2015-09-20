// Schemas = {};

// Template.registerHelper("Schemas", Schemas);

// Schemas.Plans = new SimpleSchema({
//   datetimepicker: {
//     type: [Date],
//     index: 1    
//   }
// });

// var Collections = {};

// Template.registerHelper("Collections", Collections);

// Plans = Collections.Plans = new Mongo.Collection("treatmentplans");
// Plans.attachSchema(Schemas.Plans);

// Meteor.publish(null, function () {
//   return Plans.find();
// });

// Plans.allow({
//   insert: function () {
//     return true;
//   },
//   remove: function () {
//     return true;
//   }
// });

// Template.updateaf.helpers({
//   // autoSaveMode: function () {
//   //   return Session.get("autoSaveMode") ? true : false;
//   // },
//   selectedPersonDoc: function () {
//     return Plans.findOne(Session.get("selectedPersonId"));
//   },
//   isSelectedPerson: function () {
//     return Session.equals("selectedPersonId", this._id);
//   },
//   // formType: function () {
//   //   if (Session.get("selectedPersonId")) {
//   //     return "update";
//   //   } else {
//   //     return "disabled";
//   //   }
//   // },
//   // disableButtons: function () {
//   //   return !Session.get("selectedPersonId");
//   // }
// });

// // Template.updateaf.events({
// //   'click .person-row': function () {
// //     Session.set("selectedPersonId", this._id);
// //   },
// //   // 'change .autosave-toggle': function () {
// //   //   Session.set("autoSaveMode", !Session.get("autoSaveMode"));
// //   // }
// // });




// Schemas = {};

// Template.registerHelper("Schemas", Schemas);

// Schemas.plans = new SimpleSchema({
//   datetimepicker: {
//     type: [Date]
      
//   }
// });

// //var Collections = {};
// Template.registerHelper("Collections", Collections);

// plans = Collections.Plans =  new Mongo.Collections("treatmentplans");
// plans.attachSchema(Schemas.Plans);
// console.log(plans);

// // Meteor.publish(null, function () {
// //   return Plan.find();
// // });

// plans.allow({
//   insert: function () {
//     return true;
//   },
//   remove: function () {
//     return true;
//   }
// });

// Template.updateaf.helpers({
//   // autoSaveMode: function () {
//   //   return Session.get("autoSaveMode") ? true : false;
//   // },
//   selectedPersonDoc: function () {
//     return plans.findOne(Session.get("selectedPersonId"));
//   },
//   isSelectedPerson: function () {
//     return Session.equals("selectedPersonId", this._id);
//   },
//   // formType: function () {
//   //   if (Session.get("selectedPersonId")) {
//   //     return "update";
//   //   } else {
//   //     return "disabled";
//   //   }
//   // },
//   // disableButtons: function () {
//   //   return !Session.get("selectedPersonId");
//   // }
// });

// // Template.updateaf.events({
// //   'click .person-row': function () {
// //     Session.set("selectedPersonId", this._id);
// //   },
// //   // 'change .autosave-toggle': function () {
// //   //   Session.set("autoSaveMode", !Session.get("autoSaveMode"));
// //   // }
// // });