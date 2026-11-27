// ============================================================
// 成就扩展 II：把总成就数补到 300
// 生成顺序固定，ID 从 160 开始，到 338 结束。
// ============================================================

let moreAchievementId = 160;

function moreAchievement(name, done, tooltip) {
	let id = moreAchievementId++;
	extraAchievement(id, name, done, tooltip);
	return id;
}

function moreStatTotal(layer, keys) {
	let total = new OmegaNum(0);
	for (let i = 0; i < keys.length; i++) total = total.add(player[layer][keys[i]]);
	return total;
}

function moreChunks(ids, size) {
	let result = [];
	for (let i = 0; i < ids.length; i += size) result.push(ids.slice(i, i + size));
	return result;
}

function moreRows(ids, size) {
	return moreChunks(ids, size || 5).map(function (row) {
		return ["row", row.map(function (id) { return ["achievement", id]; })];
	});
}

function moreSection(title, ids, color) {
	let content = [["display-text", "<h3 style='color:" + color + "'>" + title + "</h3>"]];
	return content.concat(moreRows(ids, 5));
}

function moreTotalAchievements() {
	return Object.keys(layers.A.achievements).filter(function (id) { return /^\d+$/.test(id); }).length;
}

function moreTabHeader(title, color) {
	return ["display-text", function () {
		return "<h2 style='color:" + color + "'>" + title + "</h2><br>已完成成就：<b style='color:#FF66FF'>" + player.A.Goals + "</b> / " + moreTotalAchievements();
	}];
}

// ---------- 训练与能力 ----------

const MORE_TRAIN_INFO = [
	{ key: "P", cn: "物理", stats: ["mechanics", "thermo", "optics", "electricity", "experiment"] },
	{ key: "Chem", cn: "化学", stats: ["formula", "equation", "experiment", "calculation", "concept"] },
	{ key: "Bio", cn: "生物", stats: ["cell", "genetics", "ecology", "experiment", "human"] },
	{ key: "PE", cn: "体育", stats: ["speed", "endurance", "flexibility", "strength", "reaction"] },
	{ key: "Pol", cn: "政治", stats: ["morality", "law", "national", "current", "answer"] },
	{ key: "His", cn: "历史", stats: ["timeline", "sources", "events", "figures", "essay"] },
	{ key: "Geo", cn: "地理", stats: ["map", "climate", "region", "resources", "comprehensive"] },
];

const MORE_SCIENCE_SECTIONS = [];
const MORE_LIBERAL_SECTIONS = [];

for (let i = 0; i < MORE_TRAIN_INFO.length; i++) {
	let info = MORE_TRAIN_INFO[i];
	let ids = [];
	let runs = [5, 10, 25, 50, 100];
	for (let j = 0; j < runs.length; j++) {
		let n = runs[j];
		ids.push(moreAchievement(info.cn + "训练 " + n + " 次", function () {
			return player[info.key].trainingRuns.gte(n);
		}, "完成 " + n + " 次" + info.cn + "训练。"));
	}
	let scores = [50, 70, 82, 90];
	for (let j = 0; j < scores.length; j++) {
		let n = scores[j];
		ids.push(moreAchievement(info.cn + "单次 " + n + " 分", function () {
			return player[info.key].bestScore.gte(n);
		}, info.cn + "训练单次达到 " + n + " 分。"));
	}
	ids.push(moreAchievement(info.cn + "五项 200", function () {
		return moreStatTotal(info.key, info.stats).gte(200);
	}, info.cn + "五项评分总和达到 200。"));
	if (i < 4) MORE_SCIENCE_SECTIONS.push({ title: info.cn, ids: ids });
	else MORE_LIBERAL_SECTIONS.push({ title: info.cn, ids: ids });
}

const MORE_ABILITY_SECTIONS = [];
const ABILITY_SCORES = [100, 500, 1000, 5000, 10000];
for (let i = 0; i < MORE_TRAIN_INFO.length; i++) {
	let info = MORE_TRAIN_INFO[i];
	let ids = [];
	for (let j = 0; j < ABILITY_SCORES.length; j++) {
		let n = ABILITY_SCORES[j];
		ids.push(moreAchievement(info.cn + "能力 " + n, function () {
			return player[info.key].points.gte(n);
		}, info.cn + "能力达到 " + n + "。"));
	}
	MORE_ABILITY_SECTIONS.push({ title: info.cn, ids: ids });
}

// ---------- 考试 ----------

const MORE_EXAM_E_IDS = [];
const E_SCORES = [10, 20, 30, 40, 50, 60, 70, 84, 100, 119, 150, 200, 256, 300, 400, 512, 800, 1024];
for (let i = 0; i < E_SCORES.length; i++) {
	let n = E_SCORES[i];
	MORE_EXAM_E_IDS.push(moreAchievement("中考 " + n + " 分", function () {
		return player.E.bestPoints.gte(n);
	}, "最佳中考分数达到 " + n + " 分。"));
}

const MORE_EXAM_HIS_IDS = [];
const MORE_EXAM_GEO_IDS = [];
const SOCIAL_SCORES = [60, 75, 90, 100];
for (let i = 0; i < SOCIAL_SCORES.length; i++) {
	let n = SOCIAL_SCORES[i];
	MORE_EXAM_HIS_IDS.push(moreAchievement("历史考试 " + n + " 分", function () {
		return player.E.historyScore.gte(n);
	}, "历史考试得分达到 " + n + "。"));
}
for (let i = 0; i < SOCIAL_SCORES.length; i++) {
	let n = SOCIAL_SCORES[i];
	MORE_EXAM_GEO_IDS.push(moreAchievement("地理考试 " + n + " 分", function () {
		return player.E.geoScore.gte(n);
	}, "地理考试得分达到 " + n + "。"));
}

// ---------- 全局收集 ----------

const MORE_MILESTONE_IDS = [];
const MILESTONE_TOTALS = [20, 40, 60, 70, 80, 90];
for (let i = 0; i < MILESTONE_TOTALS.length; i++) {
	let n = MILESTONE_TOTALS[i];
	MORE_MILESTONE_IDS.push(moreAchievement("里程碑 " + n + " 个", function () {
		return totalMilestoneCount() >= n;
	}, "累计达成 " + n + " 个里程碑。"));
}

const MORE_GOAL_IDS = [];
const GOAL_TOTALS = [100, 150, 200, 250];
for (let i = 0; i < GOAL_TOTALS.length; i++) {
	let n = GOAL_TOTALS[i];
	MORE_GOAL_IDS.push(moreAchievement("成就 " + n + " 个", function () {
		return player.A.Goals.gte(n);
	}, "完成 " + n + " 个成就。"));
}

// ---------- 15 组联动满级 ----------

const MORE_SYNERGY_IDS = [];
for (let i = 0; i < SYNERGY_PAIRS.length; i++) {
	let pair = SYNERGY_PAIRS[i];
	MORE_SYNERGY_IDS.push(moreAchievement(pair.name + "满级", function () {
		return synergyPairLevel(pair) >= 5;
	}, pair.name + "联动达到 5 级。"));
}

// ---------- 层内进度 ----------

const MORE_LAYER_DEFS = [
	["数学里程碑 1", function () { return hasMilestone("M", 1); }, "达成数学里程碑 1。"],
	["数学里程碑 3", function () { return hasMilestone("M", 3); }, "达成数学里程碑 3。"],
	["计数法里程碑 2", function () { return hasMilestone("Nf", 2); }, "达成计数法里程碑 2。"],
	["自动化里程碑 2", function () { return hasMilestone("Am", 2); }, "达成自动化里程碑 2。"],
	["经验里程碑 0", function () { return hasMilestone("Exp", 0); }, "达成经验里程碑 0。"],
	["经验里程碑 2", function () { return hasMilestone("Exp", 2); }, "达成经验里程碑 2。"],
	["经验里程碑 5", function () { return hasMilestone("Exp", 5); }, "达成经验里程碑 5。"],
	["排行榜里程碑 0", function () { return hasMilestone("L", 0); }, "达成排行榜里程碑 0。"],
	["成就里程碑 0", function () { return hasMilestone("A", 0); }, "达成成就里程碑 0。"],
	["成就里程碑 1", function () { return hasMilestone("A", 1); }, "达成成就里程碑 1。"],
	["综合素质里程碑 0", function () { return hasMilestone("Syn", 0); }, "达成综合素质里程碑 0。"],
	["综合素质里程碑 1", function () { return hasMilestone("Syn", 1); }, "达成综合素质里程碑 1。"],
	["综合素质里程碑 2", function () { return hasMilestone("Syn", 2); }, "达成综合素质里程碑 2。"],
	["综合素质里程碑 3", function () { return hasMilestone("Syn", 3); }, "达成综合素质里程碑 3。"],
	["综合素质里程碑 4", function () { return hasMilestone("Syn", 4); }, "达成综合素质里程碑 4。"],
	["名著阶层 5", function () { return player.C.tier.gte(5); }, "名著阶层达到 5。"],
	["名著阶层 7", function () { return player.C.tier.gte(7); }, "名著阶层达到 7。"],
	["名著阶层 10", function () { return player.C.tier.gte(10); }, "名著阶层达到 10。"],
	["名著阶层 12", function () { return player.C.tier.gte(12); }, "名著阶层达到 12。"],
	["名著阶层 14", function () { return player.C.tier.gte(14); }, "名著阶层达到 14。"],
	["英语单词 100", function () { return player.Eng.totalpp.gte(100); }, "英语单词累计达到 100。"],
	["英语单词 1,000", function () { return player.Eng.totalpp.gte(1000); }, "英语单词累计达到 1,000。"],
	["英语单词 2,000", function () { return player.Eng.totalpp.gte(2000); }, "英语单词累计达到 2,000。"],
];

const MORE_LAYER_IDS = [];
for (let i = 0; i < MORE_LAYER_DEFS.length; i++) {
	let def = MORE_LAYER_DEFS[i];
	MORE_LAYER_IDS.push(moreAchievement(def[0], def[1], def[2]));
}

// ---------- 页签 ----------

function moreTabContent(title, color, sections) {
	let content = [moreTabHeader(title, color), "blank"];
	for (let i = 0; i < sections.length; i++) {
		if (i > 0) content.push("blank");
		content = content.concat(moreSection(sections[i].title, sections[i].ids, color));
	}
	return content;
}

layers.A.tabFormat["理科训练"] = {
	content: moreTabContent("理科训练成就", "#00BFFF", MORE_SCIENCE_SECTIONS),
	buttonStyle: { "border-color": "#00BFFF", "background-color": "#003A5A" },
};

layers.A.tabFormat["文科训练"] = {
	content: moreTabContent("文科训练成就", "#E74C3C", MORE_LIBERAL_SECTIONS),
	buttonStyle: { "border-color": "#E74C3C", "background-color": "#3A1515" },
};

layers.A.tabFormat["学科能力"] = {
	content: moreTabContent("学科能力成就", "#32CD32", MORE_ABILITY_SECTIONS),
	buttonStyle: { "border-color": "#32CD32", "background-color": "#123A12" },
};

layers.A.tabFormat["考试进阶"] = {
	content: [
		moreTabHeader("考试进阶成就", "#FFD700"),
		"blank",
	].concat(
		moreSection("中考总分", MORE_EXAM_E_IDS, "#FFD700"),
		["blank"],
		moreSection("历史考试", MORE_EXAM_HIS_IDS, "#8B5A2B"),
		["blank"],
		moreSection("地理考试", MORE_EXAM_GEO_IDS, "#2E8B57")
	),
	buttonStyle: { "border-color": "#FFD700", "background-color": "#3A2A00" },
};

layers.A.tabFormat["进阶收集"] = {
	content: [
		moreTabHeader("进阶收集成就", "#FF66FF"),
		"blank",
	].concat(
		moreSection("里程碑收集", MORE_MILESTONE_IDS, "#FF66FF"),
		["blank"],
		moreSection("成就数量", MORE_GOAL_IDS, "#FF66FF"),
		["blank"],
		moreSection("联动满级", MORE_SYNERGY_IDS, "#FFD700"),
		["blank"],
		moreSection("层内进度", MORE_LAYER_IDS, "#20B2AA")
	),
	buttonStyle: { "border-color": "#FF66FF", "background-color": "#3A003A" },
};
