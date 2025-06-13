const Progress = require('../models/Progress');
const Course = require('../models/course');

const progressController = {
    updateProgress: async (req, res) => {
        try {
            const { courseId, topicTitle } = req.body;
            const userId = req.user.id;

            // Find or create progress document
            let progress = await Progress.findOne({ userId, courseId });
            if (!progress) {
                progress = new Progress({ userId, courseId });
            }

            // Add completed topic if not already completed
            if (!progress.completedTopics.find(t => t.topicTitle === topicTitle)) {
                progress.completedTopics.push({
                    topicTitle,
                    completedAt: new Date()
                });
            }

            // Get course to calculate progress percentage
            const course = await Course.findById(courseId);
            const totalTopics = course.topics.length;
            progress.progressPercentage = 
                (progress.completedTopics.length / totalTopics) * 100;

            // Check if course is completed
            if (progress.completedTopics.length === totalTopics) {
                progress.isCompleted = true;
            }

            progress.lastAccessed = new Date();
            await progress.save();

            res.status(200).json({
                success: true,
                progress
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error updating progress'
            });
        }
    },

getUserProgress: async (req, res) => {
        try {
            const { userId } = req.params;

            // Verify if requesting user has access
            if (req.user.id !== userId) {
                return res.status(403).json({
                    success: false,
                    error: 'Not authorized to view this progress'
                });
            }

            const progress = await Progress.find({ userId })
                .populate('courseId', 'title description difficulty')
                .sort('-lastAccessed');

            if (!progress) {
                return res.status(404).json({
                    success: false,
                    error: 'No progress found for this user'
                });
            }

            return res.status(200).json({
                success: true,
                progress
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Error fetching user progress'
            });
        }
    }
};

module.exports = progressController;