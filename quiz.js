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
let time = 0;
let lastStart = 0;
let active = true;

const chars = ['anton', 'david', 'albert', 'charles', 'hunimaniac', 'decimator'];
const longChars = ['Anton the Pig', 'David the Crocodile', 'Albert Swinestein',
    'Charles Hogwin', 'The Hunimaniac', 'The Decimator'];

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
    $('#numpad').classList.remove('inline-block');
    $('#ranges-mult').classList.add('hidden');
    $('#ranges-mult').classList.remove('inline-block');
	$('#question').classList.remove('hunimal-font');
    $('#clear').classList.add('hidden');
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
        // Custom nums code using ranges
        const min1 = parseInt($('#range1min').value);
        const max1 = parseInt($('#range1max').value);
        const min2 = parseInt($('#range2min').value);
        const max2 = parseInt($('#range2max').value);
        let num1, num2;
        if (max1 > min1) {
            num1 = Math.floor((max1-min1)*Math.random())+min1;
            console.log(num1);
        } else {
            num1 = Math.floor((min1-max1)*Math.random())+max1;
        }
        if (max2 > min2) {
            num2 = Math.floor((max2-min2)*Math.random())+min2;
        } else {
            num2 = Math.floor((min2-max2)*Math.random())+max2;
        }
		$('#text').value = '';
		$('#text-container').classList.remove('hidden');
		$('#choices').classList.add('hidden');
		$('#numpad').classList.remove('hidden');
		$('#numpad').classList.add('inline-block');
		$('#ranges-mult').classList.remove('hidden');
		$('#ranges-mult').classList.add('inline-block');
        $('#clear').classList.remove('hidden');
		//$('#question').innerText = `What is ${huns[nums[0]]} (${numToHunimal(nums[0])}) times ${huns[nums[1]]} (${numToHunimal(nums[1])})?`;
		$('#question').innerText = `What is ${huns[num1]} (${numToHunimal(num1)}) times ${huns[num2]} (${numToHunimal(num2)})?`;
		$('#question').classList.add('hunimal-font');
		correct = numToHunimal(num1*num2);
        const digit1 = Math.floor(num1*num2/100);
        const digit2 = (num1*num2)%100;
		feedback = `${huns[num1]} times ${huns[num2]} is ${correct} (${huns[digit1]} ${huns[digit2]})`;
		/*correct = numToHunimal(nums[0]*nums[1]);
        const digit1 = Math.floor(nums[0]*nums[1]/100);
        const digit2 = (nums[0]*nums[1])%100;
		feedback = `${huns[nums[0]]} times ${huns[nums[1]]} is ${correct} (${huns[digit1]} ${huns[digit2]})`;*/
		$('#feedback').classList.add('hunimal-font');
	}
}

function secondsToTime(sec) {
	let h = numToHunimal(Math.floor(sec/3600));
	let m = numToHunimal(Math.floor(sec/60) % 60);
	let s = numToHunimal(sec % 60);
	/*h = ("0" + h).slice(-2);
	m = ("0" + m).slice(-2);
	s = ("0" + s).slice(-2);*/
	return `${h}:${m}:${s}`;
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
		const oldCorrect = nCorrect;
		if (type == 'mult') {
			nTried++;
			if ($('#text').value.trim() == correct) {
				nCorrect++;
				$('#feedback').innerText = `Correct! ${feedback}`;
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
		// Update scoreboard
		const name = $('#name').value;
		const delta = time - lastStart;
		const corr = nCorrect-oldCorrect;
		console.log(`updating ${name} ${delta} seconds ${corr} correct`);
		const uri = `update-quiz.php?name=${encodeURIComponent(name)}&delta=${delta}&corr=${corr}&type=${type}`;
		fetch(uri);
        active = false;
		$('#time').innerText = secondsToTime(time-lastStart);
        // update fastest time
        if (corr == 1 && type == 'mult') {
            for (let i=0; i<longChars.length; i++) {
                const bestTime = parseInt($(`#${chars[i]}-time`).innerText.split('Best time: ')[1]);
                if (name == longChars[i] && delta < bestTime) {
                    $(`#${chars[i]}-time`).innerText = `Best time: ${delta}`;
                }
            }
        }
	});

	$('#next').addEventListener('click', e => {
		e.preventDefault();
		regenQuestion(type);	
		$('#submit').disabled = false;
		$('#next').disabled = true;
		$('#feedback').innerText = '';
		lastStart = time;
        active = true;
	});

    $('#range1min').addEventListener('input', e => {
        $('#range1minvalue').textContent = $('#range1min').value;
    });
    
    $('#range1max').addEventListener('input', e => {
        $('#range1maxvalue').textContent = $('#range1max').value;
    });
    
    $('#range2min').addEventListener('input', e => {
        $('#range2minvalue').textContent = $('#range2min').value;
    });
    
    $('#range2max').addEventListener('input', e => {
        $('#range2maxvalue').textContent = $('#range2max').value;
    });

    $('#clear').addEventListener('click', e => {
        e.preventDefault();
        $('#text').value = '';
    });

	setInterval(() => {
		time += 1;
		//console.log(time);
        if (active) {
            $('#time').innerText = secondsToTime(time-lastStart);
        }
	}, 1000);

    for (let i=0; i<chars.length; i++) {
        $(`#${chars[i]}`).addEventListener('click', e => {
            $('#name').value = longChars[i];
            for (let j=0; j<chars.length; j++) {
                $(`#${chars[j]}-time`).style.display = 'none';
            }
            $(`#${chars[i]}-time`).style.display = 'block';
        });
    }
});
