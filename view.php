<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Connect to the database (replace with your own credentials)
$servername = "localhost"; // your server name
$username = "root"; // your database username
$password = ""; // your database password
$dbname = "restaurant"; // your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and execute SQL statement to fetch orders
$stmt = $conn->prepare("SELECT id, name, order_date, mobile_number, delivery, selected_item, address, created_at FROM orders");
if (!$stmt) {
    die("Statement preparation failed: " . $conn->error);
}

// Execute the statement
$stmt->execute();

// Get the result
$result = $stmt->get_result();

// Start HTML output
echo "<table border='1' cellpadding='5' cellspacing='0'>";
echo "<tr><th>ID</th><th>Name</th><th>Order Date</th><th>Mobile Number</th><th>Delivery</th><th>Selected Item</th><th>Address</th><th>Created At</th></tr>";

// Loop through all orders and output each row
while ($row = $result->fetch_assoc()) {
    echo "<tr>";
    echo "<td>" . $row['id'] . "</td>";
    echo "<td>" . $row['name'] . "</td>";
    echo "<td>" . $row['order_date'] . "</td>";
    echo "<td>" . $row['mobile_number'] . "</td>";
    echo "<td>" . ($row['delivery'] ? 'Yes' : 'No') . "</td>";
    echo "<td>" . $row['selected_item'] . "</td>";
    echo "<td>" . $row['address'] . "</td>";
    echo "<td>" . $row['created_at'] . "</td>";
    echo "</tr>";
}

// Close the table
echo "</table>";

// Close connections
$stmt->close();
$conn->close();
?>
