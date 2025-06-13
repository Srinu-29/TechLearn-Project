const router = require('express').Router();
const progressController = require('../controllers/progressController');
const auth = require('../middlewares/auth');

router.post('/progress', auth, progressController.updateProgress);
router.get('/progress/:userId', auth, progressController.getUserProgress);

module.exports = router;