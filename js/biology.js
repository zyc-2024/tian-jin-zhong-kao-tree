// ============================================================
// 天津中考树：生物层
// - 树节点 Bio，中文界面“生物”，英文层名 Biology
// - 与物理 / 化学 / 体育并列放在中考层下方
// ============================================================

const BIOLOGY_QUIZ = [
	{ q: "细胞中控制物质进出的是？", options: ["细胞膜", "细胞壁", "细胞核"], a: 0, cat: "cell" },
	{ q: "植物细胞特有的结构是？", options: ["细胞壁", "细胞膜", "细胞质"], a: 0, cat: "cell" },
	{ q: "光合作用的场所是？", options: ["叶绿体", "线粒体", "液泡"], a: 0, cat: "cell" },
	{ q: "呼吸作用的主要场所是？", options: ["线粒体", "叶绿体", "细胞核"], a: 0, cat: "cell" },
	{ q: "细胞的控制中心是？", options: ["细胞核", "细胞膜", "细胞质"], a: 0, cat: "cell" },
	{ q: "DNA 主要存在于？", options: ["细胞核", "细胞膜", "细胞壁"], a: 0, cat: "genetics" },
	{ q: "基因的载体是？", options: ["染色体", "细胞膜", "核糖体"], a: 0, cat: "genetics" },
	{ q: "下列属于可遗传变异的是？", options: ["基因突变", "晒黑的皮肤", "锻炼出的肌肉"], a: 0, cat: "genetics" },
	{ q: "人的体细胞中染色体数目是？", options: ["23 对", "23 条", "46 对"], a: 0, cat: "genetics" },
	{ q: "食物链的起点通常是？", options: ["生产者", "消费者", "分解者"], a: 0, cat: "ecology" },
	{ q: "生态系统中的分解者主要是？", options: ["细菌和真菌", "绿色植物", "草食动物"], a: 0, cat: "ecology" },
	{ q: "能量在食物链中传递的特点是？", options: ["逐级递减", "逐级递增", "保持不变"], a: 0, cat: "ecology" },
	{ q: "下列属于生态系统的是？", options: ["一片森林", "一只小鸟", "一群鱼"], a: 0, cat: "ecology" },
	{ q: "使用显微镜时，放大倍数等于？", options: ["目镜与物镜放大倍数之积", "目镜与物镜放大倍数之和", "物镜放大倍数"], a: 0, cat: "experiment" },
	{ q: "探究实验中，除了变量外其他条件应？", options: ["相同", "不同", "随意"], a: 0, cat: "experiment" },
	{ q: "种子萌发需要的外界条件不包括？", options: ["光照", "适宜温度", "一定水分"], a: 0, cat: "experiment" },
	{ q: "光合作用释放的气体是？", options: ["氧气", "二氧化碳", "氮气"], a: 0, cat: "experiment" },
	{ q: "人体消化和吸收的主要场所是？", options: ["小肠", "胃", "大肠"], a: 0, cat: "human" },
	{ q: "人体呼吸系统的主要器官是？", options: ["肺", "气管", "鼻腔"], a: 0, cat: "human" },
	{ q: "人体血液循环的动力器官是？", options: ["心脏", "肺", "肝脏"], a: 0, cat: "human" },
	{ q: "人体神经系统的基本单位是？", options: ["神经元", "红细胞", "肌细胞"], a: 0, cat: "human" },
	{ q: "人体免疫的第一道防线是？", options: ["皮肤和黏膜", "淋巴细胞", "抗体"], a: 0, cat: "human" },
	{ q: "绿色植物进行光合作用的主要器官是？", options: ["叶", "根", "花"], a: 0, cat: "cell" },
	{ q: "生态系统中，消费者直接或间接以什么为食？", options: ["生产者", "分解者", "无机盐"], a: 0, cat: "ecology" },
	{ q: "青春期身体变化的主要原因是？", options: ["性激素分泌增多", "光照增强", "运动减少"], a: 0, cat: "human" },
	{ q: "下列属于生物的是？", options: ["蘑菇", "钟乳石", "机器人"], a: 0, cat: "cell" },
];

function biologyMakeQuestion() {
	let item = BIOLOGY_QUIZ[Math.floor(Math.random() * BIOLOGY_QUIZ.length)];
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

addLayer("Bio", {
	startData() {
		return {
			unlocked: true,
			points: new OmegaNum(0),
			total: new OmegaNum(0),
			best: new OmegaNum(0),
			cell: new OmegaNum(0),
			genetics: new OmegaNum(0),
			ecology: new OmegaNum(0),
			experiment: new OmegaNum(0),
			human: new OmegaNum(0),
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

	color: "#20B2AA",
	resource: "生物能力",
	row: 2,
	position: 2,
	symbol: "Bio",
	type: "none",
	name: "Biology",
	branches: [["E", "#20B2AA", 30]],
	nodeStyle: { width: "80px", height: "80px", "font-size": "30px" },

	layerShown() {
		return player.E.bestPoints.gte(256) || (player.Bio && player.Bio.trainingRuns.gte(1));
	},
	tooltip() {
		return "生物：中考生物实验与生态";
	},
	tooltipLocked() {
		return "生物<br>最佳中考分数达到 256 分后解锁";
	},

	update(diff) {
		subjectUpdate("Bio", diff);
	},

	effect() {
		if (!player.Bio) return new OmegaNum(1);
		let total = player.Bio.cell.add(player.Bio.genetics).add(player.Bio.ecology).add(player.Bio.experiment).add(player.Bio.human);
		return new OmegaNum(1).add(total.div(100));
	},

	clickables: {
		100: {
			display() {
				return "开始生物训练";
			},
			unlocked() {
				return !player.Bio.active && !player.Bio.completed;
			},
			canClick() {
				return !player.Bio.active && !player.Bio.completed;
			},
			onClick() {
				player.subtabs.Bio.mainTabs = "Minigame I";
				updateTabFormats();
				subjectStart("Bio");
			},
			style: {
				width: "300px",
				height: "100px",
				"background-color": "#20B2AA",
				color: "black",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "18px",
			},
			tooltip() {
				return "开始 30 秒生物速答";
			},
		},
		101: {
			display() {
				return player.Bio.options[0] ? "A. " + player.Bio.options[0] : "";
			},
			unlocked() {
				return player.Bio.active;
			},
			canClick() {
				return player.Bio.active;
			},
			onClick() {
				subjectAnswer("Bio", 0);
			},
			style: {
				width: "160px",
				height: "110px",
				"background-color": "#20B2AA",
				color: "black",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "14px",
			},
		},
		102: {
			display() {
				return player.Bio.options[1] ? "B. " + player.Bio.options[1] : "";
			},
			unlocked() {
				return player.Bio.active;
			},
			canClick() {
				return player.Bio.active;
			},
			onClick() {
				subjectAnswer("Bio", 1);
			},
			style: {
				width: "160px",
				height: "110px",
				"background-color": "#20B2AA",
				color: "black",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "14px",
			},
		},
		103: {
			display() {
				return player.Bio.options[2] ? "C. " + player.Bio.options[2] : "";
			},
			unlocked() {
				return player.Bio.active;
			},
			canClick() {
				return player.Bio.active;
			},
			onClick() {
				subjectAnswer("Bio", 2);
			},
			style: {
				width: "160px",
				height: "110px",
				"background-color": "#20B2AA",
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
				return player.Bio.completed;
			},
			canClick() {
				return player.Bio.completed;
			},
			onClick() {
				subjectReset("Bio");
			},
			style: {
				width: "300px",
				height: "100px",
				"background-color": "#20B2AA",
				color: "black",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "18px",
			},
		},
	},

	infoboxes: {
		biologyBox: {
			title() {
				return "生物";
			},
			body() {
				return "最佳中考分数达到 256 分后解锁。<br><br>Minigame I 是 30 秒生物速答：答对 +3 分，答错 -1 分。训练会提升细胞、遗传、生态、实验和人体评分，并提高生物能力。<br><br>生物实验训练会给化学增加少量实验评分，生态观察会带动地理综合评分。";
			},
			style() {
				return { borderColor: "#20B2AA" };
			},
			titleStyle() {
				return { backgroundColor: "#20B2AA", color: "#000000" };
			},
		},
	},

	tabFormat: {
		Main: {
			buttonStyle: { "font-size": "16px", padding: "4px 8px", "border-color": "#20B2AA" },
			content: [
				["display-text", function () {
					return subjectHeaderHTML("Bio", "生物能力");
				}],
				["display-text", function () {
					let p = player.Bio;
					let table = "<table style='width:min(620px,92%);margin:8px auto;border-collapse:collapse;color:white;font-size:14px'>";
					table += "<tr><td colspan='3' style='padding:8px;border:1px solid #555;background:#DDDDDD;color:black;text-align:center'><b>生物</b><br>生物学科评分（影响全科知识获取）</td></tr>";
					table += subjectTableRow("细胞", subjectNumber(p.cell), "");
					table += subjectTableRow("遗传", subjectNumber(p.genetics), "");
					table += subjectTableRow("生态", subjectNumber(p.ecology), "");
					table += subjectTableRow("实验", subjectNumber(p.experiment), "");
					table += subjectTableRow("人体", subjectNumber(p.human), "");
					table += "</table>";
					return table;
				}],
				["clickable", 100],
				["clickable", 104],
				["display-text", function () {
					return "已训练 <b>" + subjectNumber(player.Bio.trainingRuns) + "</b> 次 · 单次最佳 <b>" + subjectNumber(player.Bio.bestScore) + "</b> 分<br>当前全科知识倍率：x" + format(tmp.Bio && tmp.Bio.effect ? tmp.Bio.effect : 1) + "（由五项生物评分提供）" + subjectLinkText("Bio");
				}],
				"blank",
				["infobox", "biologyBox"],
			],
		},
		"Minigame I": {
			buttonStyle: { "font-size": "16px", padding: "4px 8px", "border-color": "#20B2AA" },
			content: [
				["display-text", function () {
					return subjectHeaderHTML("Bio", "生物能力");
				}],
				["display-text", function () {
					return subjectTimerHTML("Bio");
				}],
				["display-text", function () {
					return subjectQuestionHTML("Bio");
				}],
				["clickable", 100],
				["row", [
					["clickable", 101],
					["clickable", 102],
					["clickable", 103],
				]],
				["clickable", 104],
				["display-text", function () {
					if (player.Bio.active) return "答对 +3 分，答错 -1 分。限时 30 秒。";
					if (player.Bio.completed) return "训练结束。点击“复盘”再来一次。";
					return "点击“开始生物训练”进入 30 秒生物速答。";
				}],
			],
		},
	},
});

// ---------- 生物成就 ----------

layers.A.tabFormat["生物"] = {
	content: [
		["display-text", function () {
			return "<h2 style='color:#20B2AA'>生物成就</h2><br>已完成成就：<b style='color:#FF66FF'>" + player.A.Goals + "</b>";
		}],
		"blank",
		["row", [
			["achievement", 154],
			["achievement", 155],
			["achievement", 156],
			["achievement", 157],
		]],
		"blank",
		["display-text", "这些成就会在生物层的训练中解锁。"],
	],
	buttonStyle: { "border-color": "#20B2AA", "background-color": "#123A38" },
};

layers.A.achievements[154] = {
	name: "生物启程",
	done() { return player.Bio && player.Bio.trainingRuns.gte(1); },
	onComplete() { player.A.Goals = player.A.Goals.add(1); },
	tooltip: "完成一次生物训练。",
};
layers.A.achievements[155] = {
	name: "生物最佳",
	done() { return player.Bio && player.Bio.bestScore.gte(80); },
	onComplete() { player.A.Goals = player.A.Goals.add(1); },
	tooltip: "生物训练单次达到 80 分。",
};
layers.A.achievements[156] = {
	name: "生物五项",
	done() {
		if (!player.Bio) return false;
		let total = player.Bio.cell.add(player.Bio.genetics).add(player.Bio.ecology).add(player.Bio.experiment).add(player.Bio.human);
		return total.gte(100);
	},
	onComplete() { player.A.Goals = player.A.Goals.add(1); },
	tooltip: "生物五项评分总和达到 100。",
};
layers.A.achievements[157] = {
	name: "生化双全",
	done() {
		return player.Bio && player.Chem && player.Bio.bestScore && player.Chem.bestScore &&
			player.Bio.bestScore.gte(80) && player.Chem.bestScore.gte(80);
	},
	onComplete() { player.A.Goals = player.A.Goals.add(1); },
	tooltip: "生物和化学训练都达到 80 分。",
};
