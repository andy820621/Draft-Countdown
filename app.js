const flipCards = [...document.querySelectorAll(".flip-card")];

const countToDate = new Date().setHours(new Date().getHours() + 24);
let intervalId = setInterval(() => {
	const cuurentDate = new Date();
	const timeBetweenDates = Math.ceil((countToDate - cuurentDate) / 1000);
	if (timeBetweenDates == 0) clearInterval(intervalId);
	flipAllCards(timeBetweenDates);
}, 250);

function flipAllCards(time) {
	const seconds = time % 60;
	const minutes = Math.floor(time / 60) % 60;
	const hours = Math.floor(time / 3600);

	flipFunction(flipCards[0], Math.floor(hours / 10));
	flipFunction(flipCards[1], hours % 10);
	flipFunction(flipCards[2], Math.floor(minutes / 10));
	flipFunction(flipCards[3], minutes % 10);
	flipFunction(flipCards[4], Math.floor(seconds / 10));
	flipFunction(flipCards[5], seconds % 10);
}

function flipFunction(flipCard, newNumber) {
	const topCard = flipCard.querySelector(".top");
	const startNumber = parseInt(topCard.textContent);
	if (newNumber === startNumber) return;

	const bottomCard = flipCard.querySelector(".bottom");
	const frontCard = document.createElement("div");
	frontCard.classList.add("front");
	const backCard = document.createElement("div");
	backCard.classList.add("back");

	topCard.textContent = startNumber;
	bottomCard.textContent = startNumber;
	frontCard.textContent = startNumber;
	backCard.textContent = newNumber;
	flipCard.append(frontCard, backCard);

	frontCard.addEventListener("animationstart", (e) => {
		topCard.textContent = newNumber;
	});
	frontCard.addEventListener("animationend", (e) => {
		bottomCard.textContent = newNumber;
		frontCard.textContent = parseInt(topCard.textContent);
		backCard.textContent = newNumber;
		frontCard.remove();
		backCard.remove();
	});
}
