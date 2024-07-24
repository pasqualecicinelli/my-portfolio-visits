<?php
$host = 'pasqualecicinelli.github.io/my-portfolio-visits/'; // o l'indirizzo del tuo server MySQL
$dbname = 'single-visit';
$username = 'root';
$password = 'root';

// Connessione al database
$pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Ottieni l'indirizzo IP del visitatore
$ip_address = $_SERVER['REMOTE_ADDR'];

// Verifica se l'IP è già presente nella tabella
$stmt = $pdo->prepare("SELECT COUNT(*) FROM visits WHERE ip_address = :ip_address AND DATE(visit_date) = CURDATE()");
$stmt->execute(['ip_address' => $ip_address]);
$count = $stmt->fetchColumn();

// Se non è presente, inserisci un nuovo record
if ($count == 0) {
    $stmt = $pdo->prepare("INSERT INTO visits (ip_address) VALUES (:ip_address)");
    $stmt->execute(['ip_address' => $ip_address]);
}

// Recupera il numero totale di visite uniche
$stmt = $pdo->query("SELECT COUNT(DISTINCT ip_address) FROM visits");
$total_visits = $stmt->fetchColumn();
?>






// $servername = "localhost";
// $username = "root"; // Di solito, il default utente di MySQL è "root"
// $password = "root"; // Di solito, la password di default è vuota
// $dbname = "visits"; // Sostituisci con il nome del tuo database

// // Crea connessione
// $conn = new mysqli($servername, $username, $password, $dbname);

// // Controlla la connessione
// if ($conn->connect_error) {
// die("Connessione fallita: " . $conn->connect_error);
// }

// // Incrementa il contatore
// $sql = "UPDATE counter SET count = count + 1 WHERE id = 1";
// $conn->query($sql);

// // Ottieni il valore del contatore
// $result = $conn->query("SELECT count FROM counter WHERE id = 1");
// $row = $result->fetch_assoc();
// echo "Il contatore è: " . $row['count'];
// $total_visit = $row['count'];

// // Chiudi la connessione
// $conn->close();