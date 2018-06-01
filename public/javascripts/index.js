var map; //store map in a var
var userCoords;
var socket = io();

$(function() { //load the map on page.ready
    socket.on('viewedRestaurant1', function (data) {
        $("#socketContainer").removeClass("displayNone");
        $('#socketRestaurant').append(
            "<div class='col-sm-12 col-md-6'><div class='row'>" +
            // + JSON.stringify(data[i]) + "<br>"
            "<div class='col-3 align-items-middle'><a href='/restaurant/"+data.restaurant._id+"'><img src='"+ data.restaurant.officialPhoto + "' class='img-fluid'></a>"
            + "</div>"
            +"<div class='col-9 no-pad-left'>"

            + "<span class='resRating'>" + data.restaurant.rating.averageScore + "<i class=\"fas fa-star\"></i> </span>"
            + "<span class='resTitle'>" +data.restaurant.name+ "</span>"
            + "<br>"

            + data.restaurant.typeOfCuisine.join(", ") + "<br>"
            // + (data[i].hasDelivery > 0 ? "<span class='hasDelivery'> <i class='fas fa-motorcycle'></i> Delivery </span>":"")
            + (data.restaurant.hasDelivery > 0 ? " <span class='hasDelivery'> <i class='fas fa-motorcycle'></i> Delivery </span><br>":"")
            + "<a href='/restaurant/"+data.restaurant._id+"'>view more</a></div>"
            + "<div class='col-12'><div class='separator-red-thin'></div></div>"
            + "</div></div>");
    });

    getLocation().then(function(data) {
        userCoords = data;
        map = new GMaps({
            div: '#map',
            lat: data.latitude,
            lng: data.longitude,
            height: '300px',
            zoom: 12
        });
       markUserPos();
    });

// $('#city').attr("placeholder", "Enter a city, address or postcode");

});

function changePlaceholder(data) {
    if (data=="city") {
        $('#city').attr("placeholder", "Enter a city, address or postcode");
    } else {
        $('#city').attr("placeholder", "Enter the name of a restaurant");
    }
}

function markUserPos() {
    map.addMarker({
        lat: userCoords.latitude,
        lng: userCoords.longitude,
        title: "Your position",
        icon: "userPosMarker.png",
        infoWindow: {
            content: '<p>Your last retrieved position</p>'
        }
    });
}
/**
 * Ajax query to searchdb .
 * @constructor
 * @param {string} url - url of the home page.
 * @param {string} data - The data received from the form.
 */
function sendAjaxQuery(url, data) {
    return new Promise( (resolve, reject) => {
        $.ajax({
            url: url ,
            data: data,
            dataType: 'json',
            type: 'POST',
            success: function (dataR) {
                // no need to JSON parse the result, as we are using
                // dataType:json, so JQuery knows it and unpacks the
                // object for us before returning it
                var ret = dataR;
                // in order to have the object printed by alert
                // we need to JSON stringify the object
                //document.getElementById('results').innerHTML= JSON.stringify(ret);
                console.log(ret);
                displayResultsNicely(ret);
                addMarkers(ret);
                // return ret;
                resolve(ret);
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + xhr.responseText);
                $("#errors").html(xhr.responseText);
                reject(xhr.responseText);
            },
            // timeout: 5000
        });
    });
}

/**
 * Displaying results in correct format .
 * @constructor
 * @param {string} data - The data received from the ajax query.
 */
function displayResultsNicely(data) {
    $("#results").html("");
    for(i in data) {
        $('#results').append(
            "<div class='col-sm-12 col-md-6'><div class='row'>" +
            // + JSON.stringify(data[i]) + "<br>"
            "<div class='col-3 align-items-middle'><a href='/restaurant/"+data[i]._id+"'><img src='"+ data[i].officialPhoto + "' class='img-fluid'></a>"
            + "</div>"
            +"<div class='col-9 no-pad-left'>"

            + "<span class='resRating'>" + data[i].rating.averageScore + "<i class=\"fas fa-star\"></i> </span>"
            + "<span class='resTitle'>" +data[i].name+ "</span>"
            + "<br>"

            + data[i].typeOfCuisine.join() + "<br>"
            // + (data[i].hasDelivery > 0 ? "<span class='hasDelivery'> <i class='fas fa-motorcycle'></i> Delivery </span>":"")
            + (data[i].hasDelivery > 0 ? " <span class='hasDelivery'> <i class='fas fa-motorcycle'></i> Delivery </span><br>":"")
            + "<a href='/restaurant/"+data[i]._id+"'>view more</a></div>"
            + "<div class='col-12'><div class='separator-red-thin'></div></div>"
            + "</div></div>");
    }
}
/**
 * Serialize data that is received when form is submitted .
 * @constructor
 * @param {string} url - url of the home page.
 */
function onSubmit(url) {
    event.preventDefault();

    var formArray= $('form').serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
}
/**
 * onSubmit radius function .
 * @constructor
 * @param {string} url - url of the home page.
 */
function onSubmitRadius(url) {
    event.preventDefault();
    $('#errors').html("");
    getLocation()
        .then(function() {
            console.log("getLocationDone");
            return retrieveValues(url);
        })
        .then(function(data) {
            console.log("retrieveValuesDone");
            console.log(data);
            sendAjaxQuery(url, data).then(function (data) {
                console.log(data);
            });

        })
        .catch(function (error) {
            console.log(error.message)
        })

}
/**
 * retrieves the values from the form data and serializes it.
 * @constructor
 * @param {string} url - url of the home page.
 */
function retrieveValues(url) {
    var formArray = $("form").serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name] = formArray[index].value;
    }
    console.log('onsubmit');
    console.log(data);
    return data;
    //sendAjaxQuery(url, data);
}

/**
 * Checks if geolocation is supported by the browser and returns the location of the user.
 * @constructor
   */
function getLocation() {
    return new Promise((resolve, reject) => {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            function success(pos) {
                var crd = pos.coords;
                $("#latitude").val(crd.latitude);
                $("#longitude").val(crd.longitude);

                resolve(crd);
            }
            , function error(err) {
                console.warn('ERROR(' + err.code + '): ' + err.message);
                reject(err.message);
            }
        );


    } else {
        console.log("Geolocation is not supported by this browser.");
    }
});
}
/**
 * Adds marker to google maps.
 * @constructor
  * @param {string} data - The data received from the form.
 */
function addMarkers(data) {
    map.removeMarkers();
    var coordArray = [[userCoords.longitude, userCoords.latitude]];

    markUserPos();

    for(i in data) {
        var coords = data[i].location.coordinates;
        coordArray.push(coords);
        map.addMarker({
            lat: coords[1],
            lng: coords[0],
            title: data[i].name,
            infoWindow: {
                content: "<p>"+data[i].name+"</p>"+
                "<a href='/restaurant/"+data[i]._id+"'>view</a>"
            }
        });
    }

    map.fitZoom();
}

