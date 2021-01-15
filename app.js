$(() => {
	console.log('app.js connected');
	console.log($);

	//numOfCards is used to set difficulty
	//imgID array is used to hide and remove cards
	//imgAlt array is used to match cards
	//imgIndex variable is used to set id for img so that it is in running order
	//cardFront array is used to store images from AJAX call - to be used for mirror
	//alt array is used to store name of characters from AJAX call - to be used for mirror
	//win array is used for win condition
	const imgID = [];
	const imgAlt = [];
	let click = 0;
	let numOfCards = 0;
	const cardFront = [];
	const alt = [];
	let imgIndex = 0;
	let win = [];
	let min = 0;
	let sec = 0;

	const $buttonContainer = $('<div>').attr({
		id: 'btn-container',
		class: 'd-grid gap-2 col-6 mx-auto',
	});
	$('body').append($buttonContainer);

	const easyButton = $('<button>')
		.attr({
			type: 'button',
			class: 'btn btn-primary btn-lg',
		})
		.text('EASY')
		.on('click', () => {
			numOfCards = 5;
			generateCards(numOfCards);
		});
	const mediumButton = $('<button>')
		.attr({
			type: 'button',
			class: 'btn btn-warning btn-lg',
		})
		.text('MEDIUM')
		.on('click', () => {
			numOfCards = 10;
			generateCards(numOfCards);
		});
	const hardButton = $('<button>')
		.attr({
			type: 'button',
			class: 'btn btn-danger btn-lg',
		})
		.text('HARD')
		.on('click', () => {
			numOfCards = 15;
			generateCards(numOfCards);
		});

	$($buttonContainer).append(easyButton, mediumButton, hardButton);

	const $min = $('<span>')
		.addClass('badge rounded-pill bg-info')
		.text(min + ' minutes');
	const $sec = $('<span>')
		.addClass('badge rounded-pill bg-info')
		.text(sec + ' seconds');
	const $timerContainer = $('<div>');
	$('body').append($timerContainer);
	$timerContainer.append($min, $sec);

	const runTimer = () => {
		const time = setInterval(() => {
			sec++;
			$sec.text(sec + ' seconds');

			if (sec === 59) {
				sec = 0;
				min++;
				$min.text(min + ' minutes');
			}
			if (min === 1) {
				clearInterval(time);
				alert(
					'You Lost! You took more than ' +
						min +
						' Minutes and ' +
						sec +
						' Seconds to complete!'
				);
				location.reload();
			}
		}, 1000);
	};

	const randomNumberGenerator = (multiply, lowest) => {
		return Math.floor(Math.random() * multiply) + lowest;
	};

	//function to push alt string into imgAlt array and img id into imgID array
	const storeArr = (event) => {
		imgAlt.push($(event.target).attr('alt'));
		imgID.push($(event.target).attr('id'));
	};

	const $div = $('<div>').attr('id', 'container');
	$('body').append($div);

	//Generate cards
	const generateCards = (setCards) => {
		for (let i = 0; i < setCards; i++) {
			$.ajax({
				url:
					'https://akabab.github.io/starwars-api/api/id/' +
					randomNumberGenerator(54, 18) +
					'.json',
			}).then(
				(data) => {
					cardFront.push(data.image);
					alt.push(data.name);

					const $img = $('<img>')
						.attr('alt', data.name)
						.addClass('cards-hide')
						.attr('id', imgIndex)
						.on('click', (event) => {
							//prevent double click on same card bug
							if (
								$(event.target).attr('class') !== 'cards-show'
							) {
								$(event.target).attr('class', 'cards-show');
								storeArr(event);

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
				},
				() => {
					alert('Error something went wrong');
				}
			);
		}

		//Mirror - setTimeout to wait for AJAX call to be complete before running

		setTimeout(() => {
			//For loop exit condition set as numOfCards is so that loop will iterate the same amount of times as AJAX call
			for (let j = 0; j < numOfCards; j++) {
				//randomNumberGenerator argument passed as cardFront.length is because array is being spliced each iteration
				let storedRandomNumber = randomNumberGenerator(
					cardFront.length,
					0
				);
				const $img = $('<img>')
					.attr('alt', alt[storedRandomNumber])
					.addClass('cards-hide')
					.attr('id', imgIndex)
					.on('click', (event) => {
						//prevent double click on same card bug
						if ($(event.target).attr('class') !== 'cards-show') {
							$(event.target).attr('class', 'cards-show');
							storeArr(event);

							click++;
							//match function only called every 2 clicks
							if (click % 2 === 0) {
								matchStoredArr();
							}
						}
					});
				imgIndex++;

				$img.attr('src', cardFront[storedRandomNumber]);
				$('#container').append($img);
				alt.splice(storedRandomNumber, 1);
				cardFront.splice(storedRandomNumber, 1);
			}
			runTimer();
		}, 3000);
	};

	const hideCards = () => {
		$(`#${imgID[0]}, #${imgID[1]}`).attr('class', 'cards-hide');

		imgID.splice(0, 2);
	};

	const removeCards = () => {
		$(`#${imgID[0]}, #${imgID[1]}`).fadeTo(250, 0);
	};

	const resetGame = () => {
		alert(
			'You Win! You took ' +
				min +
				' Minutes and ' +
				sec +
				' Seconds to complete!'
		);
		location.reload();
	};

	//function to match img alt string
	const matchStoredArr = () => {
		if (imgAlt[0] === imgAlt[1]) {
			imgAlt.forEach((element) => {
				win.push(element);
			});
			removeCards();
			imgID.splice(0, 2);
			if (win.length === numOfCards * 2) {
				setTimeout(resetGame, 350);
			}
		} else {
			setTimeout(hideCards, 250);
		}

		//empty imgAlt array to match next set of cards
		imgAlt.splice(0, 2);
	};
});
