// const notes = []; 

// exports.createNotes = async (req, res) => {


// try{

//     const title =req.body.title;

//     const description=req.body.description;

//     notes.push({title,description})

//     res.status(200).json({
//         message: "notes created succesfully",
//         notes
//     });
    


// }
// catch(errr){
//     return res.status(500).json({
//         message: errr.message
//     })



// }


// }
// exports.getNotes = async(req,res) => {

//     try{
//         if(notes.length===0){
//             return res.status(400).json({
//             message : "notes is empty"
//             })
//         }

//         res.status(200).json({
//             message : "notes fetched successfully",
//             notes

//         })


//     }

//     catch(err){
//         return res.status(500).json({
//             message: err.message
//         })


//     }


// }


// exports.updateNotes = async(req,res) =>{

//     try{
//         if(notes.length===0){
//             return res.status(400).json({
//                 message : "notes is empty",
                
//             })
//         }

//         const idx = Number(req.params.id);

//         const {title,description} = req.body;
      

//         notes[idx].title = title;
//         notes[idx].description = description;

//         res.status(200).json({
//             message : "notes updated"
            
//         })

//     }

//     catch(err){
//        return res.status(500).json({
//         message : err.message
//        })

//     }  

// }

// exports.deleteNotes = async(req,res) =>{
       
//     try{
//         if(notes.length===0){
//             return res.status(400).json({
//                 message: "notes is empty",
//             })
//         }


//         const idx =(req.params.id)
//         delete notes [idx]


//         res.status(200).json({
//             message : "note deleted successfully"
//         })

//     }

//     catch(err){

//         return res.status(500).json({
//             message : err.message
//         })

//     }
// }


















//mongoDB


const express = require('express');
const Notes = require('../models/Notes');


exports.createNotes = async(req,res)=>{


try{
    
   const{title,description} = req.body;

    const notes = await Notes.create({
        title,
        description
    });

    return res.status(201).json({
        message: 'notes created successfully',
        notes
        
    });

}

catch(err){
    return res.status(500).json({
        message : err.message
    })
}
 }



 //get


 exports.getNotes = async(req,res)=>{                                                    


    try{    
       
         const notes = await Notes.find();

         if(notes.length===0){
            return res.status(400).json({
                message : "Notes are empty",
                
            })
         }
         return res.status(200).json({
            message: "Notes fetched succesfully",
            notes : notes
            
        });

    }

    catch(err){
        return res.status(500).json({
            message:err.message
        })

    }
 }


 //update

//  exports.updateNotes = async(req,res) =>{

//    try{
//         const {title,description} = req.body;

//          const notes = await Notes.updateOne({
//             title,
//             description
//          },
//          );
    
//         if(notes.length===0){
//             return res.status(400).json({
//                 message : "notes is empty",
                
//             })
//         };
 
//         const idx = Number(req.params.id);

//         notes[idx].title = title;
//         notes[idx].description = description; 
//         notes =[];

//         res.status(200).json({
//             message: "Note updated successfully"
//         })
    

//    }

//    catch(err){
//     return res.status(500).json({
//         message : err.message
//     })

//    }
//  }








exports.updateNotes = async(req,res) =>{

    try{

        const {updatedTitle,updatedDescription} = req.body
     
        const id = req.params.id
        const existingNotes = await Notes.find();

        if(notes.length===0){
            return res.status(404).json({
                message : "notes not found in database"
            })
        }

        for( let i=0 ; i<existingNotes.length ; i++){

            if(existingNotes[i]._id.toString() === id){
                existingNotes[i].title = updatedTitle;
                existingNotes[i].description = updatedDescription;
                await existingNotes[i].save()     //by writing this our data is stored in database too
               
            }
        }


        res.status(200).json({
         message: "Note updated successfully",
         notes


         })
     
    }


    catch(err){
        return res.status(500).json({
            message : err.message
        })
    }


}









exports.deleteNotes = async(req,res)=>{

    try{
          const id = req.params.id;

          const existingNotes = await Notes.find();

          if(existingNotes.length === 0){
            return res.status(404).json({
                message : "Note not found in db"
            });
          }

          for(let i = 0; i < existingNotes.length; i++){
            if(existingNotes[i]._id.toString() === id){
                await existingNotes[i].deleteOne({_id: id});
                return res.status(200).json({
                    message: "Note deleted successfully"
                });
            }
          }

        
    }
    catch(err){
        return res.status(500).json({
            message : err.message
        });
    }
}
