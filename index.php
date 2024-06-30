<!DOCTYPE html>
<html>
<head>
	<script src='quiz.js'></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
</head>
<body>
	<div class='container'>
		<header class='d-flex justify-content-center py-3'>
			<ul class='nav nav-pills'>
				<li class='nav-item'><a href='#' id='h2d' class='nav-link active'>Hun to Dec</a></li>
				<li class='nav-item'><a href='#' id='d2h' class='nav-link'>Dec to Hun</a></li>
				<li class='nav-item'><a href='#' id='mult' class='nav-link'>Multiplication</a></li>
			</ul>
		</header>
		<div>Score: <span id='score'>0/0</span></div>
		<div id='question'></div>
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
		<button type="button" class="btn btn-primary" id='submit'>Submit</button>	
		<div id='feedback'></div>
	</div>
</body>
</html>
