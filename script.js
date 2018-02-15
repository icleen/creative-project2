// lab 2 javascript
// Iain Lee

// const Clarifai = require('clarifai');
// // initialize with your api key. This will also work in your browser via http://browserify.org/
// const app = new Clarifai.App({
//  apiKey: 'dc56a0316fc04667acc1577d0734113e'
// });
//
// app.models.predict(Clarifai.GENERAL_MODEL, 'https://samples.clarifai.com/metro-north.jpg').then(
//   function(response) {
//     console.log(response);
//   },
//   function(err) {
//     console.error(err);
//   }
// );
//
// app.models.predict("aaa03c23b3724a16a56b629203edc62c", "https://samples.clarifai.com/metro-north.jpg").then(
//     function(response) {
//       // do something with response
//     },
//     function(err) {
//       // there was an error
//     }
//   );

var NASA_API_KEY = "6snweK2FJHRWEjLEcfMhjtVSco4gYqfKE9N8I5cM";
var SPACEX_API_KEY = "6snweK2FJHRWEjLEcfMhjtVSco4gYqfKE9N8I5cM";

$(document).ready(function() {

    var myurl = "https://api.nasa.gov/planetary/apod?api_key=";
    myurl += NASA_API_KEY;
    $.ajax({
        url : myurl,
        dataType : "json",
        success : function(json) {
            console.log(json);
            var results = "";
            results += '<h2>' + json.title + "</h2>";
            results += '<p>' + json.explanation + '</p>'
            results += '<img id="planetaryIMG" src="' + json.url + '"/>';
            $("#nasaPlanetary").html(results);
            $("#planetaryIMG").css('width', '100%');
        }
    });

    var EPICresponse = function(json) {
        var results = "";
        results += '<h2>Weather in ' + json.name + "</h2>";
        for (var i=0; i<json.weather.length; i++) {
            results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
        }
        results += '<h2>' + json.main.temp + " &deg;F</h2>";
        results += '<h5>' + json.main.temp_min + "&deg;F - " + json.main.temp_max + "&deg;F</h5>";
        results += '<h5>' + json.main.humidity + "% humidity</h5>";
        results += '<h5>wind speed: ' + json.wind.speed + "mph</h5>";
        results += "<h5>";
        for (var i=0; i<json.weather.length; i++) {
            results += json.weather[i].description;
            if (i !== json.weather.length - 1)
                  results += ", ";
        }
        results += "</h5>";
        $("#weatherResults").html(results); // put this in a div
        $("#weatherResults").css("border", "1px solid #273B49");
    }


    var spacexResponse = function(json) {

        console.log(json);
        var results = "";
        var max = 10;
        var i = 0;
        if (json['items'].length < max)
            max = json['items'].length;

        results += '<ul>'
        for(; i < max; i++) {
            results += '<li><a href="' + json['items'][i]['link'] + '">';
            results += json['items'][i]['title'] + '</a></li>';
        }
        results += '</ul>'

        $("#stack-results").html(results);
        // $("#stack-results").css("border", "1px solid #273B49");
    }


    $("#weatherSubmit").click(function(e) {

    	e.preventDefault();
        var myurl = "https://api.nasa.gov/EPIC/api/natural/images?api_key=" + NASA_API_KEY;

        $.ajax({
    	    url : myurl,
    	    dataType : "json",
    	    success : EPICresponse
    	});

    }); // end of click function

    $("#stack-search").click(function(e) {

    	e.preventDefault();
    	var value = $("#stack-tag").val();
        var tags = value.split(" ")
        console.log(tags);

        var myurl= "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&tagged=";
        for(var i = 0; i < tags.length; i++) {
            myurl += tags[i] + ";";
        }
        myurl += "&site=stackoverflow";

        $.ajax({
    	    url : myurl,
    	    dataType : "json",
    	    success : searchResponse
    	});

    }); // end of stack-search click

}); // end of document ready

(jQuery);

// document.body.addEventListener("click", function (event) {
//     if (event.target.id == "weatherSubmit") {
//         event.preventDefault();
//         var city = document.getElementById("weatherInput");
//         if (city != undefined) {
//             console.log(city.value);
//
//         }
//     }
//
// });
