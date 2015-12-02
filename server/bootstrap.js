// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Plans.find().count() === 0 || ! Plans.findOne({ _id: "GENERAL-PLAN"})) {
    var data =

{
    "_id" : "GENERAL-PLAN",
    "header" : {
        // "createdAt" : new Date(),
        "createdAt" : new Date(),
        "name" : "Behandlingsprotokol",
        "mtx" : ""
       
    },
    "patient" : {
        "name" : "",
        "cpr" : "",
        "height" : "",
        "weight" : "",
        "age" : "",
        "surface" : {
            "method" : "(Math.sqrt(this.patient.height*this.patient.weight)/60).toFixed(2)",
            "value" : 0
        }
    },
    "treatments" : {
        "one" : {
            "checked" : false,
            "createdAt" : "",
            "field1" : {
                "text" : "Plasma kreatinin før start af kuren:",
                "pcreatin" : "",
                "value" : null
            },
            "field2" : {
                "text" : "Total væskemængde 3000 ml/m²/døgn",
                "method" : "(Math.round(3000*this.patient.surface.value)/24).toFixed()",
                "value" : "0"
            },
            "field3" : {
                "text" : "Heraf mindst 2000 ml/m²/døgn iv.",
                "method" : "(Math.round(2000*this.patient.surface.value)/24).toFixed()",
                "value" : "0"
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
            },
            "field6" : {
                "text" : "Diuresemåling begynder. Diureser > 600 ml/m²/ 6 timer",
                "method" : "Math.round(600*this.patient.surface.value)",
                "value" : 0
            },
            "field7" : {
                "text" : "Hvis diuresen er mindre gives furosemid 0,5 (- 1) mg/kg iv",
                "method" : "Math.round(0.5*this.patient.weight)",
                "value" : 0
            },
            "field8" : {
                "text" : "Start urin-pH måling. pH måles i hver urinportion indtil pt. udskrives.",
                "method" : "",
                "value" : null
            },
            "field9" : {
                "text" : "Ved urin-pH < 7: Giv Na-bicarbonat 20 mmol/m² iv over 30 min. i 40 ml hydreringsv.",
                "method" : "Math.round(20*this.patient.surface.value)",
                "value" : 0,
                "pcreatin" : "22"
            },
            "field10" : {
                "text" : "Ved urin pH > 8 skiftes til KNaG uden bicarbonat i 3 time. Når pH er under 8 skiftes til bicarbonatholdig hydrering"
            }
            
        },
        "two" : {
            "checked" : false,
            "field0" : {
                "text" : "Start iv. hydrening:",
                "text1" : "Skriv dato to tid for start af hydrering"                
            },
            "field1" : {
                "text" : "Forhydrering med hydreningsvæske starter. I alt 600 ml/m²/ 4 timer",
                "method" : "Math.round(150*this.patient.surface.value)",
                "value" : 0
            },
            "field2" : {
                "text" : "Hydreringsvæske: 5% glucose tilsat 40 mmol Na-bicarbonat og 20 mmol KCl/liter",
                "method" : "",
                "value" : null
            }
            
        },
        "tree" : {
            "createdAt" : "",
            "checked" : false,
            "field0" : {
                "text" : "Start bolusinfusion og skriv tidspunkt:"          
            },
            "field1" : {
                "text" : "Diuresemåling begynder. Diureser > 600 ml/m²/ 6 timer",          
                "method" : "Math.round(600*this.patient.surface.value)",
                "value" : 0
            },
            "field2" : {
                "text" : "Hvis diuresen er mindre gives furosemid 0,5 (- 1) mg/kg iv",
                "method" : "Math.round(0.75*this.patient.surface.value)",
                "value" : 0
            },
            "field3" : {
                "text" : "Urin pH skal være = eller over 7 før start på MTX",
                "method" : "",
                "value" : null
            },
            "field4" : {
                "text" : "Ved urin-pH < 7: Giv Na-bicarbonat 20 mmol/m² iv over 30 min. i 40 ml hydreringsv.",
                "method" : "Math.round(20*this.patient.surface.value)",
                "value" : 0,
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
                "value" : ""
            },
            "field8" : {
                "text" : "Ved urin pH > 8 skiftes til KNaG uden bicarbonat i 3 time. Når pH er under 8 skiftes til bicarbonatholdig hydrering"
            }
            
            
        },
        "four" : { "checked" : false,
            // "time" : {
            //      "method" : "new Date(this.treatments.tree.createdAt).setHours(t.getHours() + 1)",
            //      "value" : ""  
            // },
            "time" : 1,
            "field0" : {
                "text" : "Start kontinuerlig infusion af MTX:"          
            },
            "field1" : {
                "text" : "9/10 af MTX dosis gives på 23 timer. Hydreringsvæske reduceret til samlet 3000 ml/m2/døgn",
                "method" : "Math.ceil(450*this.patient.surface.value-1)*10",
                "value" : ""
            },
            "field2" : {
                "text" : "Samlet mængde af MTX og hydreringsvæske: ",
                "method" : "(Math.round(3000*this.patient.surface.value)/24).toFixed()",
                "value" : "0"
            }
        },
        "five" : {
            "checked" : false,
            "time" : 23,
            "createdAt" : "",
            "field0" : {
                "text" : "Tag blodprøver plasma MTX og kreatinin før MTX infusionen stoppes"          
            },
            "field1" : {
                "text" : "Indtast plasma MTX:  Tag Se-MTX konc t23 (steady state, analyseres næste dag)  -- Se-MTX t23",
                "semtx" : ""
            },
            "field2" : {
                "text" : "Tag P-kreatinin konc t23  -- P-kreatin",
                "pcreatin" : ""
            },
            "field3" : {
                "text" : "Administrere:  Der skal gives intraspinal MTX dosis",
                "semtx" : ""
            }
            
        },
        "six" : {
            "checked" : false,
            "time" : 24,
            "createdAt" : "",
            "field0" : {
                "text" : "Stop MTX infusionen når hele kuren er løbet ind"
            },
            "field1" : {
                "text" : "Indtast blodprøveværdi:    -- P-kreatin",
                "pcreatin" : ""
            },
            "field2" : {
                "text" : "OPMÆRKSOM: Patienten er i høj-risiko for at have forsinket MTX udskillelse." ,
                "method" : "(this.treatments.six.field1.pcreatin > (this.treatments.one.field1.pcreatin*1.5))" ,
                "value" : ""                            
            },
            "field3" : {
                "text" : "Hydreringen fortsættes med 3000 ml/m²/døgn svarende til        Hydrering: ",
                "method" : "(Math.round(3000*this.patient.surface.value)/24).toFixed()" ,
                "value" : ""                  
            },
            "field4" : {
                "text" : "Hydreringen øges til 4500 ml/m²/døgn svt.         Hydrering: ",
                "method" : "(Math.round(4500*this.patient.surface.value)/24).toFixed()" ,
                "value" : ""                 
            },
            "field5" : {
                "text" : "Diuresen skal være over 600 ml/m²/ 6 timer svt." ,
                "method" : "Math.round(600*this.patient.surface.value).toFixed()" ,
                "value" : ""                                   
            },
            "field6" : {
                "text" : "Diuresen skal være over 900 ml/m²/ 6 timer svt." ,
                "method" : "Math.round(900*this.patient.surface.value).toFixed()" ,
                "value" : ""                                
            }
           
        },
        "seven" : {
            "checked" : false,
            "time" : 36,
            "createdAt" : "",
            "field0" : {
                "text" : "Tag blodprøver plasma MTX og kreatinin"                 
            },
            "field1" : {
                "text" : "Tag Se-MTX konc t36 (analyseres sammen med Se-MTX t42 og Se-MTX t23) -- Se-MTX t36",
                "semtx" : ""
            },
            "field2" : {
                "text" : "Tag P-kreatinin konc t36 -- P-kreatin",
                "pcreatin" : ""
            },
            "field3" : {
                "text" : "OPMÆRKSOM: Patienten er i høj-risiko for at have forsinket MTX udskillelse." ,
                "method" : "(this.treatments.seven.field2.pcreatin > (this.treatments.one.field1.pcreatin*1.5) || this.treatments.seven.field1.semtx > 3)" ,
                "value" : ""                            
            },
            "field4" : {
                "text" : "Hydreringen fortsættes med 3000 ml/m²/døgn svarende til        Hydrering: ",
                "method" : "(Math.round(3000*this.patient.surface.value)/24).toFixed()" ,
                "value" : ""                  
            },
            "field5" : {
                "text" : "Hydreringen øges til 4500 ml/m²/døgn svt.         Hydrering: ",
                "method" : "(Math.round(4500*this.patient.surface.value)/24).toFixed()" ,
                "value" : ""                 
            },
            "field6" : {
                "text" : "Diuresen skal være over 600 ml/m²/ 6 timer svt." ,
                "method" : "Math.round(600*this.patient.surface.value).toFixed()" ,
                "value" : ""                                   
            },
            "field7" : {
                "text" : "Diuresen skal være over 900 ml/m²/ 6 timer svt." ,
                "method" : "Math.round(900*this.patient.surface.value).toFixed()" ,
                "value" : ""                                
            }
            
        },
        "eight" : {
            "checked" : false,
            "time" : 42,
            "createdAt" : "",
            "visible1" : {
                    "method" : "(this.treatments.eight.field1.semtx>= 1 && this.treatments.eight.field1.semtx<2)",
                    "value" : ""
                },
            "visible2" : {
                    "method" : "(this.treatments.eight.field1.semtx>= 2 && this.treatments.eight.field1.semtx<3)",
                    "value" : ""
                },
            "visible3" : {
                    "method" : "(this.treatments.eight.field1.semtx>= 3 && this.treatments.eight.field1.semtx<4)",
                    "value" : ""
                },
            "visible4" : {
                    "method" : "(this.treatments.eight.field1.semtx>= 4 && this.treatments.eight.field1.semtx<5)",
                    "value" : ""
                },
            "visible5" : {
                    "method" : "(this.treatments.eight.field1.semtx>= 5)",
                    "value" : ""
                }, 
            "field0" : {
                "text" : "Tag blodprøve plasma MTX"                 
            },
            "field1" : {
                "text" : "Tag Se-MTX konc t42 (analyseres sammen med Se-MTX t36 og Se-MTX t23)  -- Se-MTX t42:",
                "semtx" : ""
            },
            "field2" : {
                "text" : "Administrere:   1. calciumfolinat-dosis 15 mg/m².   Givet af:",
                "name" : "",
                "method" : "Math.round(15*this.patient.surface.value).toFixed()",
                "value" : "0"
            },
            "field3" : {
                "text" : "Opstart evt. calciumfolinat mundskyl"
            },
            "field4" : {
                "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t42.   Givet af:",
                "name" : "",
                "method" : "Math.round(15*this.patient.surface.value).toFixed()",
                "value" : "0"
                
            },
            "field5" : {
                "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t42.   Givet af:",
                "name" : "",
                "method" : "Math.round(30*this.patient.surface.value).toFixed()",
                "value" : "0"
                
            },
            "field6" : {
                "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t42.   Givet af:",
                "name" : "",
                "method" : "Math.round(45*this.patient.surface.value).toFixed()",
                "value" : "0"
                
            },
            "field7" : {
                "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t42.   Givet af:",
                "name" : "",
                "method" : "Math.round(60*this.patient.surface.value).toFixed()",
                "value" : "0"
                
            },
            "field8" : {
                "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t42.   Givet af:",
                "name" : "",
                "method" : "Math.round(this.treatments.eight.field1.semtx*this.patient.weight)",
                "value" : "0"
                
            },
            "field9" : {
                "text" : "For se-MTX konc t42 >1,0 µmol/l (langsom udskillelse) fortsættes på skema for senudskillelse"
            },
            "field10" : {
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
                    "value" : false
                },
                "first" : {
                    "checked" : false,
                    "createdAt" : "",
                    "visible1" : {
                            "method" : "(this.treatments.nine.hurtig.first.field1.semtx>= 1 && this.treatments.nine.hurtig.first.field1.semtx<2)",
                            "value" : ""
                        },
                    "visible2" : {
                            "method" : "(this.treatments.nine.hurtig.first.field1.semtx>= 2 && this.treatments.nine.hurtig.first.field1.semtx<3)",
                            "value" : ""
                        },
                    "visible3" : {
                            "method" : "(this.treatments.nine.hurtig.first.field1.semtx>= 3 && this.treatments.nine.hurtig.first.field1.semtx<4)",
                            "value" : ""
                        },
                    "visible4" : {
                            "method" : "(this.treatments.nine.hurtig.first.field1.semtx>= 4 && this.treatments.nine.hurtig.first.field1.semtx<5)",
                            "value" : ""
                        },
                    "visible5" : {
                            "method" : "(this.treatments.nine.hurtig.first.field1.semtx>= 5)",
                            "value" : ""
                        }, 
                    "field0" : {
                        "text" : "Tag blodprøve plasma MTX"                 
                    },
                    "field1" : {
                        "text" : "Tag Se-MTX konc t48 (analyseres med Se-MTX t54 næste dag) --Se-MTX t48: ",
                        "semtx" : ""
                    },
                    "field2" : {
                        "text" : "2. calciumfolinat-dosis. Giv calciumfolinat 15 mg/m².   Givet af:",
                        "name" : "",
                        "method" : "Math.round(15*this.patient.surface.value).toFixed()",
                        "value" : "0"
                    },
                    "field3" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t48.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(15*this.patient.surface.value).toFixed()",
                        "value" : "0"
                
                     },
                    "field4" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t48.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(30*this.patient.surface.value).toFixed()",
                        "value" : "0"
                        
                    },
                    "field5" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t48.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(45*this.patient.surface.value).toFixed()",
                        "value" : "0"
                        
                    },
                    "field6" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t48.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(60*this.patient.surface.value).toFixed()",
                        "value" : "0"
                        
                    },
                    "field7" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t48.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(this.treatments.nine.hurtig.first.field1.semtx*this.patient.weight)",
                        "value" : "0"
                        
                    }
                    
                },
                "second" : {
                    "checked" : false,
                    "createdAt" : "",
                    "visible1" : {
                            "method" : "(this.treatments.nine.hurtig.second.field1.semtx>= 1 && this.treatments.nine.hurtig.second.field1.semtx<2)",
                            "value" : ""
                        },
                    "visible2" : {
                            "method" : "(this.treatments.nine.hurtig.second.field1.semtx>= 2 && this.treatments.nine.hurtig.second.field1.semtx<3)",
                            "value" : ""
                        },
                    "visible3" : {
                            "method" : "(this.treatments.nine.hurtig.second.field1.semtx>= 3 && this.treatments.nine.hurtig.second.field1.semtx<4)",
                            "value" : ""
                        },
                    "visible4" : {
                            "method" : "(this.treatments.nine.hurtig.second.field1.semtx>= 4 && this.treatments.nine.hurtig.second.field1.semtx<5)",
                            "value" : ""
                        },
                    "visible5" : {
                            "method" : "(this.treatments.nine.hurtig.second.field1.semtx>= 5)",
                            "value" : ""
                        }, 
                    "field0" : {
                        "text" : "Tag blodprøve plasma MTX"                 
                    },
                    "field1" : {
                        "text" : "Tag Se-MTX konc t54 (analyseres med Se-MTX t48 næste dag) --Se-MTX t54: ",
                        "semtx" : ""
                    },
                    "field2" : {
                        "text" : "3. calciumfolinat-dosis. Giv calciumfolinat 15 mg/m².   Givet af:",
                        "name" : "",
                        "method" : "Math.round(15*this.patient.surface.value).toFixed()",
                        "value" : "0"
                    },
                    "field3" : {
                        "text" : "Patienten kobles fra efter t54 + calciumfolinat. Pt udskrives."
                    },
                    "field4" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t54.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(15*this.patient.surface.value).toFixed()",
                        "value" : "0"
                
                     },
                    "field5" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t54.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(30*this.patient.surface.value).toFixed()",
                        "value" : "0"
                        
                    },
                    "field6" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t54.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(45*this.patient.surface.value).toFixed()",
                        "value" : "0"
                        
                    },
                    "field7" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t54.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(60*this.patient.surface.value).toFixed()",
                        "value" : "0"
                        
                    },
                    "field8" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t54.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(this.treatments.nine.hurtig.second.field1.semtx*this.patient.weight)",
                        "value" : "0"
                        
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
                    "checked" : false,
                    "time" : 48,
                    "createdAt" : "",
                    "visible1" : {
                            "method" : "(this.treatments.nine.normal.first.field1.semtx>= 1 && this.treatments.nine.normal.first.field1.semtx<2)",
                            "value" : ""
                        },
                    "visible2" : {
                            "method" : "(this.treatments.nine.normal.first.field1.semtx>= 2 && this.treatments.nine.normal.first.field1.semtx<3)",
                            "value" : ""
                        },
                    "visible3" : {
                            "method" : "(this.treatments.nine.normal.first.field1.semtx>= 3 && this.treatments.nine.normal.first.field1.semtx<4)",
                            "value" : ""
                        },
                    "visible4" : {
                            "method" : "(this.treatments.nine.normal.first.field1.semtx>= 4 && this.treatments.nine.normal.first.field1.semtx<5)",
                            "value" : ""
                        },
                    "visible5" : {
                            "method" : "(this.treatments.nine.normal.first.field1.semtx>= 5)",
                            "value" : ""
                        }, 
                    "field0" : {
                        "text" : "Tag blodprøve plasma MTX"                 
                    },
                    "field1" : {
                        "text" : "Tag Se-MTX konc t48 (analyseres med Se-MTX t54 og Se-MTX t66 næste dag) --Se-MTX t48:",
                        "semtx" : ""
                    },
                    "field2" : {
                        "text" : "2. calciumfolinat-dosis. Giv calciumfolinat 15 mg/m².   Givet af:",
                        "name" : "",
                        "method" : "Math.round(15*this.patient.surface.value).toFixed()",
                        "value" : "0"
                    },
                    "field3" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t48.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(15*this.patient.surface.value).toFixed()",
                        "value" : "0"
                
                     },
                    "field4" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t48.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(30*this.patient.surface.value).toFixed()",
                        "value" : "0"
                        
                    },
                    "field5" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t48.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(45*this.patient.surface.value).toFixed()",
                        "value" : "0"
                        
                    },
                    "field6" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t48.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(60*this.patient.surface.value).toFixed()",
                        "value" : "0"
                        
                    },
                    "field7" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t48.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(this.treatments.nine.normal.first.field1.semtx*this.patient.weight)",
                        "value" : "0"
                        
                    }
                    
                },
                "second" : {
                    "checked" : false,
                    "time" : 54,
                    "createdAt" : "",
                    "visible1" : {
                            "method" : "(this.treatments.nine.normal.second.field1.semtx>= 1 && this.treatments.nine.normal.second.field1.semtx<2)",
                            "value" : ""
                        },
                    "visible2" : {
                            "method" : "(this.treatments.nine.normal.second.field1.semtx>= 2 && this.treatments.nine.normal.second.field1.semtx<3)",
                            "value" : ""
                        },
                    "visible3" : {
                            "method" : "(this.treatments.nine.normal.second.field1.semtx>= 3 && this.treatments.nine.normal.second.field1.semtx<4)",
                            "value" : ""
                        },
                    "visible4" : {
                            "method" : "(this.treatments.nine.normal.second.field1.semtx>= 4 && this.treatments.nine.normal.second.field1.semtx<5)",
                            "value" : ""
                        },
                    "visible5" : {
                            "method" : "(this.treatments.nine.normal.second.field1.semtx>= 5)",
                            "value" : ""
                        }, 
                    "field0" : {
                        "text" : "Tag blodprøve plasma MTX"                 
                    },
                    "field1" : {
                        "text" : "Tag Se-MTX konc t54 (analyseres med Se-MTX t48 og Se-MTX t66 næste dag) --Se-MTX t54:",
                        "semtx" : ""
                    },
                    "field2" : {
                        "text" : "3. calciumfolinat-dosis. Giv calciumfolinat 15 mg/m².   Givet af:",
                        "name" : "",
                        "method" : "Math.round(15*this.patient.surface.value).toFixed()",
                        "value" : "0"
                    },
                    "field3" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t54.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(15*this.patient.surface.value).toFixed()",
                        "value" : "0"
                
                     },
                    "field4" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t54.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(30*this.patient.surface.value).toFixed()",
                        "value" : "0"
                        
                    },
                    "field5" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t54.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(45*this.patient.surface.value).toFixed()",
                        "value" : "0"
                        
                    },
                    "field6" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t54.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(60*this.patient.surface.value).toFixed()",
                        "value" : "0"
                        
                    },
                    "field7" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t54.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(this.treatments.nine.normal.second.field1.semtx*this.patient.weight)",
                        "value" : "0"
                        
                    }
                    
                },
                "third" : {
                    "checked" : false,
                    "time" : 66,
                    "createdAt" : "",
                    "visible1" : {
                            "method" : "(this.treatments.nine.normal.third.field1.semtx>= 1 && this.treatments.nine.normal.third.field1.semtx<2)",
                            "value" : ""
                        },
                    "visible2" : {
                            "method" : "(this.treatments.nine.normal.third.field1.semtx>= 2 && this.treatments.nine.normal.third.field1.semtx<3)",
                            "value" : ""
                        },
                    "visible3" : {
                            "method" : "(this.treatments.nine.normal.third.field1.semtx>= 3 && this.treatments.nine.normal.third.field1.semtx<4)",
                            "value" : ""
                        },
                    "visible4" : {
                            "method" : "(this.treatments.nine.normal.third.field1.semtx>= 4 && this.treatments.nine.normal.third.field1.semtx<5)",
                            "value" : ""
                        },
                    "visible5" : {
                            "method" : "(this.treatments.nine.normal.third.field1.semtx>= 5)",
                            "value" : ""
                        }, 
                    "field0" : {
                        "text" : "Tag blodprøve plasma MTX"                 
                    },
                    "field1" : {
                        "text" : "Tag Se-MTX konc t66 (analyseres med Se-MTX t48 og Se-MTX t54 næste dag) --Se-MTX t66:",
                        "semtx" : ""
                    },
                    "field2" : {
                        "text" : "Tag P-kreatinin konc t66",
                        "pcreatin" : ""
                    },
                    "field3" : {
                        "text" : "For se-MTX t66 >= 0,2 µmol/l gives 4. calciumfolinatdosis.",
                        "method" : "(this.treatments.nine.normal.third.field1.semtx >= 0.2)",
                        "value" : false
                    },
                    "field4" : {
                        "text" : "4. calciumfolinat-dosis. Giv calciumfolinat 15 mg/m².   Givet af:",
                        "text1" : "Patienten må udskrives og skal komme til kontrol af blodprøver om 7 døgn",
                        "name" : "",
                        "method" : "Math.round(15*this.patient.surface.value).toFixed()",
                        "value" : "0"
                    },
                    "field5" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t66.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(15*this.patient.surface.value).toFixed()",
                        "value" : "0"
                
                     },
                    "field6" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t66.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(30*this.patient.surface.value).toFixed()",
                        "value" : "0"
                        
                    },
                    "field7" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t66.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(45*this.patient.surface.value).toFixed()",
                        "value" : "0"
                        
                    },
                    "field8" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t66.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(60*this.patient.surface.value).toFixed()",
                        "value" : "0"
                        
                    },
                    "field9" : {
                        "text" : "Administrere:   Ekstra dosis calciumfolinat ved forhøjet MTX t66.   Givet af:",
                        "name" : "",
                        "method" : "Math.round(this.treatments.nine.normal.third.field1.semtx*this.patient.weight)",
                        "value" : "0"
                        
                    },
                    "field10" : {
                        "text" : "For se-MTX t66 0,2 - 0,3 µmol/l udskrives patienten efter 4.dosis calciumfolinat."
                    },
                    "field11" : {
                        "text" : "For se-MTX t66 0,3 - 0,4 µmol/l kan pt. udskrives med calciumfolinat 15 mg/m² x 3 po. i 2 døgn"
                    },
                    "field12" : {
                        "text" : "For se-MTX t66 0,4 - 0,5 µmol/l kan pt. udskrives med calciumfolinat 15 mg/m² x 3 po. i 3 døgn"
                    },
                    "field13" : {
                        "text" : "For se-MTX t66 >0,5 µmol/l overgår patienten til skema for senudskillelse"
                    }
                }
            }
        }
    },
    "name" : "General Plan"
};

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
                        // console.log("expresion :" + propVal.method);
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
            // console.log("added: "+id);
            // console.log(obj);
            recalculateFields(id);
        },
        changed: function(id, obj) {
            // console.log("changed: "+id);
            // console.log(obj);
            recalculateFields(id);
        }
    })



});
