<?php

$method = $_SERVER['REQUEST_METHOD']; // получение метода с сервера

if ($method != 'POST') { //если метод не пост то выход
exit();
}

$project_name = "PizzaTime";
$admin_email = "mypizza@first-site-pizza.ru"; // почта хостинга нашего (мы его сами создали и перенаправили на свою почту потом на хостинге)
$form_subject = "Заявка с сайта PizzaTime"; // заголовок сообщения
$message = ""; //сообщение

$color_counter = 1;

foreach ($_POST as $key => $value) {
  if ($value === '') {
    continue;
  }
  $color = $color_counter % 2 === 0 ? '#fff' : '#f8f8f8'; // если делится color_counter без остатка на 2 то строка таблицы белого цвета, иначе другого (чтоб чередавались цвета строк в таблице для красоты)
  $message .= "
    <tr style='background-color: $color;'>
      <td style='padding: 10px; border: 1px solid #e9e9e9;'>$key</td>
      <td style='padding: 10px; border: 1px solid #e9e9e9;'>$value</td>
    </tr>";

  $color_counter++;
}

// правильная кодировка , чтоб правильно письмо приходило на почту , вместо названия почты хостинга будет сразу писаться тема письма = заявка с сайта пицца
function adopt($text) {
    return '=?utf-8?B?'.base64_encode($text).'?=';
  }

$message = "<table style='width: 100%;'>$message</table>";// в сообщение передаем таблицу , в которой переменная message

$headers  = "MIME-Version: 1.0\r\n"; 
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From:" . adopt($form_subject) . " <$admin_email>\r\n";

$success_send = mail($admin_email, adopt($form_subject), $message, $headers);

if ($success_send) {
    echo 'success';
} else {
    echo 'error';
}