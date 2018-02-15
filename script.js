// lab 2 javascript
// Iain Lee

var NASA_API_KEY = "6snweK2FJHRWEjLEcfMhjtVSco4gYqfKE9N8I5cM";
$(document).ready(function() {

    var myurl = "https://api.nasa.gov/planetary/apod?api_key=";
    myurl += NASA_API_KEY;
    $.ajax({
        url : myurl,
        dataType : "json",
        success : function(json) {
            // console.log(json);
            var results = "";
            results += '<h2 class="title">' + json.title + "</h2>";
            results += '<p>' + json.explanation + '</p>'
            results += '<img id="planetaryIMG" src="' + json.url + '"/>';
            $("#nasaPlanetary").html(results);
            $("#nasaPlanetary").attr("class", "nasa-planetary");
            $("#planetaryIMG").css('width', '100%');
        }
    });


    var spaceResponse = function(json) {

        console.log(json);
        var results = "";
        var max = 10;
        var i = 0;
        if (json.collection.items.length < max)
            max = json.collection.items.length;

        results += '<ul>'
        for(; i < max; i++) {
            results += '<li>';
            results += '<h2>' + json.collection.items[i].data[0].title + '</h2>';
            results += '<img src="' + json.collection.items[i].links[0].href + '" />';
            results += '<p>' + json.collection.items[i].data[0].description + '</p>';
            results += '</li>';
        }
        results += '</ul>'

        $("#space-results").html(results);
        // $("#stack-results").css("border", "1px solid #273B49");
    }

    $("#spaceSubmit").click(function(e) {

    	e.preventDefault();
        var value = $("#spaceInput").val();
        var myurl = "https://images-api.nasa.gov/search?media_type=image&q=" + value;

        $.ajax({
    	    url : myurl,
    	    dataType : "json",
    	    success : spaceResponse
    	});

    }); // end of click function


    var EPICresponse = function(json) {
        console.log(json);
        var results = "";

        var max = 1;
        if (json.length < max)
            max = json.length;

        results += '<ul>';
        for(var i = 0; i < max; i++) {
            results += '<li>';
            results += '<h2>' + json[i].date + '</h2>';

            var dates = json[i].date.split('-');
            var src = "https://epic.gsfc.nasa.gov/archive/natural";
            src += "/" + dates[0] + "/" + dates[1]; // "https://epic.gsfc.nasa.gov/archive/natural/2018/02"
            src += "/" + dates[2].split(' ')[0]; // "https://epic.gsfc.nasa.gov/archive/natural/2018/02/14"
            src += "/png/" + json[0].image + ".png";

            results += '<img src="' + src + '" />';
            results += '<p><a href="https://epic.gsfc.nasa.gov/">' + json[i].caption + '</a></p>';
            results += '</li>';
        }
        results += '</ul>';

        $("#nasaEPIC").html(results); // put this in a div
        $("#disapear").css('display', 'none');
    }

    var myurl = "https://epic.gsfc.nasa.gov/api/natural";
    // myurl += "?api_key=" + NASA_API_KEY;
    // var temp = "<p>loading...</p>";
    // $("#nasaEPIC").html(temp);
    $.ajax({
        url : myurl,
        dataType : "json",
        success : EPICresponse,
        failure : function(e) {
            console.log("failed");
        }
    });

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
