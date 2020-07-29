let header = document.querySelector('header');
let section = document.querySelector('section');
let requestURL = 'https://simranpreet9300.github.io/json-product/products.json';
let Httprequest = new XMLHttpRequest();

Httprequest.open('GET', requestURL);

Httprequest.responseType = 'json';

Httprequest.send();

Httprequest.onload = function () {
	let iScreamInc = Httprequest.response;
	console.log(iScreamInc);
	populateHeader(iScreamInc);
	topDeals(iScreamInc);
}

function populateHeader(jsonObj) {
	let headerH1 = document.createElement('h1');
	headerH1.textContent = jsonObj['companyName'];
	header.appendChild(headerH1);
	let headerPara = document.createElement('p');
	headerPara.textContent = jsonObj['headOffice'];
	header.appendChild(headerPara);
}

function topDeals(jsonObj) {
	let topDeals = jsonObj['topDeals'];
	for (let i = 0; i < topDeals.length; i++) {
		let article = document.createElement('article');
		let h2 = document.createElement('h2');
		let img = document.createElement('img');
		let p1 = document.createElement('p');
		let p2 = document.createElement('p');
		let list = document.createElement('ul');

		img.setAttribute('src', 'images/' + topDeals[i].image);
		img.setAttribute('alt', topDeals[i].name);
		h2.textContent = topDeals[i].name;
		p1.textContent = topDeals[i].price;
		p2.textContent = topDeals[i].description;

		let features = topDeals[i].features;
		for (let j = 0; j < features.length; j++) {
			let listItem = document.createElement('li');
			listItem.textContent = features[j];
			list.appendChild(listItem);
		}

		article.appendChild(img);
		article.appendChild(h2);
		article.appendChild(p1);
		article.appendChild(p2);
		article.appendChild(list);
		section.appendChild(article);
	}
}


/*function initMap() {
	//set up a location

	let georgian = {
		lat: 44.4116516,
		lng: -79.6689389
	  };
  
	let mapSpot = document.getElementById("map");
  
	let map = new google.maps.Map(mapSpot, {
	  zoom: 15,
	  center: georgian,
	});
  
	let marker = new google.maps.Marker({ position: georgian, map: map });
}

button.onclick = initMap;*/


let map;
let infoWindow;
let mapSpot = document.getElementById("map");
let georgian = {
	lat: -34.397,
	lng: 150.644
};

function initMap() {
	map = new google.maps.Map(mapSpot, {
		center: {
			lat: -34.397,
			lng: 150.644
		},
		zoom: 6
	});
	infoWindow = new google.maps.InfoWindow;

	//try geolocation

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			function (position) {
				let pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				infoWindow.setPosition(pos);
				infoWindow.setContent("Location found.");
				infoWindow.open(map);
				map.setCenter(pos);
			},
			function () {
				handleLocationError(true, infoWindow, map.getCenter());
			});
	} else {
		handleLocationError(false, infoWindow, map.getCenter());
	}
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(
		browserHasGeolocation ?
		"Error: The Geolocation service has failed." :
		"Error: Your browser doesn't support geolocation"
	);
	infoWindow.open(map);
}

//Getting help from https://enlight.nyc/projects/weather
//Weather API Example
function Weather() {
	let tempt = document.getElementById("temperature");
	let location = document.getElementById("location");
	let descrp = document.getElementById("description");


	let api = "https://api.openweathermap.org/data/2.5/weather";
	let apiKey = "d65154c997cc0b7f4bbe256641dec1a2";
	location.innerHTML = "Locating your Location...";

	navigator.geolocation.getCurrentPosition(passed, fault);

	function passed(position) {
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;

		let url = api + "?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial";

		fetch(url)
			.then(response => response.json())
			.then(data => {
				console.log(data);
				let temp = data.main.temp;
				tempt.innerHTML = temp + "° F";
				location.innerHTML =
					data.name + " (" + latitude + "°, " + longitude + "°)";
				descrp.innerHTML = data.weather[0].main;
			});
	}

	function fault() {
		location.innerHTML = "Unable to retrieve your location";
	}
}

Weather();