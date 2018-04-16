x = document.getElementById("demo1");
console.log(x);


function getLocation() {
    console.log("algo");

    if (navigator.geolocation) {
        document.getElementById("demo1").innerHTML = "Geolocation is supported by this browser.";

        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    console.log("algo");
    document.getElementById("demo1").innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    $("#latitude").val(position.coords.latitude);
    $("#longitude").val(position.coords.longitude);

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

function onSubmit(url) {

    var formArray= $("form").serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name] = formArray[index].value;
    }
    console.log('onsubmit');
    console.log(data);
    sendAjaxQuery(url, data);
    event.preventDefault();
}
