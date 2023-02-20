const noteService = require('./note.service')
const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const authService = require('../auth/auth.service')
// const socketService = require('../../services/socket.service')

//GET NOTES
async function getNotes(req, res) {
	try {
		logger.debug('Getting notes')
		const loggedInUser = authService.validateToken(req.cookies.loginToken)
		if (!loggedInUser) logger.error('Require User', err)

		const notes = await noteService.query(req.query, loggedInUser)
		res.json(notes)
	} catch (err) {
		logger.error('Failed to get notes', err)
		res.status(500).send({ err: 'Failed to get notes' })
	}
}

//GET BY ID
async function getNoteById(req, res) {
	const loggedInUser = authService.validateToken(req.cookies.loginToken)
	try {
		const noteId = req.params.id
		const note = await noteService.getById(noteId, loggedInUser)
		res.json(note)
	} catch (err) {
		logger.err('Failed to get note', err)
		res.status(500).send({ err: 'Failed to get note' })
	}
}

//POST (ADD)
async function addNote(req, res) {
	const loggedInUser = authService.validateToken(req.cookies.loginToken)
	try {
		const note = req.body
		const addedNote = await noteService.add(note, loggedInUser)
		res.json(addedNote)
	} catch (err) {
		logger.error('Failed to add note', err)
		res.status(500).send({ err: 'Failed to add note' })
	}
}

//PUT (UPDATE)
async function updateNote(req, res) {
	const loggedInUser = authService.validateToken(req.cookies.loginToken)
	try {
		const note = req.body
		const updatedNote = await noteService.update(note, loggedInUser)
		res.json(updatedNote)
	} catch (err) {
		logger.error('Failed to update note', err)
		res.status(500).send({ err: 'Failed to update note' })
	}
}

//DELETE
async function deleteNote(req, res) {
	const loggedInUser = authService.validateToken(req.cookies.loginToken)
	try {
		const noteId = req.params.id
		await noteService.remove(noteId, loggedInUser)
		res.send('Removed')
	} catch (err) {
		logger.error('Failed to delete note', err)
		res.status(500).send({ err: 'Failed to delete note' })
	}
}

module.exports = {
	getNotes,
	getNoteById,
	addNote,
	updateNote,
	deleteNote,
}
