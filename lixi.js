$(document).ready(function() {
	//alert('hieu');

	var units = [1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000];
	var amount = 0;
	var amountLeft = 0;
	var numberOfPeople = 0;
	var numberOfPeopleLeft = 0;
	var firstTime = true;
	var gameIsOver = false;

	$("#start").click(function() {
		if (firstTime) {
			// No longer the first time.
			firstTime = false;

			amount = $("#amount").val();
			console.log("amount: " + amount);

			amountLeft = amount;
			//console.log("amountLeft: " + amount);

			numberOfPeople = $("#numberOfPeople").val();
			console.log("numberOfPeople: " + numberOfPeople);

			numberOfPeopleLeft = numberOfPeople;
			//console.log("numberOfPeopleLeft: " + numberOfPeopleLeft);

			// Get valid combinations.
			// var validCombinations = getValidCombinations(amount, units, numberOfPeople);
			// console.log(validCombinations);
			// if (validCombinations.length == 0) {
			// 	console.log("CAN'T PROCEED");
			// 	return;
			// }

			// console.log("HIEU");
			var moneys = getMoneys(amount, units, numberOfPeople);
			//console.log(moneys);

			for (var i = 0; i < numberOfPeople; ++i) {
				var envHtml = $("#envelopTemplate").html();
				console.log(envHtml);
				//$(envHtml).prop("id", "env" + i)
				var moneyDiv = "<div class=\"money\" style=\"position: absolute; left: 100px; top: 140px\">" + moneys[i] + "</div>";
				var wrapper = "<div id=\"env" + i + "\" class=\"wrapper\" style=\"position: relative\">" + envHtml + moneyDiv + "</div>";
				$("#board").append(wrapper);

				$(".wrapper .open").hide();
				$(".wrapper .money").hide();

			}
			
		}

		// if (gameIsOver) {
		// 	console.log("Game is over. Please refresh the page.");
		// 	return;
		// }

	});

	$("#envelopTemplate").hide();

	$("#board").on("click", ".wrapper", function() {
		console.log(this);
		console.log($(this).attr('id'));

		var id = $(this).attr('id');

		var closedId = "#" + id + " .closed";
		console.log(closedId);
		$(closedId).hide();

		var openId = "#" + id + " .open";
		console.log(openId);
		$(openId).show();

		var moneyId = "#" + id + " .money";
		$(moneyId).show();
	});



	function getRandomInt(min, max) {
	    min = Math.ceil(min);
	    max = Math.floor(max);
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function getMoneys(amount, units, numberOfPeople) { // return an array;  [10k, 5k, 85k]
		var sum = 0;
		var moneys = [];
		var count = 1;
		var minimum = 10000;
		var times = amount / minimum;

		while (true) {
			if (count > numberOfPeople) {
				break;
			}
			if (sum >= amount) {
				break;
			}

			var randTimes = getRandomInt(1, times);
			var money = minimum * randTimes;
			// console.log(money);

			// TODO Check if money is valid.
			var amountLeft = amount - sum;
			var numberOfPeopleLeft = numberOfPeople - count;

			if (amountLeft <= 0) {
				break;
			}

			if (amountLeft / money < numberOfPeopleLeft) {
				continue;
			}

			if (sum + money == amount && numberOfPeopleLeft > 0) {
				continue;
			}


			console.log("===================")
			console.log("money: " + money);
			sum += money;
			console.log("sum: " + sum);
			count++;
			times = times - randTimes;


			moneys.push(money);


		}


		if (sum < amount) {
			//console.log(amount - sum);
			var left = amount - sum;
			moneys[moneys.length - 1] = moneys[moneys.length - 1] + left;
		}

		return moneys;
	}

	// function getValidCombinations(amount, units, count) {
	// 	var validCombinations = [];
	// 	var combinations = Combinatorics.combination(units, count);
	// 	while (combination = combinations.next()) {
	// 		console.log(combination);

	// 		var sum = combination.reduce((a, b) => a + b, 0);
	// 		console.log("Sum: " + sum);

	// 		// if (sum == amount) {
	// 		// 	validCombinations.push(combination);
	// 		// }
	// 	}
	// 	return validCombinations;
	// }
});