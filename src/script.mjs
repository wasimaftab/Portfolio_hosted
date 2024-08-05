"use strict";

import Swal from 'sweetalert2'

// Add any interactive JS here, if necessary
document.addEventListener('DOMContentLoaded', function () {
    console.log('Portfolio loaded');
    document.getElementById("submit-contact").addEventListener("click", async (event) => {
        Swal.fire({
            icon: 'success',
            title: "Work in progress",
            // text: result.output,
            allowOutsideClick: false
        });
        event.preventDefault(); // Prevent form submission
        console.log("Work in progress");
    });
});