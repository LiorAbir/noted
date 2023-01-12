const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const authService = require('../auth/auth.service')
// const socketService = require('../../services/socket.service')
const noteService = require('./note.service')

async function getNotes(req, res) {
	try {
		const notes = await noteService.query(req.query)
		res.send(notes)
	} catch (err) {
		logger.error('Cannot get notes', err)
		res.status(500).send({ err: 'Failed to get notes' })
	}
}

async function deleteNote(req, res) {
	try {
		const deletedCount = await noteService.remove(req.params.id)
		if (deletedCount === 1) {
			res.send({ msg: 'Deleted successfully' })
		} else {
			res.status(400).send({ err: 'Cannot remove review' })
		}
	} catch (err) {
		logger.error('Failed to delete review', err)
		res.status(500).send({ err: 'Failed to delete review' })
	}
}

async function addNote(req, res) {
	var loggedinUser = authService.validateToken(req.cookies.loginToken)

	try {
		var note = req.body
		// note.byUserId = loggedinUser._id
		note = await noteService.add(review)

		// prepare the updated review for sending out
		// review.aboutUser = await userService.getById(review.aboutUserId)

		// Give the user credit for adding a review
		// var user = await userService.getById(review.byUserId)
		// user.score += 10
		// loggedinUser.score += 10

		// loggedinUser = await userService.update(loggedinUser)
		// review.byUser = loggedinUser

		// User info is saved also in the login-token, update it
		const loginToken = authService.getLoginToken(loggedinUser)
		res.cookie('loginToken', loginToken)

		socketService.broadcast({
			type: 'review-added',
			data: review,
			userId: review.byUserId,
		})
		socketService.emitToUser({
			type: 'review-about-you',
			data: review,
			userId: review.aboutUserId,
		})

		const fullUser = await userService.getById(loggedinUser._id)
		socketService.emitTo({
			type: 'user-updated',
			data: fullUser,
			label: fullUser._id,
		})

		res.send(review)
	} catch (err) {
		logger.error('Failed to add review', err)
		res.status(500).send({ err: 'Failed to add review' })
	}
}

module.exports = {
	getNotes,
	deleteNote,
	addNote,
}
