const express = require('express');
const router = express.Router();

// Logout Router
router.get('/', (req, res, next) => {
    delete req.currentUser;
    res.json({
        msg: 'Successfully logged out'
    })
})
module.exports = router;