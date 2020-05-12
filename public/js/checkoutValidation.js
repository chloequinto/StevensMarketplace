

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');


      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
          
        // form.addEventListener('submit', function(event) {
        //     console.log(form.checkValidity())
        //   if (form.checkValidity() === false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        //   }else{ 
        //     // console.log(window.location.href.slice(0,22) + "bought")
        //     // document.location.href = window.location.href.slice(0,22) + "bought"
        //     //   return 
        //     window.location = "google.com"
        //     console.log(form.checkValidity())
        //     return true 
        //   }

        // }, false);


        
      });
    }, false);
  })();

