// ============================================================
// 天津中考树：Rebirth
// 根据 2023-07-10 贴吧预告图补完的 P 层（Phigros / Rebirth）。
// 这一层承接 M 层原本的“重置并获得 ??????”占位按钮：
//   M 层毕业 -> 开启 P 层 -> 用残片转生 -> 收集/培养搭档 -> SlowlyMilestone / Reward
// ============================================================

const REBIRTH_PARTNERS = {
	11: {
		name: "Hikari",
		rarity: "Uncommon",
		color: "#1E8E3E",
		desc: "初始的理论研究搭档，可以辅助你完成数学理论的研究。",
		fragRate: 16, fragFlat: 1,
		stepRate: 11, stepFlat: -1,
		igceRate: 311, igceFlat: 1,
		costRate: 20, costFlat: 10,
	},
	12: {
		name: "Tairitsu",
		rarity: "Uncommon",
		color: "#1E8E3E",
		desc: "初始的理论研究搭档，可以辅助你完成数学理论的研究。",
		fragRate: 19, fragFlat: 4,
		stepRate: 19, stepFlat: 4,
		igceRate: 366, igceFlat: 8,
		costRate: 33, costFlat: 4,
	},
	13: {
		name: "Kou",
		rarity: "Rare",
		color: "#1936D8",
		desc: "稀有的搭档，主属性为智力。",
		fragRate: 40, fragFlat: 6,
		stepRate: 44, stepFlat: 3,
		igceRate: 1200, igceFlat: 0,
		costRate: 55, costFlat: 0,
	},
	14: {
		name: "Saya",
		rarity: "Rare",
		color: "#7A1FD0",
		desc: "沉默寡言的观测者。她能把杂乱的知识整理成清晰的理论，让转生后的复习事半功倍。",
		fragRate: 55, fragFlat: 5,
		stepRate: 60, stepFlat: 5,
		igceRate: 1500, igceFlat: 100,
		costRate: 70, costFlat: 10,
	},
	15: {
		name: "Lethe",
		rarity: "Rare",
		color: "#0F7F8F",
		desc: "掌管遗忘的搭档。她会让重复的刷题变得不再枯燥，使每一步都更有价值。",
		fragRate: 70, fragFlat: 0,
		stepRate: 80, stepFlat: 0,
		igceRate: 1800, igceFlat: 200,
		costRate: 85, costFlat: 20,
	},
	16: {
		name: "Ilith",
		rarity: "Legendary",
		color: "#C9A227",
		desc: "传说中的搭档。她的智力属性远超常人，是完成最终 Rebirth 的关键。",
		fragRate: 100, fragFlat: 0,
		stepRate: 100, stepFlat: 0,
		igceRate: 2500, igceFlat: 0,
		costRate: 110, costFlat: 0,
	},
};

const REBIRTH_PARTNER_ORDER = [11, 12, 13, 14, 15, 16];

// The game's format(..., 0) still prints ".00" for numbers below 1000,
// so use a small integer formatter for partner stats and costs.
function rebirthWhole(value) {
	let n = new OmegaNum(value);
	if (n.lt(1000)) return Math.floor(n.toNumber()).toString();
	return formatWhole(n);
}

function rebirthStatNumber(value) {
	let n = new OmegaNum(value);
	if (n.lt(1000000000)) return Math.floor(n.toNumber()).toString();
	return formatWhole(n);
}
const REBIRTH_INITIAL_PARTNERS = [11, 12, 13];
const REBIRTH_MAX_PARTNER_LEVEL = 20;

function rebirthPartnerDef(id) {
	return REBIRTH_PARTNERS[id];
}

function rebirthPartnerLevel(id) {
	if (!player.P || !player.P.partnerLevels) return 1;
	let level = player.P.partnerLevels[id];
	if (level === undefined) level = 1;
	level = Number(level);
	if (!isFinite(level) || level < 1) level = 1;
	return Math.min(REBIRTH_MAX_PARTNER_LEVEL, Math.floor(level));
}

function rebirthPartnerUnlocked(id) {
	if (!player.P || !player.P.partnerUnlocked) return REBIRTH_INITIAL_PARTNERS.includes(id);
	return !!player.P.partnerUnlocked[id];
}

function rebirthPartnerStats(id) {
	let def = rebirthPartnerDef(id);
	let level = rebirthPartnerLevel(id);
	return {
		frag: Math.floor(def.fragRate * level + def.fragFlat),
		step: Math.max(0, Math.floor(def.stepRate * level + def.stepFlat)),
		igce: Math.floor(def.igceRate * level + def.igceFlat),
	};
}

function rebirthSelectedPartner() {
	if (!player.P || player.P.selectedPartner === undefined) return 11;
	let id = Number(player.P.selectedPartner);
	if (!isFinite(id)) id = 11;
	if (!rebirthPartnerUnlocked(id)) return 11;
	return id;
}

function rebirthSelectedPartnerStats() {
	return rebirthPartnerStats(rebirthSelectedPartner());
}

function rebirthSelectedPartnerName() {
	let id = rebirthSelectedPartner();
	return "(" + rebirthPartnerDef(id).rarity + ")" + rebirthPartnerDef(id).name;
}

function rebirthTotalPartnerLevels() {
	let total = 0;
	for (let i = 0; i < REBIRTH_PARTNER_ORDER.length; i++) {
		let id = REBIRTH_PARTNER_ORDER[i];
		if (rebirthPartnerUnlocked(id)) total += rebirthPartnerLevel(id);
	}
	return total;
}

function rebirthCollectionMult() {
	return new OmegaNum(1).add(new OmegaNum(rebirthTotalPartnerLevels()).mul(0.005));
}

function rebirthPartnerUpgradeCost(id) {
	let def = rebirthPartnerDef(id);
	let level = rebirthPartnerLevel(id);
	let cost = def.costRate * level + def.costFlat;
	if (hasUpgrade("P", 14)) cost *= 0.9;
	return new OmegaNum(Math.max(1, Math.floor(cost)));
}

function rebirthCanUpgradePartner(id) {
	if (!player.P || !player.P.unlocked) return false;
	if (!rebirthPartnerUnlocked(id)) return false;
	if (rebirthPartnerLevel(id) >= REBIRTH_MAX_PARTNER_LEVEL) return false;
	return player.P.points.gte(rebirthPartnerUpgradeCost(id));
}

function rebirthUpgradePartner(id) {
	if (!rebirthCanUpgradePartner(id)) return;
	let cost = rebirthPartnerUpgradeCost(id);
	player.P.points = player.P.points.sub(cost);
	player.P.partnerLevels[id] = rebirthPartnerLevel(id) + 1;
	updateTemp();
	doPopup("rebirth", "搭档 " + rebirthPartnerDef(id).name + " 升到了 " + player.P.partnerLevels[id] + " 级！", "Partner Up", 3, rebirthPartnerDef(id).color);
}

function rebirthSelectPartner(id) {
	if (!rebirthPartnerUnlocked(id)) return;
	player.P.selectedPartner = id;
	updateTemp();
	doPopup("rebirth", "当前出战搭档已切换为 " + rebirthPartnerDef(id).name + "。", "Partner", 2.5, rebirthPartnerDef(id).color);
}

function rebirthFragMult() {
	let stats = rebirthSelectedPartnerStats();
	let mult = new OmegaNum(1).add(new OmegaNum(stats.frag).div(1000));
	mult = mult.mul(rebirthCollectionMult());
	if (hasUpgrade("P", 11)) mult = mult.mul(1.25);
	if (hasUpgrade("P", 15)) mult = mult.mul(2);
	if (hasMilestone("P", 0)) mult = mult.mul(1.1);
	if (hasMilestone("P", 5)) mult = mult.mul(2);
	if (hasMilestone("P", 7)) mult = mult.mul(1.25);
	if (hasMilestone("P", 8)) mult = mult.mul(3);
	if (hasMilestone("P", 11)) mult = mult.mul(5);
	return mult;
}

function rebirthStepRate() {
	let stats = rebirthSelectedPartnerStats();
	let rate = new OmegaNum(stats.step).div(100).mul(rebirthCollectionMult());
	if (hasUpgrade("P", 13)) rate = rate.mul(1.25);
	if (hasMilestone("P", 2)) rate = rate.mul(1.05);
	if (hasMilestone("P", 4)) rate = rate.mul(1.1);
	if (hasMilestone("P", 10)) rate = rate.mul(1.25);
	return rate;
}

function rebirthRewardTileStyle() {
	return {
		width: "230px",
		height: "190px",
		"background-color": "#5A005A",
		color: "white",
		border: "1px solid #FF66FF",
		"border-radius": "0px",
		"font-size": "13px",
	};
}

function rebirthIgceMult() {
	let stats = rebirthSelectedPartnerStats();
	let mult = new OmegaNum(1).add(new OmegaNum(stats.igce).div(10000));
	mult = mult.mul(rebirthCollectionMult());
	if (hasUpgrade("P", 12)) mult = mult.mul(1.5);
	if (hasUpgrade("P", 16)) mult = mult.mul(2);
	if (hasMilestone("P", 1)) mult = mult.mul(1.25);
	if (hasMilestone("P", 3)) mult = mult.mul(1.5);
	if (hasMilestone("P", 6)) mult = mult.mul(2);
	if (hasMilestone("P", 9)) mult = mult.mul(3);
	if (hasMilestone("P", 11)) mult = mult.mul(10);
	return mult;
}

function rebirthCanGraduate() {
	if (!player.E || !player.C || !player.Eng) return false;
	let best = player.E.bestPoints || new OmegaNum(0);
	let engPower = player.Eng.power || new OmegaNum(0);
	let chinese = player.C.points || new OmegaNum(0);
	let engNodes = (player.Eng.upgrades || []).length;
	return best.gte(200) && engPower.gte("1e1444") && engNodes >= 56 && chinese.gte("1e60000");
}

function rebirthRequirementHTML() {
	let best = player.E.bestPoints || new OmegaNum(0);
	let engPower = player.Eng.power || new OmegaNum(0);
	let chinese = player.C.points || new OmegaNum(0);
	let engNodes = (player.Eng.upgrades || []).length;
	let rows = [
		["中考最佳分数", rebirthWhole(best) + " / 200", best.gte(200)],
		["英语知识", format(engPower) + " / 1e1444", engPower.gte("1e1444")],
		["英语网格节点", engNodes + " / 56", engNodes >= 56],
		["语文知识", format(chinese) + " / 1e60000", chinese.gte("1e60000")],
	];
	let out = "";
	for (let i = 0; i < rows.length; i++) {
		let color = rows[i][2] ? "#66FF66" : "#FF7777";
		out += "<span style='color:" + color + "'>" + rows[i][0] + "：" + rows[i][1] + "</span><br>";
	}
	return out;
}

function rebirthBaseGain() {
	let best = player.E.bestPoints || new OmegaNum(0);
	let chinese = player.C.points || new OmegaNum(0);
	let engPower = player.Eng.power || new OmegaNum(0);
	let engNodes = (player.Eng.upgrades || []).length;
	let base = new OmegaNum(100);
	base = base.add(best.sub(200).max(0).mul(2));
	base = base.add(chinese.add(10).log10().mul(0.01));
	base = base.add(engPower.add(10).log10().mul(0.2));
	base = base.add(engNodes);
	return base;
}

function rebirthGain() {
	return rebirthBaseGain().mul(rebirthFragMult()).floor().max(1);
}

// E 层原本没有 doReset；P 层转生需要重置中考本轮进度，
// 但必须保留最佳分数、已达成里程碑、姓名、年份与历史最佳排名。
layers.E.doReset = function () {
	let keep = {
		bestPoints: player.E.bestPoints,
		milestones: (player.E.milestones || []).slice(),
		lastMilestone: player.E.lastMilestone,
		year: player.E.year,
		name: player.E.name,
		InText: player.E.InText,
		rank: player.E.rank,
		ChineseBest: player.E.ChineseBest,
		EnglishBest: player.E.EnglishBest,
		ccBest: player.E.ccBest,
	};
	layerDataReset("E");
	player.E.bestPoints = keep.bestPoints;
	player.E.milestones = keep.milestones;
	player.E.lastMilestone = keep.lastMilestone;
	player.E.year = keep.year;
	player.E.name = keep.name;
	player.E.InText = keep.InText;
	player.E.rank = keep.rank;
	player.E.ChineseBest = keep.ChineseBest;
	player.E.EnglishBest = keep.EnglishBest;
	player.E.ccBest = keep.ccBest;
};

function rebirthPerform(first) {
	if (!player.P) return;
	let gain = rebirthGain();
	if (first) gain = gain.max(1208);

	// 先记录本轮数据，再重置 C / Eng / M / E。
	layerDataReset("C");
	layerDataReset("Eng");
	layerDataReset("M");
	layers.E.doReset();

	player.points = getStartPoints();
	player.P.unlocked = true;
	player.P.firstRebirthDone = true;
	player.P.rebirths = player.P.rebirths.add(1);
	player.P.lastGain = gain;
	addPoints("P", gain);

	updateMilestones("E");
	updateMilestones("P");
	updateAchievements("A");
	updateTemp();
	updateTemp();
	needCanvasUpdate = true;

	doPopup(
		"rebirth",
		"获得了 " + format(gain) + " 残片！<br>当前搭档：" + rebirthSelectedPartnerName(),
		"Rebirth " + rebirthWhole(player.P.rebirths),
		5,
		"#FF00FF"
	);
}

function rebirthStartFirst() {
	if (!player.P || player.P.unlocked) return;
	if (!rebirthCanGraduate()) return;
	rebirthPerform(true);
}

function rebirthDoReset() {
	if (!player.P || !player.P.unlocked) return;
	if (!rebirthCanGraduate()) return;
	rebirthPerform(false);
}

// ---------- 搭档卡片与选择按钮 ----------

function rebirthPartnerCard(id) {
	let def = rebirthPartnerDef(id);
	return {
		title() {
			return "(" + def.rarity + ")" + def.name;
		},
		display() {
			let level = rebirthPartnerLevel(id);
			let stats = rebirthPartnerStats(id);
			let cost = rebirthPartnerUpgradeCost(id);
			let hint = "";
			if (level >= REBIRTH_MAX_PARTNER_LEVEL) hint = "<br><span style='color:#FFD700'>已满级</span>";
			else if (player.P.points.gte(cost)) hint = "<br><span style='color:#FFFF66'>点击卡片升级</span>";
			else hint = "<br><span style='color:#DDDDDD'>残片不足</span>";
			return (
				def.desc +
				"<br><br>搭档属性：" +
				"<br>FRAG " + rebirthStatNumber(stats.frag) +
				"<br>STEP " + rebirthStatNumber(stats.step) +
				"<br>IGCE " + rebirthStatNumber(stats.igce) +
				"<br><br>升级所需：" + rebirthStatNumber(cost) + " 残片" +
				"<br>等级：" + level + "/" + REBIRTH_MAX_PARTNER_LEVEL +
				hint
			);
		},
		unlocked() {
			return rebirthPartnerUnlocked(id);
		},
		canClick() {
			return rebirthCanUpgradePartner(id);
		},
		onClick() {
			rebirthUpgradePartner(id);
		},
		style: {
			width: "250px",
			height: "320px",
			"background-color": def.color,
			color: "white",
			border: "1px solid white",
			"border-radius": "0px",
			"font-size": "13px",
			padding: "10px",
		},
		tooltip() {
			return "点击消耗残片升级 " + def.name;
		},
	};
}

function rebirthPartnerSelect(id) {
	let def = rebirthPartnerDef(id);
	return {
		display() {
			return rebirthSelectedPartner() === id ? "已选择" : "选择";
		},
		unlocked() {
			return rebirthPartnerUnlocked(id);
		},
		canClick() {
			return rebirthSelectedPartner() !== id;
		},
		onClick() {
			rebirthSelectPartner(id);
		},
		style: {
			width: "250px",
			height: "50px",
			"background-color": "#D9D9D9",
			color: "#000000",
			border: "1px solid white",
			"border-radius": "0px",
			"font-size": "18px",
		},
		tooltip() {
			return "让 " + def.name + " 成为当前出战搭档";
		},
	};
}

function rebirthSlowMilestone(req, effect) {
	return {
		requirementDescription() {
			return "累计研究步数达到 " + rebirthWhole(req);
		},
		effectDescription() {
			return effect;
		},
		done() {
			return player.P.totalSteps.gte(req);
		},
	};
}

// ---------- P 层 ----------

addLayer("P", {
	startData() {
		return {
			unlocked: false,
			points: new OmegaNum(0),
			total: new OmegaNum(0),
			best: new OmegaNum(0),
			selectedPartner: 11,
			partnerLevels: {
				11: 1, 12: 1, 13: 1,
				14: 1, 15: 1, 16: 1,
			},
			partnerUnlocked: {
				11: true, 12: true, 13: true,
				14: false, 15: false, 16: false,
			},
			steps: new OmegaNum(0),
			totalSteps: new OmegaNum(0),
			rebirths: new OmegaNum(0),
			lastGain: new OmegaNum(0),
			firstRebirthDone: false,
		};
	},

	color: "#FF00FF",
	resource: "残片",
	row: 2,
	position: 0,
	type: "none",
	name: "Rebirth",

	layerShown() {
		return (player.P && player.P.unlocked) || hasMilestone("E", 24);
	},
	tooltip() {
		if (!player.P || !player.P.unlocked) return "Phigros：Rebirth<br>完成 M 层的 Phigros 重置后开启";
		return "残片：" + format(player.P.points) + "<br>当前搭档：" + rebirthSelectedPartnerName() + "<br>已转生：" + rebirthWhole(player.P.rebirths) + " 次";
	},
	tooltipLocked() {
		return "Phigros：Rebirth<br>完成 M 层的 Phigros 重置后开启";
	},
	branches: [["E", "#FF00FF", 30]],

	update(diff) {
		if (!player.P || !player.P.unlocked) return;
		let rate = rebirthStepRate();
		player.P.steps = player.P.steps.add(rate.mul(diff));
		player.P.totalSteps = player.P.totalSteps.add(rate.mul(diff));
	},

	// 供 mod.js 的 getPointGen 与 P 层界面读取
	fragMult() {
		return rebirthFragMult();
	},
	stepRate() {
		return rebirthStepRate();
	},
	igceMult() {
		return rebirthIgceMult();
	},
	collectionMult() {
		return rebirthCollectionMult();
	},

	clickables: {
		11: rebirthPartnerCard(11),
		12: rebirthPartnerCard(12),
		13: rebirthPartnerCard(13),
		14: rebirthPartnerCard(14),
		15: rebirthPartnerCard(15),
		16: rebirthPartnerCard(16),
		21: rebirthPartnerSelect(11),
		22: rebirthPartnerSelect(12),
		23: rebirthPartnerSelect(13),
		24: rebirthPartnerSelect(14),
		25: rebirthPartnerSelect(15),
		26: rebirthPartnerSelect(16),
		31: {
			title() {
				return "Rebirth";
			},
			display() {
				if (rebirthCanGraduate()) {
					return "重置本轮中考进度，保留最佳分数、E 层里程碑与所有搭档。<br><br>本次转生可获得：<h2 style='color:#FF66FF'>" + format(rebirthGain()) + "</h2> 残片<br>点击开始转生。";
				}
				return "尚未达到转生条件。<br><br>" + rebirthRequirementHTML() + "<br>转生会重置 C / Eng / M / E 的本轮进度，但保留最佳分数、E 层里程碑和搭档。";
			},
			canClick() {
				return rebirthCanGraduate();
			},
			onClick() {
				rebirthDoReset();
			},
			style: {
				width: "440px",
				height: "190px",
				"background-color": "#C000C0",
				color: "white",
				border: "1px solid #FF66FF",
				"border-radius": "0px",
				"font-size": "16px",
			},
			tooltip() {
				return "Phigros：Rebirth";
			},
		},
	},

	milestones: {
		0: rebirthSlowMilestone(100, "残片获取 +10%。"),
		1: rebirthSlowMilestone(500, "全科知识获取 +25%。"),
		2: rebirthSlowMilestone(2000, "研究步数获取 +5%。"),
		3: rebirthSlowMilestone(5000, "全科知识获取 +50%。"),
		4: rebirthSlowMilestone(10000, "研究步数获取 +10%。"),
		5: rebirthSlowMilestone(25000, "残片获取 x2。"),
		6: rebirthSlowMilestone(50000, "全科知识获取 x2。"),
		7: rebirthSlowMilestone(100000, "残片获取 +25%。"),
		8: rebirthSlowMilestone(200000, "残片获取 x3。"),
		9: rebirthSlowMilestone(350000, "全科知识获取 x3。"),
		10: rebirthSlowMilestone(500000, "研究步数获取 +25%。"),
		11: rebirthSlowMilestone(1000000, "终极奖励：残片获取 x5，全科知识获取 x10，并达成当前版本毕业。"),
	},

	upgrades: {
		11: {
			title: "残片增幅 I",
			description: "转生获得的残片 +25%。",
			cost: new OmegaNum(500),
			currencyDisplayName: "残片",
			style: rebirthRewardTileStyle(),
			effectDisplay() {
				return "x1.25";
			},
		},
		12: {
			title: "全科增幅 I",
			description: "当前出战搭档的 IGCE 效果 +50%。",
			cost: new OmegaNum(800),
			currencyDisplayName: "残片",
			style: rebirthRewardTileStyle(),
			effectDisplay() {
				return "x1.5";
			},
		},
		13: {
			title: "步数增幅 I",
			description: "研究步数获取 +25%。",
			cost: new OmegaNum(1200),
			currencyDisplayName: "残片",
			style: rebirthRewardTileStyle(),
			effectDisplay() {
				return "x1.25";
			},
		},
		14: {
			title: "搭档折扣 I",
			description: "搭档升级费用 -10%。",
			cost: new OmegaNum(1600),
			currencyDisplayName: "残片",
			style: rebirthRewardTileStyle(),
			effectDisplay() {
				return "-10%";
			},
		},
		15: {
			title: "残片增幅 II",
			description: "转生获得的残片 x2。",
			cost: new OmegaNum(5000),
			currencyDisplayName: "残片",
			style: rebirthRewardTileStyle(),
			effectDisplay() {
				return "x2";
			},
		},
		16: {
			title: "全科增幅 II",
			description: "当前出战搭档的 IGCE 效果 x2。",
			cost: new OmegaNum(8000),
			currencyDisplayName: "残片",
			style: rebirthRewardTileStyle(),
			effectDisplay() {
				return "x2";
			},
		},
		17: {
			title: "解锁搭档：Saya",
			description: "解锁 Rare 搭档 Saya。",
			cost: new OmegaNum(2000),
			currencyDisplayName: "残片",
			style: rebirthRewardTileStyle(),
			onPurchase() {
				player.P.partnerUnlocked[14] = true;
			},
			effectDisplay() {
				return hasUpgrade("P", 17) ? "已解锁" : "未解锁";
			},
		},
		18: {
			title: "解锁搭档：Lethe",
			description: "解锁 Rare 搭档 Lethe。",
			cost: new OmegaNum(6000),
			currencyDisplayName: "残片",
			style: rebirthRewardTileStyle(),
			onPurchase() {
				player.P.partnerUnlocked[15] = true;
			},
			effectDisplay() {
				return hasUpgrade("P", 18) ? "已解锁" : "未解锁";
			},
		},
		19: {
			title: "解锁搭档：Ilith",
			description: "解锁 Legendary 搭档 Ilith。",
			cost: new OmegaNum(12000),
			currencyDisplayName: "残片",
			style: rebirthRewardTileStyle(),
			onPurchase() {
				player.P.partnerUnlocked[16] = true;
			},
			effectDisplay() {
				return hasUpgrade("P", 19) ? "已解锁" : "未解锁";
			},
		},
	},

	infoboxes: {
		rebirthBox: {
			title() {
				return "Rebirth";
			},
			body() {
				return (
					"完成 M 层的 Phigros 重置后，P 层会出现在树下。<br><br>" +
					"每次 Rebirth 都会重置本轮的中考进度，并把本轮成绩换算成 <b style='color:#FF66FF'>残片</b>。" +
					"残片可以用来升级搭档、购买 Reward 页签中的永久奖励。<br><br>" +
					"Frag：提高残片获取；Step：每秒产出研究步数；IGCE：提高全科知识获取。<br><br>" +
					"SlowlyMilestone 会随着累计研究步数慢慢解锁，急不得。"
				);
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
			buttonStyle: { "font-size": "16px", padding: "4px 8px" },
			content: [
				["display-text", function () {
					return "<h2 style='color:#FF66FF;text-shadow:0px 0px 10px #FF66FF'>Phigros：Rebirth</h2>";
				}],
				["display-text", function () {
					return "您当前拥有残片：<h2 style='color:#FF66FF'>" + format(player.P.points) + "</h2>";
				}],
				"blank",
				["display-text", function () {
					return "已转生 <b>" + rebirthWhole(player.P.rebirths) + "</b> 次 · 累计获得 <b>" + format(player.P.total) + "</b> 残片";
				}],
				["display-text", function () {
					let stats = rebirthSelectedPartnerStats();
					return "当前搭档：<b>" + rebirthSelectedPartnerName() + "</b><br>" +
						"FRAG " + rebirthStatNumber(stats.frag) + " · STEP " + rebirthStatNumber(stats.step) + " · IGCE " + rebirthStatNumber(stats.igce);
				}],
				["display-text", function () {
					return "图鉴加成 x" + format(rebirthCollectionMult()) +
						" · 残片倍率 x" + format(rebirthFragMult()) +
						" · 全科倍率 x" + format(rebirthIgceMult()) +
						" · 每秒步数 " + format(rebirthStepRate());
				}],
				"blank",
				["display-text", function () {
					return "累计研究步数：<b>" + format(player.P.totalSteps) + "</b> / 1,000,000（SlowlyMilestone 终点）";
				}],
				"blank",
				["clickable", 31],
				"blank",
				["infobox", "rebirthBox"],
			],
		},
		SlowlyMilestone: {
			buttonStyle: { "font-size": "16px", padding: "4px 8px" },
			content: [
				["display-text", function () {
					return "<h2 style='color:#FF66FF'>SlowlyMilestone</h2>";
				}],
				["display-text", function () {
					return "累计研究步数：<b style='color:#FF66FF'>" + format(player.P.totalSteps) + "</b><br>当前每秒步数：" + format(rebirthStepRate());
				}],
				"blank",
				"milestones",
			],
		},
		Partner: {
			buttonStyle: { "font-size": "16px", padding: "4px 8px" },
			content: [
				["display-text", function () {
					return "您当前拥有残片：<h2 style='color:#FF66FF'>" + format(player.P.points) + "</h2>";
				}],
				["display-text", function () {
					return "总搭档等级：<b>" + rebirthTotalPartnerLevels() + "</b> · 图鉴加成 x" + format(rebirthCollectionMult());
				}],
				"blank",
				["row", [
					["column", [["clickable", 11], ["clickable", 21]]],
					["column", [["clickable", 12], ["clickable", 22]]],
					["column", [["clickable", 13], ["clickable", 23]]],
				]],
				function () {
					if (player.P.partnerUnlocked[14] || player.P.partnerUnlocked[15] || player.P.partnerUnlocked[16]) {
						return ["row", [
							["column", [["clickable", 14], ["clickable", 24]]],
							["column", [["clickable", 15], ["clickable", 25]]],
							["column", [["clickable", 16], ["clickable", 26]]],
						]];
					}
					return ["display-text", "更多搭档可以在 Reward 页签中解锁。"];
				},
				"blank",
				["display-text", "点击卡片消耗残片升级；点击“选择”切换当前出战搭档。只有当前出战搭档的 FRAG / STEP / IGCE 会生效。"],
			],
		},
		Reward: {
			buttonStyle: { "font-size": "16px", padding: "4px 8px" },
			content: [
				["display-text", function () {
					return "<h2 style='color:#FF66FF'>Reward</h2>";
				}],
				["display-text", function () {
					return "消耗残片购买永久奖励。当前残片：<b style='color:#FF66FF'>" + format(player.P.points) + "</b>";
				}],
				"blank",
				"upgrades",
			],
		},
	},
});

// ---------- M 层的 Phigros 入口：替换原来的占位 buyable ----------

layers.M.buyables = {};
layers.M.clickables = {
	11: {
		title() {
			return player.P.unlocked ? "Rebirth 已开启" : "重置并获得 残片";
		},
		display() {
			if (player.P.unlocked) {
				return "您已完成 Phigros 重置，Rebirth 层已开启。<br><br>" +
					"当前残片：<b style='color:#FF66FF'>" + format(player.P.points) + "</b><br>" +
					"已转生：" + rebirthWhole(player.P.rebirths) + " 次<br><br>" +
					"点击前往 P 层。";
			}
			let gainText = rebirthCanGraduate()
				? "<br><br>本次至少获得 <b style='color:#FF66FF'>" + format(rebirthGain().max(1208)) + "</b> 残片，并开启 P 层。"
				: "<br><br>达到全部条件后即可开启 Rebirth。";
			return "完成当前版本的全部毕业条件，进入 Phigros：Rebirth。<br><br>" +
				rebirthRequirementHTML() + gainText;
		},
		canClick() {
			return player.P.unlocked || rebirthCanGraduate();
		},
		onClick() {
			if (player.P.unlocked) showTab("P");
			else rebirthStartFirst();
		},
		style: {
			width: "400px",
			height: "300px",
			"background-color": "#C08080",
			color: "white",
			border: "1px solid #FF9999",
			"border-radius": "30px",
			"font-size": "14px",
		},
		tooltip() {
			return "Phigros：Rebirth";
		},
	},
};
layers.M.tabFormat = {
	Phigros: {
		content: ["clickables"],
	},
};

// ---------- 修复成就页，并加入 Rebirth 成就页签 ----------

// A 层是 side 层，没有 points；原版 tabFormat 里却放了 main-display 和
// prestige-button，打开成就页时报 “Cannot read properties of undefined (reading 'lt')”。
for (let tab in layers.A.tabFormat) {
	let content = layers.A.tabFormat[tab].content;
	if (Array.isArray(content)) {
		layers.A.tabFormat[tab].content = content.filter(function (item) {
			return item !== "main-display" && item !== "prestige-button";
		});
	}
}
layers.A.tabFormat.Rebirth = {
	content: [
		["display-text", function () {
			return "<h2 style='color:#FF66FF'>Rebirth 成就</h2><br>已完成成就：<b style='color:#FF66FF'>" + player.A.Goals + "</b>";
		}],
		"blank",
		["row", [
			["achievement", 91],
			["achievement", 92],
			["achievement", 93],
			["achievement", 94],
			["achievement", 95],
		]],
		"blank",
		["display-text", "这些成就会在 Phigros：Rebirth 的旅途中自动解锁。"],
	],
	buttonStyle: { "border-color": "#FF00FF", "background-color": "#5A005A" },
};

layers.A.achievements[91] = {
	name: "Rebirth",
	done() {
		return player.P && player.P.unlocked;
	},
	onComplete() {
		player.A.Goals = player.A.Goals.add(1);
	},
	tooltip: "开启 Phigros：Rebirth。",
};
layers.A.achievements[92] = {
	name: "研究搭档",
	done() {
		for (let i = 0; i < REBIRTH_PARTNER_ORDER.length; i++) {
			if (rebirthPartnerLevel(REBIRTH_PARTNER_ORDER[i]) >= 10) return true;
		}
		return false;
	},
	onComplete() {
		player.A.Goals = player.A.Goals.add(1);
	},
	tooltip: "将任意一位搭档升到 10 级。",
};
layers.A.achievements[93] = {
	name: "一步一个脚印",
	done() {
		return player.P && player.P.totalSteps && player.P.totalSteps.gte(10000);
	},
	onComplete() {
		player.A.Goals = player.A.Goals.add(1);
	},
	tooltip: "累计研究步数达到 10,000。",
};
layers.A.achievements[94] = {
	name: "慢慢来，比较快",
	done() {
		return hasMilestone("P", 8);
	},
	onComplete() {
		player.A.Goals = player.A.Goals.add(1);
	},
	tooltip: "完成 SlowlyMilestone 8。",
};
layers.A.achievements[95] = {
	name: "第十次新生",
	done() {
		return player.P && player.P.rebirths && player.P.rebirths.gte(10);
	},
	onComplete() {
		player.A.Goals = player.A.Goals.add(1);
	},
	tooltip: "完成 10 次 Rebirth。",
};
