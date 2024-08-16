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

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.toggle-button').forEach(button => {
        button.addEventListener('click', function () {
            const targetClass = this.getAttribute('data-target');
            const targetElement = document.querySelector(targetClass);
            if (targetElement) {
                targetElement.classList.toggle('open');

                // Toggle the plus/minus icon
                const icon = this.querySelector('i');
                icon.classList.toggle('fa-plus');
                icon.classList.toggle('fa-minus');
            }
        });
    });
});


