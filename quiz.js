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

function numToHunimal(num) {
	if (num == 0) {
		return String.fromCharCode(0x5500);
	}
	let hun = "";
	while (num > 0) {
		let ones = num % 10;
		let tens = Math.floor(num/10) % 10;
		hun = `${String.fromCharCode(0x5500 + 0x10*tens + ones)}${hun}`;
        num = Math.floor(num/100);
	}
	return hun;
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
	$('#submit').disabled = false;
	$('#next').disabled = true;
	$('#feedback').innerText = '';
}

function regenQuestion(typ) {
	shuffle(nums);
	shuffle(choices);
	for (let i=0; i<4; i++) {
		$('#label' + i).classList.remove("hunimal-font");
		if (choices[i] == 0) {
			correct = i;
		}
	}
	$('#feedback').classList.remove('hunimal-font');
	$('#text-container').classList.add('hidden');
	$('#choices').classList.remove('hidden');
	$('#numpad').classList.add('hidden');
	$('#question').classList.remove('hunimal-font');
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
	if (typ == 'mult') {
		$('#text').value = '';
		$('#text-container').classList.remove('hidden');
		$('#choices').classList.add('hidden');
		$('#numpad').classList.remove('hidden');
		$('#question').innerText = `What is ${huns[nums[0]]} (${numToHunimal(nums[0])}) times ${huns[nums[1]]} (${numToHunimal(nums[1])})?`;
		$('#question').classList.add('hunimal-font');
		correct = numToHunimal(nums[0]*nums[1]);
		feedback = `${huns[nums[0]]} times ${huns[nums[1]]} is ${correct}`;
		$('#feedback').classList.add('hunimal-font');
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

	// Build numpad
	const numpad = $('#numpad');
	for (let i=0; i<10; i++) {
		const tr = document.createElement('tr');
		numpad.appendChild(tr);
		for (let j=0; j<10; j++) {
			const td = document.createElement('td');
			tr.appendChild(td);
			td.innerText = numToHunimal(i*10 + j);
			td.addEventListener('mouseenter', e => {
				td.classList.add('pink');
			});
			td.addEventListener('mouseout', e => {
				td.classList.remove('pink');
			});
			td.addEventListener('click', e => {
				$('#text').value += td.innerText;
			});
		}
	}

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
		$('#submit').disabled = true;
		$('#next').disabled = false;
		if (type == 'mult') {
			nTried++;
			if ($('#text').value.trim() == correct) {
				nCorrect++;
				$('#feedback').innerText = 'Correct!';
			} else {
				$('#feedback').innerText = `Incorrect: ${feedback}`;
			}
		} else {
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
		}
		$('#score').innerText = `${nCorrect}/${nTried}`;
	});

	$('#next').addEventListener('click', e => {
		e.preventDefault();
		regenQuestion(type);	
		$('#submit').disabled = false;
		$('#next').disabled = true;
		$('#feedback').innerText = '';
	});
});
