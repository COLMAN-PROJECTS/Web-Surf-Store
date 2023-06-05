const express = require('express');

const router = express.Router();

router.get('*', (req, res)=>{
    res.status(404).sendFile( 'backend/notFound.html');
});

module.exports = router;