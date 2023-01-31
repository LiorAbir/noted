const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

const authService = require('./auth.service')
const boardService = require('../board/board.service')

async function login(req, res) {
	const { username, password } = req.body
	try {
		const user = await authService.login(username, password)
		const loginToken = authService.getLoginToken(user)
		logger.info('User login: ', user)
		res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
		res.json(user)
	} catch (err) {
		logger.error('Failed to Login ' + err)
		res.status(401).send({ err: 'Failed to Login' })
	}
}

async function signup(req, res) {
	try {
		const credentials = req.body
		// Never log passwords
		// logger.debug(credentials)
		const account = await authService.signup(credentials)
		logger.debug(`auth.route - new account created: ` + JSON.stringify(account))

		const user = await authService.login(
			credentials.username,
			credentials.password
		)
		logger.info('User signup:', user)

		const loginToken = authService.getLoginToken(user)

		const newBoard = {
			userId: ObjectId(user._id),
			labels: [],
			noteList: [],
		}
		boardService.add(newBoard)

		///
		const collection = await dbService.getCollection('note')
		const newNotes = {
			userId: ObjectId(user._id),
			noteList: [],
			labels: [],
		}
		collection.insertOne(newNotes)

		res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
		res.json(user)
	} catch (err) {
		logger.error('Failed to signup ' + err)
		res.status(500).send({ err: 'Failed to signup' })
	}
}

async function logout(req, res) {
	try {
		res.clearCookie('loginToken')
		res.send({ msg: 'Logged out successfully' })
		logger.info('User logout')
		// console.log(req.cookies)
	} catch (err) {
		res.status(500).send({ err: 'Failed to logout' })
	}
}

module.exports = {
	login,
	signup,
	logout,
}
