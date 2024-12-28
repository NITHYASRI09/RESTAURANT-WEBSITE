<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Allow all origins
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specified methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); 

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Read the input from PHP
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Check if json_decode failed
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["success" => false, "message" => "Invalid JSON input: " . json_last_error_msg()]);
   exit;
}

// Check if the required fields are present
if (!isset($data['name'], $data['date'], $data['mobileNumber'], $data['selectedItem'])) {
    echo json_encode(["success" => false, "message" => "Missing required fields."]);
    exit;
}

// Get the data
$name = $data['name'];
$order_date = $data['date'];
$mobileNumber = $data['mobileNumber'];
$delivery = isset($data['delivery']) ? (int)$data['delivery'] : 0; // Convert to integer (0 or 1)
$selectedItem = $data['selectedItem'];
$address = isset($data['address']) ? $data['address'] : ''; // Default to empty if not provided

// Connect to the database (replace with your own credentials)
$servername = "localhost"; // your server name
$username = "root"; // your database username
$password = ""; // your database password
$dbname = "restaurant"; // your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// Prepare and bind SQL statement
$stmt = $conn->prepare("INSERT INTO orders (name, order_date, mobile_number, delivery, selected_item, address) VALUES (?, ?, ?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Statement preparation failed: " . $conn->error
    ]);
    exit;
}

// Bind parameters
$stmt->bind_param("ssssss", $name, $order_date, $mobileNumber, $delivery, $selectedItem, $address);

// Execute the statement and check for success
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Order saved successfully!"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
}

// Close connections
$stmt->close();
$conn->close();
?>
