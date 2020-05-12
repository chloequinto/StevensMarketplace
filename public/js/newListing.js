//This for displaying picture (before you post your listing)

const imageFile = document.getElementById("picture");
let imageValue = imageFile.value

const openFile = function(file){
    const input = file.target;

const reader = new FileReader();
reader.onload = function(){
    const dataURL = reader.result;
    const output = document.getElementById('output');
    output.src=dataURL 
}
reader.readAsDataURL(input.files[0]);
document.querySelector('#picture').addEventListener('change', event =>{
    handleImageUpload(event)
})
}

//Form validation
const staticForm = document.getElementById("static-form");

if(staticForm){

    staticForm.addEventListener("submit", event => {
        const name = document.getElementById("name")
        const nameValue = name.value

        const category = document.getElementById("category")
        const categoryValue = category.value

        const description = document.getElementById("description")
        const descriptionValue = description.value

        const price = document.getElementById("price")
        const priceValue = price.value

        const picture = document.getElementById("picture")
        const pictureValue = picture.value

        if(!nameValue){
            alert("Please enter a product name of correct format!")
        }
        if(!categoryValue || typeof(categoryValue) !== "string"){
            alert("Please enter a category of correct format!")
        }
        if(!descriptionValue || typeof(descriptionValue) !== "string"){
            alert("Please enter a description of correct format!")
        }
        if(!priceValue){
            alert("Please enter a price as a number!")
        }
        console.log(pictureValue)
        console.log(typeof(pictureValue))
        if(!pictureValue || typeof(pictureValue)!=="string"){
            alert("Please enter a picture of correct format!")
        }
    })
   
}