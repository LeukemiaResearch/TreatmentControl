// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Lists.find().count() === 0) {
    var data = [
    // { name: "General Plan",
    //    mtx: "",
    //     patient: [{
    //      name: "", 
    //      cpr: "",
    //      height:"",
    //      weight:"",
    //      surface:"",
    //      pcreatin:""
    //     }],
    //     treatments:[{
    //       id: "1",
    //       createdAt: new Date(),
    //       field1:"Hydreringsvæske: 5% glucose tilsat 40 mmol Na-bicarbonat og 20 mmol KCl/liter",
    //       value1:"",
    //       field2:"Total væskemængde 3000 ml/m²/døgn",
    //       value2:"",
    //       field3:"Heraf mindst 2000 ml/m²/døgn iv.",
    //       value3:"",
    //       field4:"Begræns peroralt indtag til 1000 ml/m² under infusion af MTX",
    //       field5:"Væskedøgn starter ved start på MTX-infusion (til tiden 0). MTX-væsken medregnes"
    //     }

    //     ]
    // } 



         
      {name: "Meteor Principles",
       items: ["Data on the Wire",
         "One Language",
         "Database Everywhere",
         "Latency Compensation",
         "Full Stack Reactivity",
         "Embrace the Ecosystem",
         "Simplicity Equals Productivity"
       ]
      },
      {name: "Languages",
       items: ["Lisp",
         "C",
         "C++",
         "Python",
         "Ruby",
         "JavaScript",
         "Scala",
         "Erlang",
         "6502 Assembly"
         ]
      },
      {name: "Favorite Scientists",
       items: ["Ada Lovelace",
         "Grace Hopper",
         "Marie Curie",
         "Carl Friedrich Gauss",
         "Nikola Tesla",
         "Claude Shannon"
       ]
      }
    ];

    var timestamp = (new Date()).getTime();
    _.each(data, function(list) {
      var list_id = Lists.insert({name: list.name,
        incompleteCount: list.items.length});

      _.each(list.items, function(text) {
        Todos.insert({listId: list_id,
                      text: text,
                      createdAt: new Date(timestamp)});
        timestamp += 1; // ensure unique timestamp.
      });
    });
  }

  var plans = Plans.find();
  //Observe changes to documents and re-calculate and store derived fields as needed
    var recalculateFields = function(id) {
        var storeObjNeeded = false;

        var doRecalulateFields = function(traverseObj) {
            for (var prop in traverseObj) {
                var propVal = traverseObj[prop];              
                if (typeof propVal==="object" && propVal) {
                    if (propVal.hasOwnProperty("method") &&
                        propVal.hasOwnProperty("value")) {
                        //recalculate field value
                        console.log("expresion :" + propVal.method);
                        var newValue = eval(propVal.method);
                        if (propVal.value!=newValue) {
                            propVal.value=newValue;
                            storeObjNeeded = true;
                        }
                    } else {
                        //recusion into sub object
                        var result = doRecalulateFields.call(this,propVal);
                    }
                }
            }
        };

        obj = Plans.findOne(id);
        doRecalulateFields.call(obj, obj);
        if (storeObjNeeded)
            // Plans.update(id, obj);
            Plans.update(id, obj);
    };
    plans.observeChanges({
        added: function(id, obj) {
            console.log("added: "+id);
            console.log(obj);
            recalculateFields(id);
        },
        changed: function(id, obj) {
            console.log("changed: "+id);
            console.log(obj);
            recalculateFields(id);
        }
    })



});
