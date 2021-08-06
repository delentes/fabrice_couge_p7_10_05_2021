const express = require ('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const topicCtrl = require ('../controllers/topic');

// Topic route
router.post('/topic', auth, multer, topicCtrl.createTopic);
router.get('/topic', multer, multer, topicCtrl.getAllTopic);
router.get('/topic/:id', auth, multer, topicCtrl.getOneTopic);
router.post('/topic/:id', auth, multer, topicCtrl.modifyTopic);
router.delete('/topic/:id', auth, topicCtrl.deleteTopic);

// Comment route
router.post('/comment', auth, multer, topicCtrl.createComment);
router.get('/comment/:id', auth, multer, topicCtrl.getAllComment);
router.post('/comment/:id', auth, multer, topicCtrl.modifyComment);
router.delete('/comment/:id', auth, topicCtrl.deleteComment);

// spam route
router.get('/spam', auth, topicCtrl.getSpam);
router.post('/spam', auth, topicCtrl.signalSpam);
module.exports = router;