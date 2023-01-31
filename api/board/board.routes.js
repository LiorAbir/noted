const express = require('express')
const { log } = require('../../middlewares/logger.middleware')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')

const {
	getBoard,
	getBoardById,
	addBoard,
	updateBoard,
	deleteBoard,
} = require('./board.controller')
const router = express.Router()

router.get('/', log, requireAuth, getBoard)
router.get('/:id', requireAuth, getBoardById)
router.post('/', log, requireAuth, addBoard)
router.put('/:id', requireAuth, updateBoard)
router.delete('/:id', requireAuth, deleteBoard)

module.exports = router
