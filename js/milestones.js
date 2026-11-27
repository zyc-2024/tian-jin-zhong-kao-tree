// ============================================================
// 全层级里程碑补充
// - 给已有里程碑的语文 / 中考 / 英语追加后期里程碑
// - 给数学 / 计数法 / 成就 / 自动化 / 经验 / 排行榜 / 物理 / 化学 / 体育 / 政治 / 历史 / 地理增加里程碑
// - 所有新增里程碑统一提供全科知识倍率，并在各层显示
// ============================================================

function addMilestone(layer, id, requirement, effect, done, unlocked) {
	if (!layers[layer]) return;
	if (!layers[layer].milestones) layers[layer].milestones = {};
	layers[layer].milestones[id] = {
		requirementDescription: requirement,
		effectDescription: effect,
		done: done,
	};
	if (unlocked) layers[layer].milestones[id].unlocked = unlocked;
}

function milestoneAfter(layer, id) {
	return function () {
		return hasMilestone(layer, id - 1);
	};
}

function buyableTotal(layer) {
	let total = 0;
	if (!player[layer] || !player[layer].buyables) return total;
	for (let id in player[layer].buyables) {
		let n = Number(player[layer].buyables[id]);
		if (isFinite(n)) total += n;
	}
	return total;
}

function statTotal(layer, keys) {
	let total = new OmegaNum(0);
	if (!player[layer]) return total;
	for (let i = 0; i < keys.length; i++) {
		if (player[layer][keys[i]] !== undefined) total = total.add(player[layer][keys[i]]);
	}
	return total;
}

// ---------- C：后期语文里程碑 ----------

addMilestone("C", 12, "语文知识达到 1e1000", "全科知识获取 +25%。",
	function () { return player.C.points.gte("1e1000"); }, milestoneAfter("C", 12));
addMilestone("C", 13, "语文知识达到 1e10000", "全科知识获取 +50%。",
	function () { return player.C.points.gte("1e10000"); }, milestoneAfter("C", 13));
addMilestone("C", 14, "语文知识达到 1e60000", "全科知识获取 +100%。",
	function () { return player.C.points.gte("1e60000"); }, milestoneAfter("C", 14));

// ---------- E：后期中考里程碑 ----------

addMilestone("E", 25, "最佳中考分数达到 256", "全科知识获取 +25%。",
	function () { return player.E.bestPoints.gte(256); }, milestoneAfter("E", 25));
addMilestone("E", 26, "最佳中考分数达到 512", "全科知识获取 +50%。",
	function () { return player.E.bestPoints.gte(512); }, milestoneAfter("E", 26));
addMilestone("E", 27, "最佳中考分数达到 1024", "全科知识获取 +100%。",
	function () { return player.E.bestPoints.gte(1024); }, milestoneAfter("E", 27));

// ---------- Eng：后期英语里程碑 ----------

addMilestone("Eng", 18, "英语知识达到 1e1444", "全科知识获取 +25%。",
	function () { return player.Eng.power.gte("1e1444"); }, milestoneAfter("Eng", 18));
addMilestone("Eng", 19, "英语知识达到 1e3000", "全科知识获取 +50%。",
	function () { return player.Eng.power.gte("1e3000"); }, milestoneAfter("Eng", 19));
addMilestone("Eng", 20, "英语知识达到 1e6000", "全科知识获取 +100%。",
	function () { return player.Eng.power.gte("1e6000"); }, milestoneAfter("Eng", 20));

// ---------- M：数学理论 ----------

addMilestone("M", 0, "最佳中考分数达到 200", "全科知识获取 +10%。",
	function () { return player.E.bestPoints.gte(200); });
addMilestone("M", 1, "最佳中考分数达到 256", "全科知识获取 +20%。",
	function () { return player.E.bestPoints.gte(256); }, milestoneAfter("M", 1));
addMilestone("M", 2, "购买 56 个英语网格节点", "全科知识获取 +25%。",
	function () { return new OmegaNum((player.Eng.upgrades || []).length).gte(56); }, milestoneAfter("M", 2));
addMilestone("M", 3, "语文知识达到 1e60000", "全科知识获取 +25%。",
	function () { return player.C.points.gte("1e60000"); }, milestoneAfter("M", 3));
addMilestone("M", 4, "最佳中考分数达到 512", "全科知识获取 +50%。",
	function () { return player.E.bestPoints.gte(512); }, milestoneAfter("M", 4));

// ---------- Nf：考试策略 ----------

addMilestone("Nf", 0, "选择一次计数法", "全科知识获取 +5%。",
	function () { return getBuyableAmount("Nf", 11).gte(1) || getBuyableAmount("Nf", 12).gte(1); });
addMilestone("Nf", 1, "选择一次考试策略", "全科知识获取 +10%。",
	function () { return getBuyableAmount("Nf", 21).gte(1) || getBuyableAmount("Nf", 22).gte(1) || getBuyableAmount("Nf", 23).gte(1); }, milestoneAfter("Nf", 1));
addMilestone("Nf", 2, "切换考试策略 3 次", "全科知识获取 +10%。",
	function () { return player.Nf.ach1.gte(3); }, milestoneAfter("Nf", 2));
addMilestone("Nf", 3, "触发一次隐藏策略成就", "全科知识获取 +15%。",
	function () { return player.Nf.ach1.gte(12) || player.Nf.ach2.gte(12); }, milestoneAfter("Nf", 3));

// ---------- A：成就 ----------

addMilestone("A", 0, "完成 10 个成就", "全科知识获取 +10%。",
	function () { return player.A.Goals.gte(10); });
addMilestone("A", 1, "完成 30 个成就", "全科知识获取 +20%。",
	function () { return player.A.Goals.gte(30); }, milestoneAfter("A", 1));
addMilestone("A", 2, "完成 50 个成就", "全科知识获取 +30%。",
	function () { return player.A.Goals.gte(50); }, milestoneAfter("A", 2));
addMilestone("A", 3, "完成 70 个成就", "全科知识获取 +50%。",
	function () { return player.A.Goals.gte(70); }, milestoneAfter("A", 3));

// ---------- Am：自动化 ----------

addMilestone("Am", 0, "开启 5 项自动化", "全科知识获取 +10%。",
	function () { return buyableTotal("Am") >= 5; });
addMilestone("Am", 1, "开启 10 项自动化", "全科知识获取 +20%。",
	function () { return buyableTotal("Am") >= 10; }, milestoneAfter("Am", 1));
addMilestone("Am", 2, "开启 15 项自动化", "全科知识获取 +30%。",
	function () { return buyableTotal("Am") >= 15; }, milestoneAfter("Am", 2));
addMilestone("Am", 3, "开启 20 项自动化", "全科知识获取 +50%。",
	function () { return buyableTotal("Am") >= 20; }, milestoneAfter("Am", 3));

// ---------- Exp：经验与挑战 ----------

addMilestone("Exp", 0, "经验等级达到 10", "全科知识获取 +10%。",
	function () { return player.Exp.level.gte(10); });
addMilestone("Exp", 1, "经验等级达到 100", "全科知识获取 +20%。",
	function () { return player.Exp.level.gte(100); }, milestoneAfter("Exp", 1));
addMilestone("Exp", 2, "经验等级达到 300", "全科知识获取 +30%。",
	function () { return player.Exp.level.gte(300); }, milestoneAfter("Exp", 2));
addMilestone("Exp", 3, "经验等级达到 678", "全科知识获取 +40%。",
	function () { return player.Exp.level.gte(678); }, milestoneAfter("Exp", 3));
addMilestone("Exp", 4, "累计完成 10 次经验挑战", "全科知识获取 +50%。",
	function () { return tmp.Exp && tmp.Exp.totalChallenges && tmp.Exp.totalChallenges.gte(10); }, milestoneAfter("Exp", 4));
addMilestone("Exp", 5, "经验点数达到 1e100", "全科知识获取 +50%。",
	function () { return player.Exp.points.gte("1e100"); }, milestoneAfter("Exp", 5));

// ---------- L：排行榜 ----------

addMilestone("L", 0, "最佳中考分数达到 50", "全科知识获取 +10%。",
	function () { return player.E.bestPoints.gte(50); });
addMilestone("L", 1, "最佳中考分数达到 100", "全科知识获取 +20%。",
	function () { return player.E.bestPoints.gte(100); }, milestoneAfter("L", 1));
addMilestone("L", 2, "最佳中考分数达到 200", "全科知识获取 +30%。",
	function () { return player.E.bestPoints.gte(200); }, milestoneAfter("L", 2));
addMilestone("L", 3, "最佳中考分数达到 256", "全科知识获取 +50%。",
	function () { return player.E.bestPoints.gte(256); }, milestoneAfter("L", 3));

// ---------- P：物理 ----------

const P_STATS = ["mechanics", "thermo", "optics", "electricity", "experiment"];
addMilestone("P", 0, "完成 1 次物理训练", "全科知识获取 +10%。",
	function () { return player.P.trainingRuns.gte(1); });
addMilestone("P", 1, "完成 5 次物理训练", "全科知识获取 +20%。",
	function () { return player.P.trainingRuns.gte(5); }, milestoneAfter("P", 1));
addMilestone("P", 2, "物理训练单次达到 80 分", "全科知识获取 +30%。",
	function () { return player.P.bestScore.gte(80); }, milestoneAfter("P", 2));
addMilestone("P", 3, "物理五项评分总和达到 100", "全科知识获取 +40%。",
	function () { return statTotal("P", P_STATS).gte(100); }, milestoneAfter("P", 3));
addMilestone("P", 4, "完成 10 次物理训练且最佳 90 分", "全科知识获取 +50%。",
	function () { return player.P.trainingRuns.gte(10) && player.P.bestScore.gte(90); }, milestoneAfter("P", 4));

// ---------- Chem：化学 ----------

const CHEM_STATS = ["formula", "equation", "experiment", "calculation", "concept"];
addMilestone("Chem", 0, "完成 1 次化学训练", "全科知识获取 +10%。",
	function () { return player.Chem.trainingRuns.gte(1); });
addMilestone("Chem", 1, "完成 5 次化学训练", "全科知识获取 +20%。",
	function () { return player.Chem.trainingRuns.gte(5); }, milestoneAfter("Chem", 1));
addMilestone("Chem", 2, "化学训练单次达到 80 分", "全科知识获取 +30%。",
	function () { return player.Chem.bestScore.gte(80); }, milestoneAfter("Chem", 2));
addMilestone("Chem", 3, "化学五项评分总和达到 100", "全科知识获取 +40%。",
	function () { return statTotal("Chem", CHEM_STATS).gte(100); }, milestoneAfter("Chem", 3));
addMilestone("Chem", 4, "完成 10 次化学训练且最佳 90 分", "全科知识获取 +50%。",
	function () { return player.Chem.trainingRuns.gte(10) && player.Chem.bestScore.gte(90); }, milestoneAfter("Chem", 4));

// ---------- PE：体育 ----------

const PE_STATS = ["speed", "endurance", "flexibility", "strength", "reaction"];
addMilestone("PE", 0, "完成 1 次体育训练", "全科知识获取 +10%。",
	function () { return player.PE.trainingRuns.gte(1); });
addMilestone("PE", 1, "反应速度达到 20%", "全科知识获取 +20%。",
	function () { return player.PE.reaction.gte(20); }, milestoneAfter("PE", 1));
addMilestone("PE", 2, "体育训练单次达到 80 分", "全科知识获取 +30%。",
	function () { return player.PE.bestScore.gte(80); }, milestoneAfter("PE", 2));
addMilestone("PE", 3, "体育能力达到 1,000", "全科知识获取 +40%。",
	function () { return player.PE.points.gte(1000); }, milestoneAfter("PE", 3));
addMilestone("PE", 4, "完成 10 次体育训练", "全科知识获取 +50%。",
	function () { return player.PE.trainingRuns.gte(10); }, milestoneAfter("PE", 4));

// ---------- Pol：政治 ----------

const POL_STATS = ["morality", "law", "national", "current", "answer"];
addMilestone("Pol", 0, "完成 1 次政治训练", "全科知识获取 +10%。",
	function () { return player.Pol.trainingRuns.gte(1); });
addMilestone("Pol", 1, "政治训练单次达到 80 分", "全科知识获取 +20%。",
	function () { return player.Pol.bestScore.gte(80); }, milestoneAfter("Pol", 1));
addMilestone("Pol", 2, "政治五项评分总和达到 50", "全科知识获取 +30%。",
	function () { return statTotal("Pol", POL_STATS).gte(50); }, milestoneAfter("Pol", 2));
addMilestone("Pol", 3, "背诵专区累计 10 次", "全科知识获取 +40%。",
	function () { return buyableTotal("Pol") >= 10; }, milestoneAfter("Pol", 3));
addMilestone("Pol", 4, "完成 10 次政治训练", "全科知识获取 +50%。",
	function () { return player.Pol.trainingRuns.gte(10); }, milestoneAfter("Pol", 4));

// ---------- His：历史 ----------

addMilestone("His", 0, "完成 1 次历史训练", "全科知识获取 +10%。",
	function () { return player.His.trainingRuns.gte(1); });
addMilestone("His", 1, "历史训练单次达到 80 分", "全科知识获取 +20%。",
	function () { return player.His.bestScore.gte(80); }, milestoneAfter("His", 1));
addMilestone("His", 2, "历史五项评分总和达到 50", "全科知识获取 +30%。",
	function () { return statTotal("His", ["timeline", "sources", "events", "figures", "essay"]).gte(50); }, milestoneAfter("His", 2));
addMilestone("His", 3, "历史背诵累计 10 次", "全科知识获取 +40%。",
	function () { return buyableTotal("His") >= 10; }, milestoneAfter("His", 3));
addMilestone("His", 4, "完成 10 次历史训练", "全科知识获取 +50%。",
	function () { return player.His.trainingRuns.gte(10); }, milestoneAfter("His", 4));

// ---------- Geo：地理 ----------

addMilestone("Geo", 0, "完成 1 次地理训练", "全科知识获取 +10%。",
	function () { return player.Geo.trainingRuns.gte(1); });
addMilestone("Geo", 1, "地理训练单次达到 80 分", "全科知识获取 +20%。",
	function () { return player.Geo.bestScore.gte(80); }, milestoneAfter("Geo", 1));
addMilestone("Geo", 2, "地理五项评分总和达到 50", "全科知识获取 +30%。",
	function () { return statTotal("Geo", ["map", "climate", "region", "resources", "comprehensive"]).gte(50); }, milestoneAfter("Geo", 2));
addMilestone("Geo", 3, "地理背诵累计 10 次", "全科知识获取 +40%。",
	function () { return buyableTotal("Geo") >= 10; }, milestoneAfter("Geo", 3));
addMilestone("Geo", 4, "完成 10 次地理训练", "全科知识获取 +50%。",
	function () { return player.Geo.trainingRuns.gte(10); }, milestoneAfter("Geo", 4));

// ---------- 全局里程碑倍率 ----------

function milestonePointMult() {
	// Additive rather than multiplicative: dozens of milestones should feel
	// rewarding, not turn the whole game into one giant exponent.
	let bonus = new OmegaNum(0);
	const add = function (layer, id, factor) {
		if (hasMilestone(layer, id)) bonus = bonus.add(factor - 1);
	};

	add("C", 12, 1.25); add("C", 13, 1.5); add("C", 14, 2);
	add("E", 25, 1.25); add("E", 26, 1.5); add("E", 27, 2);
	add("Eng", 18, 1.25); add("Eng", 19, 1.5); add("Eng", 20, 2);
	add("M", 0, 1.1); add("M", 1, 1.2); add("M", 2, 1.25); add("M", 3, 1.25); add("M", 4, 1.5);
	add("Nf", 0, 1.05); add("Nf", 1, 1.1); add("Nf", 2, 1.1); add("Nf", 3, 1.15);
	add("A", 0, 1.1); add("A", 1, 1.2); add("A", 2, 1.3); add("A", 3, 1.5);
	add("Am", 0, 1.1); add("Am", 1, 1.2); add("Am", 2, 1.3); add("Am", 3, 1.5);
	add("Exp", 0, 1.1); add("Exp", 1, 1.2); add("Exp", 2, 1.3); add("Exp", 3, 1.4); add("Exp", 4, 1.5); add("Exp", 5, 1.5);
	add("L", 0, 1.1); add("L", 1, 1.2); add("L", 2, 1.3); add("L", 3, 1.5);
	add("P", 0, 1.1); add("P", 1, 1.2); add("P", 2, 1.3); add("P", 3, 1.4); add("P", 4, 1.5);
	add("Chem", 0, 1.1); add("Chem", 1, 1.2); add("Chem", 2, 1.3); add("Chem", 3, 1.4); add("Chem", 4, 1.5);
	add("PE", 0, 1.1); add("PE", 1, 1.2); add("PE", 2, 1.3); add("PE", 3, 1.4); add("PE", 4, 1.5);
	add("Pol", 0, 1.1); add("Pol", 1, 1.2); add("Pol", 2, 1.3); add("Pol", 3, 1.4); add("Pol", 4, 1.5);
	add("His", 0, 1.1); add("His", 1, 1.2); add("His", 2, 1.3); add("His", 3, 1.4); add("His", 4, 1.5);
	add("Geo", 0, 1.1); add("Geo", 1, 1.2); add("Geo", 2, 1.3); add("Geo", 3, 1.4); add("Geo", 4, 1.5);
	return new OmegaNum(1).add(bonus);
}

// ---------- 里程碑页签 ----------

function addMilestoneTab(layer) {
	let L = layers[layer];
	if (!L || !L.tabFormat || Array.isArray(L.tabFormat)) return;
	if (L.tabFormat["里程碑"] || L.tabFormat.Milestones) return;
	L.tabFormat["里程碑"] = {
		content: ["milestones"],
		buttonStyle: { "border-color": L.color, "background-color": "#222222" },
	};
}

addMilestoneTab("M");
addMilestoneTab("Nf");
addMilestoneTab("Am");
addMilestoneTab("P");
addMilestoneTab("Chem");
addMilestoneTab("PE");
addMilestoneTab("Pol");
addMilestoneTab("His");
addMilestoneTab("Geo");

// A 层原本每个页签都塞了 milestones，改成专用页签避免重复。
if (layers.A && layers.A.tabFormat) {
	for (let tab in layers.A.tabFormat) {
		let content = layers.A.tabFormat[tab].content;
		if (Array.isArray(content)) {
			layers.A.tabFormat[tab].content = content.filter(function (item) {
				return item !== "milestones";
			});
		}
	}
	addMilestoneTab("A");
}
