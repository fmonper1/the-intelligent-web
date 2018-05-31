var map; //store map in a var
var userCoords;
// var theRestaurant = JSON.parse(window.RestaurantData);

$(function() { //load the map on page.ready
    console.log(window.RestaurantData);
    getLocation().then(function(data) {
        userCoords = data;
        map = new GMaps({
            div: '#map',
            lat: data.latitude,
            lng: data.longitude,
            height: '200px',
            zoom: 12,
        });

        map.addMarker({
            lat: userCoords.latitude,
            lng: userCoords.longitude,
            title: "Your position",
            infoWindow: {
                content: '<p>Your last retrieved position</p>'
            }
        });

        map.addMarker({
            lat: window.RestaurantData.location.coordinates[1],
            lng: window.RestaurantData.location.coordinates[0],
            title: window.RestaurantData.name,
            infoWindow: {
                content: '<p>'+window.RestaurantData.name+'</p>'
            }
        });

        var distanceToRestaurant = distance(data.latitude, data.longitude, window.RestaurantData.location.coordinates[1], window.RestaurantData.location.coordinates[0], "K").toFixed(2);

        $('#distToRestaurant').html("<i class='fa fa-car' aria-hidden='true'></i> "+distanceToRestaurant+"km away from you");

    });


});

function getLocation() {
    return new Promise((resolve, reject) => {

        if (navigator.geolocation) {
        console.log("Geolocation is supported by this browser.");
        navigator.geolocation.getCurrentPosition(
            function success(pos) {
                var crd = pos.coords;

                console.log('Your current position is:');
                console.log('Latitude : ' + crd.latitude);
                console.log('Longitude: ' + crd.longitude);
                console.log('More or less ' + crd.accuracy + ' meters.');
                $("#latitude").val(crd.latitude);
                $("#longitude").val(crd.longitude);
                console.log("getLocation promise returned");

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

function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var radlon1 = Math.PI * lon1/180
    var radlon2 = Math.PI * lon2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}

// function initializeMap(lat,lng) {
//     console.log( "ready!" );
//     var map = new GMaps({
//         div: '#map',
//         lat: lat,
//         lng: lng,
//         height: '200px',
//         zoom: 13,
//     });
//     map.addMarker({
//         lat: lat,
//         lng: lng,
//         // title: data[i].name,
//         // click: function(e) {
//         //     alert('You clicked in this marker');
//         // }
//     });
// };

function onSubmit(url) {
    console.log("Submitted form");
    event.preventDefault();
    $('#submitReview').prop("disabled", true);
    $('#whatsHappening').html("Sending form");

    retrieveValues()
        .then(function(data) {
            sendAjaxQuery(url, data)
        })
        .then(function(data) {
            $('#submitReviewForm').slideUp(400, function () {
                $('#whatsHappening').html("Your review was added to the system");
            });
        })
        .catch();
}

function retrieveValues() {
    return new Promise(function (fulfill, reject) {
        var formArray = $('form').serializeArray();
        var data = {};
        for (index in formArray) {
            data[formArray[index].name] = formArray[index].value;
        }
        if (!data.userScore) reject("No score given");
        fulfill(data);
    });
}


function sendAjaxQuery(url, data) {
    return new Promise(function (fulfill, reject) {
        $.ajax({
            url: url,
            data: data,
            dataType: 'json',
            type: 'POST',
            success: function (dataR) {
                var ret = dataR;
                document.getElementById('myReview').innerHTML = JSON.stringify(ret);
                fullfill(dataR);
                // addMarkers(ret);
            },
            error: function (xhr, status, error) {
                reject(error);
            }
        });
    });
}

function addMarkers(data) {
    for(i in data) {
        console.log(data[i].loc)
        coords = data[i].loc;
        map.addMarker({
            lat: coords[1],
            lng: coords[0],
            title: data[i].name,
            click: function(e) {
                alert('You clicked in this marker');
            }
        });
    }
}
