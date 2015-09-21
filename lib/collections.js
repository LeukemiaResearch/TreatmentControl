Lists = new Mongo.Collection('lists');
Plans = new Mongo.Collection('treatmentplans');
// Try = new Mongo.Collection('try');

Plans.defaultName = function() {
	var nextLetter1 = 'A', nextName1 = 'HDM Infusion NOPHO2008 ' + nextLetter1;
	 while (Plans.findOne({name: nextName1})) {
    // not going to be too smart here, can go past Z
    nextLetter1 = String.fromCharCode(nextLetter1.charCodeAt(0) + 1);
    nextName1 = 'HDM Infusion NOPHO2008 ' + nextLetter1;
  }
	return nextName1;
};


// Calculate a default name for a list in the form of 'List A'
Lists.defaultName = function() {
  var nextLetter = 'A', nextName = 'Patient ' + nextLetter;
  while (Lists.findOne({name: nextName})) {
    // not going to be too smart here, can go past Z
    nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
    nextName = 'Patient ' + nextLetter;
  }

  return nextName;
};

Todos = new Mongo.Collection('todos');

// SimpleSchema.Try  = new SimpleSchema({
//   header : {
//     createdAt: {
//       type: Date,
//       optional: false
//     }
//      }

// })


// Try.attachSchema(new SimpleSchema({
  
//     createdAt: {
//       type: Date,
//       optional: false
//     }
     

// }))

// Try.allow({
//   insert: function(){return true;},
//   update: function(){return true;},
//   remove: function(){return true;},
// })