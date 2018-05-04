

function initializeMap(lat,lng) {
    console.log( "ready!" );
    var map = new GMaps({
        div: '#map',
        lat: lat,
        lng: lng,
        height: '200px',
        zoom: 13,
    });
    map.addMarker({
        lat: lat,
        lng: lng,
        // title: data[i].name,
        // click: function(e) {
        //     alert('You clicked in this marker');
        // }
    });
};

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
        //sendAjaxQuery(url, data);
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
