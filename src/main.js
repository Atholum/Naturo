console.log('Happy developing ✨')

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    if (!form) return;

    // Initialisation d'EmailJS
    if (typeof emailjs !== "undefined") {
        emailjs.init({
            publicKey: "3n8ITQgOisRp7OoFm"
        });
    }

    const bouton = document.getElementById("send-btn");
    const status = document.getElementById("form-status");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (typeof emailjs === "undefined") {
            if (status) {
                status.textContent = "Erreur : service d'envoi non disponible.";
                status.style.color = "red";
            }
            return;
        }

        // Désactiver le bouton pendant l'envoi
        if (bouton) {
            bouton.disabled = true;
            bouton.textContent = "Envoi en cours...";
        }
        if (status) {
            status.textContent = "";
        }

        try {
            await emailjs.sendForm(
                "service_6vkuiho",
                "template_b8vwy8k",
                form
            );

            // Message de confirmation
            if (status) {
                status.textContent =
                    "Votre message a été envoyé avec succès !";
                status.style.color = "green";
            }

            // Vider le formulaire
            form.reset();

        } catch (error) {
            console.error("Erreur EmailJS :", error);

            if (status) {
                status.textContent =
                    "Une erreur est survenue. Veuillez réessayer.";
                status.style.color = "red";
            }

        } finally {
            if (bouton) {
                bouton.disabled = false;
                bouton.textContent = "Envoyer le message";
            }
        }
    });

});
