<table>
<tr>
	<th>Name</th>
	<th>Seconds</th>
	<th>Correct</th>
	<th>Tried</th>
</tr>
<?php
    $servername = "localhost";
    $username = "calmprep_anton";
    $password = "MySQL1@bbb";
    $dbname = "calmprep_hunimal";
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
	} 

	$stmt = $conn->prepare('select name,seconds,correct,tried from quiz_times order by correct desc');
	$stmt->execute();
	$res = $stmt->get_result();

	while (($row = $res->fetch_assoc())) {
		echo "<tr><td>".$row['name']."</td><td>".$row['seconds']."</td><td>".$row['correct']."</td><td>".$row['tried']."</td></tr>";
	}
?>
</table>
