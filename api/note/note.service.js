const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
// const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy, user) {
	try {
		const criteria = _buildCriteria(filterBy, user)
		const collection = await dbService.getCollection('note')
		let notes = await collection.find(criteria).toArray()
		// console.log('crie', criteria)
		// console.log(notes, 'notes')
		return notes
	} catch (err) {
		logger.error('Cannot find notes', err)
		throw err
	}
}

async function getById(noteId, user) {
	try {
		const noteList = await _getUserList(user)
		// const note = await noteList.findOne({ _id: noteId })
		// const collection = await dbService.getCollection('note')
		// const notes = await collection.find({ userId: ObjectId(user._id) }).toArray()
		// const notesList = await notes.find({noteList})

		console.log(note)

		// const noteList = await collection.find('noteList').toArray()
		// const note = await collection.findOne({ _id: noteId })
		// console.log(notes, 'note')
		// return note
	} catch (err) {
		logger.error(`While finding note ${noteId}`, err)
		throw err
	}
}

async function add(note) {
	const collection = _getUserList(loggedInUser)
	try {
		const collection = await dbService.getCollection('note')
		const addedNote = await collection.insertOne(note)
		return addedNote
	} catch (err) {
		logger.error('Cannot insert note', err)
		throw err
	}
}

async function update(note) {
	try {
		let id = ObjectId(note._id)
		delete toy._id

		const collection = await dbService.getCollection('note')
		await collection.updateOne({ _id: id }, { $set: { ...toy } })
		return note
	} catch (err) {
		logger.error(`Cannot update toy ${noteId}`, err)
		throw err
	}
}

async function remove(noteId) {
	try {
		const collection = await dbService.getCollection('note')
		await collection.deleteOne({ _id: ObjectId(noteId) })
		return noteId
	} catch (err) {
		logger.error(`Cannot remove note ${noteId}`, err)
		throw err
	}
}

async function _getUserList(user) {
	const collection = await dbService.getCollection('note')
	const notes = await collection.find({ userId: ObjectId(user._id) }).toArray()
	return notes[0].noteList
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

// async function query(filterBy = {}) {
// 	try {
// 		const criteria = _buildCriteria(filterBy)
// 		const collection = await dbService.getCollection('note')
// 		// const reviews = await collection.find(criteria).toArray()
// 		var notes = await collection
// 			.aggregate([
// 				{
// 					$match: criteria,
// 				},
// 				{
// 					$lookup: {
// 						localField: 'byUserId',
// 						from: 'user',
// 						foreignField: '_id',
// 						as: 'byUser',
// 					},
// 				},
// 				{
// 					$unwind: '$byUser',
// 				},
// 				{
// 					$lookup: {
// 						localField: 'aboutUserId',
// 						from: 'user',
// 						foreignField: '_id',
// 						as: 'aboutUser',
// 					},
// 				},
// 				{
// 					$unwind: '$aboutUser',
// 				},
// 			])
// 			.toArray()
// 		reviews = reviews.map((review) => {
// 			review.byUser = {
// 				_id: review.byUser._id,
// 				fullname: review.byUser.fullname,
// 			}
// 			review.aboutUser = {
// 				_id: review.aboutUser._id,
// 				fullname: review.aboutUser.fullname,
// 			}
// 			delete review.byUserId
// 			delete review.aboutUserId
// 			return review
// 		})

// 		return reviews
// 	} catch (err) {
// 		logger.error('cannot find reviews', err)
// 		throw err
// 	}
// }

// async function remove(reviewId) {
// 	try {
// 		const store = asyncLocalStorage.getStore()
// 		const { loggedinUser } = store
// 		const collection = await dbService.getCollection('review')
// 		// remove only if user is owner/admin
// 		const criteria = { _id: ObjectId(reviewId) }
// 		if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
// 		const { deletedCount } = await collection.deleteOne(criteria)
// 		return deletedCount
// 	} catch (err) {
// 		logger.error(`cannot remove review ${reviewId}`, err)
// 		throw err
// 	}
// }

// async function add(review) {
// 	try {
// 		const reviewToAdd = {
// 			byUserId: ObjectId(review.byUserId),
// 			aboutUserId: ObjectId(review.aboutUserId),
// 			txt: review.txt,
// 		}
// 		const collection = await dbService.getCollection('review')
// 		await collection.insertOne(reviewToAdd)
// 		return reviewToAdd
// 	} catch (err) {
// 		logger.error('cannot insert review', err)
// 		throw err
// 	}
// }
