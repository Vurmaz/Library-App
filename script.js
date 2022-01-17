const addBookBtn = document.querySelector("#ADD_BTN");
const container = document.querySelector(".holder");
const pop = document.querySelector(".pop-up");
const overlay = document.querySelector(".overlay");
const name = document.querySelector("#NAME");
const author = document.querySelector("#AUTHOR");
const page = document.querySelector("#PAGE");
const submit = document.querySelector("#SUBMİT")
const form = document.querySelector("form")
const body = document.querySelector(".bodi");

let STORAGE_LİBRARY = "library.storage";
let STORAGE_BTN_COLOR = "library.color";

let library = JSON.parse(localStorage.getItem(STORAGE_LİBRARY)) || [] ;
let read = localStorage.getItem(STORAGE_BTN_COLOR)

function render () {
clearElement(container);
library.forEach((e)=>{
const book = document.createElement("div");
book.classList.add("books");
book.dataset.listId = e.id;

const bookName = document.createElement("div");
bookName.textContent = `${e.name}`

const labelName = document.createElement("label");
labelName.textContent = "Book Name";
labelName.classList.add("book-label")

const authorName = document.createElement("div");
authorName.textContent = `${e.author}`

const labelAuthor = document.createElement("label");
labelAuthor.textContent = "Author Name";
labelAuthor.classList.add("book-label");

const totalPage = document.createElement("div");
totalPage.textContent = `${e.page}`;

const labelPage = document.createElement("label");
labelPage.textContent = "Total Page";
labelPage.classList.add("book-label");

const bookRead = document.createElement("button");
bookRead.classList.add('btn-books')
bookRead.innerText = 'Not Read'
check(book,bookRead)

const removeBtn = document.createElement("button");
removeBtn.classList.add('btn-books')
removeBtn.textContent = "REMOVE";

container.appendChild(book);
book.appendChild(labelName)
book.appendChild(bookName)
book.appendChild(labelAuthor)
book.appendChild(authorName)
book.appendChild(labelPage)
book.appendChild(totalPage)
book.appendChild(bookRead)
book.appendChild(removeBtn)
save()
bookReadHandle(book,bookRead)

removeBtn.addEventListener("click",()=>{
	let removingItem = library.findIndex(item=>item.id === book.dataset.listId);
	container.removeChild(removeBtn.parentNode);
	library.splice(removingItem,removingItem + 1);
	save()
})
})
}
function save() {
	localStorage.setItem(STORAGE_LİBRARY,JSON.stringify(library));
}
function clearElement(elem) {
while(elem.firstChild){
	elem.removeChild(elem.firstChild)
}
};
function bookReadHandle(book,bookRead) {
	bookRead.addEventListener("click",()=>{
		library.forEach((item)=>{
			if(item.id == book.dataset.listId){
			item.read ? item.read = false : item.read = true
			check(book,bookRead)
			}
		})
	})}
function check(book,bookRead) {
	library.forEach((item)=>{
		if(item.id == book.dataset.listId){
			if (item.read === false) {
			bookRead.innerText = "Not Read";
			bookRead.classList.remove("light-color")
			bookRead.classList.add("grey-color") 
			}
		else if(item.read === true){
			bookRead.innerText = "Read"
			bookRead.classList.remove("grey-color")
			bookRead.classList.add("light-color") 
			}
			}	
			save()	
		})
	}
form.addEventListener("submit",(e)=>{
	e.preventDefault();
	if (name.value.length > 0 && author.value.length > 0 && page.value > 0 ) {
		library.push({
			id: Date.now().toString(),
			name : name.value,
			author : author.value,
			page : page.value,
			read : false,
		})
	pop.classList.remove("pop-up-active");
	overlay.classList.remove("overlay-active")
	name.value = "";
	author.value = "";
	page.value = "";
	}
save();
render();
})
window.addEventListener("load",()=>{
	render()	
})
addBookBtn.addEventListener("click",()=>{
	pop.classList.add("pop-up-active");
	overlay.classList.add("overlay-active")
	
})