<!DOCTYPE html>
<html>
<head>
	<script src='quiz.js'></script>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
	<link href='quiz.css' rel='stylesheet'>
</head>
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
	</div>
</body>
</html>
