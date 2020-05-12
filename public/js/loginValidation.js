const userForm = document.getElementById("user-form");

if(userForm){
    userForm.addEventListener("submit", event => {
        const email = document.getElementById("contactInfo");
        const emailValue = email.value;

        const password = document.getElementById("password");
        const passwordValue = password.value

        if(!emailValue){
            alert("Email field cannot be blank")
        }
        if(!passwordValue){
            alert("Password field cannot be blank.")
        }
    })
}
