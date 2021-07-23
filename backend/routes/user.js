const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/admin/profile', userCtrl.getAllUser);
router.post('/profile/:id', auth,userCtrl.getOneUser);
router.delete('/profile/:id', auth, userCtrl.deleteUser);

module.exports = router;