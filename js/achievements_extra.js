// ============================================================
// 额外成就系统：把各层里程碑接入 A 层成就
// ============================================================

function extraAGoal() {
	player.A.Goals = player.A.Goals.add(1);
}

function totalMilestoneCount() {
	let total = 0;
	for (let layer in layers) {
		if (player[layer] && player[layer].milestones) total += player[layer].milestones.length;
	}
	return total;
}

function extraAchievement(id, name, done, tooltip) {
	layers.A.achievements[id] = {
		name: name,
		done: done,
		onComplete: extraAGoal,
		tooltip: tooltip,
	};
}

// 数学
extraAchievement(111, "数学里程碑 I", function () { return hasMilestone("M", 0); }, "达成第一个数学理论里程碑。");
extraAchievement(112, "数学里程碑 II", function () { return hasMilestone("M", 2); }, "购买 56 个英语网格节点，完成数学里程碑 2。");
extraAchievement(113, "数学里程碑 III", function () { return hasMilestone("M", 4); }, "达成数学理论里程碑 4。");

// 计数法 / 考试策略
extraAchievement(114, "计数法里程碑", function () { return hasMilestone("Nf", 0); }, "选择一次计数法。");
extraAchievement(115, "考试策略里程碑", function () { return hasMilestone("Nf", 1); }, "选择一次考试策略。");
extraAchievement(116, "策略大师", function () { return hasMilestone("Nf", 3); }, "触发一次隐藏策略成就。");

// 自动化
extraAchievement(117, "自动化里程碑 I", function () { return hasMilestone("Am", 0); }, "开启 5 项自动化。");
extraAchievement(118, "自动化里程碑 II", function () { return hasMilestone("Am", 1); }, "开启 10 项自动化。");
extraAchievement(119, "全自动", function () { return hasMilestone("Am", 3); }, "开启 20 项自动化。");

// 经验
extraAchievement(120, "经验里程碑 I", function () { return hasMilestone("Exp", 1); }, "经验等级达到 100。");
extraAchievement(121, "经验里程碑 II", function () { return hasMilestone("Exp", 3); }, "经验等级达到 678。");
extraAchievement(122, "挑战者", function () { return hasMilestone("Exp", 4); }, "累计完成 10 次经验挑战。");

// 排行榜
extraAchievement(123, "排行榜里程碑 I", function () { return hasMilestone("L", 1); }, "最佳中考分数达到 100。");
extraAchievement(124, "排行榜里程碑 II", function () { return hasMilestone("L", 2); }, "最佳中考分数达到 200。");
extraAchievement(125, "榜首", function () { return hasMilestone("L", 3); }, "最佳中考分数达到 256。");

// 语文后期
extraAchievement(126, "语文里程碑 I", function () { return hasMilestone("C", 12); }, "语文知识达到 1e1000。");
extraAchievement(127, "语文里程碑 II", function () { return hasMilestone("C", 13); }, "语文知识达到 1e10000。");
extraAchievement(128, "语文里程碑 III", function () { return hasMilestone("C", 14); }, "语文知识达到 1e60000。");

// 中考后期
extraAchievement(129, "中考里程碑 I", function () { return hasMilestone("E", 25); }, "最佳中考分数达到 256。");
extraAchievement(130, "中考里程碑 II", function () { return hasMilestone("E", 26); }, "最佳中考分数达到 512。");
extraAchievement(131, "千分", function () { return hasMilestone("E", 27); }, "最佳中考分数达到 1024。");

// 英语后期
extraAchievement(132, "英语里程碑 I", function () { return hasMilestone("Eng", 18); }, "英语知识达到 1e1444。");
extraAchievement(133, "英语里程碑 II", function () { return hasMilestone("Eng", 19); }, "英语知识达到 1e3000。");
extraAchievement(134, "英语里程碑 III", function () { return hasMilestone("Eng", 20); }, "英语知识达到 1e6000。");

// 全层里程碑收集
extraAchievement(135, "里程碑收集者", function () { return totalMilestoneCount() >= 10; }, "累计达成 10 个里程碑。");
extraAchievement(136, "里程碑大师", function () { return totalMilestoneCount() >= 30; }, "累计达成 30 个里程碑。");
extraAchievement(137, "全层里程碑", function () { return totalMilestoneCount() >= 50; }, "累计达成 50 个里程碑。");

// 成就自身
extraAchievement(138, "成就达人", function () { return player.A.Goals.gte(50); }, "完成 50 个成就。");
extraAchievement(139, "成就狂人", function () { return player.A.Goals.gte(70); }, "完成 70 个成就。");

// 成就页签
layers.A.tabFormat["数学 / 策略 / 自动化"] = {
	content: [
		["display-text", function () {
			return "<h2 style='color:#FF66FF'>数学 / 计数法 / 自动化成就</h2><br>已完成成就：<b style='color:#FF66FF'>" + player.A.Goals + "</b>";
		}],
		"blank",
		["row", [["achievement", 111], ["achievement", 112], ["achievement", 113]]],
		["row", [["achievement", 114], ["achievement", 115], ["achievement", 116]]],
		["row", [["achievement", 117], ["achievement", 118], ["achievement", 119]]],
	],
	buttonStyle: { "border-color": "#FF66FF", "background-color": "#3A003A" },
};

layers.A.tabFormat["经验 / 排行榜"] = {
	content: [
		["display-text", function () {
			return "<h2 style='color:#6495ED'>经验 / 排行榜成就</h2><br>已完成成就：<b style='color:#FF66FF'>" + player.A.Goals + "</b>";
		}],
		"blank",
		["row", [["achievement", 120], ["achievement", 121], ["achievement", 122]]],
		["row", [["achievement", 123], ["achievement", 124], ["achievement", 125]]],
	],
	buttonStyle: { "border-color": "#6495ED", "background-color": "#001A3A" },
};

layers.A.tabFormat["语文 / 中考 / 英语"] = {
	content: [
		["display-text", function () {
			return "<h2 style='color:#FFD700'>语文 / 中考 / 英语后期成就</h2><br>已完成成就：<b style='color:#FF66FF'>" + player.A.Goals + "</b>";
		}],
		"blank",
		["row", [["achievement", 126], ["achievement", 127], ["achievement", 128]]],
		["row", [["achievement", 129], ["achievement", 130], ["achievement", 131]]],
		["row", [["achievement", 132], ["achievement", 133], ["achievement", 134]]],
	],
	buttonStyle: { "border-color": "#FFD700", "background-color": "#3A2A00" },
};

layers.A.tabFormat["全局里程碑"] = {
	content: [
		["display-text", function () {
			return "<h2 style='color:#FF66FF'>全局里程碑成就</h2><br>已完成成就：<b style='color:#FF66FF'>" + player.A.Goals + "</b>";
		}],
		"blank",
		["row", [["achievement", 135], ["achievement", 136], ["achievement", 137]]],
		["row", [["achievement", 138], ["achievement", 139]]],
		"blank",
		["display-text", function () {
			return "当前累计里程碑：" + totalMilestoneCount() + " 个";
		}],
	],
	buttonStyle: { "border-color": "#FF66FF", "background-color": "#3A003A" },
};
