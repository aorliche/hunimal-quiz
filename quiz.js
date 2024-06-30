const $ = q => document.querySelector(q);
const $$ = q => [...document.querySelectorAll(q)];
let type = '';
let correct = 0;
let nloaded = 0;
let decs = [];
let huns = [];
let nums = [...Array(101).keys()];
let choices = [...Array(4).keys()];
let feedback = 'No feedback';
let nCorrect = 0;
let nTried = 0;

function shuffle(arr) {
	for (let i=0; i<arr.length; i++) {
		const j = Math.floor(arr.length*Math.random());
		const sav = arr[i];
		arr[i] = arr[j];
		arr[j] = sav;
	}
}

function changeType(typ) {
	['h2d', 'd2h', 'mult'].forEach(t => {
		$('#' + t).classList.remove('active');
	});
	$('#' + typ).classList.add('active');
	if (type != typ) {
		regenQuestion(typ);
	}
	type = typ;
}

function regenQuestion(typ) {
	shuffle(nums);
	shuffle(choices);
	for (let i=0; i<4; i++) {
		if (choices[i] == 0) {
			correct = i;
		}
	}
	let cs = [];
	if (typ == 'h2d') {
		const q = `What is ${huns[nums[0]]} in decimal?`;
		$('#question').innerText = q;
		$('#label0').innerText = decs[nums[choices[0]]];
		$('#label1').innerText = decs[nums[choices[1]]];
		$('#label2').innerText = decs[nums[choices[2]]];
		$('#label3').innerText = decs[nums[choices[3]]];
		feedback = `${huns[nums[0]]} is ${decs[nums[0]]}`;
	}
	if (typ == 'd2h') {
		const q = `What is ${decs[nums[0]]} in hunimal?`;
		$('#question').innerText = q;
		$('#label0').innerText = huns[nums[choices[0]]];
		$('#label1').innerText = huns[nums[choices[1]]];
		$('#label2').innerText = huns[nums[choices[2]]];
		$('#label3').innerText = huns[nums[choices[3]]];
		feedback = `${decs[nums[0]]} is ${huns[nums[0]]}`;
	}
}

window.addEventListener('load', () => {
	fetch('decimal.txt').then(resp => resp.text()).then(txt => {
		decs = txt.split(/\r?\n/)
		nloaded++;
		if (nloaded == 2) {
			changeType('h2d');
		}
	});
	
	fetch('hun.txt').then(resp => resp.text()).then(txt => {
		huns = txt.split(/\r?\n/)
		nloaded++;
		if (nloaded == 2) {
			changeType('h2d');
		}
	});

	$('#h2d').addEventListener('click', e => {
		e.preventDefault();
		changeType('h2d');
	});
	
	$('#d2h').addEventListener('click', e => {
		e.preventDefault();
		changeType('d2h');
	});
	
	$('#mult').addEventListener('click', e => {
		e.preventDefault();
		changeType('mult');
	});

	$('#submit').addEventListener('click', e => {
		e.preventDefault();
		if ($('#submit').innerText == 'Next') {
			regenQuestion(type);	
			$('#submit').innerText = 'Submit';
			return;
		}
		let mychoice = 0;
		for (let i=0; i<4; i++) {
			if ($('#choice' + i).checked) {
				mychoice = i;
			}
		}
		nTried++;
		if (mychoice == correct) {
			nCorrect++;
			$('#feedback').innerText = 'Correct!';
		} else {
			$('#feedback').innerText = `Incorrect: ${feedback}`;
		}
		$('#score').innerText = `${nCorrect}/${nTried}`;
		$('#submit').innerText = 'Next';
	});
});
