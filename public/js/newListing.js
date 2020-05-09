//This for uploading pictures

const imageFile = document.getElementById("picture");
let imageValue = imageFile.value


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

const handleImageUpload = event => {
    const files = event.target.files
    const formData = new FormData()
    formData.append('myFile', files[0])
    fetch('/newListing',{
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.path)
    })
    .catch(error =>{
        console.log(error)
    })

}
document.querySelector('#picture').addEventListener('change', event =>{
    handleImageUpload(event)
})

// $('myFormSubmit').click(function (e){
//     const formData = new FormData()
//     formData.append('photo',('#picture').files[0])
//     $ajax({
//         method : 'POST',
//         processData : false,
//         contentType : false,
//         url : '/',
//         data: formData,
//     })
// })
if(imageFile){
    const openFile = function(file){

    }
}

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


// if(staticform){
//     const image = document.getElementById("picture")
//     const imageValue = image.value
//     if(!imageValue){
//         alert("Please enter a picture")
//     } else{
//         loadFile(imageValue)
//     }
//