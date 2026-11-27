// ============================================================
// 天津中考树：化学层
// - 树节点 Chem，中文界面“化学”，英文层名 Chemistry
// - 与物理 / 体育并列放在中考层下方
// ============================================================

const CHEMISTRY_QUIZ = [
	{ q: "水的化学式是？", options: ["H2O", "CO2", "O2"], a: 0, cat: "formula" },
	{ q: "二氧化碳的化学式是？", options: ["CO2", "CO", "CH4"], a: 0, cat: "formula" },
	{ q: "氧气在空气中的体积分数约为？", options: ["21%", "78%", "0.03%"], a: 0, cat: "concept" },
	{ q: "下列属于化学变化的是？", options: ["铁生锈", "冰雪融化", "酒精挥发"], a: 0, cat: "concept" },
	{ q: "pH = 3 的溶液呈？", options: ["酸性", "碱性", "中性"], a: 0, cat: "experiment" },
	{ q: "pH = 7 的溶液呈？", options: ["中性", "酸性", "碱性"], a: 0, cat: "experiment" },
	{ q: "实验室制取氧气常用？", options: ["加热高锰酸钾", "加热食盐", "电解水"], a: 0, cat: "experiment" },
	{ q: "电解水时正极产生？", options: ["氧气", "氢气", "二氧化碳"], a: 0, cat: "experiment" },
	{ q: "水的相对分子质量是？", options: ["18", "16", "20"], a: 0, cat: "calculation" },
	{ q: "CO2 中碳元素的化合价是？", options: ["+4", "+2", "-4"], a: 0, cat: "calculation" },
	{ q: "质量守恒定律的原因是？", options: ["原子种类、数目、质量不变", "分子数目不变", "体积不变"], a: 0, cat: "concept" },
	{ q: "下列物质属于混合物的是？", options: ["空气", "蒸馏水", "二氧化碳"], a: 0, cat: "concept" },
	{ q: "燃烧需要同时满足的条件不包括？", options: ["温度低于着火点", "有可燃物", "与氧气接触"], a: 0, cat: "concept" },
	{ q: "铁在氧气中燃烧的产物是？", options: ["四氧化三铁", "氧化铁", "氢氧化铁"], a: 0, cat: "equation" },
	{ q: "实验室稀释浓硫酸时应？", options: ["把浓硫酸沿器壁慢慢倒入水中", "把水倒入浓硫酸中", "快速混合"], a: 0, cat: "experiment" },
	{ q: "下列符号表示两个氢原子的是？", options: ["2H", "H2", "2H2"], a: 0, cat: "formula" },
	{ q: "碳酸钙的化学式是？", options: ["CaCO3", "CaO", "Ca(OH)2"], a: 0, cat: "formula" },
	{ q: "氢氧化钠的俗称是？", options: ["烧碱", "纯碱", "熟石灰"], a: 0, cat: "concept" },
	{ q: "下列金属活动性最强的是？", options: ["镁", "铁", "铜"], a: 0, cat: "concept" },
	{ q: "配制一定溶质质量分数的溶液，不需要？", options: ["酒精灯", "天平", "量筒"], a: 0, cat: "experiment" },
	{ q: "化学方程式 2H2 + O2 → 2H2O 中，反应物是？", options: ["氢气和氧气", "水和氧气", "氢气和二氧化碳"], a: 0, cat: "equation" },
	{ q: "下列属于化合物的是？", options: ["水", "氧气", "空气"], a: 0, cat: "concept" },
	{ q: "铁与稀盐酸反应生成？", options: ["氯化亚铁和氢气", "氯化铁和氧气", "硫酸亚铁"], a: 0, cat: "equation" },
	{ q: "甲醛的化学式是？", options: ["CH2O", "CH4", "C2H5OH"], a: 0, cat: "formula" },
	{ q: "空气中含量最多的气体是？", options: ["氮气", "氧气", "二氧化碳"], a: 0, cat: "concept" },
	{ q: "下列仪器不能直接加热的是？", options: ["烧杯", "试管", "蒸发皿"], a: 0, cat: "experiment" },
];

function chemistryMakeQuestion() {
	let item = CHEMISTRY_QUIZ[Math.floor(Math.random() * CHEMISTRY_QUIZ.length)];
	let options = item.options.slice();
	for (let i = options.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let tmp = options[i];
		options[i] = options[j];
		options[j] = tmp;
	}
	return {
		text: item.q,
		options: options,
		correct: options.indexOf(item.options[item.a]),
		category: item.cat,
	};
}

addLayer("Chem", {
	startData() {
		return {
			unlocked: true,
			points: new OmegaNum(0),
			total: new OmegaNum(0),
			best: new OmegaNum(0),
			formula: new OmegaNum(0),
			equation: new OmegaNum(0),
			experiment: new OmegaNum(0),
			calculation: new OmegaNum(0),
			concept: new OmegaNum(0),
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

	color: "#32CD32",
	resource: "化学能力",
	row: 2,
	position: 1,
	symbol: "Chem",
	type: "none",
	name: "Chemistry",
	branches: [["E", "#32CD32", 30]],
	nodeStyle: { width: "80px", height: "80px", "font-size": "22px" },

	layerShown() {
		return player.E.bestPoints.gte(256) || (player.Chem && player.Chem.trainingRuns.gte(1));
	},
	tooltip() {
		return "化学：中考化学实验与计算";
	},
	tooltipLocked() {
		return "化学<br>最佳中考分数达到 256 分后解锁";
	},

	update(diff) {
		subjectUpdate("Chem", diff);
	},

	effect() {
		if (!player.Chem) return new OmegaNum(1);
		let total = player.Chem.formula.add(player.Chem.equation).add(player.Chem.experiment).add(player.Chem.calculation).add(player.Chem.concept);
		return new OmegaNum(1).add(total.div(100));
	},

	clickables: {
		100: {
			display() {
				return "开始化学训练";
			},
			unlocked() {
				return !player.Chem.active && !player.Chem.completed;
			},
			canClick() {
				return !player.Chem.active && !player.Chem.completed;
			},
			onClick() {
				player.subtabs.Chem.mainTabs = "Minigame I";
				updateTabFormats();
				subjectStart("Chem");
			},
			style: {
				width: "300px",
				height: "100px",
				"background-color": "#32CD32",
				color: "black",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "18px",
			},
			tooltip() {
				return "开始 30 秒化学速答";
			},
		},
		101: {
			display() {
				return player.Chem.options[0] ? "A. " + player.Chem.options[0] : "";
			},
			unlocked() {
				return player.Chem.active;
			},
			canClick() {
				return player.Chem.active;
			},
			onClick() {
				subjectAnswer("Chem", 0);
			},
			style: {
				width: "160px",
				height: "110px",
				"background-color": "#32CD32",
				color: "black",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "14px",
			},
		},
		102: {
			display() {
				return player.Chem.options[1] ? "B. " + player.Chem.options[1] : "";
			},
			unlocked() {
				return player.Chem.active;
			},
			canClick() {
				return player.Chem.active;
			},
			onClick() {
				subjectAnswer("Chem", 1);
			},
			style: {
				width: "160px",
				height: "110px",
				"background-color": "#32CD32",
				color: "black",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "14px",
			},
		},
		103: {
			display() {
				return player.Chem.options[2] ? "C. " + player.Chem.options[2] : "";
			},
			unlocked() {
				return player.Chem.active;
			},
			canClick() {
				return player.Chem.active;
			},
			onClick() {
				subjectAnswer("Chem", 2);
			},
			style: {
				width: "160px",
				height: "110px",
				"background-color": "#32CD32",
				color: "black",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "14px",
			},
		},
		104: {
			display() {
				return "复盘\n重新开始训练。";
			},
			unlocked() {
				return player.Chem.completed;
			},
			canClick() {
				return player.Chem.completed;
			},
			onClick() {
				subjectReset("Chem");
			},
			style: {
				width: "300px",
				height: "100px",
				"background-color": "#32CD32",
				color: "black",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "18px",
			},
		},
	},

	infoboxes: {
		chemistryBox: {
			title() {
				return "化学";
			},
			body() {
				return "最佳中考分数达到 256 分后解锁。<br><br>Minigame I 是 30 秒化学速答：答对 +3 分，答错 -1 分。训练会提升化学式、方程式、实验、计算和概念评分，并提高化学能力。<br><br>化学实验训练会给物理增加少量实验评分。";
			},
			style() {
				return { borderColor: "#32CD32" };
			},
			titleStyle() {
				return { backgroundColor: "#32CD32", color: "#000000" };
			},
		},
	},

	tabFormat: {
		Main: {
			buttonStyle: { "font-size": "16px", padding: "4px 8px", "border-color": "#32CD32" },
			content: [
				["display-text", function () {
					return subjectHeaderHTML("Chem", "化学能力");
				}],
				["display-text", function () {
					let p = player.Chem;
					let table = "<table style='width:min(620px,92%);margin:8px auto;border-collapse:collapse;color:white;font-size:14px'>";
					table += "<tr><td colspan='3' style='padding:8px;border:1px solid #555;background:#DDDDDD;color:black;text-align:center'><b>化学</b><br>化学学科评分（影响全科知识获取）</td></tr>";
					table += subjectTableRow("化学式", subjectNumber(p.formula), "");
					table += subjectTableRow("方程式", subjectNumber(p.equation), "");
					table += subjectTableRow("实验", subjectNumber(p.experiment), "");
					table += subjectTableRow("计算", subjectNumber(p.calculation), "");
					table += subjectTableRow("概念", subjectNumber(p.concept), "");
					table += "</table>";
					return table;
				}],
				["clickable", 100],
				["clickable", 104],
				["display-text", function () {
					return "已训练 <b>" + subjectNumber(player.Chem.trainingRuns) + "</b> 次 · 单次最佳 <b>" + subjectNumber(player.Chem.bestScore) + "</b> 分<br>当前全科知识倍率：x" + format(tmp.Chem && tmp.Chem.effect ? tmp.Chem.effect : 1) + "（由五项化学评分提供）";
				}],
				"blank",
				["infobox", "chemistryBox"],
			],
		},
		"Minigame I": {
			buttonStyle: { "font-size": "16px", padding: "4px 8px", "border-color": "#32CD32" },
			content: [
				["display-text", function () {
					return subjectHeaderHTML("Chem", "化学能力");
				}],
				["display-text", function () {
					return subjectTimerHTML("Chem");
				}],
				["display-text", function () {
					return subjectQuestionHTML("Chem");
				}],
				["clickable", 100],
				["row", [
					["clickable", 101],
					["clickable", 102],
					["clickable", 103],
				]],
				["clickable", 104],
				["display-text", function () {
					if (player.Chem.active) return "答对 +3 分，答错 -1 分。限时 30 秒。";
					if (player.Chem.completed) return "训练结束。点击“复盘”再来一次。";
					return "点击“开始化学训练”进入 30 秒化学速答。";
				}],
			],
		},
	},
});

// ---------- 化学成就 ----------

layers.A.tabFormat["化学"] = {
	content: [
		["display-text", function () {
			return "<h2 style='color:#32CD32'>化学成就</h2><br>已完成成就：<b style='color:#FF66FF'>" + player.A.Goals + "</b>";
		}],
		"blank",
		["row", [
			["achievement", 149],
			["achievement", 150],
			["achievement", 151],
			["achievement", 152],
		]],
		"blank",
		["display-text", "这些成就会在化学层的训练中解锁。"],
	],
	buttonStyle: { "border-color": "#32CD32", "background-color": "#123A12" },
};

layers.A.achievements[149] = {
	name: "化学启程",
	done() { return player.Chem && player.Chem.trainingRuns.gte(1); },
	onComplete() { player.A.Goals = player.A.Goals.add(1); },
	tooltip: "完成一次化学训练。",
};
layers.A.achievements[150] = {
	name: "化学最佳",
	done() { return player.Chem && player.Chem.bestScore.gte(80); },
	onComplete() { player.A.Goals = player.A.Goals.add(1); },
	tooltip: "化学训练单次达到 80 分。",
};
layers.A.achievements[151] = {
	name: "化学五项",
	done() {
		if (!player.Chem) return false;
		let total = player.Chem.formula.add(player.Chem.equation).add(player.Chem.experiment).add(player.Chem.calculation).add(player.Chem.concept);
		return total.gte(100);
	},
	onComplete() { player.A.Goals = player.A.Goals.add(1); },
	tooltip: "化学五项评分总和达到 100。",
};
layers.A.achievements[152] = {
	name: "理化双全",
	done() {
		return player.P && player.Chem && player.P.bestScore && player.Chem.bestScore &&
			player.P.bestScore.gte(80) && player.Chem.bestScore.gte(80);
	},
	onComplete() { player.A.Goals = player.A.Goals.add(1); },
	tooltip: "物理和化学训练都达到 80 分。",
};
