$(() => {
	console.log('app.js connected');
	console.log($);

	const imgAlt = [];
	let click = 0;

	const cardBack =
		'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/StarWarsMoviePoster1977.jpg/220px-StarWarsMoviePoster1977.jpg';

	const cardFront = [
		'https://upload.wikimedia.org/wikipedia/en/0/00/The_Child_aka_Baby_Yoda_%28Star_Wars%29.jpg',
		'https://static.wikia.nocookie.net/characters/images/6/6c/Qui-Gon_Jinn.jpg/revision/latest/scale-to-width-down/340?cb=20171230234226',
		'https://upload.wikimedia.org/wikipedia/en/b/bf/Mace_Windu.png',
		'https://static.wikia.nocookie.net/p__/images/7/74/Star-wars-obi-wan-kenobi-jedi-cloak-3.jpg/revision/latest?cb=20171231024120&path-prefix=protagonist',
	];

	const alt = ['yoda', 'qui-gon-jinn', 'mace_windu', 'obi-wan'];

	//function to push alt text into imgAlt array
	const storeAlt = (event) => {
		imgAlt.push($(event.target).attr('alt'));
	};

	//event listener and handler on 'click' (show image, match img alt text)
	const show = () => {
		$('#container').on('click', (event) => {
			$(event.target).attr('class', 'cards-show');
			storeAlt(event);
			console.log(imgAlt);
			click++;
			if (click % 2 === 0) {
				matchStoredAlt(event);
			}
		});
	};

	const $div = $('<div>').attr('id', 'container');
	$('body').append($div);

	//function to generate desired number of cards
	const generateCards = (numOfCards) => {
		let imgIndex = 0;
		let altIndex = 0;
		for (let i = 0; i < numOfCards; ) {
			//loop to repeat imgIndex twice
			for (let j = 0; j < 2; j++) {
				const $img = $('<img>')
					.attr('alt', alt[altIndex])
					.addClass('cards-hide');
				i++;
				$img.attr('src', cardFront[imgIndex]);
				$('#container').append($img);
			}
			altIndex++;
			imgIndex++;

			//condition to reset imgIndex based on how many img stored in array
			if (imgIndex > cardFront.length - 1) {
				imgIndex = 0;
			}
			//condition to reset altIndex
			if (altIndex > alt.length - 1) {
				altIndex = 0;
			}
			// $img.attr('src', cardFront[imgIndex]);
			// imgIndex++;
		}
	};


	//function to match img alt text
	const matchStoredAlt = () => {
		if (imgAlt[0] === imgAlt[1]) {
			console.log('match');
		} else {
			console.log('***NOT A MATCH***');
		}
		//empty imgAlt array --> to match next set of cards
		imgAlt.splice(0, 2);
	};

	generateCards(10);
	show();
});
