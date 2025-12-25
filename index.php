<!DOCTYPE html>
<html>
<head>
	<script src='quiz.js'></script>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
	<link href='quiz.css' rel='stylesheet'>
</head>
<?php
    $servername = "localhost";
    $username = "calmprep_anton";
    $password = "MySQL1@bbb";
    $dbname = "calmprep_hunimal";
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
	} 

	$stmt = $conn->prepare('select name,seconds from quiz_times_shortest');
	$stmt->execute();
	$res = $stmt->get_result();

    $name_seconds_map = array();

    while ($row = $res->fetch_assoc()) {
        $name_seconds_map[$row['name']] = $row['seconds'];
    }
?>
<body>
	<div class='container'>
		<header class='d-flex justify-content-center py-3'>
			Choose your character!
        </header>
		<header class='d-flex justify-content-center py-3'>
            <input class='btn-check' type='radio' name='chars' id='anton' checked>
            <label class='btn btn-outline-primary' for='anton'>
                <img src='image/Anton.png' height='100'>
            </label>
            <input class='btn-check' type='radio' name='chars' id='david'>
            <label class='btn btn-outline-primary' for='david'>
                <img src='image/David.png' height='100'>
            </label>
            <input class='btn-check' type='radio' name='chars' id='albert'>
            <label class='btn btn-outline-primary' for='albert'>
                <img src='image/Albert.png' height='100'>
            </label>
            <input class='btn-check' type='radio' name='chars' id='charles'>
            <label class='btn btn-outline-primary' for='charles'>
                <img src='image/Charles.png' height='100'>
            </label>
            <input class='btn-check' type='radio' name='chars' id='hunimaniac'>
            <label class='btn btn-outline-primary' for='hunimaniac'>
                <img src='image/Hunimaniac.png' height='100'>
            </label>
            <input class='btn-check' type='radio' name='chars' id='decimator'>
            <label class='btn btn-outline-primary' for='decimator'>
                <img src='image/Decimator.png' height='100'>
            </label>
		</header>
        <header class='d-flex justify-content-center hunimal-font'>
            <p id='anton-time' style='display: none'>
                Best time: <?= $name_seconds_map['Anton the Pig'] ?>
            </p>
            <p id='david-time' style='display: none'>
                Best time: <?= $name_seconds_map['David the Crocodile'] ?>
            </p>
            <p id='albert-time' style='display: none'>
                Best time: <?= $name_seconds_map['Albert Swinestein'] ?>
            </p>
            <p id='charles-time' style='display: none'>
                Best time: <?= $name_seconds_map['Charles Hogwin'] ?>
            </p>
            <p id='hunimaniac-time' style='display: none'>
                Best time: <?= $name_seconds_map['The Hunimaniac'] ?>
            </p>
            <p id='decimator-time' style='display: none'>
                Best time: <?= $name_seconds_map['The Decimator'] ?>
            </p>
        </header>
		<header class='d-flex justify-content-center py-3'>
			<ul class='nav nav-pills'>
				<li class='nav-item'><a href='#' id='h2d' class='nav-link active'>Hun to Dec</a></li>
				<li class='nav-item'><a href='#' id='d2h' class='nav-link'>Dec to Hun</a></li>
				<li class='nav-item'><a href='#' id='mult' class='nav-link'>Multiplication</a></li>
			</ul>
		</header>
		 <div id='name-container' class="input-group mb-3">
			<span class="input-group-text" id="name-label">Name</span>
			<input type="name" id='name' class="form-control hunimal-font" value='Anonymous'>
		</div>
		<p>Score: <span id='score'>0/0</span> Time: <span id='time' class='hunimal-font'>00:00:00</span></p>
		<p id='question'></p>
		<div id='choices'>
			<div class='form-check'>
				<input class="form-check-input" type="radio" name="choices" id="choice0" checked>
				<label class="form-check-label" id='label0' for="choice0"></label>
			</div>
			<div class='form-check'>
				<input class="form-check-input" type="radio" name="choices" id="choice1">
				<label class="form-check-label" id='label1' for="choice1"></label>
			</div>
			<div class='form-check'>
				<input class="form-check-input" type="radio" name="choices" id="choice2">
				<label class="form-check-label" id='label2' for="choice2"></label>
			</div>
			<div class='form-check'>
				<input class="form-check-input" type="radio" name="choices" id="choice3">
				<label class="form-check-label" id='label3' for="choice3"></label>
			</div>
		</div>
		 <div id='text-container' class="input-group mb-3 hidden">
			<span class="input-group-text" id="instructions">Use Hunimal Numpad</span>
			<input type="text" id='text' class="form-control hunimal-font">
		</div>
		<p>
			<button type="button" class="btn btn-primary" id='submit'>Submit</button>	
			<button type="button" class="btn btn-primary" id='next' disabled>Next</button>	
		</p>
		<p id='feedback'></p>
		<table id='numpad' class='hunimal-font'></table>
        <div id='ranges-mult' style='vertical-align: top; margin-left: 20px;'>
            <label for='range1min' class='form-label'>Mult number 1 min</label>
            <input type='range' class='form-range' min='1' max='99' step='1' value='1' id='range1min'>
            <output for='range1min' id='range1minvalue'>1</output><br>
            <label for='range1max' class='form-label'>Mult number 1 max</label>
            <input type='range' class='form-range' min='1' max='99' step='1' value='99' id='range1max'>
            <output for='range1max' id='range1maxvalue'>99</output><br>
            <label for='range2min' class='form-label'>Mult number 2 min</label>
            <input type='range' class='form-range' min='1' max='99' step='1' value='1' id='range2min'>
            <output for='range2min' id='range2minvalue'>1</output><br>
            <label for='range2max' class='form-label'>Mult number 2 max</label>
            <input type='range' class='form-range' min='1' max='99' step='1' value='99' id='range2max'>
            <output for='range2max' id='range2maxvalue'>99</output><br>
        </div>
    <!-- Ranges for multiply -->
    <style>
input[type='range'] {
    width: 40%;
    padding-left: 10px;
    padding-right: 10px;
}
.inline-block {
    display: inline-block;
}
    </style>
	</div>
</body>
</html>
