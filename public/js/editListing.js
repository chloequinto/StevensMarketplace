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

const handleImageUpload = event => {
    const files = event.target.files
    const formData = new FormData()
    formData.append('myFile', files[0])
    fetch('/editListing',{
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

if(imageFile){
    const openFile = function(file){

    }
}}