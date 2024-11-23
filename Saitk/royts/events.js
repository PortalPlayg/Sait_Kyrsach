const express = require('express');
const router = express.Router();
const { createEvent, getEvents, updateEvent, deleteEvent, registerForEvent, cancelRegistration } = require('../controllers/eventsController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware); // Защита всех роутов

router.post('/', createEvent);
router.get('/', getEvents);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.post('/:eventId/register', registerForEvent);
router.delete('/:eventId/cancel', cancelRegistration);

module.exports = router;
