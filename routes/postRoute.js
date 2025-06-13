const router = require('express').Router();
const {getAllPosts} =  require('../controllers/postController');
const auth = require("../middlewares/auth");
router.get('/posts',auth,getAllPosts);



module.exports=router;
