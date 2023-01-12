const express = require('express')
const {
	requireAuth,
	requireAdmin,
} = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { addNote, getNotes, deleteNote } = require('./note.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getNotes)
router.post('/', log, requireAuth, addNote)
router.delete('/:id', requireAuth, deleteNote)

module.exports = router
