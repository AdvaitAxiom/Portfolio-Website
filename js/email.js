// Make sure to include EmailJS SDK in your HTML before this script:
// <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>

document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS with your user ID (public key)
    emailjs.init('f_QTPivBdWi0yOP8c'); // Replace with your EmailJS public key

    const form = document.getElementById('contact-form');
    if (!form)return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log('Form submitted');

        // Collect form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Prepare template params
        const templateParams = {

            name: name,
            email: email,
            subject: subject,
            message: message
        };
        console.log('Template params:', name);

        // Send the email using EmailJS
        emailjs.send('service_26jl18q', 'template_b7w20z5', templateParams)
            .then(function (response) {
                alert('Message sent successfully!');
                form.reset();
            }, function (error) {
                alert('Failed to send message. Please try again later.');
                console.error('EmailJS error:', error);
            });
    });
});