// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Plans.find().count() === 0) {
    var data = [

{
    "_id" : "GENERAL-PLAN",
    "header" : {
        "createdAt" : new Date(),
        "name" : "General Plan",
        "mtx" : "1",
        "pcreatin" : "20"
    },
    "patient" : {
        "name" : "Atanas Antonov",
        "cpr" : "255555-4555",
        "height" : "165",
        "weight" : "75",
        "surface" : {
            "method" : "(Math.sqrt(this.patient.height*this.patient.weight)/60)",
            "value" : 1.825741858350554
        }
    },
    "treatments" : {
        "one" : {
            "checked" : "",
            "createdAt" : new Date(),
            "field1" : {
                "text" : "Hydreringsvæske: 5% glucose tilsat 40 mmol Na-bicarbonat og 20 mmol KCl/liter",
                "method" : "",
                "value" : null
            },
            "field2" : {
                "text" : "Total væskemængde 3000 ml/m²/døgn",
                "method" : "(Math.round(3000*this.patient.surface.value)/24).toFixed()",
                "value" : "228"
            },
            "field3" : {
                "text" : "Heraf mindst 2000 ml/m²/døgn iv.",
                "method" : "(Math.round(2000*this.patient.surface.value)/24).toFixed()",
                "value" : "152"
            },
            "field4" : {
                "text" : "Begræns peroralt indtag til 1000 ml/m² under infusion af MTX",
                "method" : "",
                "value" : null
            },
            "field5" : {
                "text" : "Væskedøgn starter ved start på MTX-infusion (til tiden 0). MTX-væsken medregnes",
                "method" : "",
                "value" : null
            }
        },
        "two" : {
            "checked" : true,
            "field1" : {
                "text" : "Forhydrering med hydreningsvæske starter. I alt 600 ml/m²/ 4 timer",
                "method" : "Math.round(150*this.patient.surface.value)",
                "value" : 274
            },
            "userId" : "ZCqSk67FPujfRSuWA"
        },
        "tree" : {
            "checked" : "",
            "field1" : {
                "text" : "Diuresemåling begynder. Diureser > 600 ml/m²/ 6 timer",
                "method" : "Math.round(600*this.patient.surface.value)",
                "value" : 1095
            },
            "field2" : {
                "text" : "Hvis diuresen er mindre gives furosemid 0,5 (- 1) mg/kg iv",
                "method" : "Math.round(0.75*this.patient.surface.value)",
                "value" : 1
            },
            "field3" : {
                "text" : "Urin pH skal være = eller over 7 før start på MTX",
                "method" : "",
                "value" : null
            },
            "field4" : {
                "text" : "Ved urin-pH < 7: Giv Na-bicarbonat 20 mmol/m² iv over 30 min. i 40 ml hydreringsv.",
                "method" : "Math.round(20*this.patient.surface.value)",
                "value" : 37,
                "pcreatin" : "22"
            },
            "field5" : {
                "text" : "Tag P-kreatinin konc t0",
                "pcreatin" : ""
            },
            "field6" : {
                "text" : "Start urin-pH måling. pH måles i hver urinportion indtil pt. udskrives.",
                "method" : "",
                "value" : null
            },
            "field7" : {
                "text" : "1/10 af MTX dosis gives over 1 time",
                "method" : "Math.ceil(50*this.patient.surface.value-1)*10",
                "value" : 910
            },
            "field8" : {
                "text" : "Ved urin pH > 8 skiftes til KNaG uden bicarbonat i 3 time. Når pH er under 8 skiftes til bicarbonatholdig hydrering"
            },
            "value1" : "NaN"
        },
        "four" : {
            "checked" : "",
            "field1" : {
                "text" : "9/10 af MTX dosis gives på 23 timer. Hydreringsvæske reduceret til samlet 3000 ml/m2/døgn",
                "method" : "Math.ceil(450*this.patient.surface.value-1)*10",
                "value" : 8210
            }
        },
        "five" : {
            "checked" : "",
            "createdAt" : "",
            "field1" : {
                "text" : "Tag Se-MTX konc t23 (steady state, analyseres næste dag)  -- Se-MTX t23",
                "semtx" : "1"
            },
            "field2" : {
                "text" : "Tag P-kreatinin konc t23  -- P-kreatin",
                "pcreatin" : "22"
            },
            "field3" : {
                "text" : "Pt. køres på OP til MTX is. ",
                "semtx" : "33"
            }
        },
        "six" : {
            "checked" : "",
            "createdAt" : "",
            "field1" : {
                "text" : "MTX infusionen afsluttes - hydreringsvæskens hastighed øges"
            }
        },
        "seven" : {
            "checked" : "",
            "createdAt" : "",
            "field1" : {
                "text" : "Tag Se-MTX konc t36 (analyseres sammen med Se-MTX t42 og Se-MTX t23) -- Se-MTX t36",
                "semtx" : "11"
            },
            "field2" : {
                "text" : "Tag P-kreatinin konc t36 -- P-kreatin",
                "pcreatin" : "22"
            },
            "field3" : {
                "text" : "Hvis P-kreatinin t23 eller t36 er steget > 50% eller Se-MTX t36 > 3,0 µmol/l: --- øges hydreringsvæsken til 4500 ml/m²/24 timer",
                "method" : "(Math.round(4500*this.patient.surface.value)/24).toFixed()",
                "value" : "342"
            },
            "field4" : {
                "text" : "Diurese: 900 ml/m²/ 6 timer",
                "method" : "Math.round(900*this.patient.surface.value).toFixed()",
                "value" : "1643"
            }
        },
        "eight" : {
            "checked" : "",
            "createdAt" : "",
            "field1" : {
                "text" : "Tag Se-MTX konc t42 (analyseres sammen med Se-MTX t36 og Se-MTX t23)  -- Se-MTX t42:",
                "semtx" : "0.5"
            },
            "field2" : {
                "text" : "1. calciumfolinat-dosis 15 mg/m².   Givet af:",
                "name" : "As",
                "method" : "Math.round(15*this.patient.surface.value).toFixed()",
                "value" : "27"
            },
            "field3" : {
                "text" : "Opstart evt. calciumfolinat mundskyl"
            },
            "field4" : {
                "text" : "For se-MTX konc t42 >1,0 µmol/l (langsom udskillelse) fortsættes på skema for senudskillelse"
            },
            "field5" : {
                "text" : "For se-MTX konc t42 <0,6 µmol/l (hurtig udskillelse) fortsæt på dette skema t48:"
            }
        },
        "nine" : {
            "createdAt" : "",
            "hurtig" : {
                "checked" : "",
                "name" : "Hurtig",
                "visible" : {
                    "method" : "(this.treatments.eight.field1.semtx>=0.01 && this.treatments.eight.field1.semtx<0.6)",
                    "value" : true
                },
                "first" : {
                    "createdAt" : "",
                    "field1" : {
                        "text" : "Tag Se-MTX konc t48 (analyseres med Se-MTX t54 næste dag) --Se-MTX t48: ",
                        "semtx" : ""
                    },
                    "field2" : {
                        "text" : "2. calciumfolinat-dosis. Giv calciumfolinat 15 mg/m².   Givet af:",
                        "name" : "",
                        "method" : "Math.round(15*this.patient.surface.value).toFixed()",
                        "value" : "27"
                    }
                },
                "second" : {
                    "createdAt" : "",
                    "field1" : {
                        "text" : "Tag Se-MTX konc t54 (analyseres med Se-MTX t48 næste dag) --Se-MTX t54: ",
                        "semtx" : "1"
                    },
                    "field2" : {
                        "text" : "3. calciumfolinat-dosis. Giv calciumfolinat 15 mg/m².   Givet af:",
                        "name" : "",
                        "method" : "Math.round(15*this.patient.surface.value).toFixed()",
                        "value" : "27"
                    },
                    "field3" : {
                        "text" : "Patienten kobles fra efter t54 + calciumfolinat. Pt udskrives."
                    }
                }
            },
            "normal" : {
                "checked" : "",
                "name" : "Normal",
                "visible" : {
                    "method" : "(this.treatments.eight.field1.semtx >= 0.6 && this.treatments.eight.field1.semtx <= 1)",
                    "value" : false
                },
                "first" : {
                    "createdAt" : "",
                    "field1" : {
                        "text" : "Tag Se-MTX konc t48 (analyseres med Se-MTX t54 og Se-MTX t66 næste dag) --Se-MTX t48:",
                        "semtx" : ""
                    },
                    "field2" : {
                        "text" : "2. calciumfolinat-dosis. Giv calciumfolinat 15 mg/m².   Givet af:",
                        "name" : "",
                        "method" : "Math.round(15*this.patient.surface.value).toFixed()",
                        "value" : "27"
                    }
                },
                "second" : {
                    "createdAt" : "",
                    "field1" : {
                        "text" : "Tag Se-MTX konc t54 (analyseres med Se-MTX t48 og Se-MTX t66 næste dag) --Se-MTX t54:",
                        "semtx" : ""
                    },
                    "field2" : {
                        "text" : "3. calciumfolinat-dosis. Giv calciumfolinat 15 mg/m².   Givet af:",
                        "name" : "",
                        "method" : "Math.round(15*this.patient.surface.value).toFixed()",
                        "value" : "27"
                    }
                },
                "third" : {
                    "createdAt" : "",
                    "field1" : {
                        "text" : "Tag Se-MTX konc t66 (analyseres med Se-MTX t48 og Se-MTX t54 næste dag) --Se-MTX t66:",
                        "semtx" : "0.2"
                    },
                    "field2" : {
                        "text" : "Tag P-kreatinin konc t66",
                        "pcreatin" : ""
                    },
                    "field3" : {
                        "text" : "For se-MTX t66 >= 0,2 µmol/l gives 4. calciumfolinatdosis.",
                        "method" : "(this.treatments.nine.normal.third.field1.semtx >= 0.2)",
                        "value" : true
                    },
                    "field4" : {
                        "text" : "4. calciumfolinat-dosis. Giv calciumfolinat 15 mg/m².   Givet af:",
                        "name" : "",
                        "method" : "Math.round(15*this.patient.surface.value).toFixed()",
                        "value" : "27"
                    },
                    "field5" : {
                        "text" : "For se-MTX t66 0,2 - 0,3 µmol/l udskrives patienten efter 4.dosis calciumfolinat."
                    },
                    "field6" : {
                        "text" : "For se-MTX t66 0,3 - 0,4 µmol/l kan pt. udskrives med calciumfolinat 15 mg/m² x 3 po. i 2 døgn"
                    },
                    "field7" : {
                        "text" : "For se-MTX t66 0,4 - 0,5 µmol/l kan pt. udskrives med calciumfolinat 15 mg/m² x 3 po. i 3 døgn"
                    },
                    "field8" : {
                        "text" : "For se-MTX t66 >0,5 µmol/l overgår patienten til skema for senudskillelse"
                    }
                }
            }
        }
    },
    "name" : "General Plan"
}



         
      
    ];

    var timestamp = (new Date()).getTime();
    var plan_id = Plans.insert(data);
    // _.each(data, function(list) {
    //   var list_id = Lists.insert({name: list.name,
    //     incompleteCount: list.items.length});

      // _.each(list.items, function(text) {
      //   Todos.insert({listId: list_id,
      //                 text: text,
      //                 createdAt: new Date(timestamp)});
      //   timestamp += 1; // ensure unique timestamp.
      // });
    // });
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
