function checkUpload(is_uploaded) {
    if (is_uploaded) {
        document.getElementById("form1").style.display = 'none';
        document.getElementById("msg").style.display = 'block';
    } else {
        document.getElementById("form1").style.display = 'block';
        document.getElementById("msg").style.display = 'none';
    }
}