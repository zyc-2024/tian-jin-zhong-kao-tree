// ============================================================
// 天津中考树：历史 / 地理扩展
// - 两个完整学科层（内部 ID：His / Geo；树节点：H / G）
// - 考试板块新增天津中考风格的历史 / 地理试卷
// - 与政治 / 语文、物理 / 数学以及彼此交叉联动
// ============================================================

// ---------- 学科训练题库 ----------

const HISTORY_QUIZ = [
	{ q: "中国近代史的开端是？", options: ["鸦片战争", "甲午战争", "辛亥革命"], a: 0, cat: "timeline" },
	{ q: "洋务运动的口号是？", options: ["自强求富", "民主科学", "扶清灭洋"], a: 0, cat: "events" },
	{ q: "辛亥革命推翻的是？", options: ["清朝统治", "北洋军阀", "国民党"], a: 0, cat: "events" },
	{ q: "五四运动的导火索是？", options: ["巴黎和会外交失败", "九一八事变", "卢沟桥事变"], a: 0, cat: "events" },
	{ q: "中共一大召开于？", options: ["上海", "北京", "天津"], a: 0, cat: "events" },
	{ q: "西安事变和平解决的意义是？", options: ["抗日民族统一战线初步形成", "清朝灭亡", "新中国成立"], a: 0, cat: "sources" },
	{ q: "新中国成立的时间是？", options: ["1949年", "1919年", "1978年"], a: 0, cat: "timeline" },
	{ q: "改革开放的伟大转折是？", options: ["十一届三中全会", "中共一大", "辛亥革命"], a: 0, cat: "events" },
	{ q: "工业革命首先开始于？", options: ["英国", "法国", "美国"], a: 0, cat: "figures" },
	{ q: "《天津条约》与哪次战争有关？", options: ["第二次鸦片战争", "甲午战争", "抗日战争"], a: 0, cat: "sources" },
	{ q: "“以史为鉴，可以知兴替”出自？", options: ["唐太宗", "秦始皇", "汉武帝"], a: 0, cat: "figures" },
	{ q: "史料按价值可分为？", options: ["第一手史料和第二手史料", "好史料和坏史料", "中文史料和英文史料"], a: 0, cat: "sources" },
	{ q: "评价历史事件要？", options: ["一分为二、放在特定历史条件下", "只看结果", "只看动机"], a: 0, cat: "essay" },
	{ q: "天津大沽口炮台见证的战争是？", options: ["第二次鸦片战争", "鸦片战争", "甲午战争"], a: 0, cat: "timeline" },
	{ q: "“自强”“求富”属于哪次探索？", options: ["洋务运动", "戊戌变法", "新文化运动"], a: 0, cat: "events" },
];

const GEOGRAPHY_QUIZ = [
	{ q: "地球自转方向是？", options: ["自西向东", "自东向西", "自南向北"], a: 0, cat: "map" },
	{ q: "比例尺 1:100000 表示图上 1 cm 代表实地？", options: ["1 km", "10 km", "100 km"], a: 0, cat: "map" },
	{ q: "我国地势总体特征是？", options: ["西高东低", "东高西低", "南高北低"], a: 0, cat: "region" },
	{ q: "天津濒临的海域是？", options: ["渤海", "黄海", "东海"], a: 0, cat: "region" },
	{ q: "海河最终注入？", options: ["渤海", "黄海", "东海"], a: 0, cat: "region" },
	{ q: "热带雨林气候的特征是？", options: ["全年高温多雨", "夏季高温少雨", "全年温和湿润"], a: 0, cat: "climate" },
	{ q: "长江发源于？", options: ["唐古拉山", "昆仑山", "太行山"], a: 0, cat: "region" },
	{ q: "我国人口地理分界线是？", options: ["黑河—腾冲线", "秦岭—淮河线", "长城线"], a: 0, cat: "resources" },
	{ q: "京津冀协同发展的核心是？", options: ["疏解北京非首都功能", "填海造陆", "全部工业化"], a: 0, cat: "comprehensive" },
	{ q: "等高线越密集，坡度越？", options: ["陡", "缓", "平"], a: 0, cat: "map" },
	{ q: "地图三要素是？", options: ["比例尺、方向、图例", "经纬网、等高线、颜色", "标题、比例尺、文字"], a: 0, cat: "map" },
	{ q: "我国最大的岛屿是？", options: ["台湾岛", "海南岛", "崇明岛"], a: 0, cat: "region" },
	{ q: "秦岭—淮河一线大致是？", options: ["800 mm 年等降水量线", "400 mm 年等降水量线", "200 mm 年等降水量线"], a: 0, cat: "climate" },
	{ q: "天津的气候类型是？", options: ["温带季风气候", "亚热带季风气候", "热带季风气候"], a: 0, cat: "climate" },
	{ q: "南水北调主要缓解？", options: ["北方水资源短缺", "南方洪涝", "西部干旱"], a: 0, cat: "resources" },
];

function socialPickQuestion(pool) {
	let item = pool[Math.floor(Math.random() * pool.length)];
	let options = item.options.slice();
	let correctText = options[item.a];
	for (let i = options.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let tmp = options[i];
		options[i] = options[j];
		options[j] = tmp;
	}
	return { text: item.q, options: options, correct: options.indexOf(correctText), category: item.cat };
}

function historyMakeQuestion() {
	return socialPickQuestion(HISTORY_QUIZ);
}

function geographyMakeQuestion() {
	return socialPickQuestion(GEOGRAPHY_QUIZ);
}

// ---------- 历史 / 地理通用层工厂 ----------

function makeSocialLayer(id, cfg) {
	let statKeys = cfg.stats.map(function (s) { return s.key; });

	function totalStats() {
		let total = new OmegaNum(0);
		for (let i = 0; i < statKeys.length; i++) total = total.add(player[id][statKeys[i]]);
		return total;
	}

	return {
		startData() {
			let data = {
				unlocked: true,
				points: new OmegaNum(0),
				total: new OmegaNum(0),
				best: new OmegaNum(0),
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
			for (let i = 0; i < statKeys.length; i++) data[statKeys[i]] = new OmegaNum(0);
			return data;
		},

		color: cfg.color,
		resource: cfg.resource,
		row: cfg.row || 0,
		position: cfg.position,
		symbol: cfg.symbol,
		type: "none",
		name: cfg.name || cfg.symbol,

		layerShown() {
			return player.E.bestPoints.gte(cfg.unlock) || (player[id] && player[id].trainingRuns.gte(1));
		},
		tooltip() {
			return cfg.tooltip;
		},
		tooltipLocked() {
			return cfg.label + "<br>最佳中考分数达到 " + cfg.unlock + " 分后解锁";
		},

		update(diff) {
			subjectUpdate(id, diff);
		},

		effect() {
			let mult = new OmegaNum(1).add(totalStats().div(100));
			if (id === "His") {
				if (player.Pol && player.Pol.current) mult = mult.add(player.Pol.current.div(200));
				if (player.C && player.C.tier) mult = mult.add(new OmegaNum(player.C.tier).div(100));
				if (player.Geo) mult = mult.add(totalOf("Geo").div(200));
			} else if (id === "Geo") {
				if (player.P) mult = mult.add(player.P.mechanics.add(player.P.experiment).div(200));
				if (player.M && player.M.points && player.M.points.gt(0)) mult = mult.add(player.M.points.log10().max(0).div(200));
				if (player.His) mult = mult.add(totalOf("His").div(200));
			}
			return mult;
		},

		clickables: {
			100: {
				display() {
					return "开始" + cfg.label + "训练";
				},
				unlocked() {
					return !player[id].active && !player[id].completed;
				},
				canClick() {
					return !player[id].active && !player[id].completed;
				},
				onClick() {
					player.subtabs[id].mainTabs = "Minigame I";
					updateTabFormats();
					subjectStart(id);
				},
				style: {
					width: "300px",
					height: "100px",
					"background-color": cfg.color,
					color: "white",
					border: "1px solid white",
					"border-radius": "0px",
					"font-size": "18px",
				},
			},
			101: socialOptionClickable(id, 0, cfg.color),
			102: socialOptionClickable(id, 1, cfg.color),
			103: socialOptionClickable(id, 2, cfg.color),
			104: {
				display() {
					return "复盘\n重新开始训练。";
				},
				unlocked() {
					return player[id].completed;
				},
				canClick() {
					return player[id].completed;
				},
				onClick() {
					subjectReset(id);
				},
				style: {
					width: "300px",
					height: "100px",
					"background-color": cfg.color,
					color: "white",
					border: "1px solid white",
					"border-radius": "0px",
					"font-size": "18px",
				},
			},
		},

		buyables: socialBuyables(id, cfg, statKeys),

		infoboxes: {
			box: {
				title() {
					return cfg.label;
				},
				body() {
					return cfg.info;
				},
				style() {
					return { borderColor: cfg.color };
				},
				titleStyle() {
					return { backgroundColor: cfg.color, color: "#FFFFFF" };
				},
			},
		},

		tabFormat: {
			Main: {
				buttonStyle: { "font-size": "16px", padding: "4px 8px", "border-color": cfg.color },
				content: [
					["display-text", function () {
						return subjectHeaderHTML(id, cfg.resource);
					}],
					["display-text", function () {
						let table = "<table style='width:min(620px,92%);margin:8px auto;border-collapse:collapse;color:white;font-size:14px'>";
						table += "<tr><td colspan='3' style='padding:8px;border:1px solid #555;background:#DDDDDD;color:black;text-align:center'><b>" + cfg.label + "</b><br>" + cfg.tableTitle + "</td></tr>";
						for (let i = 0; i < cfg.stats.length; i++) {
							let s = cfg.stats[i];
							table += subjectTableRow(s.label, subjectNumber(player[id][s.key]), "");
						}
						table += "</table>";
						return table;
					}],
					["clickable", 100],
					["clickable", 104],
					["display-text", function () {
						return "已训练 <b>" + subjectNumber(player[id].trainingRuns) + "</b> 次 · 单次最佳 <b>" + subjectNumber(player[id].bestScore) + "</b> 分<br>全科知识倍率：x" + format(tmp[id].effect ? tmp[id].effect : 1) + "<br>" + cfg.crossText;
					}],
					"blank",
					["infobox", "box"],
				],
			},
			"背诵": {
				buttonStyle: { "font-size": "16px", padding: "4px 8px", "border-color": cfg.color },
				content: [
					["display-text", function () {
						return "<h2 style='color:" + cfg.color + "'>背诵专区</h2><br>消耗" + cfg.resource + "背诵知识点，永久提升对应评分。";
					}],
					"buyables",
					"blank",
					["display-text", function () {
						return "背诵可以无限进行，价格每级翻倍。当前" + cfg.resource + "：" + subjectNumber(player[id].points);
					}],
				],
			},
			"Minigame I": {
				buttonStyle: { "font-size": "16px", padding: "4px 8px", "border-color": cfg.color },
				content: [
					["display-text", function () {
						return subjectHeaderHTML(id, cfg.resource);
					}],
					["display-text", function () {
						return subjectTimerHTML(id);
					}],
					["display-text", function () {
						return subjectQuestionHTML(id);
					}],
					["clickable", 100],
					["row", [
						["clickable", 101],
						["clickable", 102],
						["clickable", 103],
					]],
					["clickable", 104],
					["display-text", function () {
						if (player[id].active) return "答对 +3 分，答错 -1 分。限时 30 秒。";
						if (player[id].completed) return "训练结束。点击“复盘”再来一次。";
						return "点击“开始" + cfg.label + "训练”进入 30 秒速答。";
					}],
				],
			},
		},
	};
}

function totalOf(id) {
	let total = new OmegaNum(0);
	if (!player[id]) return total;
	let layer = layers[id];
	if (!layer || !layer.__statKeys) return total;
	for (let i = 0; i < layer.__statKeys.length; i++) total = total.add(player[id][layer.__statKeys[i]]);
	return total;
}

function socialOptionClickable(id, index, color) {
	return {
		display() {
			return player[id].options[index] ? String.fromCharCode(65 + index) + ". " + player[id].options[index] : "";
		},
		unlocked() {
			return player[id].active;
		},
		canClick() {
			return player[id].active;
		},
		onClick() {
			subjectAnswer(id, index);
		},
		style: {
			width: "160px",
			height: "110px",
			"background-color": color,
			color: "white",
			border: "1px solid white",
			"border-radius": "0px",
			"font-size": "14px",
		},
	};
}

function socialBuyables(id, cfg, statKeys) {
	let result = {};
	for (let i = 0; i < statKeys.length; i++) {
		let key = statKeys[i];
		let stat = cfg.stats[i];
		let buyableId = 11 + i;
		result[buyableId] = {
			title: stat.label + "背诵",
			cost(x) {
				return new OmegaNum(cfg.costBase + i * 20).mul(new OmegaNum(2).pow(x));
			},
			canAfford() {
				return player[id].points.gte(this.cost());
			},
			buy() {
				player[id].points = player[id].points.sub(this.cost());
				player[id][key] = player[id][key].add(5);
				setBuyableAmount(id, buyableId, getBuyableAmount(id, buyableId).add(1));
				updateTemp();
			},
			display() {
				return "背一条" + stat.label + "知识点，" + stat.label + " +5。<br>已背诵：" + getBuyableAmount(id, buyableId) + " 次<br>价格：" + subjectNumber(this.cost()) + " " + cfg.resource;
			},
			unlocked() {
				return true;
			},
			style: {
				"background-color": cfg.darkColor,
				color: "white",
				"border-color": cfg.color,
				"border-radius": "8px",
				height: "150px",
				width: "220px",
			},
		};
	}
	return result;
}

// 保存每个层的 statKeys，供 totalOf 使用。
const HIS_STATS = [
	{ key: "timeline", label: "时间线" },
	{ key: "sources", label: "史料" },
	{ key: "events", label: "事件" },
	{ key: "figures", label: "人物" },
	{ key: "essay", label: "论述" },
];
const GEO_STATS = [
	{ key: "map", label: "地图" },
	{ key: "climate", label: "气候" },
	{ key: "region", label: "区域" },
	{ key: "resources", label: "资源" },
	{ key: "comprehensive", label: "综合" },
];

const HIS_LAYER = makeSocialLayer("His", {
	symbol: "H",
	name: "History",
	label: "历史",
	color: "#8B5A2B",
	darkColor: "#3A2410",
	resource: "历史知识",
	unlock: 103,
	row: 0,
	position: 3,
	tooltip: "中考历史专项训练：时间线、史料与论述",
	tableTitle: "历史学科评分（与政治 / 语文联动）",
	crossText: "联动：政治时政敏感度 → 历史全科倍率；历史训练会给政治增加时政积累。",
	info: "最佳中考分数达到 103 分后解锁。<br><br>Minigame I 是 30 秒历史速答，答对 +3、答错 -1。背诵专区可以消耗历史知识提升时间线、史料、事件、人物、论述评分。<br><br>历史训练会给政治增加少量时政敏感度。",
	stats: HIS_STATS,
	costBase: 30,
});
HIS_LAYER.__statKeys = HIS_STATS.map(function (s) { return s.key; });
addLayer("His", HIS_LAYER);

const GEO_LAYER = makeSocialLayer("Geo", {
	symbol: "G",
	name: "Geography",
	label: "地理",
	color: "#2E8B57",
	darkColor: "#123A26",
	resource: "地理知识",
	unlock: 119,
	row: 0,
	position: 4,
	tooltip: "中考地理专项训练：地图、气候与区域",
	tableTitle: "地理学科评分（与物理 / 数学联动）",
	crossText: "联动：物理力学/实验评分 → 地理全科倍率；地理训练会给物理增加实验评分。",
	info: "最佳中考分数达到 119 分后解锁。<br><br>Minigame I 是 30 秒地理速答，答对 +3、答错 -1。背诵专区可以消耗地理知识提升地图、气候、区域、资源、综合评分。<br><br>地理训练会给物理增加少量实验评分。",
	stats: GEO_STATS,
	costBase: 40,
});
GEO_LAYER.__statKeys = GEO_STATS.map(function (s) { return s.key; });
addLayer("Geo", GEO_LAYER);

// E 层树枝
if (layers.E && layers.E.branches) {
	let colors = { His: "#8B5A2B", Geo: "#2E8B57", PE: "#FF00FF" };
	for (let key in colors) {
		let exists = false;
		for (let i = 0; i < layers.E.branches.length; i++) if (layers.E.branches[i][0] === key) exists = true;
		if (!exists) layers.E.branches.push([key, colors[key], 15]);
	}
}

// ---------- 考试板块：历史 / 地理试卷 ----------

const HISTORY_EXAM = [
	{ id: 301, type: "单项选择题", points: 4, time: 120, short: "中国近代史开端", prompt: "1840 年，英国发动鸦片战争。中国近代史的开端是？" },
	{ id: 302, type: "单项选择题", points: 4, time: 120, short: "洋务运动口号", prompt: "洋务派提出“自强”“求富”，掀起洋务运动。其口号是？" },
	{ id: 303, type: "单项选择题", points: 4, time: 120, short: "辛亥革命功绩", prompt: "辛亥革命推翻了清朝统治，结束了君主专制制度。其历史功绩是？" },
	{ id: 304, type: "单项选择题", points: 4, time: 120, short: "五四运动导火索", prompt: "1919 年巴黎和会上中国外交失败，直接引发？" },
	{ id: 305, type: "单项选择题", points: 4, time: 120, short: "中共一大", prompt: "中国共产党第一次全国代表大会召开于哪座城市？" },
	{ id: 306, type: "单项选择题", points: 4, time: 120, short: "西安事变", prompt: "西安事变和平解决，标志着抗日民族统一战线初步形成。其意义是？" },
	{ id: 307, type: "单项选择题", points: 4, time: 120, short: "新中国成立", prompt: "中华人民共和国成立的时间是？" },
	{ id: 308, type: "单项选择题", points: 4, time: 120, short: "改革开放转折", prompt: "1978 年，哪次会议作出改革开放的伟大决策？" },
	{ id: 309, type: "单项选择题", points: 4, time: 120, short: "工业革命", prompt: "第一次工业革命首先开始于哪个国家？" },
	{ id: 310, type: "单项选择题", points: 4, time: 120, short: "天津条约", prompt: "《天津条约》与哪次战争有关？" },
	{ id: 311, type: "材料解析题", points: 15, time: 300, short: "洋务运动", prompt: "材料：洋务派创办江南机器制造总局、福州船政局等企业。<br>问题：结合材料，说明洋务运动的口号、目的和局限性。" },
	{ id: 312, type: "材料解析题", points: 15, time: 300, short: "改革开放", prompt: "材料：1978 年十一届三中全会后，我国进入改革开放和社会主义现代化建设新时期。<br>问题：简述改革开放的历史意义。" },
	{ id: 313, type: "综合题", points: 30, time: 420, short: "青年责任", prompt: "结合中国近代史，谈谈新时代青年应如何担当民族复兴大任。<br>（要求：观点明确，史论结合，条理清晰。）" },
];

const GEOGRAPHY_EXAM = [
	{ id: 401, type: "单项选择题", points: 4, time: 120, short: "地球自转", prompt: "地球自转的方向是？" },
	{ id: 402, type: "单项选择题", points: 4, time: 120, short: "比例尺", prompt: "比例尺 1:100000 表示图上 1 厘米代表实地多少千米？" },
	{ id: 403, type: "单项选择题", points: 4, time: 120, short: "中国地势", prompt: "我国地势总体特征是？" },
	{ id: 404, type: "单项选择题", points: 4, time: 120, short: "天津海域", prompt: "天津濒临的海域是？" },
	{ id: 405, type: "单项选择题", points: 4, time: 120, short: "海河", prompt: "海河最终注入哪个海域？" },
	{ id: 406, type: "单项选择题", points: 4, time: 120, short: "热带雨林", prompt: "热带雨林气候的主要特征是？" },
	{ id: 407, type: "单项选择题", points: 4, time: 120, short: "长江发源", prompt: "长江发源于哪座山脉？" },
	{ id: 408, type: "单项选择题", points: 4, time: 120, short: "人口分界线", prompt: "我国人口地理分界线是？" },
	{ id: 409, type: "单项选择题", points: 4, time: 120, short: "京津冀", prompt: "京津冀协同发展的核心是？" },
	{ id: 410, type: "单项选择题", points: 4, time: 120, short: "等高线", prompt: "等高线越密集，坡度越？" },
	{ id: 411, type: "综合题", points: 20, time: 300, short: "气候图判读", prompt: "读某地气温曲线和降水柱状图：夏季高温多雨，冬季寒冷干燥。<br>问题：判断气候类型，并说明其分布规律。" },
	{ id: 412, type: "综合题", points: 20, time: 300, short: "中国地势", prompt: "读中国地形图，分析我国西高东低的地势对气候和河流的影响。" },
	{ id: 413, type: "材料分析题", points: 20, time: 360, short: "天津区位", prompt: "材料：京津冀协同发展上升为国家战略，天津拥有港口、制造业和科教资源。<br>问题：分析天津在京津冀协同发展中的区位优势。" },
];

function examChance(subject, q) {
	let p = player[subject];
	let total = totalOf(subject);
	let base = q.type === "单项选择题" ? 22 : 8;
	let extra = total.mul(0.35);
	if (subject === "His") {
		if (player.Pol) extra = extra.add(player.Pol.current.mul(1.5));
		if (player.C) extra = extra.add(new OmegaNum(player.C.tier).mul(2));
	} else if (subject === "Geo") {
		if (player.P) extra = extra.add(player.P.mechanics.add(player.P.experiment).mul(0.5));
	}
	if (q.type !== "单项选择题") extra = extra.mul(0.8);
	return extra.add(base).min(95).max(1);
}

function makeExamQuestion(subject, q, color) {
	let inFlag = subject === "His" ? "inHistory" : "inGeo";
	let doneFlag = subject === "His" ? "completedHistory" : "completedGeo";
	let timeField = subject === "His" ? "HistoryTime" : "GeoTime";
	let scoreField = subject === "His" ? "historyScore" : "geoScore";
	return {
		title() {
			return "(" + q.points + "分) " + q.type + "：" + q.short;
		},
		display() {
			let amount = getBuyableAmount("E", q.id);
			let status = "";
			if (amount == 1) status = "<span style='color:#66FF66'>✔ 已答对</span>";
			else if (amount == 2) status = "<span style='color:#FF6666'>✘ 已答错</span>";
			else status = "点击作答";
			return q.prompt + "<br><br>正确概率：" + format(this.chance()) + "% · 预计耗时：" + format(this.time()) + "s<br>" + status;
		},
		chance() {
			return examChance(subject, q);
		},
		time() {
			return new OmegaNum(q.time);
		},
		unlocked() {
			return player.E[inFlag].gte(1) || player.E[doneFlag];
		},
		canAfford() {
			return player.E[inFlag].gte(1) && player.E[timeField].gte(this.time()) && getBuyableAmount("E", q.id).lt(1);
		},
		buy() {
			player.E[timeField] = player.E[timeField].sub(this.time());
			if (new OmegaNum(Math.random() * 100).lt(this.chance())) {
				setBuyableAmount("E", q.id, new OmegaNum(1));
				player.E[scoreField] = player.E[scoreField].add(q.points);
			} else {
				setBuyableAmount("E", q.id, new OmegaNum(2));
			}
		},
		style() {
			let amount = getBuyableAmount("E", q.id);
			if (amount == 1) return { "background-color": "#006600", color: "white", "border-color": "#00FF00", "border-radius": "10px", height: q.type === "单项选择题" ? "160px" : "220px", width: q.type === "单项选择题" ? "200px" : "520px" };
			if (amount == 2) return { "background-color": "#660000", color: "white", "border-color": "#FF0000", "border-radius": "10px", height: q.type === "单项选择题" ? "160px" : "220px", width: q.type === "单项选择题" ? "200px" : "520px" };
			return { "background-color": color, color: "white", "border-color": "#FFFFFF", "border-radius": "10px", height: q.type === "单项选择题" ? "160px" : "220px", width: q.type === "单项选择题" ? "200px" : "520px" };
		},
		autoed() {
			return false;
		},
	};
}

function makeExamHeader(id, title, text, width) {
	return {
		title() {
			return title;
		},
		display() {
			return text;
		},
		canAfford() {
			return false;
		},
		buy() {},
		unlocked() {
			return true;
		},
		style: {
			"background-color": "#666666",
			color: "white",
			"border-color": "#888888",
			"border-radius": "10px",
			height: "70px",
			width: width || "520px",
		},
		autoed() {
			return false;
		},
	};
}

function makeExamSubmit(subject, color, timeField, scoreField, inFlag, doneFlag) {
	let id = subject === "His" ? 350 : 450;
	let label = subject === "His" ? "历史" : "地理";
	return {
		title() {
			return "交卷！";
		},
		display() {
			if (player.E[inFlag].gte(1)) return "完成本次" + label + "考试。<br>当前得分：" + format(player.E[scoreField]) + " / 100<br>剩余时间：" + format(player.E[timeField]) + "s<br>*交卷后无法再修改本科目答案。";
			if (player.E[doneFlag]) return "您已完成本次" + label + "考试。";
			return "本场" + label + "考试尚未开始。";
		},
		unlocked() {
			return true;
		},
		canAfford() {
			return player.E[inFlag].gte(1);
		},
		buy() {
			player.E[inFlag] = new OmegaNum(0);
			player.E[doneFlag] = true;
		},
		style() {
			return { "background-color": color, color: "white", "border-color": "#FFFFFF", "border-radius": "10px", height: "100px", width: "300px" };
		},
		autoed() {
			return false;
		},
	};
}

// 注册考试题目、段落和交卷按钮
layers.E.buyables[300] = makeExamHeader(300, "历史试卷", "天津市初中学业水平考试 历史<br>满分 100 分，考试时间 60 分钟。<br>一、单项选择题（10×4=40）<br>二、材料解析题（2×15=30）<br>三、综合题（1×30=30）", "520px");
layers.E.buyables[340] = makeExamHeader(340, "一、单项选择题", "本大题共 10 小题，每小题 4 分，共 40 分。");
for (let i = 0; i < 10; i++) layers.E.buyables[HISTORY_EXAM[i].id] = makeExamQuestion("His", HISTORY_EXAM[i], "#5A3A1A");
layers.E.buyables[320] = makeExamHeader(320, "二、材料解析题", "本大题共 2 小题，每小题 15 分，共 30 分。");
layers.E.buyables[HISTORY_EXAM[10].id] = makeExamQuestion("His", HISTORY_EXAM[10], "#5A3A1A");
layers.E.buyables[HISTORY_EXAM[11].id] = makeExamQuestion("His", HISTORY_EXAM[11], "#5A3A1A");
layers.E.buyables[330] = makeExamHeader(330, "三、综合题", "本大题共 1 小题，共 30 分。");
layers.E.buyables[HISTORY_EXAM[12].id] = makeExamQuestion("His", HISTORY_EXAM[12], "#5A3A1A");
layers.E.buyables[350] = makeExamSubmit("His", "#8B5A2B", "HistoryTime", "historyScore", "inHistory", "completedHistory");
layers.E.buyables[300].style.height = "150px";

layers.E.buyables[400] = makeExamHeader(400, "地理试卷", "天津市初中学业水平考试 地理<br>满分 100 分，考试时间 60 分钟。<br>一、单项选择题（10×4=40）<br>二、综合题（2×20=40）<br>三、材料分析题（1×20=20）", "520px");
layers.E.buyables[440] = makeExamHeader(440, "一、单项选择题", "本大题共 10 小题，每小题 4 分，共 40 分。");
for (let i = 0; i < 10; i++) layers.E.buyables[GEOGRAPHY_EXAM[i].id] = makeExamQuestion("Geo", GEOGRAPHY_EXAM[i], "#1F5A3A");
layers.E.buyables[420] = makeExamHeader(420, "二、综合题", "本大题共 2 小题，每小题 20 分，共 40 分。");
layers.E.buyables[GEOGRAPHY_EXAM[10].id] = makeExamQuestion("Geo", GEOGRAPHY_EXAM[10], "#1F5A3A");
layers.E.buyables[GEOGRAPHY_EXAM[11].id] = makeExamQuestion("Geo", GEOGRAPHY_EXAM[11], "#1F5A3A");
layers.E.buyables[430] = makeExamHeader(430, "三、材料分析题", "本大题共 1 小题，共 20 分。");
layers.E.buyables[GEOGRAPHY_EXAM[12].id] = makeExamQuestion("Geo", GEOGRAPHY_EXAM[12], "#1F5A3A");
layers.E.buyables[450] = makeExamSubmit("Geo", "#2E8B57", "GeoTime", "geoScore", "inGeo", "completedGeo");
layers.E.buyables[400].style.height = "150px";

// E 层 tab：历史 / 地理
layers.E.tabFormat["历史"] = {
	content: [
		["buyable", 300],
		["buyable", 340],
		["row", [["buyable", 301], ["buyable", 302], ["buyable", 303]]],
		["row", [["buyable", 304], ["buyable", 305], ["buyable", 306]]],
		["row", [["buyable", 307], ["buyable", 308], ["buyable", 309]]],
		["row", [["buyable", 310]]],
		["buyable", 320],
		["row", [["buyable", 311], ["buyable", 312]]],
		["buyable", 330],
		["row", [["buyable", 313]]],
		["buyable", 350],
	],
	buttonStyle: { "border-color": "#8B5A2B", "background-color": "#3A2410" },
	style: { "background-color": "#181008" },
	unlocked() {
		return player.E.inExam.gte(1) && (player.E.inHistory.gte(1) || player.E.completedHistory);
	},
};
layers.E.tabFormat["地理"] = {
	content: [
		["buyable", 400],
		["buyable", 440],
		["row", [["buyable", 401], ["buyable", 402], ["buyable", 403]]],
		["row", [["buyable", 404], ["buyable", 405], ["buyable", 406]]],
		["row", [["buyable", 407], ["buyable", 408], ["buyable", 409]]],
		["row", [["buyable", 410]]],
		["buyable", 420],
		["row", [["buyable", 411], ["buyable", 412]]],
		["buyable", 430],
		["row", [["buyable", 413]]],
		["buyable", 450],
	],
	buttonStyle: { "border-color": "#2E8B57", "background-color": "#123A26" },
	style: { "background-color": "#081810" },
	unlocked() {
		return player.E.inExam.gte(1) && (player.E.inGeo.gte(1) || player.E.completedGeo);
	},
};

// 给 E 层加字段
const oldEStartData = layers.E.startData;
layers.E.startData = function () {
	let data = oldEStartData();
	data.historyScore = new OmegaNum(0);
	data.geoScore = new OmegaNum(0);
	data.inHistory = new OmegaNum(0);
	data.inGeo = new OmegaNum(0);
	data.completedHistory = false;
	data.completedGeo = false;
	data.HistoryTime = new OmegaNum(0);
	data.GeoTime = new OmegaNum(0);
	return data;
};

function resetSocialExam() {
	player.E.historyScore = new OmegaNum(0);
	player.E.geoScore = new OmegaNum(0);
	player.E.inHistory = new OmegaNum(0);
	player.E.inGeo = new OmegaNum(0);
	player.E.completedHistory = false;
	player.E.completedGeo = false;
	player.E.HistoryTime = new OmegaNum(0);
	player.E.GeoTime = new OmegaNum(0);
	for (let i = 0; i < HISTORY_EXAM.length; i++) setBuyableAmount("E", HISTORY_EXAM[i].id, new OmegaNum(0));
	for (let i = 0; i < GEOGRAPHY_EXAM.length; i++) setBuyableAmount("E", GEOGRAPHY_EXAM[i].id, new OmegaNum(0));
}

function startSocialExam() {
	player.E.historyScore = new OmegaNum(0);
	player.E.geoScore = new OmegaNum(0);
	player.E.inHistory = new OmegaNum(1);
	player.E.inGeo = new OmegaNum(1);
	player.E.completedHistory = false;
	player.E.completedGeo = false;
	player.E.HistoryTime = new OmegaNum(3600);
	player.E.GeoTime = new OmegaNum(3600);
	for (let i = 0; i < HISTORY_EXAM.length; i++) setBuyableAmount("E", HISTORY_EXAM[i].id, new OmegaNum(0));
	for (let i = 0; i < GEOGRAPHY_EXAM.length; i++) setBuyableAmount("E", GEOGRAPHY_EXAM[i].id, new OmegaNum(0));
}

// 开始中考：清空史地考试状态
const oldStartExam = layers.E.buyables[11].buy;
layers.E.buyables[11].buy = function () {
	oldStartExam.call(this);
	player.E.completedEnglish = false;
	player.E.inEnglish = new OmegaNum(0);
	resetSocialExam();
};

// 英语交卷后进入历史 / 地理考试
const oldEnglishSubmit = layers.E.buyables[116].buy;
layers.E.buyables[116].buy = function () {
	oldEnglishSubmit.call(this);
	startSocialExam();
};

// 查分必须完成历史 / 地理
const oldFinishUnlocked = layers.E.buyables[52].unlocked;
const oldFinishCanAfford = layers.E.buyables[52].canAfford;
const oldFinishBuy = layers.E.buyables[52].buy;
layers.E.buyables[52].unlocked = function () {
	return oldFinishUnlocked.call(this) && player.E.completedHistory && player.E.completedGeo;
};
layers.E.buyables[52].canAfford = function () {
	return oldFinishCanAfford.call(this) && player.E.completedHistory && player.E.completedGeo;
};
layers.E.buyables[52].buy = function () {
	oldFinishBuy.call(this);
	player.E.points = player.E.points.add(player.E.historyScore).add(player.E.geoScore);
};

// 分数展示
layers.E.buyables[58].title = function () {
	return "<h3>历史：" + subjectNumber(player.E.historyScore) + " / 100";
};
layers.E.buyables[59].title = function () {
	return "<h3>地理：" + subjectNumber(player.E.geoScore) + " / 100";
};

// 兼容卡在英语交卷后的旧存档
const oldEUpdate = layers.E.update;
layers.E.update = function (diff) {
	oldEUpdate.call(this, diff);
	if (player.E.inExam.gte(1) && player.E.completedEnglish && !player.E.completedHistory && !player.E.inHistory.gte(1)) {
		startSocialExam();
	}
};

// ---------- 历史 / 地理成就 ----------

layers.A.tabFormat["历史"] = {
	content: [
		["display-text", function () {
			return "<h2 style='color:#8B5A2B'>历史成就</h2><br>已完成成就：<b style='color:#FF66FF'>" + player.A.Goals + "</b>";
		}],
		"blank",
		["row", [["achievement", 101], ["achievement", 102], ["achievement", 103], ["achievement", 104], ["achievement", 105]]],
	],
	buttonStyle: { "border-color": "#8B5A2B", "background-color": "#3A2410" },
};
layers.A.tabFormat["地理"] = {
	content: [
		["display-text", function () {
			return "<h2 style='color:#2E8B57'>地理成就</h2><br>已完成成就：<b style='color:#FF66FF'>" + player.A.Goals + "</b>";
		}],
		"blank",
		["row", [["achievement", 106], ["achievement", 107], ["achievement", 108], ["achievement", 109], ["achievement", 110]]],
	],
	buttonStyle: { "border-color": "#2E8B57", "background-color": "#123A26" },
};

layers.A.achievements[101] = {
	name: "历史启程",
	done() { return player.His && player.His.trainingRuns.gte(1); },
	onComplete() { player.A.Goals = player.A.Goals.add(1); },
	tooltip: "完成一次历史训练。",
};
layers.A.achievements[102] = {
	name: "历史最佳",
	done() { return player.His && player.His.bestScore.gte(80); },
	onComplete() { player.A.Goals = player.A.Goals.add(1); },
	tooltip: "历史训练单次达到 80 分。",
};
layers.A.achievements[103] = {
	name: "历史背诵",
	done() {
		if (!player.His || !player.His.buyables) return false;
		let n = 0; for (let i in player.His.buyables) n += Number(player.His.buyables[i]) || 0;
		return n >= 10;
	},
	onComplete() { player.A.Goals = player.A.Goals.add(1); },
	tooltip: "历史背诵累计 10 次。",
};
layers.A.achievements[104] = {
	name: "政史贯通",
	done() { return player.His && player.Pol && player.His.trainingRuns.gte(5) && player.Pol.trainingRuns.gte(1); },
	onComplete() { player.A.Goals = player.A.Goals.add(1); },
	tooltip: "历史训练 5 次且完成过政治训练。",
};
layers.A.achievements[105] = {
	name: "史地不分家",
	done() { return player.His && player.Geo && player.His.trainingRuns.gte(1) && player.Geo.trainingRuns.gte(1); },
	onComplete() { player.A.Goals = player.A.Goals.add(1); },
	tooltip: "历史和地理各训练一次。",
};
layers.A.achievements[106] = {
	name: "地理启程",
	done() { return player.Geo && player.Geo.trainingRuns.gte(1); },
	onComplete() { player.A.Goals = player.A.Goals.add(1); },
	tooltip: "完成一次地理训练。",
};
layers.A.achievements[107] = {
	name: "地理最佳",
	done() { return player.Geo && player.Geo.bestScore.gte(80); },
	onComplete() { player.A.Goals = player.A.Goals.add(1); },
	tooltip: "地理训练单次达到 80 分。",
};
layers.A.achievements[108] = {
	name: "地理背诵",
	done() {
		if (!player.Geo || !player.Geo.buyables) return false;
		let n = 0; for (let i in player.Geo.buyables) n += Number(player.Geo.buyables[i]) || 0;
		return n >= 10;
	},
	onComplete() { player.A.Goals = player.A.Goals.add(1); },
	tooltip: "地理背诵累计 10 次。",
};
layers.A.achievements[109] = {
	name: "地物联动",
	done() { return player.Geo && player.P && player.Geo.trainingRuns.gte(5) && player.P.trainingRuns.gte(1); },
	onComplete() { player.A.Goals = player.A.Goals.add(1); },
	tooltip: "地理训练 5 次且完成过物理训练。",
};
layers.A.achievements[110] = {
	name: "史地双修",
	done() { return player.His && player.Geo && player.His.bestScore.gte(80) && player.Geo.bestScore.gte(80); },
	onComplete() { player.A.Goals = player.A.Goals.add(1); },
	tooltip: "历史与地理训练都达到 80 分。",
};
