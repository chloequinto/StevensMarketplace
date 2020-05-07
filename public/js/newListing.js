//This for uploading pictures

console.log("hi")
const imagefile = document.getElementById("picture");

if(imagefile){
    imagefile.addEventListener("change", function() {
        const file = this.files[0];
        if(file){
            const reader = new FileReader(); 
            reader.readAsDataURL(file);
        }  
    })
} else{
    alert("Please enter a picture")
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