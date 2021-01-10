$(() => {
	console.log('app.js connected');
	console.log($);

	const cardBack =
		'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/StarWarsMoviePoster1977.jpg/220px-StarWarsMoviePoster1977.jpg';

	const cardFront = [
		'https://upload.wikimedia.org/wikipedia/en/0/00/The_Child_aka_Baby_Yoda_%28Star_Wars%29.jpg',
		'https://static.wikia.nocookie.net/characters/images/6/6c/Qui-Gon_Jinn.jpg/revision/latest/scale-to-width-down/340?cb=20171230234226',
		'https://upload.wikimedia.org/wikipedia/en/b/bf/Mace_Windu.png',
		'https://static.wikia.nocookie.net/p__/images/7/74/Star-wars-obi-wan-kenobi-jedi-cloak-3.jpg/revision/latest?cb=20171231024120&path-prefix=protagonist',
	];

	const $show = () => {
		$('#container').on('click', (event) => {
			$(event.target).css('opacity', '1');
		});
	};

	const $div = $('<div>').attr('id', 'container');
	$('body').append($div);

	//function to generate desired number of cards
	const generateCards = (numOfCards) => {
		let imgIndex = 0;
		for (let i = 0; i < numOfCards; ) {
			//loop to repeat imgIndex twice
			for (let j = 0; j < 2; j++) {
				const $img = $('<img>').attr('id', i).addClass('cards');
				i++;
				$img.attr('src', cardFront[imgIndex]).css('opacity', '0.5');
				$('#container').append($img);
			}
			imgIndex++;

			//condition to reset imgIndex based on how many img stored in array
			if (imgIndex > cardFront.length - 1) {
				imgIndex = 0;
			}
			// $img.attr('src', cardFront[imgIndex]);
			// imgIndex++;
		}
	};

	generateCards(10);
	$show();
});
