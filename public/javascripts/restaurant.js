
function onSubmit(url) {
    console.log("Submitted form");
    event.preventDefault();
    retrieveValues()
        .then(function(data) {
            sendAjaxQuery(url, data)
        })
        .catch();

    // getLocation()
    //     .then(function(data) {
    //         console.log("getLocationDone");
    //         return data = retrieveValues(url);
    //     })
    //     .then(function(data) {
    //         console.log("retireveDone");
    //         retirevedData = sendAjaxQuery(url, data);
    //         return data;
    //     })
    //     // .then(function(data) {
    //     //     console.log(retrievedData);
    //     // })
    //     .catch()
}

function retrieveValues() {
    return new Promise(function (fulfill, reject) {
        var formArray = $('form').serializeArray();
        var data = {};
        for (index in formArray) {
            data[formArray[index].name] = formArray[index].value;
        }
        if(!data.userScore) reject("No score given")
        fulfill(data);
    });
    //sendAjaxQuery(url, data);
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
                // alert('Error: ' + error.message);
                reject(error);
                // console.log(error);
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
