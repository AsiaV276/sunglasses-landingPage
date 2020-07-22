// Sale Banner Slide
 var slideIndex = 0;
 slider();

 function slider() {
    var i;
    var x = document.getElementsByClassName('sale-text');

    for(i = 0; i < x.length; i++) {
        x[i].style.display = 'none';
    }

    slideIndex++;
    if (slideIndex > x.length) {
        slideIndex = 1
    } 
    x[slideIndex-1].style.display = "block"; 
    setTimeout(slider, 4000); 
 }

 



 // Get modal element
 var modal = document.getElementById('welcome-modal');
 // Get open modal button
 var modalBtn = document.getElementById('start-btn');
 // Get close button
 var closeBtn = document.getElementsByClassName('close-btn')[0];

 // Listen for open click
 modalBtn.addEventListener('submit', openModal); // Modal only opens when submit is successful, all fields are filled
 // Listen for close click
 closeBtn.addEventListener('click', closeModal);
 // Listen for outside click
 window.addEventListener('click', outsideClick);


 // Function to open modal
 function openModal() {
     modal.style.display = 'block';
     var demo = document.getElementById('first').value + ' ' + document.getElementById('last').value + '!';
     document.getElementById('name-place').innerText = demo;
     resetForm(); //form resets
 }

 // Function to close modal
 function closeModal() {
     modal.style.display = 'none';
 }

 // Function to close modal if click outside of modal
 function outsideClick(e) {
     if(e.target == modal) {
         modal.style.display = 'none';
     }
 }

 
 // All fields reset after the form is submitted
 function resetForm() {
     var frm = document.getElementsByName('start-form')[0];
     frm.reset();
     return false;
 }

 