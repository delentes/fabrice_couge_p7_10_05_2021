const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')

const userCtrl = require('../controllers/user');

// User route
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profile/:id', auth, userCtrl.getOneUser);
router.delete('/profile/:id', auth, userCtrl.deleteUser);

// Admin route
router.get('/admin/profile', auth, userCtrl.getAllUser);
router.post('/admin/updateadmin', auth ,userCtrl.addAdmin);
router.post('/admin/delete', auth, userCtrl.adminDeleteUser);

module.exports = router;