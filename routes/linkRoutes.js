const express = require('express');
const { getLinks, createLink, deleteLink } = require('../controllers/linkController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getLinks).post(protect, createLink);
router.route('/:id').delete(protect, deleteLink);

module.exports = router;
