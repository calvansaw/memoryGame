$(() => {
	console.log('app.js connected');
	console.log($);

	const cardBack =
		'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/StarWarsMoviePoster1977.jpg/220px-StarWarsMoviePoster1977.jpg';

	const cardFront = [];

	const alt = ['20', '32', '51', '10'];

	//18 to 71
	const randomNumberGenerator = () => {
		return Math.floor(Math.random() * 54) + 18;
	};
	console.log(randomNumberGenerator());

	//AJAX

	//img id must be unique for every card as it is used to hide and remove cards
	//img alt is used to match cards
	const imgID = [];
	const imgAlt = [];
	let click = 0;

	//function to push alt string into imgAlt array and img id into imgID array
	const storeArr = (event) => {
		imgAlt.push($(event.target).attr('alt'));
		imgID.push($(event.target).attr('id'));
	};

	const $div = $('<div>').attr('id', 'container');
	$('body').append($div);

	// const clickHandler = (event) => {
	// 	$(event.target).attr('class', 'cards-show');
	// 	storeArr(event);
	// 	$(event.target).off('click');
	// 	console.log(imgAlt);
	// 	click++;
	// 	//match function only called every 2 clicks
	// 	if (click % 2 === 0) {
	// 		matchStoredArr();
	// 	}
	// };

	let imgIndex = 0;
	const generateCards = (numOfCards) => {
		for (let i = 0; i < numOfCards; i++) {
			$.ajax({
				url:
					'https://akabab.github.io/starwars-api/api/id/' +
					randomNumberGenerator() +
					'.json',
			}).then(
				(data) => {
					for (let j = 0; j < 2; j++) {
						const $img = $('<img>')
							.attr('alt', data.name)
							.addClass('cards-hide')
							.attr('id', imgIndex)
							.on('click', (event) => {
								if (
									$(event.target).attr('class') !==
									'cards-show'
								) {
									$(event.target).attr('class', 'cards-show');
									storeArr(event);
									// $(event.target).off('click');
									console.log(imgAlt);
									click++;
									//match function only called every 2 clicks
									if (click % 2 === 0) {
										matchStoredArr();
									}
								}
							});
						imgIndex++;

						$img.attr('src', data.image);
						$('#container').append($img);
					}
				},
				() => {
					alert('Error something went wrong');
				}
			);
		}
	};

	// //function to generate desired number of cards
	// const generateCards = (numOfCards) => {
	// 	let imgIndex = 0;
	// 	let altIndex = 0;
	// 	for (let i = 0; i < numOfCards; ) {
	// 		//loop to repeat imgIndex twice
	// 		for (let j = 0; j < 2; j++) {
	// 			const $img = $('<img>')
	// 				.attr('alt', alt[altIndex])
	// 				.addClass('cards-hide')
	// 				.attr('id', i)
	// 				//event listener and handler on 'click' (show image, match img alt text)
	// 				.on('click', (event) => {
	// 					$(event.target).attr('class', 'cards-show');
	// 					storeArr(event);

	// 					console.log(imgAlt);
	// 					click++;
	// 					//match function only called every 2 clicks
	// 					if (click % 2 === 0) {
	// 						matchStoredArr();
	// 					}
	// 				});
	// 			i++;
	// 			$img.attr('src', cardFront[imgIndex]);
	// 			$('#container').append($img);
	// 		}
	// 		altIndex++;
	// 		imgIndex++;

	// 		//condition to reset imgIndex based on how many img stored in array
	// 		if (imgIndex > cardFront.length - 1) {
	// 			imgIndex = 0;
	// 		}
	// 		//condition to reset altIndex
	// 		if (altIndex > alt.length - 1) {
	// 			altIndex = 0;
	// 		}
	// 		// $img.attr('src', cardFront[imgIndex]);
	// 		// imgIndex++;
	// 	}
	// };

	const hideCards = () => {
		$(`#${imgID[0]}, #${imgID[1]}`).attr('class', 'cards-hide');
		// console.log(imgID);
		imgID.splice(0, 2);
	};

	const removeCards = () => {
		$(`#${imgID[0]}, #${imgID[1]}`).fadeOut(250);
	};

	//function to match img alt string
	const matchStoredArr = () => {
		if (imgAlt[0] === imgAlt[1]) {
			// console.log(imgID);
			removeCards();
			imgID.splice(0, 2);
		} else {
			console.log('***NOT A MATCH***');
			setTimeout(hideCards, 250);
		}

		//empty imgAlt array to match next set of cards
		imgAlt.splice(0, 2);
	};

	generateCards(8);
});
