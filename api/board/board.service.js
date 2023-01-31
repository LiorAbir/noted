const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

//
async function query(filterBy, user) {
	try {
		const criteria = _buildCriteria(filterBy, user)
		const collection = await dbService.getCollection('board')
		let board = await collection.find(criteria).toArray()
		console.log(board)
		return board
	} catch (err) {
		logger.error('cannot find board')
		throw err
	}
}

async function getById(boardId, user) {
	try {
		const collection = await dbService.getCollection('board')
		let board = await collection.find(boardId).toArray()
		return board
	} catch (err) {
		logger.err(`while finding board ${boardId}`, err)
		throw err
	}
}

async function add(board) {
	try {
		const collection = await dbService.getCollection('board')
		const newBoard = collection.insertOne(board)
		return newBoard
	} catch (err) {
		logger.error('cannot insert board', err)
		throw err
	}
}

async function update(board, user) {
	try {
		let id = ObjectId(board._id)
		delete board._id

		const collection = await dbService.getCollection('board')
		await collection.updateOne({ _id: id }, { $set: { ...board } })
		return board
	} catch (err) {
		logger.error(`cannot update board ${boardId}`, err)
		throw err
	}
}

async function remove(boardId, user) {
	try {
		const collection = await dbService.getCollection('board')
		await collection.deleteOne({ _id: ObjectId(boardId) })
		return boardId
	} catch (err) {
		logger.error(`cannot remove board ${boardId}`, err)
		throw err
	}
}

function _buildCriteria(filterBy, user) {
	const criteria = {}
	if (user) criteria.userId = ObjectId(user._id)
	return criteria
}

module.exports = {
	query,
	getById,
	add,
	update,
	remove,
}
