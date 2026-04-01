<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Assure-toi que le chemin est correct
require 'C:\Users\BeeClick\Downloads\PHPMailer-master\src\Exception.php';
require 'C:\Users\BeeClick\Downloads\PHPMailer-master\src\PHPMailer.php';
require 'C:\Users\BeeClick\Downloads\PHPMailer-master\src\SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération et nettoyage des données
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    $recipient = 'bouachrinyassin0@gmail.com'; // Destinataire
    $subject = "Nouveau message de portfolio de $name";

    // Corps du message
    $email_content = "Nom : $name\n";
    $email_content .= "Email : $email\n\n";
    $email_content .= "Message :\n$message\n";

    $mail = new PHPMailer(true);

    try {
        // Configuration SMTP
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';            // Serveur SMTP
        $mail->SMTPAuth   = true;                        // Active l'authentification SMTP
        $mail->Username   = 'bouachrinyassin0@gmail.com'; // Ton adresse Gmail
        $mail->Password   = 'ton_mot_de_passe';            // Ton mot de passe Gmail ou mot de passe d'application
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Activation de STARTTLS
        $mail->Port       = 587;

        // Destinataires
        $mail->setFrom('bouachrinyassin0@gmail.com', 'Portfolio');
        $mail->addAddress($recipient);

        // Contenu de l'email
        $mail->isHTML(false);
        $mail->Subject = $subject;
        $mail->Body    = $email_content;

        $mail->send();
        header("Location: thank_you.html");
        exit;
    } catch (Exception $e) {
        echo "Une erreur est survenue lors de l'envoi: {$mail->ErrorInfo}";
    }
} else {
    echo "Méthode de requête non autorisée.";
}
?>
