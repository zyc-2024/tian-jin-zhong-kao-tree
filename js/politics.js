// ============================================================
// 天津中考树：Politics（政治 / 道德与法治）
// 仿照 Physics / 体育层的作者风格制作：
//   Main 数据表 + 背诵 buyables + Minigame I 时政速答
// ============================================================

const POLITICS_QUESTIONS = [
	{ q: "我国的根本政治制度是？", options: ["人民代表大会制度", "君主立宪制", "联邦制"], a: 0, cat: "national" },
	{ q: "我国宪法规定，一切权力属于？", options: ["人民", "政府", "法院"], a: 0, cat: "law" },
	{ q: "依法治国首先是？", options: ["依宪治国", "以德治国", "以罚治国"], a: 0, cat: "law" },
	{ q: "宪法是国家的？", options: ["根本法", "普通法", "地方法"], a: 0, cat: "law" },
	{ q: "未成年人是指未满多少周岁？", options: ["18周岁", "16周岁", "20周岁"], a: 0, cat: "law" },
	{ q: "社会主义核心价值观国家层面是？", options: ["富强民主文明和谐", "爱国敬业诚信友善", "自由平等公正法治"], a: 0, cat: "morality" },
	{ q: "社会主义核心价值观个人层面是？", options: ["爱国敬业诚信友善", "富强民主文明和谐", "自由平等公正法治"], a: 0, cat: "morality" },
	{ q: "中国梦是？", options: ["中华民族伟大复兴", "称霸世界", "全民躺平"], a: 0, cat: "national" },
	{ q: "我国社会主要矛盾是？", options: ["美好生活需要和不平衡不充分的发展", "人口太多", "资源太少"], a: 0, cat: "national" },
	{ q: "新发展理念是？", options: ["创新协调绿色开放共享", "复制粘贴", "内卷躺平"], a: 0, cat: "national" },
	{ q: "绿水青山就是？", options: ["金山银山", "荒山野岭", "水泥森林"], a: 0, cat: "national" },
	{ q: "碳达峰碳中和目标是？", options: ["2030碳达峰、2060碳中和", "2025碳达峰", "永远不达"], a: 0, cat: "national" },
	{ q: "我国基本经济制度是？", options: ["公有制为主体、多种所有制共同发展", "纯计划经济", "纯私有制"], a: 0, cat: "national" },
	{ q: "我国民族关系是？", options: ["平等团结互助和谐", "高低贵贱", "互不来往"], a: 0, cat: "national" },
	{ q: "当今时代主题是？", options: ["和平与发展", "战争与革命", "内卷与躺平"], a: 0, cat: "current" },
	{ q: "中国倡导构建？", options: ["人类命运共同体", "单边主义", "贸易壁垒"], a: 0, cat: "current" },
	{ q: "创新是引领发展的？", options: ["第一动力", "最后动力", "不重要"], a: 0, cat: "national" },
	{ q: "教育是民族振兴、社会进步的？", options: ["基石", "负担", "装饰"], a: 0, cat: "national" },
	{ q: "诚信是？", options: ["传统美德", "无用品质", "考试技巧"], a: 0, cat: "morality" },
	{ q: "尊重他人要？", options: ["平等待人", "嘲笑他人", "唯我独尊"], a: 0, cat: "morality" },
	{ q: "网络生活要？", options: ["理性参与、遵守法律", "随意造谣", "人肉搜索"], a: 0, cat: "morality" },
	{ q: "家庭美德包括？", options: ["尊老爱幼", "重男轻女", "家庭暴力"], a: 0, cat: "morality" },
	{ q: "生态文明要求？", options: ["节约资源、保护环境", "先污染后治理", "浪费资源"], a: 0, cat: "national" },
	{ q: "法律面前？", options: ["人人平等", "权贵例外", "看心情"], a: 0, cat: "law" },
	{ q: "公民行使权利不得损害？", options: ["国家、社会、集体和他人的合法权益", "公共设施", "自己的利益"], a: 0, cat: "law" },
	{ q: "主观题答题第一步是？", options: ["审题、读材料", "直接编", "空着"], a: 0, cat: "answer" },
	{ q: "选择题看到“一定”“绝对”应？", options: ["警惕绝对化", "直接选", "闭眼选"], a: 0, cat: "answer" },
	{ q: "主观题规范作答要？", options: ["分点作答、结合材料", "写成一段", "只写结论"], a: 0, cat: "answer" },
	{ q: "时政题复习应？", options: ["关注国家大事和社会热点", "只看娱乐新闻", "不复习"], a: 0, cat: "current" },
	{ q: "天津中考道德与法治答题要？", options: ["术语规范、条理清晰", "字越多越好", "画表情包"], a: 0, cat: "answer" },
	{ q: "我国国家机构组织活动原则是？", options: ["民主集中制", "一言堂", "抽签"], a: 0, cat: "national" },
	{ q: "公民基本义务包括？", options: ["遵守宪法法律", "只享受权利", "不纳税"], a: 0, cat: "law" },
	{ q: "我国政党制度是？", options: ["中国共产党领导的多党合作和政治协商制度", "两党制", "无党派"], a: 0, cat: "national" },
	{ q: "“一国两制”是？", options: ["一个中国、两种制度", "两个中国", "一中一台"], a: 0, cat: "national" },
	{ q: "实现中华民族伟大复兴最根本的是？", options: ["坚持中国共产党领导", "靠运气", "等天降"], a: 0, cat: "national" },
	{ q: "天津的母亲河是？", options: ["海河", "黄河", "长江"], a: 0, cat: "current" },
	{ q: "考试时实在不会，应该？", options: ["结合材料分点作答", "空着", "抄同桌"], a: 0, cat: "answer" },
];

function politicsMakeQuestion() {
	let item = POLITICS_QUESTIONS[Math.floor(Math.random() * POLITICS_QUESTIONS.length)];
	let options = item.options.slice();
	let correctText = options[item.a];
	for (let i = options.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let tmp = options[i];
		options[i] = options[j];
		options[j] = tmp;
	}
	return {
		text: item.q,
		options: options,
		correct: options.indexOf(correctText),
		category: item.cat,
	};
}

addLayer("Pol", {
	startData() {
		return {
			unlocked: true,
			points: new OmegaNum(0),
			total: new OmegaNum(0),
			best: new OmegaNum(0),
			morality: new OmegaNum(0),
			law: new OmegaNum(0),
			national: new OmegaNum(0),
			current: new OmegaNum(0),
			answer: new OmegaNum(0),
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

	color: "#E74C3C",
	resource: "政治能力",
	row: 0,
	position: 2,
	symbol: "Pol",
	type: "none",
	name: "Pol",

	layerShown() {
		return player.E.bestPoints.gte(84) || (player.Pol && player.Pol.trainingRuns.gte(1));
	},
	tooltip() {
		return "Pol：道德与法治";
	},
	tooltipLocked() {
		return "Pol 层<br>中考最佳分数达到 84 分后解锁";
	},

	update(diff) {
		subjectUpdate("Pol", diff);
	},

	effect() {
		if (!player.Pol) return new OmegaNum(1);
		let total = player.Pol.morality.add(player.Pol.law).add(player.Pol.national).add(player.Pol.current).add(player.Pol.answer);
		return new OmegaNum(1).add(total.div(100));
	},

	buyables: {
		11: {
			title: "道德与法治背诵",
			cost(x) {
				return new OmegaNum(30).mul(new OmegaNum(2).pow(x));
			},
			canAfford() {
				return player.Pol.points.gte(this.cost());
			},
			buy() {
				player.Pol.points = player.Pol.points.sub(this.cost());
				player.Pol.morality = player.Pol.morality.add(5);
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
				updateTemp();
			},
			display() {
				return "背一条道德与法治知识点，道德修养 +5。<br>已背诵：" + getBuyableAmount(this.layer, this.id) + " 次<br>价格：" + subjectNumber(this.cost()) + " 政治能力";
			},
			unlocked() {
				return true;
			},
			style: {
				"background-color": "#7A1F1F",
				color: "white",
				"border-color": "#E74C3C",
				"border-radius": "8px",
				height: "150px",
				width: "220px",
			},
		},
		12: {
			title: "国情国策背诵",
			cost(x) {
				return new OmegaNum(50).mul(new OmegaNum(2).pow(x));
			},
			canAfford() {
				return player.Pol.points.gte(this.cost());
			},
			buy() {
				player.Pol.points = player.Pol.points.sub(this.cost());
				player.Pol.national = player.Pol.national.add(5);
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
				updateTemp();
			},
			display() {
				return "背一条国情国策，国情认知 +5。<br>已背诵：" + getBuyableAmount(this.layer, this.id) + " 次<br>价格：" + subjectNumber(this.cost()) + " 政治能力";
			},
			unlocked() {
				return true;
			},
			style: {
				"background-color": "#7A1F1F",
				color: "white",
				"border-color": "#E74C3C",
				"border-radius": "8px",
				height: "150px",
				width: "220px",
			},
		},
		13: {
			title: "时政热点背诵",
			cost(x) {
				return new OmegaNum(80).mul(new OmegaNum(2).pow(x));
			},
			canAfford() {
				return player.Pol.points.gte(this.cost());
			},
			buy() {
				player.Pol.points = player.Pol.points.sub(this.cost());
				player.Pol.current = player.Pol.current.add(5);
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
				updateTemp();
			},
			display() {
				return "背一条时政热点，时政敏感度 +5。<br>已背诵：" + getBuyableAmount(this.layer, this.id) + " 次<br>价格：" + subjectNumber(this.cost()) + " 政治能力";
			},
			unlocked() {
				return true;
			},
			style: {
				"background-color": "#7A1F1F",
				color: "white",
				"border-color": "#E74C3C",
				"border-radius": "8px",
				height: "150px",
				width: "220px",
			},
		},
		14: {
			title: "法律常识背诵",
			cost(x) {
				return new OmegaNum(120).mul(new OmegaNum(2).pow(x));
			},
			canAfford() {
				return player.Pol.points.gte(this.cost());
			},
			buy() {
				player.Pol.points = player.Pol.points.sub(this.cost());
				player.Pol.law = player.Pol.law.add(5);
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
				updateTemp();
			},
			display() {
				return "背一条法律常识，法治意识 +5。<br>已背诵：" + getBuyableAmount(this.layer, this.id) + " 次<br>价格：" + subjectNumber(this.cost()) + " 政治能力";
			},
			unlocked() {
				return true;
			},
			style: {
				"background-color": "#7A1F1F",
				color: "white",
				"border-color": "#E74C3C",
				"border-radius": "8px",
				height: "150px",
				width: "220px",
			},
		},
		15: {
			title: "答题模板背诵",
			cost(x) {
				return new OmegaNum(200).mul(new OmegaNum(2).pow(x));
			},
			canAfford() {
				return player.Pol.points.gte(this.cost());
			},
			buy() {
				player.Pol.points = player.Pol.points.sub(this.cost());
				player.Pol.answer = player.Pol.answer.add(5);
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
				updateTemp();
			},
			display() {
				return "背一条答题模板，答题规范 +5。<br>已背诵：" + getBuyableAmount(this.layer, this.id) + " 次<br>价格：" + subjectNumber(this.cost()) + " 政治能力";
			},
			unlocked() {
				return true;
			},
			style: {
				"background-color": "#7A1F1F",
				color: "white",
				"border-color": "#E74C3C",
				"border-radius": "8px",
				height: "150px",
				width: "220px",
			},
		},
	},

	clickables: {
		100: {
			display() {
				return "开始政治训练";
			},
			unlocked() {
				return !player.Pol.active && !player.Pol.completed;
			},
			canClick() {
				return !player.Pol.active && !player.Pol.completed;
			},
			onClick() {
				player.subtabs.Pol.mainTabs = "Minigame I";
				updateTabFormats();
				subjectStart("Pol");
			},
			style: {
				width: "300px",
				height: "100px",
				"background-color": "#E74C3C",
				color: "white",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "18px",
			},
			tooltip() {
				return "开始 30 秒时政速答";
			},
		},
		101: {
			display() {
				return player.Pol.options[0] ? "A. " + player.Pol.options[0] : "";
			},
			unlocked() {
				return player.Pol.active;
			},
			canClick() {
				return player.Pol.active;
			},
			onClick() {
				subjectAnswer("Pol", 0);
			},
			style: {
				width: "160px",
				height: "110px",
				"background-color": "#E74C3C",
				color: "white",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "14px",
			},
		},
		102: {
			display() {
				return player.Pol.options[1] ? "B. " + player.Pol.options[1] : "";
			},
			unlocked() {
				return player.Pol.active;
			},
			canClick() {
				return player.Pol.active;
			},
			onClick() {
				subjectAnswer("Pol", 1);
			},
			style: {
				width: "160px",
				height: "110px",
				"background-color": "#E74C3C",
				color: "white",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "14px",
			},
		},
		103: {
			display() {
				return player.Pol.options[2] ? "C. " + player.Pol.options[2] : "";
			},
			unlocked() {
				return player.Pol.active;
			},
			canClick() {
				return player.Pol.active;
			},
			onClick() {
				subjectAnswer("Pol", 2);
			},
			style: {
				width: "160px",
				height: "110px",
				"background-color": "#E74C3C",
				color: "white",
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
				return player.Pol.completed;
			},
			canClick() {
				return player.Pol.completed;
			},
			onClick() {
				subjectReset("Pol");
			},
			style: {
				width: "300px",
				height: "100px",
				"background-color": "#E74C3C",
				color: "white",
				border: "1px solid white",
				"border-radius": "0px",
				"font-size": "18px",
			},
		},
	},

	infoboxes: {
		politicsBox: {
			title() {
				return "Pol";
			},
			body() {
				return "中考最佳分数达到 84 分后解锁。<br><br>Main 显示政治能力与五项评分；背诵页可以消耗政治能力提升评分；Minigame I 是 30 秒时政速答，答对 +3、答错 -1。<br><br>温馨提示：选择题看到“一定”“绝对”先警惕，主观题记得分点作答。";
			},
			style() {
				return { borderColor: "#E74C3C" };
			},
			titleStyle() {
				return { backgroundColor: "#E74C3C", color: "#FFFFFF" };
			},
		},
	},

	tabFormat: {
		Main: {
			buttonStyle: { "font-size": "16px", padding: "4px 8px", "border-color": "#E74C3C" },
			content: [
				["display-text", function () {
					return subjectHeaderHTML("Pol", "政治能力");
				}],
				["display-text", function () {
					let p = player.Pol;
					let table = "<table style='width:min(620px,92%);margin:8px auto;border-collapse:collapse;color:white;font-size:14px'>";
					table += "<tr><td colspan='3' style='padding:8px;border:1px solid #555;background:#DDDDDD;color:black;text-align:center'><b>Pol</b><br>道德与法治评分（影响全科知识获取）</td></tr>";
					table += subjectTableRow("道德修养", subjectNumber(p.morality), "");
					table += subjectTableRow("法治意识", subjectNumber(p.law), "");
					table += subjectTableRow("国情认知", subjectNumber(p.national), "");
					table += subjectTableRow("时政敏感度", subjectNumber(p.current), "");
					table += subjectTableRow("答题规范", subjectNumber(p.answer), "");
					table += "</table>";
					return table;
				}],
				["clickable", 100],
				["clickable", 104],
				["display-text", function () {
					return "已训练 <b>" + subjectNumber(player.Pol.trainingRuns) + "</b> 次 · 历史最佳 <b>" + subjectNumber(player.Pol.bestScore) + "</b> 分<br>当前全科知识倍率：x" + format(tmp.Pol && tmp.Pol.effect ? tmp.Pol.effect : 1) + "（由五项政治评分提供）";
				}],
				"blank",
				["infobox", "politicsBox"],
			],
		},
		"背诵": {
			buttonStyle: { "font-size": "16px", padding: "4px 8px", "border-color": "#E74C3C" },
			content: [
				["display-text", function () {
					return "<h2 style='color:#E74C3C'>背诵专区</h2><br>消耗政治能力背诵知识点，永久提升对应评分。";
				}],
				"buyables",
				"blank",
				["display-text", function () {
					return "背诵可以无限进行，价格每级翻倍。当前政治能力：" + subjectNumber(player.Pol.points);
				}],
			],
		},
		"Minigame I": {
			buttonStyle: { "font-size": "16px", padding: "4px 8px", "border-color": "#E74C3C" },
			content: [
				["display-text", function () {
					return subjectHeaderHTML("Pol", "政治能力");
				}],
				["display-text", function () {
					return subjectTimerHTML("Pol");
				}],
				["display-text", function () {
					return subjectQuestionHTML("Pol");
				}],
				["clickable", 100],
				["row", [
					["clickable", 101],
					["clickable", 102],
					["clickable", 103],
				]],
				["clickable", 104],
				["display-text", function () {
					if (player.Pol.active) return "答对 +3 分，答错 -1 分。限时 30 秒。";
					if (player.Pol.completed) return "训练结束。点击“复盘”再来一次。";
					return "点击“开始政治训练”进入 30 秒时政速答。";
				}],
			],
		},
	},
});

// E 层的树枝：政治层是 row 0 的第四门主科。
if (layers.E && layers.E.branches) {
	let hasPoliticsBranch = false;
	for (let i = 0; i < layers.E.branches.length; i++) {
		if (layers.E.branches[i][0] === "Pol") hasPoliticsBranch = true;
	}
	if (!hasPoliticsBranch) layers.E.branches.push(["Pol", "#E74C3C", 15]);
}

// ---------- 政治成就与成就页 ----------

layers.A.tabFormat.Pol = {
	content: [
		["display-text", function () {
			return "<h2 style='color:#E74C3C'>Pol 成就</h2><br>已完成成就：<b style='color:#FF66FF'>" + player.A.Goals + "</b>";
		}],
		"blank",
		["row", [
			["achievement", 96],
			["achievement", 97],
			["achievement", 98],
			["achievement", 99],
			["achievement", 100],
		]],
		"blank",
		["display-text", "这些成就会在政治层训练与背诵中解锁。"],
	],
	buttonStyle: { "border-color": "#E74C3C", "background-color": "#5A1515" },
};

layers.A.achievements[96] = {
	name: "Pol 启程",
	done() {
		return player.Pol && player.Pol.trainingRuns && player.Pol.trainingRuns.gte(1);
	},
	onComplete() {
		player.A.Goals = player.A.Goals.add(1);
	},
	tooltip: "完成一次政治训练。",
};
layers.A.achievements[97] = {
	name: "Pol 时政达人",
	done() {
		return player.Pol && player.Pol.current && player.Pol.current.gte(10);
	},
	onComplete() {
		player.A.Goals = player.A.Goals.add(1);
	},
	tooltip: "时政敏感度达到 10。",
};
layers.A.achievements[98] = {
	name: "Pol 背诵标兵",
	done() {
		if (!player.Pol || !player.Pol.buyables) return false;
		let total = 0;
		for (let id in player.Pol.buyables) total += Number(player.Pol.buyables[id]) || 0;
		return total >= 10;
	},
	onComplete() {
		player.A.Goals = player.A.Goals.add(1);
	},
	tooltip: "在背诵专区累计背诵 10 次。",
};
layers.A.achievements[99] = {
	name: "Pol 最佳",
	done() {
		return player.Pol && player.Pol.bestScore && player.Pol.bestScore.gte(80);
	},
	onComplete() {
		player.A.Goals = player.A.Goals.add(1);
	},
	tooltip: "政治训练单次达到 80 分。",
};
layers.A.achievements[100] = {
	name: "Pol 德法兼修",
	done() {
		return player.Pol &&
			player.Pol.morality.gte(10) && player.Pol.law.gte(10) &&
			player.Pol.national.gte(10) && player.Pol.current.gte(10) &&
			player.Pol.answer.gte(10);
	},
	onComplete() {
		player.A.Goals = player.A.Goals.add(1);
	},
	tooltip: "政治五项评分全部达到 10。",
};
