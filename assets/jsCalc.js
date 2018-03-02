var main = [];//main display input value array
var log = [];
var num = "";
var numLog = "";
var lastChar = "";
var calcLog = [];
var ans = "";
var ansLog = "";
var lenLog = "";
var tempMem = true;
$(document).ready( function(){
	$("#0").on("click", function() { memory(0); });
	$("#1").on("click", function() { memory(1); });
	$("#2").on("click", function() { memory(2); });
	$("#3").on("click", function() { memory(3); });
	$("#4").on("click", function() { memory(4); });
	$("#5").on("click", function() { memory(5); });
	$("#6").on("click", function() { memory(6); });
	$("#7").on("click", function() { memory(7); });
	$("#8").on("click", function() { memory(8); });
	$("#9").on("click", function() { memory(9); });
	$("#Pnt").on("click", function() {point();});
	$("#AC").on("click", function()  {reset();});
	$("#CE").on("click", function()  {clearEntry();});
	$("#d").on("click", function() {subCalc("/")});
	$("#m").on("click", function() {subCalc("x")});
	$("#s").on("click", function() {subCalc("-")});
	$("#a").on("click", function() {subCalc("+")});
	$("#e").on("click", function() {calculate();});

	function memory(int) {
		if (tempMem == false) {//This will reset the calculators memory when ans is found and number or decimal is clicked first.
			tempMem = true;//This will allow for memeory to be stored again.
			log = [];//What user will see
			calcLog = [];//What program will calculate behind the scenes.
		}
		if ( !(main[0] == 0 && main.length == 1)) {//This will prevent numbers from being entered after first # of 0 is entered.
		main.push(int);
		log.push(int);
		calcLog.push(int);
		ansLog = calcLog.join("");
		ans = eval(ansLog).toFixed(2).toString();//Sub answer
		}
		if (log.length <= 21 && ans.length <= 12) {//This will ensure use does not exceed maximum digit limit of calculator
			num = main.join("");
			numLog = log.join("");
			$("#disp_main").text(num);
			$("#disp_log").text(numLog);
		}
		else{//Automatic reset when maximum digit limit has been reached.
			main = []; 
			log = [];
			calcLog = [];
			$("#disp_main").text(0); 
			$("#disp_log").text("Maximum Digit Limit Reached");
		}
	}

	function point(){//Checks to see if decimal is included and then adds a decimal if none present.
		if (tempMem == false) {//This will reset the calculators memory when ans is found and number or decimal is clicked first.
			tempMem = true;//This will allow for memeory to be stored again.
			log = [];
			calcLog = [];
		}
		var present = main.includes(".");
		if (present == false) {
			main.push(".");
			log.push(".");
			calcLog.push(".");
			num = main.join("");
			numLog = log.join("");
			$("#disp_main").text(num);
			$("#disp_log").text(numLog);
		}
	}

	function reset() {
		main = []; 
		log = [];
		calcLog = [];
		$("#disp_main").text(0); 
		$("#disp_log").text(0);
	}

	function subCalc(val){//Prevents multiple operations from being coincident.
		tempMem = true;//This will allow for memeory to be stored again.
		lastChar = log[log.length-1];
		if (!isNaN(lastChar)) {//Checks if last log character is a number.
			main = [];
			$("#disp_main").text(val);
			log.push(val);
			numLog = log.join("");
			$("#disp_log").text(numLog);

			switch (val) {
				case "+": calcLog.push("+"); break;
				case "/": calcLog.push("/"); break;
				case "-": calcLog.push("-"); break;
				case "x": calcLog.push("*"); break;
			}
		}
	}

	function clearEntry() {
		for(i=log.length-1; i > -1; i--) {
			if(["x","/","+","-"].indexOf(log[i]) > -1){
				log.splice(i);
				calcLog.splice(i);
				numLog = log.join("");
			  	$("#disp_log").text(numLog);
        		main = [];
        		$("#disp_main").text(0); 
				i = -1;
			}
			else if(i == 0){
				main = []; 
				log = [];
				calcLog = [];
				$("#disp_main").text(0); 
				$("#disp_log").text(0);		
			}
		}
	}

	function calculate() {
		lastChar = log[log.length-1];
		if(lastChar % 1 == 0){
			ansLog = calcLog.join("");
			ans = eval(ansLog).toFixed(2);//Retrieves final answer and rounds to 2 decimal places
			log.push("=",ans);
			numLog = log.join("");
			$("#disp_main").text(ans);
			$("#disp_log").text(numLog);
			main = []; 
			log = [ans];
			calcLog = [ans];
			tempMem = false;
		}
	}
});

