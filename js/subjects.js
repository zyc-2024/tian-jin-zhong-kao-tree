// ============================================================
// 天津中考树：体育更新
// - 体育层：位于中考层下方，按新备份实现 30 秒反应速度训练
// ============================================================

// ---------- 评级与数字格式 ----------

const SUBJECT_GRADES = [
	{ min: 0, name: "Common Minus", color: "#8A8A8A" },
	{ min: 10, name: "Common", color: "#C8C8C8" },
	{ min: 25, name: "Uncommon", color: "#2ECC71" },
	{ min: 50, name: "Rare", color: "#3498DB" },
	{ min: 100, name: "Legendary", color: "#F39C12" },
	{ min: 200, name: "Mystical", color: "#E74C3C" },
];

function subjectNumber(value) {
	let n = new OmegaNum(value);
	if (n.lt(1000)) return Math.floor(n.toNumber()).toString();
	return formatWhole(n);
}

function subjectGrade(value) {
	let n = new OmegaNum(value);
	for (let i = SUBJECT_GRADES.length - 1; i >= 0; i--) {
		if (n.gte(SUBJECT_GRADES[i].min)) return SUBJECT_GRADES[i];
	}
	return SUBJECT_GRADES[0];
}

function subjectGradeHTML(value, forced) {
	let grade = forced ? { name: forced, color: forced === "Legendary" ? "#F39C12" : forced === "Mystical" ? "#E74C3C" : "#C8C8C8" } : subjectGrade(value);
	return "<span style='color:" + grade.color + ";font-weight:bold'>" + grade.name + "</span>";
}

function subjectTableRow(label, value, suffix, forcedGrade) {
	return (
		"<tr>" +
		"<td style='padding:6px;border:1px solid #555;background:#333;color:white;text-align:center'>" + label + "</td>" +
		"<td style='padding:6px;border:1px solid #555;background:#222;color:white;text-align:center'>" + value + (suffix || "") + "</td>" +
		"<td style='padding:6px;border:1px solid #555;background:#222;text-align:center'>" + subjectGradeHTML(value, forcedGrade) + "</td>" +
		"</tr>"
	);
}

// ---------- 通用训练逻辑 ----------

function subjectColor(layer) {
	if (layer === "P") return "#00BFFF";
	if (layer === "Pol") return "#E74C3C";
	if (layer === "His") return "#8B5A2B";
	if (layer === "Geo") return "#2E8B57";
	return "#FF00FF";
}

function subjectHeaderHTML(layer, name) {
	return "当前" + name + "：<h2 style='color:" + subjectColor(layer) + ";text-shadow:0px 0px 10px " + subjectColor(layer) + "'>" + subjectNumber(player[layer].points) + "</h2>";
}

function subjectTimerHTML(layer) {
	let p = player[layer];
	let time = p.active ? Math.max(0, p.timeLeft) : 0;
	let pct = p.active ? Math.max(0, Math.min(100, time / 30 * 100)) : (p.completed ? 0 : 100);
	let text = p.active ? "剩余 " + time.toFixed(2) + " 秒" : (p.completed ? "剩余 0.00 秒" : "剩余 30.00 秒");
	return (
		"<h2 style='color:" + subjectColor(layer) + ";text-shadow:0px 0px 10px " + subjectColor(layer) + "'>" + text + "</h2>" +
		"<div style='width:min(600px,90%);height:28px;margin:8px auto;border:2px solid white;border-radius:16px;background:#111;overflow:hidden'>" +
		"<div style='height:100%;width:" + pct + "%;background:#00AA00;transition:width 0.1s'></div>" +
		"</div>"
	);
}

function subjectQuestionHTML(layer) {
	let p = player[layer];
	if (p.active) {
		let color = p.score >= 0 ? "#66FF66" : "#FF5555";
		return "<h1 style='color:" + subjectColor(layer) + "'>" + p.question + "</h1><br>" +
			"<h3 style='color:" + color + "'>当前得分：" + p.score + "</h3><br>";
	}
	if (p.completed) {
		let color = p.lastScore >= 0 ? "#66FF66" : "#FF3333";
		return "<h1 style='color:" + color + ";font-size:64px'>" + p.lastScore + "</h1>" +
			"<h2 style='color:" + color + "'>" + p.lastMessage + "</h2>";
	}
	return "<h2>准备……开始！</h2><p>限时 30 秒，答对题目越多，训练成绩越好。</p>";
}

function subjectStart(layer) {
	let p = player[layer];
	p.active = true;
	p.completed = false;
	p.timeLeft = 30;
	p.questionIndex = 0;
	p.score = 0;
	p.lastScore = 0;
	p.lastMessage = "";
	subjectNextQuestion(layer);
}

function subjectReset(layer) {
	let p = player[layer];
	p.active = false;
	p.completed = false;
	p.timeLeft = 0;
	p.questionIndex = 0;
	p.score = 0;
	p.lastScore = 0;
	p.lastMessage = "";
	p.question = "";
	p.options = ["", "", ""];
	p.correctIndex = 0;
	updateTemp();
}

function subjectNextQuestion(layer) {
	let q;
	if (layer === "P") q = physicsMakeQuestion();
	else if (layer === "Pol") q = politicsMakeQuestion();
	else if (layer === "His") q = historyMakeQuestion();
	else if (layer === "Geo") q = geographyMakeQuestion();
	else q = peMakeQuestion();
	let p = player[layer];
	p.question = q.text;
	p.options = q.options;
	p.correctIndex = q.correct;
	p.lastCategory = q.category;
	updateTemp();
}

function subjectAnswer(layer, index) {
	let p = player[layer];
	if (!p.active) return;
	if (index === p.correctIndex) p.score += 3;
	else p.score -= 1;
	p.questionIndex += 1;
	if (p.questionIndex >= 30 || p.timeLeft <= 0) subjectFinish(layer);
	else subjectNextQuestion(layer);
	updateTemp();
}

function subjectUpdate(layer, diff) {
	let p = player[layer];
	if (!p.active) return;
	p.timeLeft -= diff;
	if (p.timeLeft <= 0) {
		p.timeLeft = 0;
		subjectFinish(layer);
	}
}

function subjectFinish(layer) {
	let p = player[layer];
	if (!p.active) return;
	p.active = false;
	p.completed = true;
	p.lastScore = p.score;
	p.trainingRuns = p.trainingRuns.add(1);
	p.bestScore = p.bestScore.max(p.score);
	let gain = Math.max(0, p.score);
	addPoints(layer, gain);

	if (layer === "PE") {
		p.reaction = p.reaction.add(Math.max(0, Math.floor(p.score / 5)));
		p.speed = p.speed.add(Math.max(0, Math.floor(p.score / 10)));
		p.endurance = p.endurance.add(Math.max(0, Math.floor(p.score / 12)));
		p.flexibility = p.flexibility.add(Math.max(0, Math.floor(p.score / 15)));
		p.strength = p.strength.add(Math.max(0, Math.floor(p.score / 12)));
	} else if (layer === "Pol") {
		let category = p.lastCategory || "national";
		if (p[category] === undefined) category = "national";
		p[category] = p[category].add(Math.max(0, Math.floor(p.score / 10)));
		p.national = p.national.add(Math.max(0, Math.floor(p.score / 30)));
		if (p.score >= 70) p.lastMessage = "同志，你的政治觉悟很高！";
		else if (p.score >= 50) p.lastMessage = "继续保持，稳中向好。";
		else if (p.score >= 0) p.lastMessage = "还需加强时政学习。";
		else p.lastMessage = "建议把课本再背一遍。";
	} else if (layer === "His") {
		let category = p.lastCategory || "events";
		if (p[category] === undefined) category = "events";
		p[category] = p[category].add(Math.max(0, Math.floor(p.score / 10)));
		p.events = p.events.add(Math.max(0, Math.floor(p.score / 30)));
		// 文史不分家：历史训练会给 Pol 提供一点时政/国情积累。
		if (player.Pol && player.Pol.current) player.Pol.current = player.Pol.current.add(Math.max(0, Math.floor(p.score / 40)));
		if (p.score >= 70) p.lastMessage = "以史为鉴，可以知兴替！";
		else if (p.score >= 50) p.lastMessage = "年代线记得不错。";
		else if (p.score >= 0) p.lastMessage = "还需多翻史料。";
		else p.lastMessage = "建议把时间轴贴墙上。";
	} else if (layer === "Geo") {
		let category = p.lastCategory || "region";
		if (p[category] === undefined) category = "region";
		p[category] = p[category].add(Math.max(0, Math.floor(p.score / 10)));
		p.comprehensive = p.comprehensive.add(Math.max(0, Math.floor(p.score / 30)));
		// 地物联动：地理训练会顺手提升物理实验观察。
		if (player.P && player.P.experiment) player.P.experiment = player.P.experiment.add(Math.max(0, Math.floor(p.score / 40)));
		if (p.score >= 70) p.lastMessage = "地图在握，天下我有！";
		else if (p.score >= 50) p.lastMessage = "区域定位不错。";
		else if (p.score >= 0) p.lastMessage = "还需多看地图。";
		else p.lastMessage = "建议把地图册翻烂。";
	} else if (layer === "P") {
		let category = p.lastCategory || "mechanics";
		if (p[category] === undefined) category = "mechanics";
		p[category] = p[category].add(Math.max(0, Math.floor(p.score / 10)));
		p.mechanics = p.mechanics.add(Math.max(0, Math.floor(p.score / 30)));
	}

	if (layer !== "Pol" && layer !== "His" && layer !== "Geo") {
		if (p.score >= 70) p.lastMessage = "真是不得了了！！";
		else if (p.score >= 50) p.lastMessage = "不错不错，继续保持！";
		else if (p.score >= 0) p.lastMessage = "还需努力。";
		else p.lastMessage = "可以去拜拜地藏菩萨了";
	}

	updateTemp();
}

// ---------- 体育层题目：小学三四年级整数计算 ----------

function subjectMakeOptions(answer) {
	let options = [answer];
	while (options.length < 3) {
		let delta = 1 + Math.floor(Math.random() * 6);
		let candidate = answer + (Math.random() < 0.5 ? -delta : delta);
		if (candidate < 0) candidate = answer + delta;
		if (!options.includes(candidate)) options.push(candidate);
	}
	for (let i = options.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let tmp = options[i];
		options[i] = options[j];
		options[j] = tmp;
	}
	return { options: options.map(String), correct: options.indexOf(answer) };
}

function peMakeQuestion() {
	let type = Math.floor(Math.random() * 4);
	let a, b, answer, text;
	if (type === 0) {
		b = 2 + Math.floor(Math.random() * 11);
		answer = 2 + Math.floor(Math.random() * 11);
		a = b * answer;
		text = a + " ÷ " + b + " = ?";
	} else if (type === 1) {
		a = 2 + Math.floor(Math.random() * 11);
		b = 2 + Math.floor(Math.random() * 11);
		answer = a * b;
		text = a + " × " + b + " = ?";
	} else if (type === 2) {
		a = 2 + Math.floor(Math.random() * 70);
		b = 2 + Math.floor(Math.random() * (143 - a));
		answer = a + b;
		text = a + " + " + b + " = ?";
	} else {
		a = 10 + Math.floor(Math.random() * 135);
		b = 2 + Math.floor(Math.random() * (a - 1));
		answer = a - b;
		text = a + " - " + b + " = ?";
	}
	let opts = subjectMakeOptions(answer);
	return { text: text, options: opts.options, correct: opts.correct, category: "reaction" };
}

// ---------- 物理层题目：简单物理量计算 ----------

function physicsMakeQuestion() {
	let type = Math.floor(Math.random() * 9);
	let a, b, answer, text, category;
	if (type === 0) {
		// v = s / t
		a = 2 + Math.floor(Math.random() * 11);
		b = 2 + Math.floor(Math.random() * 11);
		answer = a;
		text = "s = " + (a * b) + " m，t = " + b + " s，v = ? m/s";
		category = "mechanics";
	} else if (type === 1) {
		// ρ = m / V
		a = 2 + Math.floor(Math.random() * 11);
		b = 2 + Math.floor(Math.random() * 11);
		answer = a;
		text = "m = " + (a * b) + " kg，V = " + b + " m³，ρ = ? kg/m³";
		category = "mechanics";
	} else if (type === 2) {
		// F = ma
		a = 2 + Math.floor(Math.random() * 11);
		b = 2 + Math.floor(Math.random() * 11);
		answer = a * b;
		text = "m = " + a + " kg，a = " + b + " m/s²，F = ? N";
		category = "mechanics";
	} else if (type === 3) {
		// W = Fs
		a = 2 + Math.floor(Math.random() * 11);
		b = 2 + Math.floor(Math.random() * 11);
		answer = a * b;
		text = "F = " + a + " N，s = " + b + " m，W = ? J";
		category = "mechanics";
	} else if (type === 4) {
		// P = W / t
		a = 2 + Math.floor(Math.random() * 11);
		b = 2 + Math.floor(Math.random() * 11);
		answer = a;
		text = "W = " + (a * b) + " J，t = " + b + " s，P = ? W";
		category = "mechanics";
	} else if (type === 5) {
		// I = U / R
		a = 2 + Math.floor(Math.random() * 11);
		b = 2 + Math.floor(Math.random() * 11);
		answer = a;
		text = "U = " + (a * b) + " V，R = " + b + " Ω，I = ? A";
		category = "electricity";
	} else if (type === 6) {
		// P = UI
		a = 2 + Math.floor(Math.random() * 11);
		b = 2 + Math.floor(Math.random() * 11);
		answer = a * b;
		text = "U = " + a + " V，I = " + b + " A，P = ? W";
		category = "electricity";
	} else if (type === 7) {
		// 三次测量取平均
		a = 8 + Math.floor(Math.random() * 5);
		b = a + 2 + Math.floor(Math.random() * 3);
		let c = a + 2 * (b - a);
		answer = (a + b + c) / 3;
		text = "三次测量：" + a + "、" + b + "、" + c + " cm，平均值 = ? cm";
		category = "experiment";
	} else {
		// 常识题
		let facts = [
			{ q: "光在真空中的速度约为 ? ×10⁸ m/s", a: 3, c: "optics" },
			{ q: "标准大气压下水的沸点 = ? °C", a: 100, c: "thermo" },
			{ q: "冰的熔点 = ? °C", a: 0, c: "thermo" },
			{ q: "声音在 15°C 空气中的速度约为 ? m/s", a: 340, c: "optics" },
		];
		let f = facts[Math.floor(Math.random() * facts.length)];
		text = f.q;
		answer = f.a;
		category = f.c;
	}
	let opts = subjectMakeOptions(answer);
	return { text: text, options: opts.options, correct: opts.correct, category: category };
}

// ---------- 体育层 ----------

addLayer("PE", {
	startData() {
		return {
			unlocked: true,
			points: new OmegaNum(0),
			total: new OmegaNum(0),
			best: new OmegaNum(0),
			height: new OmegaNum(167),
			weight: new OmegaNum(53),
			lung: new OmegaNum(2970),
			speed: new OmegaNum(0),
			endurance: new OmegaNum(0),
			flexibility: new OmegaNum(0),
			strength: new OmegaNum(0),
			reaction: new OmegaNum(0),
			trainingRuns: new OmegaNum(0),
			bestScore: new OmegaNum(0),
			active: false,
			completed: false,
			timeLeft: 0,
			questionIndex: 0,
			score: 0,
			question: "",
			options: ["", "", ""],
			correctIndex: 0,
			lastCategory: "",
			lastScore: 0,
			lastMessage: "",
		};
	},

	color: "#FF00FF",
	resource: "体育能力",
	row: 2,
	position: 1,
	symbol: "PE",
	type: "none",
	name: "Physical Education",

	layerShown() {
		return player.E.bestPoints.gte(256) || (player.PE && player.PE.trainingRuns.gte(1));
	},
	tooltip() {
		return "体育：中考体育反应训练";
	},
	tooltipLocked() {
		return "体育<br>最佳中考分数达到 256 分后解锁";
	},

	update(diff) {
		subjectUpdate("PE", diff);
	},

	effect() {
		if (!player.PE) return new OmegaNum(1);
		return new OmegaNum(1).add(player.PE.points.div(1000));
	},

	clickables: {
		100: {
			display() {
				return "开始体育训练";
			},
			unlocked() {
				return !player.PE.active && !player.PE.completed;
			},
			canClick() {
				return !player.PE.active && !player.PE.completed;
			},
			onClick() {
				player.subtabs.PE.mainTabs = "Minigame I";
				updateTabFormats();
				subjectStart("PE");
			},
			style: {
				width: "300px",
				height: "100px",
				"background-color": "#FF00FF",
				color: "black",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "18px",
			},
			tooltip() {
				return "开始 30 秒反应速度训练";
			},
		},
		101: {
			display() {
				return player.PE.options[0] ? "A. " + player.PE.options[0] : "";
			},
			unlocked() {
				return player.PE.active;
			},
			canClick() {
				return player.PE.active;
			},
			onClick() {
				subjectAnswer("PE", 0);
			},
			style: {
				width: "160px",
				height: "100px",
				"background-color": "#FF00FF",
				color: "black",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "18px",
			},
		},
		102: {
			display() {
				return player.PE.options[1] ? "B. " + player.PE.options[1] : "";
			},
			unlocked() {
				return player.PE.active;
			},
			canClick() {
				return player.PE.active;
			},
			onClick() {
				subjectAnswer("PE", 1);
			},
			style: {
				width: "160px",
				height: "100px",
				"background-color": "#FF00FF",
				color: "black",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "18px",
			},
		},
		103: {
			display() {
				return player.PE.options[2] ? "C. " + player.PE.options[2] : "";
			},
			unlocked() {
				return player.PE.active;
			},
			canClick() {
				return player.PE.active;
			},
			onClick() {
				subjectAnswer("PE", 2);
			},
			style: {
				width: "160px",
				height: "100px",
				"background-color": "#FF00FF",
				color: "black",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "18px",
			},
		},
		104: {
			display() {
				return "复盘\n重新开始训练。";
			},
			unlocked() {
				return player.PE.completed;
			},
			canClick() {
				return player.PE.completed;
			},
			onClick() {
				subjectReset("PE");
			},
			style: {
				width: "300px",
				height: "100px",
				"background-color": "#FF00FF",
				color: "black",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "18px",
			},
		},
	},

	infoboxes: {
		peBox: {
			title() {
				return "体育";
			},
			body() {
				return "最佳中考分数达到 256 分后解锁。<br><br>Minigame I 是 30 秒反应速度训练：30 道小学三四年级难度的整数计算题，答对 +3 分，答错 -1 分。训练结束后按总分提升体育能力和反应速度。";
			},
			style() {
				return { borderColor: "#FF00FF" };
			},
			titleStyle() {
				return { backgroundColor: "#FF00FF", color: "#000000" };
			},
		},
	},

	tabFormat: {
		Main: {
			buttonStyle: { "font-size": "16px", padding: "4px 8px", "border-color": "#FF00FF" },
			content: [
				["display-text", function () {
					return subjectHeaderHTML("PE", "体育能力");
				}],
				["display-text", function () {
					let p = player.PE;
					let name = (player.E.name && player.E.name !== "Student") ? player.E.name : "Nameless";
					let age = player.E.year.sub(2001).max(0);
					let table = "<table style='width:min(620px,92%);margin:8px auto;border-collapse:collapse;color:white;font-size:14px'>";
					table += "<tr><td colspan='3' style='padding:8px;border:1px solid #555;background:#DDDDDD;color:black;text-align:center'><b>" + name + "</b><br>年龄：" + subjectNumber(age) + " 岁<br>身体数据（全方位影响体育中考成绩）</td></tr>";
					table += subjectTableRow("身高", subjectNumber(p.height), " cm", "Legendary");
					table += subjectTableRow("体重", subjectNumber(p.weight), " kg", "—");
					table += subjectTableRow("肺活量", subjectNumber(p.lung), " mL", "Mystical");
					table += subjectTableRow("速度评分", subjectNumber(p.speed), "%");
					table += subjectTableRow("耐力评分", subjectNumber(p.endurance), "%");
					table += subjectTableRow("柔韧评分", subjectNumber(p.flexibility), "%");
					table += subjectTableRow("力量评分", subjectNumber(p.strength), "%");
					table += subjectTableRow("反应速度评分", subjectNumber(p.reaction), "%");
					table += "</table>";
					return table;
				}],
				["clickable", 100],
				["clickable", 104],
				["display-text", function () {
					return "已训练 <b>" + subjectNumber(player.PE.trainingRuns) + "</b> 次 · 单次最佳 <b>" + subjectNumber(player.PE.bestScore) + "</b> 分<br>体育能力每 1,000 点使学分获取 +100%。";
				}],
				"blank",
				["infobox", "peBox"],
			],
		},
		"Minigame I": {
			buttonStyle: { "font-size": "16px", padding: "4px 8px", "border-color": "#FF00FF" },
			content: [
				["display-text", function () {
					return subjectHeaderHTML("PE", "体育能力");
				}],
				["display-text", function () {
					return subjectTimerHTML("PE");
				}],
				["display-text", function () {
					return subjectQuestionHTML("PE");
				}],
				["clickable", 100],
				["row", [
					["clickable", 101],
					["clickable", 102],
					["clickable", 103],
				]],
				["clickable", 104],
				["display-text", function () {
					if (player.PE.active) return "答对 +3 分，答错 -1 分。限时 30 秒。";
					if (player.PE.completed) return "训练结束。点击“复盘”再来一次。";
					return "点击“开始体育训练”进入 30 秒反应速度训练。";
				}],
			],
		},
	},
});

// ---------- Physics 层 ----------

addLayer("P", {
	startData() {
		return {
			unlocked: true,
			points: new OmegaNum(0),
			total: new OmegaNum(0),
			best: new OmegaNum(0),
			mechanics: new OmegaNum(0),
			thermo: new OmegaNum(0),
			optics: new OmegaNum(0),
			electricity: new OmegaNum(0),
			experiment: new OmegaNum(0),
			trainingRuns: new OmegaNum(0),
			bestScore: new OmegaNum(0),
			active: false,
			completed: false,
			timeLeft: 0,
			questionIndex: 0,
			score: 0,
			question: "",
			options: ["", "", ""],
			correctIndex: 0,
			lastCategory: "",
			lastScore: 0,
			lastMessage: "",
		};
	},

	color: "#00BFFF",
	resource: "物理能力",
	row: 2,
	position: 0,
	symbol: "P",
	type: "none",
	name: "Physics",
	branches: [["E", "#00BFFF", 30]],

	layerShown() {
		return player.E.bestPoints.gte(256) || (player.P && player.P.trainingRuns.gte(1));
	},
	tooltip() {
		return "物理：中考物理计算与实验";
	},
	tooltipLocked() {
		return "物理<br>最佳中考分数达到 256 分后解锁";
	},

	update(diff) {
		subjectUpdate("P", diff);
	},

	effect() {
		if (!player.P) return new OmegaNum(1);
		let total = player.P.mechanics.add(player.P.thermo).add(player.P.optics).add(player.P.electricity).add(player.P.experiment);
		return new OmegaNum(1).add(total.div(100));
	},

	clickables: {
		100: {
			display() {
				return "开始物理训练";
			},
			unlocked() {
				return !player.P.active && !player.P.completed;
			},
			canClick() {
				return !player.P.active && !player.P.completed;
			},
			onClick() {
				player.subtabs.P.mainTabs = "Minigame I";
				updateTabFormats();
				subjectStart("P");
			},
			style: {
				width: "300px",
				height: "100px",
				"background-color": "#00BFFF",
				color: "black",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "18px",
			},
			tooltip() {
				return "开始 30 秒物理计算训练";
			},
		},
		101: {
			display() {
				return player.P.options[0] ? "A. " + player.P.options[0] : "";
			},
			unlocked() {
				return player.P.active;
			},
			canClick() {
				return player.P.active;
			},
			onClick() {
				subjectAnswer("P", 0);
			},
			style: {
				width: "160px",
				height: "100px",
				"background-color": "#00BFFF",
				color: "black",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "17px",
			},
		},
		102: {
			display() {
				return player.P.options[1] ? "B. " + player.P.options[1] : "";
			},
			unlocked() {
				return player.P.active;
			},
			canClick() {
				return player.P.active;
			},
			onClick() {
				subjectAnswer("P", 1);
			},
			style: {
				width: "160px",
				height: "100px",
				"background-color": "#00BFFF",
				color: "black",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "17px",
			},
		},
		103: {
			display() {
				return player.P.options[2] ? "C. " + player.P.options[2] : "";
			},
			unlocked() {
				return player.P.active;
			},
			canClick() {
				return player.P.active;
			},
			onClick() {
				subjectAnswer("P", 2);
			},
			style: {
				width: "160px",
				height: "100px",
				"background-color": "#00BFFF",
				color: "black",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "17px",
			},
		},
		104: {
			display() {
				return "复盘\n重新开始训练。";
			},
			unlocked() {
				return player.P.completed;
			},
			canClick() {
				return player.P.completed;
			},
			onClick() {
				subjectReset("P");
			},
			style: {
				width: "300px",
				height: "100px",
				"background-color": "#00BFFF",
				color: "black",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "18px",
			},
		},
	},

	infoboxes: {
		physicsBox: {
			title() {
				return "物理";
			},
			body() {
				return "物理（Physics，树节点简称 P）与数学（M）是两个独立科目。<br><br>最佳中考分数达到 256 分后解锁。Minigame I 是 30 秒物理量计算训练：答对 +3 分，答错 -1 分。训练会提升力学、热学、光学、电学和实验评分，并提高物理能力。";
			},
			style() {
				return { borderColor: "#00BFFF" };
			},
			titleStyle() {
				return { backgroundColor: "#00BFFF", color: "#000000" };
			},
		},
	},

	tabFormat: {
		Main: {
			buttonStyle: { "font-size": "16px", padding: "4px 8px", "border-color": "#00BFFF" },
			content: [
				["display-text", function () {
					return subjectHeaderHTML("P", "物理能力");
				}],
				["display-text", function () {
					let p = player.P;
					let table = "<table style='width:min(620px,92%);margin:8px auto;border-collapse:collapse;color:white;font-size:14px'>";
					table += "<tr><td colspan='3' style='padding:8px;border:1px solid #555;background:#DDDDDD;color:black;text-align:center'><b>物理</b><br>物理能力评分（影响全科知识获取）</td></tr>";
					table += subjectTableRow("力学评分", subjectNumber(p.mechanics), "");
					table += subjectTableRow("热学评分", subjectNumber(p.thermo), "");
					table += subjectTableRow("光学评分", subjectNumber(p.optics), "");
					table += subjectTableRow("电学评分", subjectNumber(p.electricity), "");
					table += subjectTableRow("实验评分", subjectNumber(p.experiment), "");
					table += "</table>";
					return table;
				}],
				["clickable", 100],
				["clickable", 104],
				["display-text", function () {
					return "已训练 <b>" + subjectNumber(player.P.trainingRuns) + "</b> 次 · 单次最佳 <b>" + subjectNumber(player.P.bestScore) + "</b> 分<br>当前全科知识倍率：x" + format(tmp.P && tmp.P.effect ? tmp.P.effect : 1) + "（由五项物理评分提供）";
				}],
				"blank",
				["infobox", "physicsBox"],
			],
		},
		"Minigame I": {
			buttonStyle: { "font-size": "16px", padding: "4px 8px", "border-color": "#00BFFF" },
			content: [
				["display-text", function () {
					return subjectHeaderHTML("P", "物理能力");
				}],
				["display-text", function () {
					return subjectTimerHTML("P");
				}],
				["display-text", function () {
					return subjectQuestionHTML("P");
				}],
				["clickable", 100],
				["row", [
					["clickable", 101],
					["clickable", 102],
					["clickable", 103],
				]],
				["clickable", 104],
				["display-text", function () {
					if (player.P.active) return "答对 +3 分，答错 -1 分。限时 30 秒。";
					if (player.P.completed) return "训练结束。点击“复盘”再来一次。";
					return "点击“开始物理训练”进入 30 秒物理量计算训练。";
				}],
			],
		},
	},
});

// ---------- 成就页修复与体育成就 ----------

for (let tab in layers.A.tabFormat) {
	let content = layers.A.tabFormat[tab].content;
	if (Array.isArray(content)) {
		layers.A.tabFormat[tab].content = content.filter(function (item) {
			return item !== "main-display" && item !== "prestige-button";
		});
	}
}
layers.A.tabFormat["物理 / 体育"] = {
	content: [
		["display-text", function () {
			return "<h2 style='color:#00BFFF'>物理 / 体育成就</h2><br>已完成成就：<b style='color:#FF66FF'>" + player.A.Goals + "</b>";
		}],
		"blank",
		["row", [
			["achievement", 145],
			["achievement", 146],
			["achievement", 147],
			["achievement", 148],
		]],
		["row", [
			["achievement", 91],
			["achievement", 92],
			["achievement", 93],
			["achievement", 94],
			["achievement", 95],
		]],
		"blank",
		["display-text", "这些成就会在物理层和体育层的训练中解锁。"],
	],
	buttonStyle: { "border-color": "#00BFFF", "background-color": "#003A5A" },
};

layers.A.achievements[91] = {
	name: "体育健将",
	done() {
		return player.PE && player.PE.trainingRuns && player.PE.trainingRuns.gte(10);
	},
	onComplete() {
		player.A.Goals = player.A.Goals.add(1);
	},
	tooltip: "完成 10 次体育训练。",
};
layers.A.achievements[92] = {
	name: "体育启程",
	done() {
		return player.PE && player.PE.trainingRuns && player.PE.trainingRuns.gte(1);
	},
	onComplete() {
		player.A.Goals = player.A.Goals.add(1);
	},
	tooltip: "完成一次体育训练。",
};
layers.A.achievements[93] = {
	name: "体育五项",
	done() {
		if (!player.PE) return false;
		let total = player.PE.speed.add(player.PE.endurance).add(player.PE.flexibility).add(player.PE.strength).add(player.PE.reaction);
		return total.gte(100);
	},
	onComplete() {
		player.A.Goals = player.A.Goals.add(1);
	},
	tooltip: "体育五项评分总和达到 100。",
};
layers.A.achievements[94] = {
	name: "体育最佳",
	done() {
		return player.PE && player.PE.bestScore && player.PE.bestScore.gte(80);
	},
	onComplete() {
		player.A.Goals = player.A.Goals.add(1);
	},
	tooltip: "体育训练单次达到 80 分。",
};
layers.A.achievements[95] = {
	name: "体育全优",
	done() {
		return player.PE &&
			player.PE.speed.gte(30) && player.PE.endurance.gte(30) &&
			player.PE.flexibility.gte(30) && player.PE.strength.gte(30) &&
			player.PE.reaction.gte(30);
	},
	onComplete() {
		player.A.Goals = player.A.Goals.add(1);
	},
	tooltip: "体育五项评分全部达到 30。",
};

layers.A.achievements[145] = {
	name: "物理启程",
	done() {
		return player.P && player.P.trainingRuns && player.P.trainingRuns.gte(1);
	},
	onComplete() {
		player.A.Goals = player.A.Goals.add(1);
	},
	tooltip: "完成一次物理训练。",
};
layers.A.achievements[146] = {
	name: "物理最佳",
	done() {
		return player.P && player.P.bestScore && player.P.bestScore.gte(80);
	},
	onComplete() {
		player.A.Goals = player.A.Goals.add(1);
	},
	tooltip: "物理训练单次达到 80 分。",
};
layers.A.achievements[147] = {
	name: "物理五项",
	done() {
		if (!player.P) return false;
		let total = player.P.mechanics.add(player.P.thermo).add(player.P.optics).add(player.P.electricity).add(player.P.experiment);
		return total.gte(100);
	},
	onComplete() {
		player.A.Goals = player.A.Goals.add(1);
	},
	tooltip: "物理五项评分总和达到 100。",
};
layers.A.achievements[148] = {
	name: "物理 / 体育双全",
	done() {
		return player.P && player.PE && player.P.bestScore && player.PE.bestScore &&
			player.P.bestScore.gte(80) && player.PE.bestScore.gte(80);
	},
	onComplete() {
		player.A.Goals = player.A.Goals.add(1);
	},
	tooltip: "物理和体育训练都达到 80 分。",
};
