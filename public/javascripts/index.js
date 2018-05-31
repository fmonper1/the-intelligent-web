var map; //store map in a var
var userCoords;

$(function() { //load the map on page.ready
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

    });

});


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
                alert('Error: ' + error.message);
                reject(error);
            }
        });
    });
}


function displayResultsNicely(data) {
    $("#results").html("");
    for(i in data) {
        $('#results').append("<div class='col-sm-12 col-md-6'><div class='row'>" +
            // + JSON.stringify(data[i]) + "<br>"
            "<div class='col-3 align-items-middle'><a href='/restaurant/"+data[i]._id+"'><img src='"+ data[i].officialPhoto + "' class='img-fluid'></a></div>" +
            "<div class='col-9'>"+ data[i].name + "<br>"
            + "<p class='resRating'>" + data[i].rating.averageScore + "<i class=\"fas fa-star\"></i> </p>"
            + data[i].typeOfCuisine.join() + "<br>"
            + (data[i].hasDelivery > 0 ? "<span class='hasDelivery'> <i class='fas fa-motorcycle'></i> Delivery </span>":"")

            + "<a href='/restaurant/"+data[i]._id+"'>view</a></div> </div></div>");
    }
}

function onSubmit(url) {
    event.preventDefault();

    var formArray= $('form').serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    // const data = JSON.stringify($(this).serializeArray());
    sendAjaxQuery(url, data)
    // sendAjaxQuery(url, data).then(function(){
    //     console.log("query sent")
    // });
}

function onSubmitRadius(url) {
    event.preventDefault();
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

function addMarkers(data) {
    map.removeMarkers();
    var coordArray = [[userCoords.longitude, userCoords.latitude]];

    map.addMarker({
        lat: userCoords.latitude,
        lng: userCoords.longitude,
        title: "Your position",
        infoWindow: {
            content: '<p>Your last retrieved position</p>'
        }
    });

    for(i in data) {
        console.log(data[i].location)
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
}

