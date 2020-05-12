// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation')
    var location = window.location.href
    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }if(form.checkValidity() === true){ 
          event.preventDefault(); // cancel submission

          window.location.replace(location.slice(0, 21) + "/bought")
          return false
        }

        form.classList.add('was-validated')
      }, false)
    })
  }, false)
}())