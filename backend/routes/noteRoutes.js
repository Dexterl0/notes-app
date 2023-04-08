const express = require('express');
const router = express.Router();

const noteController = require('../controllers/noteController');

/* http://localhost:5000/api/note/add-note */
router.post("/add-note", noteController.add_note);

/* http://localhost:5000/api/note/delete-note */
router.delete("/delete-note", noteController.delete_note);

/* http://localhost:5000/api/note/edit-note */
router.put("/edit-note", noteController.edit_note);

/* http://localhost:5000/api/note/get-all-notes/:userId */
router.get("/get-all-notes/:userId", noteController.get_all_notes);

/* http://localhost:5000/api/note/get-filtered-notes/:userId/:tag */
router.get("/get-filtered-notes/:userId/:tag", noteController.get_filtered_notes);

/* http://localhost:5000/api/note/get-single-note/:noteId */
router.get("/get-single-note/:noteId", noteController.get_single_note);

/* http://localhost:5000/api/note/get-tags/:userId */
router.get("/get-tags/:userId", noteController.get_tags);

/* http://localhost:5000/api/note/edit-tag */
router.put("/edit-tag", noteController.edit_tag);

/* http://localhost:5000/api/note/edit-user-tags */
router.put("/edit-user-tags", noteController.edit_user_tags);

module.exports = router;