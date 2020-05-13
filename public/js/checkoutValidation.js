(function () {
  'use strict'

  window.addEventListener('load', function () {

    var forms = document.getElementsByClassName('needs-validation')
    var location = window.location.href

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