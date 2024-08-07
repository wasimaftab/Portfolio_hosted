"use strict";

import Swal from 'sweetalert2'

// Add any interactive JS here, if necessary
document.addEventListener('DOMContentLoaded', function () {
    console.log('Portfolio loaded');
    const submitButton = document.getElementById("submit-contact");
    if (submitButton) {
        submitButton.addEventListener("click", async (event) => {
            Swal.fire({
                icon: 'success',
                title: "Work in progress",
                allowOutsideClick: false
            });
            event.preventDefault(); // Prevent form submission
            console.log("Work in progress");
        });
    }

    // const toggleButton = document.querySelector('.navbar-toggle');
    // if (toggleButton){
    //     const navbarCollapse = document.querySelector('.navbar-collapse');
    //     toggleButton.addEventListener('click', function () {
    //         navbarCollapse.classList.toggle('open');
    //     });
    // }
});

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.navbar-toggle');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (toggleButton && navbarCollapse) {
        toggleButton.addEventListener('click', function () {
            navbarCollapse.classList.toggle('open');
        });
    }
});

