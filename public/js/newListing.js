const staticForm = document.getElementById("static-form");

if(staticForm){
    staticForm.addEventListener("submit", event => {
        event.preventDefault();
        const product = document.getElementById("product");

        if(!product){
            alert("Please enter a product name")
        }
    })
}