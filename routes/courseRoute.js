const courseController = require('../controllers/courseController');
const Router = require("express").Router();
const auth = require("../middlewares/auth");
const adminAuth = require('../middlewares/adminmiddleware');

// Public routes
Router.get("/courses", auth, courseController.getAllCourses);
Router.get("/courses/:id/notes", auth, courseController.getAllNotes);

// Admin Routes - Courses
Router.post("/courses", [auth, adminAuth], courseController.createCourse);
Router.put("/courses/:id", [auth, adminAuth], courseController.updateCourse);
Router.delete("/courses/:id", [auth, adminAuth], courseController.deleteCourse);

// Admin Routes - Notes
Router.post("/courses/:id/notes", [auth, adminAuth], courseController.createNote);
Router.put("/courses/:courseId/notes", [auth, adminAuth], courseController.updateNote);
Router.delete("/courses/:courseId/notes", [auth, adminAuth], courseController.deleteNote);

module.exports = Router;