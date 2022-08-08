// state

var num_questions = 10;
var current_question = 0;
var selected_questions = [];
var questions_answered = [];
var questions_answered_correctly = [];

// functions

function start() {
	if (questions.length < 10) {
		document.getElementById("main").innerHTML += "Not enough questions";
	}

	selected_questions = [];
	while (selected_questions.length < num_questions) {
		random = Math.floor((Math.random() * questions.length) + 1);
		if (!selected_questions.includes(random)) {
			selected_questions.push(random);
		}
	}
	render_question(0);
}

function render_question(question_counter) {
	question_id = selected_questions[question_counter];
	question_div = document.getElementById("question_template").cloneNode(true);
	question_div.getElementsByClassName("question_label")[0].innerText += questions[question_id][0];
	question_div.removeAttribute("id");
	question_div.setAttribute("style", "display: normal;");
	question_div
		.getElementsByClassName("question_form")[0]
		.setAttribute("action", "javascript:submit(" + question_counter + ")");

	wrapper = document.createElement("div");
	wrapper.setAttribute("id", "wrapper_" + question_counter);
	wrapper.setAttribute("class", "question_wrapper");
	wrapper.appendChild(question_div);

	document.getElementById("main").appendChild(wrapper);

	document
		.getElementById("wrapper_" + question_counter)
		.getElementsByClassName("answer")[0].focus();
}

function submit(question_counter) {
	question_id = selected_questions[question_counter];
	questions_answered.push(question_id);
	answer = document
		.getElementById("wrapper_" + question_counter)
		.getElementsByClassName("answer")[0].value.toString();
	answer = normalize_answer(answer);

	correct = undefined;
	for (let i = 1; i < questions[question_id].length; i++) {
		accepted_answer = normalize_answer(questions[question_id][i]);
		console.log('comparing', answer, accepted_answer);
		if (answer === accepted_answer) {		
			correct = true;
			questions_answered_correctly.push(question_id);
			break;
		}
	}
	color = correct == true ? 'green' : 'red';
	document.getElementById("wrapper_" + question_counter)
		.setAttribute('style', 'background-color: ' + color + ';');

	accepted_answers_div = document.getElementById("accepted_answers_template").cloneNode(true);
	ul = accepted_answers_div.getElementsByTagName("ul")[0];
	for (let i = 1; i < questions[question_id].length; i++) {
		li = document.createElement('li');
		li.innerText = questions[question_id][i];
		ul.appendChild(li);
	}
	label = document.createElement('p');
	label.innerText = "Accepted answers:";
	accepted_answers_div.appendChild(label);
	accepted_answers_div.appendChild(ul);
	accepted_answers_div.setAttribute("style", "display: normal;");
	document.getElementById("wrapper_" + question_counter).appendChild(accepted_answers_div);


	if (question_counter < num_questions - 1) {
		render_question(question_counter + 1);
	} else {
		render_results();
	}
}

function normalize_answer(answer) {
	return answer
		.toLowerCase()
		.replace(",", "")
		.replace(".", "")
		.replace(" ", "")
		.replace("the", "")
		.replace("united states", "us")
		replace("because", "")
		.replace("freedom of", "");
}

function render_results() {
	text = 
		"You answered " + 
		questions_answered_correctly.length + 
		" questions correctly out of " + 
		questions_answered.length +
		". ";

		color = undefined;
		if (questions_answered_correctly.length / questions_answered.length >= 0.6) {
			text += "Congratulations!"
			color = "green";
		} else {
			text += "Not there yet!"
			color = "red";
		}
		result_div = document.getElementById("results");
		result_div.innerHTML = text;
		result_div.setAttribute(
			"style", 
			"display: normal; font-size: 20px; background-color: " + color + ";"
		);
}
 

////////////////////////////


var questions = [
	["What is the supreme law of the land?", "the Constitution", "constitution"],
	["What does the Constitution do?", "sets up the government, defines the government, protects basic rights of americans", ""],
	["The idea of self-government is in the first three words of the Constitution. What are they?", "we the people"],
	["What is an amendment?", "a change", "an addition", "a change to the Constitution", "an addition to the Constitution"],
	["What do we call the first ten amendments to the Constitution?", "bill of rights", "the bill of rights"],
	["What is one right or freedom from the first amendment?", "speech", "religion", "assembly", "press", "petition the government"],
	["How many amendments does the Constitution have?", "twenty-seven", "27"],
	["What did the Declaration of Independence do?", "announced our independence, declared our independence, said that the United States is free"],
	// 2 responses
	["What are two rights in the Declaration of Independence?", "life", "liberty", "pursuit of happiness"],
	["What is Freedom of religion?", "practice any religion, or not practice a religion"],
	["What is the economic system in the United States?", "capitalist economy", "market economy"],
	["What is the 'rule of law'?", "Everyone must follow the law, Leaders must obey the law, Government must obey the law, No one is above the law."],
	["Name one branch or part of the government", "Congress", "legislative", "President", "Executive", "The courts", "Judicial"],
	["What stops one branch of government from becoming too powerful?", "checks and balances, separation of powers"],
	["Who is in charge of the executive branch?", "President", "The President"],
	["Who makes federal laws?", "Congress, Senate, House, legislature"],
	["What are the two parts of the U.S. Congress?", "The Senate and House", "The Senate and House of Representatives"]
	["How many US Senators are there?", "100", "one hundred"],
	["We elect a US Senator for how many years?", "six", "6"],
	["Who is one of your state's US Senators now?", "Dianne Feinstein", "Alex Padilla"],
	["The House of Representatives has how many voting members?", "435", "Four hundred thirty-five"],
	["We elect a US Representative for how many years?", "two", "2"],
	["Name your US Representative", "Nancy Pelosi"],
	["Who does a US Senator represent?", "all people of the state"],
	["Why do some states have more Representatives than other states?", "Because of the state's population", "some states have more people"],
	["We elect a President for how many years?", "four", "4"],
	["In what month do we vote for President?", "November", ""],
	["What is the name of the President now?", "Biden", "Joe Biden"],
	["What is the name of the Vice President now?", "Kamala Harris", "Harris"],
	["If the president can no longer serve, who becomes President?", "The Vice President", "The VP"],
	["If both the President and the Vice President can no longer serve, who becomes President?", "the Speaker of the House", ""],
	["Who is the Commander  in Chief of the military?", "The President"],
	["Who signs bills to become laws?", "The President"],
	["Who vetoes bills?", "The President"],
	["What does the President's cabinet do?", "Advises the President"],
	// 2 responses
	["What are two Cabinet-level positions?", "Secretary of Agriculture", "Secretary of Commerce", "Secretary of Defense", "Secretary of Education", "Secretary of Energy", "Secretary of Health and Human Services", "Secretary of Homeland Security", "Secretary of Housing and Urban Development", "Secretary of the Interior", "Secretary of Labor", "Secretary of State", "Secretary of Transportation", "Secretary of the Treasury", "Secretary of Veterans Affairs", "Attorney General", "Vice President"],
	["What does the judicial branch do?", "reviews laws, explains laws, resolves disputes, decides if a law goes against the Constitution"],
	["What is the highest court in the United States?", "the Supreme Court"],
	["How many justices are on the Supreme Court?", "nine", "9"],
	["Who is the Chief Justice of the United States now?", "Honorable John G. Roberts, Jr.", "John Roberts", "Honorable John Roberts Jr", "Honorable John Roberts, Jr"],
	["Under our Constitution, some powers belong to the federal government. What is one power of the federal government?", "to print money", "to declare war", "to create an army", "to make treaties"],
	["Under our Constitution, some powers belong to the states. What is one power of the states?", "provide schooling and education", "provide protection", "provide safety", "give a driver's license", "approve zoning and land use"],
	["Who is the Governor of your state now?", "Gavin Newsom"],
	["What is the capital of your state?", "Sacramento"],
	["What are the two major political parties in the US?", "Democratic and Republican"],
	["What is the political party of the President now?", "Democratic"],
	["What is the name of the Speaker of the House of Representatives now?", "Nancy Pelosi", "Pelosi"],
	["There are four amendments to the Constitution about who can vote. Describe one of them.", "Citizens 18 and older", "Any citizen can vote", "Women and men can vote"],
	["What is one responsibility that is only for US citizens?", "serve on a jury", "vote in a federal election"],
	["Name one right only for US citizens", "vote in a federal election", "run for federal office"],
	// 2 responses
	["What are two rights of everyone living in the United States?", "freedom of expression", "freedom of speech", "freedom of assembly", "freedom to petition the government", "freedom of religion", "the right to bear arms"],
	["What do we show loyalty to when we say the Pledge of Allegiance?", "The United States", "the US", "the flag"],
	["What is one promise you make when you become a US citizen?", "give up loyalty to other countries", "defend the Constitution and laws of the US", "obey the laws of the US", "serve in the US military if needed", "serve the nation if needed", "be loyal to the US"],
	["How old do citizens have to be to vote for President?", "18 and older", "eighteen and older"],
	// 2 responses
	["What are two ways that Americans can participate in their democracy?", "vote", "join a political party", "help with a campaign", "join a civic group", "join a community group", "give an elected official your opinion on an issue", "call Senators and Representatives", "publicly support or oppose an issue or policy", "run for office", "write to a newspaper"],
	["When is the last day you can send in federal income tax forms?", "April 15"],
	["When must all men register for the Selective Service?", "at 18", "at eighteen", "at age 18"],
	["What is one reason colonists came to America", "freedom", "political liberty", "religious freedom", "economic opportunity", "practice their religion", "escape persecution"],
	["Who lived in America before the Europeans arrived?", "American Indians", "Native Americans"],
	["What group of people was taken to America and sold as slaves?", "Africans", "People from Africa"],
	["Why did the colonists fight the British?", "because of high taxes, because the British army stayed in their houses, become they didn't have self-government"],
	["Who wrote the Declaration of Independence?", "Thomas Jefferson", "Jefferson"],
	["When was the Declaration of Independence adopted?", "July 4 1776"],
	// 3 responses
	["There were 13 original states. Name three", "New Hampshire", "Massachussets", "Rhode Island", "Connecticut", "New York", "New Jersey", "Pennsylvania", "Delaware", "Maryland", "Virginia", "North Carolina", "South Carolina", "Georgia"],
	["What happened at the Constitutional Convention?", "The Constitution was written", "The Founding Fathers wrote the Cnstitution"],
	["When was the Constitution written?", "1787", ""],
	["The Federalist Papers supported the passage of the US Constitution. Name one of the writers.", "James Madison", "Alexander Hamilton", "John Jay", "Publius"],
	["What is one thing Benjamin Franklin is famous for?", "US Diplomat", "Oldest member of the Constitutional Convention", "First postmaster General of the United States", "Started the first free libraries"],
	["Who is the Father of our Country?", "George Washington", "Washington"],
	["Who was the first President?", "George Washington", "Washington"],
	["What territory did the US buy from France in 1803?", "Louisiana"],
	["Name one war fought by the United States in the 1800s", "War of 1812", "Mexican American war", "Civil War", "Spanish American war"],
	["Name one problem that led to the Civil War", "slavery", "economic reasons", "states's rights"],
	["What was one important thing that Abraham Lincoln did?", "freed the slaves", "saved the Union", "led the United States during the civil war"],
	["What did the Emancipation Proclamation do?", "freed the slaves"],
	["What did Susan B. Anthony do?", "fought for women's rights", "fought for civil rights"],
	["Name one war fought by the United States in the 1900s.", "World War 1", "World War 2", "Korean war", "Vietnam war", "Gulf war"],
	["Who was President during World War I?", "Wilson", "Woodrow Wilson"],
	["Who was President during the Great Depression and World War II?", "Franklin Roosevelt", "Roosevelt"],
	["Who did the US fight in World War II?", "Japan, Germany, Italy"],
	["Before he was President, Eisenhower was a general. What war was he in?", "World War II", "World war 2"],
	["During the Cold War, what was the main concern of the United States?", "Communism"],
	["What movement tried to end racial discrimination?", "civil rights", "civil rights movement"],
	["What did Martin Luther Kind, Jr. do?", "fought for civil rights, worked for equality for all Americans"],
	["What major event happened on September 11, 2001, in the US?", "Terrorists attacked the United States"],
	["Name one American Indian tribe in the United States", "Cherokee", "Navajo", "Sioux", "Apache", "Inuit", "Cheyenne"],
	["Name one of the two longest rivers in the US.", "Missouri", "Mississipi"],
	["What ocean is on the West Coast of the United States?", "Pacific", "Pacific Ocean"],
	["What ocean is on the East Coast of the United States?", "Atlantic", "Atlantic Ocean"],
	["Name one US territory", "Puerto Rico", "US Virgin Islands", "Guam", "American Samoa", "Northern Mariana Islands"],
	["Name one state that borders Canada", "Maine", "New Hampshire", "Vermont", "New York", "Pennsylvania", "Ohio", "Michigan", "Minnesota", "North Dakota", "Montana", "Idaho", "Washington", "Alaska"],
	["Name one state that borders Mexico", "California", "Arizona", "New Mexico", "Texas"],
	["What is the capital of the United States?", "Washington DC", "Washington, D.C."],
	["Where is the Statue of Liberty?", "New York", "Liberty Island", "New Jersey", "near New York City", "on the Hudson river"],
	["Why does the flag have 13 stripes?", "Because there were 13 original colonies", "The stripes represent the original colonies"],
	["Why does the flag have 50 stars?", "Because there is one star for each state", "Because there are 50 states"],
	["What is the name of the national anthem?", "The Star-Spangled Banner"],
	["When do we celebrate Independence Day?", "July 4", "July 4th"],
	// 2 answers
	["Name two national US holidays", "New Year's Day", "Martin Luther Kind, Jr. Day", "President's Day", "Memorial Day", "Independence Day", "Labor Day", "Columbus Day", "Veterans Day", "Thanksgiving", "Christmas"],
]
