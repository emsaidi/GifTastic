//Initial array of political topics
var topics = ['Barack Obama', 'Election 2016' ,'Mike Pence', 'Tim Kaine', 'Donald Trump', 'Hillary Clinton', 'Sarah Palin', 'Ted Cruz', 'Gary Johnson', 'Joe Biden', 'Michelle Obama', 'Colbert Report', 'Rachael Maddow', 'Glenn Beck'];

//function will re-renders the HTML to display requested comment
function displayTopicsInfo(){
	
	var topic = $(this).attr('data-name');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=12";

	//Creates AJAX call for specific topic requested
	$.ajax({url: queryURL, method:'GET'}).done(function(response){
		
		console.log(response);

		//Creates generic div to hold the gifs
		var gifDiv = $('<div class="gifs">');

		var results = response.data;

		for (var j = 0; j < results.length; j++){

			var thumbnail = $('<div class="thumbnail">');

			//Retrives URL for different states of gif
			var imageSrc = results[j].images.downsized.url;
			var imageDataStill = results[j].images.downsized_still.url;
			var imageDataAnimate = results[j].images.downsized.url; 

			//Creates element to have Gif displayed
			var imgGif = $('<img>')
			imgGif.attr('src', imageSrc);
			imgGif.attr('data-still', imageDataStill);
			imgGif.attr('data-animate', imageDataAnimate);
			imgGif.attr('data-state', "animate");
			imgGif.attr('alt', 'political Gif');
			imgGif.addClass('gifTile');
		
			//Diplays the gif
			thumbnail.append(imgGif);

			//Retrives rating info and is place in variable 'rating'
			var rating = results[j].rating;

			//Coverted rating into UpperCase
			var UCrating = rating.toUpperCase();

			// Creates element to have the rating displayed 
			var ratingText = $('<div class="caption">').text("Rating: " + UCrating);

			// Displays the rating
			thumbnail.append(ratingText);

			$('[data-colnum= ' + j % 3 + ']').prepend(thumbnail);


			//$('#gifTiles').prepend(thumbnail);
		}

	});
}

//Function to render buttons
function renderButtons(){

	//Empties old buttons, so you don't have repeats
	$('#btnsTopics').empty();

	//Loops through arrays of topics, creates button and adds it to html
	for (var i=0; i<topics.length; i++){
		var a = $('<button>')
		a.addClass('topic btn btn-default');
		a.attr('type', 'button');
		a.attr('data-name', topics[i]);
		a.text(topics[i]);
		$('#btnsTopics').append(a);
	}
}

//This function handles events where ont button is clicked
$('#addGif').on('click', function(){
	var topic = $('#gifInput').val().trim();
	topics.push(topic);
	renderButtons();
	return false;


});

//This function changes the src of the GIF once you click it, from still ot animate
function gifClick(){
	var state = $(this).attr('data-state');

	if(state == 'animate'){
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
	}else{
		$(this).attr('src', $(this).data('animate'));
		$(this).attr('data-state', 'animate');
	}	
}


$(document).on('click', '.topic', displayTopicsInfo);
$(document).on('click', '.gifTile', gifClick); 

renderButtons();