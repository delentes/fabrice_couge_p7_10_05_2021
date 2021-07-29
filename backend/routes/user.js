const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profile/:id', auth, userCtrl.getOneUser);
router.get('/admin/profile', userCtrl.getAllUser);
router.delete('/profile/:id', auth, userCtrl.deleteUser);

module.exports = router;