const Note = require('../models/note');
const User = require('../models/user');

exports.add_note = async (req, res) => {
    const { userId, text, tag } = req.body;

    const newNote = new Note({
        userId,
        text,
        tag
    });

    try {
        const savedNote = await newNote.save();
        res.status(200).json({ savedNote });
    } catch (err) {
        res.status(400).json({
            error: "Error adding note"
        });
    }
}

exports.delete_note = async (req, res) => {
    const { noteId } = req.body;

    try {
        const deletedNote = await Note.findByIdAndDelete(noteId);
        res.status(200).json({ deletedNote });
    } catch (err) {
        res.status(400).json({
            error: "Delete note unsuccessful"
        });
    }

}

exports.edit_note = async (req, res) => {
    const { noteId, text } = req.body;
    try {
        const updatedNote = await Note.findByIdAndUpdate(noteId, { text }, { returnDocument: 'after' });
        res.status(200).json(updatedNote);
    } catch (err) {
        res.status(400).json({
            error: "Edit note unsuccessful"
        });
    }
}

exports.get_all_notes = async (req, res) => {
    const { userId } = req.params;

    try {
        const notes = await Note.find({ userId: userId });
        res.status(200).json(notes);
    } catch (err) {
        res.status(400).json({
            error: "Could not retrieve notes"
        });
    }
}

exports.get_filtered_notes = async (req, res) => {
    const { userId, tag } = req.params;

    try {
        const filteredNotes = await Note.find({ userId: userId, tag: tag });
        res.status(200).json(filteredNotes);
    } catch (err) {
        res.status(400).json({
            error: "Could not retrieve filtered notes"
        });
    }
}

exports.get_single_note = async (req, res) => {
    const { noteId } = req.params;

    try {
        const note = await Note.findById(noteId);
        res.status(200).json(note);
    } catch (err) {
        res.status(400).json({
            error: "Could not retrieve note"
        });
    }
}

exports.get_tags = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        res.status(200).json(user.tags);
    } catch (err) {
        res.status(400).json({
            error: "Could not retrieve tags"
        });
    }
}

exports.edit_tag = async (req, res) => {
    const { noteId, tag } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(noteId, { tag: tag });

        res.status(200).json(updatedNote);
    } catch (err) {
        res.status(400).json({
            error: "Could not update tags"
        });
    }
}

exports.edit_user_tags = async (req, res) => {
    const { userId, tags } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { tags: tags }, { returnDocument: 'after' });

        const userNotes = await Note.find({ userId: userId });

        userNotes.forEach(async n => {
            if (!tags.includes(n.tag)) {
                const updatedNote = await Note.findByIdAndUpdate(n._id, { tag: "Untagged" });
            }
        });

        res.status(200).json(updatedUser.tags);
    } catch (err) {
        res.status(400).json({
            error: "Could not update user tags"
        });
    }
}