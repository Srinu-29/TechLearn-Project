const Course = require('../models/course');
const Notes = require('../models/Notes');

const courseController = {
    getAllCourses: async (req, res) => {
        try {
            const courses = await Course.find();
            return res.status(200).json({ courses });
        } catch (error) {
            return res.status(500).json({
                error: "Error fetching courses"
            });
        }
    },

    getAllNotes: async (req, res) => {
        try {
            const courseId = req.params.id;
            
            // Validate courseId
            if (!courseId) {
                return res.status(400).json({
                    error: "Course ID is required"
                });
            }

            // Find notes for the course
            const notes = await Notes.find({ courseId }).exec();

            return res.status(200).json({ 
                success: true,
                notes 
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Error fetching notes"
            });
        }
    },
      createCourse: async (req, res) => {
        try {
            const { title, description, duration, difficulty, topics } = req.body;
            const course = new Course({
                title,
                description,
                duration,
                difficulty,
                topics
            });
            await course.save();
            return res.status(201).json({ success: true, course });
        } catch (error) {
            return res.status(500).json({ success: false, error: "Error creating course" });
        }
    },

    updateCourse: async (req, res) => {
        try {
            const course = await Course.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!course) {
                return res.status(404).json({ success: false, error: "Course not found" });
            }
            return res.status(200).json({ success: true, course });
        } catch (error) {
            return res.status(500).json({ success: false, error: "Error updating course" });
        }
    },

    deleteCourse: async (req, res) => {
        try {
            const course = await Course.findByIdAndDelete(req.params.id);
            if (!course) {
                return res.status(404).json({ success: false, error: "Course not found" });
            }
            await Notes.deleteMany({ courseId: req.params.id });
            return res.status(200).json({ success: true, message: "Course deleted" });
        } catch (error) {
            return res.status(500).json({ success: false, error: "Error deleting course" });
        }
    },

    createNote: async (req, res) => {
        try {
            const { title, content } = req.body;
            const note = new Notes({
                title,
                content,
                courseId: req.params.id
            });
            await note.save();
            return res.status(201).json({ success: true, note });
        } catch (error) {
            return res.status(500).json({ success: false, error: "Error creating note" });
        }
    },

    updateNote: async (req, res) => {
        try {
            const note = await Notes.findOneAndUpdate(
                { courseId: req.params.courseId },
                req.body,
                { new: true }
            );
            if (!note) {
                return res.status(404).json({ success: false, error: "Note not found" });
            }
            return res.status(200).json({ success: true, note });
        } catch (error) {
            return res.status(500).json({ success: false, error: "Error updating note" });
        }
    },

    deleteNote: async (req, res) => {
        try {
            const note = await Notes.findOneAndDelete({
                _id: req.params.noteId,
                courseId: req.params.courseId
            });
            if (!note) {
                return res.status(404).json({ success: false, error: "Note not found" });
            }
            return res.status(200).json({ success: true, message: "Note deleted" });
        } catch (error) {
            return res.status(500).json({ success: false, error: "Error deleting note" });
        }
    }
};

module.exports = courseController;