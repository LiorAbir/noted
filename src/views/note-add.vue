<template>
	<div class="note-add" v-if="isFocus === false" @click="isFocus = true">
		<div class="add-container flex">
			<h4>Add note...</h4>
			<div class="types flex">
				<img
					src="../assets/icon/list.svg"
					alt="list"
					class="btn type-btn"
					title="list note"
					@click="setNoteType('note-todos')"
				/>
			</div>
		</div>
	</div>
	<!--  -->
	<div
		class="note-add"
		v-if="isFocus"
		v-clickOutSide="closeAddNote"
		:style="{
			backgroundColor: newNote.bgClr,
		}"
	>
		<div class="add-note-input">
			<div
				class="content-input flex"
				:style="{
					'background-image': `url(${newNote.bgImg})`,
				}"
			>
				<div class="note-imgs" v-if="newNote.info.imgs">
					<div class="img-container" v-for="(img, i) in newNote.info.imgs">
						<img :src="img" alt="upload" />
						<img
							class="delete-img-btn"
							src="../assets/icon/trash.svg"
							alt="trash"
							title="Delete image"
							@click="deleteImg(i)"
						/>
					</div>
				</div>

				<input
					type="text"
					class="note-title"
					placeholder="Title"
					v-model="newNote.info.title"
				/>

				<div
					class="note-content"
					:placeholder="setInputPlaceHolder"
					contenteditable="true"
					@input="setVal"
				></div>
			</div>

			<div class="actions flex">
				<div class="flex">
					<addImg @addImgUrl="addImgUrl" />
					<img
						src="../assets/icon/color.svg"
						alt="color"
						class="btn clr-btn"
						title="choose background"
						@click="isClrPlt = !isClrPlt"
					/>
				</div>
				<button @click="save">Save</button>
			</div>
		</div>
		<backgroundPallete v-if="isClrPlt" @setBackground="setBackground" />
	</div>
</template>
<script>
import backgroundPallete from '../components/background-pallete.vue'
import addImg from '../components/add-img.vue'

export default {
	name: 'note-add',
	data() {
		return {
			newNote: null,
			isFocus: false,
			isClrPlt: false,
		}
	},
	created() {
		this.getNewNote()
	},
	methods: {
		setNoteType(type) {
			this.newNote.type = type
		},
		setVal(el) {
			let val = el.target.innerText
			switch (this.newNote.type) {
				case 'note-txt':
					this.newNote.info.txt = val
					break
				case 'note-todos':
					const todos = []
					val.split(',').map((todo) => {
						const newTodo = { txt: todo }
						todos.push(newTodo)
					})
					this.newNote.info = { todos: todos }
					break
			}
		},
		setBackground(fill, type) {
			this.isFocus = true
			this.newNote[type] = fill
		},
		save() {
			this.$store.dispatch({ type: 'saveNote', note: this.newNote })
			this.closeAddNote()
			this.isFocus = false
		},
		closeAddNote() {
			if (this.isClrPlt === false) {
				this.isFocus = false
				this.getNewNote()
			}
			this.newNote.type = 'note-txt'
		},
		getNewNote() {
			this.newNote = JSON.parse(JSON.stringify(this.$store.getters.emptyNote))
		},
		addImgUrl(url) {
			this.newNote.info.imgs.push(url)
		},
		deleteImg(index) {
			this.newNote.info.imgs.splice(index, 1)
		},
	},
	computed: {
		setInputPlaceHolder() {
			switch (this.newNote.type) {
				case 'note-txt':
					return "What's on your mind..."
					break
				case 'note-todos':
					return 'Enter comma separated list...'
					break
			}
		},
	},
	components: {
		backgroundPallete,
		addImg,
	},
}
</script>
<style></style>
