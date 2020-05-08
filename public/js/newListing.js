//This for uploading pictures

const imageFile = document.getElementById("picture");
let imageValue = imageFile.value
// console.log('here')
// console.log(imageFile)
// console.log(imageValue)
// const  imageFile = document.forms['static-form']['picture'].files[0];

const openFile = function(file){
    const input = file.target;


const reader = new FileReader();
reader.onload = function(){
    const dataURL = reader.result;
    const output = document.getElementById('output');
    output.src=dataURL 
    console.log(output)
}
reader.readAsDataURL(input.files[0]);
}

$('myFormSubmit').click(function (e){
    const formData = new FormData()
    formData.append('photo',('#picture').files[0])
    $ajax({
        method : 'POST',
        processData : false,
        contentType : false,
        url : '/',
        data: formData,
    })
})
// if(imageFile){
//     const openFile = function(file){

//     }
// }

// // if(imageFile){
//     imageFile.addEventListener("change", function() {
//         const file = this.files[0];
//         if(file){
//             const reader = new FileReader(); 
//             reader.readAsDataURL(file);
//             imageValue = imageFile.value
//             console.log(imageValue)
//         }  
//     })
// } else{
//     alert("Please enter a picture")
// }

const form = document.getElementById("static-form")
if(form){
    form.addEventListener("submit",event => {
        event.preventDefault()
        document.getElementById("errorMessage").removeAttribute("hidden")
    })
}
// function loadFile(event) {
// 	const image = document.getElementById('picture');
//     image.src = URL.createObjectURL(event.target.files[0])
// }

// if(staticform){
//     const image = document.getElementById("picture")
//     const imageValue = image.value
//     if(!imageValue){
//         alert("Please enter a picture")
//     } else{
//         loadFile(imageValue)
//     }
//}