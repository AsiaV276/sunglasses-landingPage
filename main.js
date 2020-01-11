
/*$('#email-form').on('submit', function(e){
    $('#welcome-modal').modal('show');
    e.preventDefault();
});*/



// Get modal element
var modal = document.getElementById('welcome-modal');
// Get open modal button
var modalBtn = document.getElementById('start-btn');
// Get close button
var closeBtn = document.getElementsByClassName('close-btn')[0];

// Listen for open click
modalBtn.addEventListener('click', openModal);
// Listen for close click
closeBtn.addEventListener('click', closeModal);
// Listen for outside click
window.addEventListener('click', outsideClick);


// Function to open modal
function openModal() {
    modal.style.display = 'block';
    var demo = document.getElementById('first').value + ' ' + document.getElementById('last').value + '!';
    document.getElementById('name-place').innerText = demo;
    //e.preventDefault();
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

// Modal only opens when submit is successful, all fields are filled
// All fields reset after the form is submitted