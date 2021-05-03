"use strict"

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};

if (isMobile.any()) {
	document.body.classList.add('_touch');

	let menuArrows = document.querySelectorAll('.menu__arrow');
	if (menuArrows.length > 0) {
		for (let index = 0; index < menuArrows.length; index++) {
			const menuArrow = menuArrows[index];
			menuArrow.addEventListener("click", function (e) {
				menuArrow.parentElement.classList.toggle('_active');
			});
		}
	}

} else {
	document.body.classList.add('_pc');
}

// Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}

// Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}


// *** GET`N`SET FORM DATA *** //
let form = document.querySelector("#jsContactForm"),
	fieldName = document.querySelector("#formName"),
	fieldEmail = document.querySelector("#formEmail"),
	fieldPhone = document.querySelector("#formPhone"),
	fieldCompany = document.querySelector("#formCompany")

form.addEventListener('submit', function (event) {
	event.preventDefault()
	const userData = {
		name: fieldName.value,
		email: fieldEmail.value,
		phone: fieldPhone.value,
		company: fieldCompany.value
	}
	localStorage.setItem('user', JSON.stringify(userData))
})

let lastUserData = JSON.parse(localStorage.getItem('user'))
if (lastUserData) {
	fieldName.value = lastUserData.name
	fieldEmail.value = lastUserData.email
	fieldPhone.value = lastUserData.phone
	fieldCompany.value = lastUserData.company
}

// *** VALIDATION OF FORM USER PHONE NUMBER *** //
let phonePattern = (/^[+]?[\s|0-9]*[(]?[0-9]{1,4}[)]?[-\s|0-9]*$/),
	wrongNumber = document.createElement("p")
wrongNumber.className = "errorForm"
fieldPhone.addEventListener('blur', phoneValidate)
fieldPhone.addEventListener('focus', (event) => {
	if (document.querySelector(".errorForm")) {
		form.removeChild(wrongNumber)
		fieldPhone.style.borderColor = "#555"
	}
})

function phoneValidate(event) {
	let phoneNumb = fieldPhone.value
	if (!phonePattern.test(phoneNumb)) {
		fieldPhone.style.borderColor = "#A41D00"
		form.appendChild(wrongNumber)
		form.style.position = "relative"
		wrongNumber.style.position = "absolute"
		wrongNumber.style.width = "200px"
		wrongNumber.style.height = "14px"
		wrongNumber.style.top = "37%"
		wrongNumber.style.left = "0%"
		wrongNumber.style.justifyContent = "center"
		wrongNumber.style.alignItems = "center"
		wrongNumber.style.color = "#A41D00"
		wrongNumber.style.fontSize = "12px"
		wrongNumber.innerHTML = "Invalid number format"
		return false
	}
}

// *** JOB`S POP *** //
let jobsPic = document.querySelectorAll(".jobs_card"),
	categories = document.querySelectorAll(".list_item")

categories.forEach((category) => {
	category.addEventListener('click', jobsPop)
})

function jobsPop(event) {
	jobsPic.forEach((elem) => {
		let selected = document.querySelector(".selected")
		if (selected) selected.classList.remove("selected")
		event.target.classList.add("selected")
		elem.classList.remove("invisible")
		if (!elem.dataset.category.match(event.target.dataset.trend) && event.target.dataset.trend !== 'All') {
			elem.classList.add("invisible")
			localStorage.setItem('last category', event.target.dataset.trend)
		}
	})
}

// *** HIDE DETAILS SUMMARY, WHEN IT OPEN *** //
let blogSummaries = document.querySelectorAll("summary")

blogSummaries.forEach((summary) => {
	summary.addEventListener('click', hideSummaries)
})

function hideSummaries(event) {
	event.target.classList.toggle("invisible")
}