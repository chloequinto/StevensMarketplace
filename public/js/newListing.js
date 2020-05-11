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
document.querySelector('#picture').addEventListener('change', event =>{
    handleImageUpload(event)
})

if(imageFile){
    const openFile = function(file){

    }
}}