const express = require ('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const topicCtrl = require ('../controllers/topic');

router.post('/create', auth, multer, topicCtrl.createTopic);
router.get('/topic', multer, topicCtrl.getAllTopic);
router.get('/topic/:id',auth, multer, topicCtrl.getOneTopic);

module.exports = router;