var swiper = new Swiper('.swiper-container', {
	slidesPerView: 4,
	spaceBetween: 30,
	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerView: 1,
			spaceBetween: 20
		},
		// when window width is >= 420px
		420: {
			slidesPerView: 2,
			spaceBetween: 30
		},
		// when window width is >= 520px
		520: {
			slidesPerView: 3,
			spaceBetween: 30
		}
		,
		// when window width is >= 768px
		768: {
			slidesPerView: 4,
			spaceBetween: 30
		}
	},
	slidesPerGroup: 1,
	loop: true,
	loopFillGroupWithBlank: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});


var mySwiper = new Swiper('.swiper-container__clients', {
	slidersPerView: 1,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
});