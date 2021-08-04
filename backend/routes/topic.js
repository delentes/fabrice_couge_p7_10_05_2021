const express = require ('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const topicCtrl = require ('../controllers/topic');

// Topic route
router.post('/create', auth, multer, topicCtrl.createTopic);
router.get('/topic', multer, multer, topicCtrl.getAllTopic);
router.get('/topic/:id',auth, multer, topicCtrl.getOneTopic);

// Comment route
router.post('/createComment', auth, multer, topicCtrl.createComment);
router.get('/comment/:id', auth, multer, topicCtrl.getAllComment);

module.exports = router;