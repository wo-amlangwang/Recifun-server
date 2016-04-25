// window.onload=function(){
//     var buttonsShouldHide = document.getElementsByClassName("remove image");
//     for(var i = 0; i < buttonsShouldHide.length; i++) {
//         buttonsShouldHide[i].style.visibility = 'hidden';
//     }
// }

$(document).ready(function() {
    $.uploadPreview({
        input_field: "#image-upload",
        preview_box: "#image-preview",
        label_field: "#image-label"
    });
});


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            // This is where to load image
            // id is different with different image, if add more image, you should change id of image
            // and $('#step1') as well
            $('#image upload').attr('src', e.target.result);
            console.log(e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
        // document.getElementById('remove image1').style.visibility = 'visible';
    }
}
// function removeImage(){
//     document.getElementById("remove image1").style.visibility="hidden";
//     $('#step1').attr('src', "");
// }
