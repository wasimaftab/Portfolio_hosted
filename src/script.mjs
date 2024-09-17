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
    // console.log('Portfolio loaded');

    document.getElementById("submit-contact").addEventListener("click", async (event) => {
        event.preventDefault(); // Prevent form submission

        emailjs.init('y3iC8FggYFRlVM2FI'); // Initialize EmailJS with your public key

        // Get form fields
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        // Check if required fields are filled
        if (!email || !message) {
            Swal.fire({
                icon: 'error',
                title: 'Missing required fields',
                text: 'Please fill in the email and message fields.',
                allowOutsideClick: false
            });
            event.preventDefault(); // Prevent form submission
            return;
        }

        // Collect form data
        const formData = {
            from_name: firstName + ' ' + lastName,
            reply_to: email,
            message: message,
            subject: subject
        };

        console.log("Subject = " + document.getElementById('subject').value);

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
