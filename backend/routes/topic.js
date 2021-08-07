const express = require ('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const topicCtrl = require ('../controllers/topic');

// Topic route
router.post('/topic', auth, multer, topicCtrl.createTopic);
router.get('/topic', auth, multer, topicCtrl.getAllTopic);
router.get('/topic/:id', auth, multer, topicCtrl.getOneTopic);
router.post('/topic/:id', auth, multer, topicCtrl.modifyTopic);
router.delete('/topic/:id', auth, topicCtrl.deleteTopic);
router.get('/spamTopic', auth, topicCtrl.getSpamTopic);
router.post('/spamTopic', auth, topicCtrl.cancelSpamTopic);
router.post('/topicSpam', auth, topicCtrl.signalTopic);
router.post('/deleteTopicSpam', auth, topicCtrl.deleteSpamTopic);


// Comment route
router.post('/comment', auth, multer, topicCtrl.createComment);
router.get('/comment/:id', auth, multer, topicCtrl.getAllComment);
router.post('/comment/:id', auth, multer, topicCtrl.modifyComment);
router.delete('/comment/:id', auth, topicCtrl.deleteComment);
router.get('/spamComment', auth, topicCtrl.getSpamComment);
router.post('/spamComment', auth, topicCtrl.cancelSpamComment);
router.post('/commentSpam', auth, topicCtrl.signalComment);
router.post('/deleteCommentSpam', auth, topicCtrl.deleteSpamComment);
// spam route


module.exports = router;