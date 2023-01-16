const express = require('express')
const {
	requireAuth,
	requireAdmin,
} = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')

const {
	addNote,
	getNotes,
	deleteNote,
	getNoteById,
	updateNote,
} = require('./note.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, requireAuth, getNotes)
router.get('/:id', requireAuth, getNoteById)
router.post('/', log, requireAuth, addNote)
router.put('/:id', requireAuth, updateNote)
router.delete('/:id', requireAuth, deleteNote)

module.exports = router
