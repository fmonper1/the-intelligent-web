var map;

function onSubmit(url) {
    let retrievedData;
    event.preventDefault();
    getLocation()
        .then(function(data) {
            console.log("getLocationDone");
            return data = retrieveValues(url);
        })
            .then(function(data) {
                console.log("retireveDone");
                retirevedData = sendAjaxQuery(url, data);
                return data;
            })
            // .then(function(data) {
            //     console.log(retrievedData);
            // })
            .catch()
}

function retrieveValues(url) {
    var formArray = $("#radiusForm").serializeArray();
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
        console.log("getLocation promise returned");

        if (navigator.geolocation) {
            document.getElementById("demo1").innerHTML = "Geolocation is supported by this browser.";

            navigator.geolocation.getCurrentPosition(
                function success(pos) {
                    var crd = pos.coords;

                    console.log('Your current position is:');
                    console.log('Latitude : ' + crd.latitude);
                    console.log('Longitude: ' + crd.longitude);
                    console.log('More or less ' + crd.accuracy + ' meters.');
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
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    });
}

function sendAjaxQuery(url, data) {
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
            document.getElementById('results').innerHTML= JSON.stringify(ret);
            addMarkers(ret);
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
            console.log('Error: ' + error.message);
            console.log(error);
        }
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

$(function() {
    console.log( "ready!" );
    map = new GMaps({
        div: '#map',
        lat: 53.387507,
        lng: -1.470275,
        width: '500px',
        height: '500px',
        zoom: 12,
    });
});