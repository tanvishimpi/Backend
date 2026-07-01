const express = require('express')
const router = express.Router();

const {createNotes,getNotes,updateNotes,deleteNotes} = require("../controllers/notesController")

router.post('/create-notes',createNotes)
router.get('/get-notes',getNotes)
router.patch('/update-notes/:id',updateNotes)
router.delete('/delete-notes/:id',deleteNotes)


module.exports = router;

