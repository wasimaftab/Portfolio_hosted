"use strict";

import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector(".navbar-toggle");
    const navigation = document.querySelector(".site-navigation");

    const closeNavigation = () => {
        if (!toggleButton || !navigation) return;
        toggleButton.setAttribute("aria-expanded", "false");
        toggleButton.setAttribute("aria-label", "Open navigation");
        navigation.classList.remove("is-open");
    };

    if (toggleButton && navigation) {
        toggleButton.addEventListener("click", () => {
            const isOpen = toggleButton.getAttribute("aria-expanded") === "true";
            toggleButton.setAttribute("aria-expanded", String(!isOpen));
            toggleButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
            navigation.classList.toggle("is-open", !isOpen);
        });

        navigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeNavigation);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && toggleButton.getAttribute("aria-expanded") === "true") {
                closeNavigation();
                toggleButton.focus();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 820) closeNavigation();
        });
    }

    document.querySelectorAll("details").forEach((details) => {
        const summary = details.querySelector("summary");
        if (!summary) return;

        const syncExpandedState = () => {
            summary.setAttribute("aria-expanded", String(details.open));
        };

        syncExpandedState();
        details.addEventListener("toggle", syncExpandedState);
    });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = document.querySelectorAll(".selected-card, .project-card, .cv-entry, .skills-grid article");

    if (!reducedMotion && "IntersectionObserver" in window) {
        revealItems.forEach((item) => item.classList.add("reveal-item"));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -30px" });

        revealItems.forEach((item) => observer.observe(item));
    }

    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;

    const submitButton = document.getElementById("submit-contact");
    const buttonLabel = submitButton?.querySelector("span");
    const status = document.getElementById("form-status");
    const honeypot = document.getElementById("website");
    const publicEmail = "wasim.aftab@med.uni-muenchen.de";

    const setStatus = (message, type = "") => {
        if (!status) return;
        status.textContent = message;
        status.className = `form-status${type ? ` is-${type}` : ""}`;
    };

    const setSubmitting = (isSubmitting) => {
        submitButton.disabled = isSubmitting;
        if (buttonLabel) buttonLabel.textContent = isSubmitting ? "Sending…" : "Send message";
    };

    const openEmailFallback = ({ fullName, email, subject, message }) => {
        const fallbackSubject = subject || "Portfolio enquiry";
        const fallbackBody = [
            `Name: ${fullName}`,
            `Reply-to: ${email}`,
            "",
            message
        ].join("\n");
        window.location.href = `mailto:${publicEmail}?subject=${encodeURIComponent(fallbackSubject)}&body=${encodeURIComponent(fallbackBody)}`;
    };

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (honeypot?.value) {
            contactForm.reset();
            setStatus("Message received.", "success");
            return;
        }

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            setStatus("Please complete the required fields.", "error");
            return;
        }

        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();
        const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Portfolio visitor";

        setSubmitting(true);
        setStatus("Sending your message…");

        try {
            await emailjs.send("service_30wzhv8", "template_mtd6caa", {
                from_name: fullName,
                reply_to: email,
                subject: subject || "Portfolio enquiry",
                message
            }, {
                publicKey: "y3iC8FggYFRlVM2FI"
            });

            contactForm.reset();
            setStatus("Your message has been sent. Thank you.", "success");
            setSubmitting(false);
            await Swal.fire({
                icon: "success",
                title: "Message sent",
                text: "Thank you for reaching out.",
                confirmButtonColor: "#0b2838"
            });
        } catch (error) {
            const errorStatus = Number(error?.status || 0);
            const errorText = String(error?.text || "");
            const isLocalPreview = ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
            const isOriginError = errorStatus === 403 || /origin|domain|forbidden/i.test(errorText);
            const localOriginMessage = `EmailJS rejected this preview origin (${window.location.origin}). Add it to the EmailJS domain allowlist or use the email fallback.`;
            const publicErrorMessage = isLocalPreview && isOriginError
                ? localOriginMessage
                : "The contact service could not send this message. You can open it in your email app instead.";

            console.error("EmailJS submission failed", { status: errorStatus, text: errorText });
            setStatus(publicErrorMessage, "error");
            setSubmitting(false);

            const result = await Swal.fire({
                icon: "error",
                title: "Message not sent",
                text: publicErrorMessage,
                confirmButtonText: "Open email app",
                confirmButtonColor: "#0b2838",
                showCancelButton: true,
                cancelButtonText: "Close"
            });

            if (result.isConfirmed) {
                openEmailFallback({ fullName, email, subject, message });
            }
        }
    });
});
