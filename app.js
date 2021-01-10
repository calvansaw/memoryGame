$(() => {
	console.log('app.js connected');
	console.log($);

	const cardBack =
		'https://lh3.googleusercontent.com/proxy/d6rzVlsN0_zB2ftjb7FF1XhRBxxpyB0VpUV7TdqpkdE8K5KaUGfKsnfQmcyXycT9OjBJZEA9fv0E4jEEp6dorjhYBFOUos4';

	const cardFront = [
		'https://upload.wikimedia.org/wikipedia/en/0/00/The_Child_aka_Baby_Yoda_%28Star_Wars%29.jpg',
		'https://static.wikia.nocookie.net/characters/images/6/6c/Qui-Gon_Jinn.jpg/revision/latest/scale-to-width-down/340?cb=20171230234226',
		'https://upload.wikimedia.org/wikipedia/en/b/bf/Mace_Windu.png',
		'https://static.wikia.nocookie.net/p__/images/7/74/Star-wars-obi-wan-kenobi-jedi-cloak-3.jpg/revision/latest?cb=20171231024120&path-prefix=protagonist',
	];

	const $div = $('<div>').attr('id', 'container');
	$('body').append($div);

	const generateCards = (numOfCards) => {
		for (let i = 0; i < numOfCards; i++) {
			const $div = $('<div>')
				.attr('id', i + 1)
				.addClass('cards');
			$('#container').append($div);
		}
	};

	generateCards(8);
});
