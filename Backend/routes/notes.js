const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
var fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        res.status(504).send('an error occured')
    }


})

// add notes
router.post('/addnote', fetchuser, [
    body('title', 'email not valid').isLength({ min: 3 }),
    body('description', 'password mustbe more than 5 char ').isLength({ min: 5 }),

],

    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const notes = new Notes({
                title, description, tag, user: req.user.id
            })
            const saveNote = await notes.save()
            res.json(saveNote)
        }
        catch (error) {
            res.status(504).send('an error occured')
        }

    })


//route 3 update an existing note
router.put('/updatenote/:id', fetchuser,
    async (req, res) => {

        try {
            const { title, description, tag } = req.body;
            //creating new note obj
            const newNotes = {}
            if (title) { newNotes.title = title }
            if (description) {newNotes.description = description}
            if (tag) { newNotes.tag = tag }
            let notes = await Notes.findById(req.params.id);
            if (!notes) { return res.status(404).send('note not found') }

            if (notes.user.toString() !== req.user.id) { return res.status(401).send("Unauthorized") }
            notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true })
            res.json({ notes })
        }
        catch (error) {
            res.status(504).send('an error occured')
        }
    }
)


//de
router.delete('/deletenote/:id', fetchuser,
    async (req, res) => {

        try {
          
            //creating new note obj
            let notes = await Notes.findById(req.params.id);
            if (!notes) { return res.status(404).send('note not found') }

            if (notes.user.toString() !== req.user.id) { return res.status(401).send("Unauthorized") }

            notes = await Notes.findByIdAndDelete(req.params.id)
            res.json({"success":"note hasbeen deleted"})
        }
        catch (error) {
            res.status(504).send('an error occured')
        }
    }
)


module.exports = router