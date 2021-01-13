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

	const alt = ['20', '32', '51', '10'];

	//AJAX
	const ajaxCall = (peopleID) => {
		$.ajax({
			url: 'http://swapi.dev/api/people/' + peopleID,
		}).then((data) => {
			console.log(data.name);
			console.log(data.height);
			console.log(data.mass);
			console.log(data.hair_color);
			console.log(data.skin_color);
			console.log(data.eye_color);
			console.log(data.birth_year);
			console.log(data.gender);
		});
	};
	//ajaxCall(alt[0]);

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

	//function to generate desired number of cards
	const generateCards = (numOfCards) => {
		let imgIndex = 0;
		let altIndex = 0;
		for (let i = 0; i < numOfCards; ) {
			//loop to repeat imgIndex twice
			for (let j = 0; j < 2; j++) {
				const $img = $('<img>')
					.attr('alt', alt[altIndex])
					.addClass('cards-hide')
					.attr('id', i)
					//event listener and handler on 'click' (show image, match img alt text)
					.on('click', (event) => {
						$(event.target).attr('class', 'cards-show');
						storeArr(event);
						ajaxCall($(event.target).attr('alt'));
						console.log(imgAlt);
						click++;
						//match function only called every 2 clicks
						if (click % 2 === 0) {
							matchStoredArr();
						}
					});
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

	generateCards(10);
});
