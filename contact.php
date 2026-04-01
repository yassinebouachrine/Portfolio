<!-- contact.php -->
<?php include 'header.php'; ?>
<section id="contact">
    <h2>Contact</h2>
    <form action="send_contact.php" method="post" id="contactForm">
        <label for="name">Nom :</label>
        <input type="text" id="name" name="name" required>

        <label for="email">Adresse Email :</label>
        <input type="email" id="email" name="email" required>

        <label for="message">Message :</label>
        <textarea id="message" name="message" required></textarea>

        <button type="submit">Envoyer</button>
    </form>
</section>
<?php include 'footer.php'; ?>
