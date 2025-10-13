<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // куда отправляем письма
    $to = "opoloos123@gmail.com";  

    // тема письма
    $subject = "Новая подписка на рассылку";  

    // получаем данные из формы
    $email = htmlspecialchars($_POST['email']);  

    // формируем тело письма
    $body = "Подписка на рассылку с сайта.\nEmail: $email";

    // заголовки письма
    $headers = "From: no-reply@galatasarayvefenerbahce.bet\r\n"; 
    $headers .= "Reply-To: $email\r\n"; 

    // отправка
    if (mail($to, $subject, $body, $headers)) {
        echo "✅ Teşekkürler! Abone oldunuz.";
    } else {
        echo "❌ Gönderim hatası.";
    }
}
?>
