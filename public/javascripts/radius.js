x = document.getElementById("demo1");
console.log(x);

function onSubmit(url) {

    event.preventDefault();
    getLocation()
        .then(function() {
            console.log("getLocationDone");
            return data = retrieveValues(url);
        })
        .then(function() {
            console.log("retireveDone");
             sendAjaxQuery(url, data);
        })
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
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
            console.log('Error: ' + error.message);
            console.log(error);
        }
    });
}

