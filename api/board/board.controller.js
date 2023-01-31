const boardService = require('./board.service')
const authService = require('../auth/auth.service')
const logger = require('../../services/logger.service')

async function getBoard(req, res) {
	try {
		logger.debug('Getting board')
		const loggedInUser = authService.validateToken(req.cookies.loginToken)

		const board = await boardService.query(req.query, loggedInUser)
		console.log(board)
		res.json(board)
	} catch (err) {
		logger.error('failed to get board', err)
		res.status(500).send({ err: 'Failed to get board' })
	}
}

async function getBoardById(req, res) {
	try {
		const boardId = req.params.id
		const board = await boardService.getById(boardId)
		res.json(board)
	} catch (err) {
		logger.error('failed to get board', err)
		res.status(500).send({ err: 'Failed to get board' })
	}
}

async function addBoard(req, res) {
	try {
	} catch (err) {
		try {
			const board = req.body
			const addedBoard = await boardService.add(board)
			res.json(addedBoard)
		} catch (err) {
			logger.error('Failed to add board', err)
			res.status(500).send({ err: 'Failed to add board' })
		}
	}
}

async function updateBoard(req, res) {
	try {
		const board = req.body
		const updatedBoard = await boardService.update(board)
		res.json(updatedBoard)
	} catch (err) {
		logger.error('Failed to update board', err)
		res.status(500).send({ err: 'Failed to update board' })
	}
}

async function deleteBoard(req, res) {
	try {
		const boardId = req.params.id
		await boardService.remove(boardId)
		res.send('Removed')
	} catch (err) {
		logger.error('failed to remove board', err)
		res.status(500).send({ err: 'Failed to remove board' })
	}
}

module.exports = {
	getBoard,
	getBoardById,
	addBoard,
	updateBoard,
	deleteBoard,
}
