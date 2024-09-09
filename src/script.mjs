"use strict";

import Swal from 'sweetalert2'
import emailjs from '@emailjs/browser';

// // Add any interactive JS here, if necessary
// document.addEventListener('DOMContentLoaded', function () {
//     console.log('Portfolio loaded');
//     const submitButton = document.getElementById("submit-contact");
//     if (submitButton) {
//         submitButton.addEventListener("click", async (event) => {
//             Swal.fire({
//                 icon: 'success',
//                 title: "Work in progress",
//                 allowOutsideClick: false
//             });
//             event.preventDefault(); // Prevent form submission
//             console.log("Work in progress");
//         });
//     }

//     // const toggleButton = document.querySelector('.navbar-toggle');
//     // if (toggleButton){
//     //     const navbarCollapse = document.querySelector('.navbar-collapse');
//     //     toggleButton.addEventListener('click', function () {
//     //         navbarCollapse.classList.toggle('open');
//     //     });
//     // }
// });

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

// Message Form 
document.addEventListener('DOMContentLoaded', function () {
    console.log('Portfolio loaded');

    document.getElementById("submit-contact").addEventListener("click", async (event) => {
        event.preventDefault(); // Prevent form submission

        emailjs.init('y3iC8FggYFRlVM2FI'); // Initialize EmailJS with your public key

        // Collect form data
        const formData = {
            from_name: document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value,
            reply_to: document.getElementById('email').value,
            message: document.getElementById('message').value,
            subject: document.getElementById('subject').value
        };

        // Send email
        try {
            const result = await emailjs.send('service_30wzhv8', 'template_mtd6caa', formData);
            Swal.fire({
                icon: 'success',
                title: "Message Sent",
                text: "Thank you for reaching out!",
                allowOutsideClick: false
            });
        } catch (error) {
            console.error('Error sending email:', error);
            Swal.fire({
                icon: 'error',
                title: "Oops...",
                text: "Something went wrong. Please try again later.",
                allowOutsideClick: false
            });
        }
    });
});

