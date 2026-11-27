// ============================================================
// 成就剧情：成长档案
// 用成就数量 + 关键进度解锁章节，并给所有成就补充剧情提示。
// ============================================================

function storyAnyTraining() {
	const ids = ["P", "Chem", "Bio", "PE", "Pol", "His", "Geo"];
	for (let i = 0; i < ids.length; i++) {
		if (player[ids[i]] && player[ids[i]].trainingRuns && player[ids[i]].trainingRuns.gte(1)) return true;
	}
	return false;
}

function storyAnyScienceTraining() {
	const ids = ["P", "Chem", "Bio"];
	for (let i = 0; i < ids.length; i++) {
		if (player[ids[i]] && player[ids[i]].trainingRuns && player[ids[i]].trainingRuns.gte(1)) return true;
	}
	return false;
}

function storyAnySocialTraining() {
	const ids = ["Pol", "His", "Geo"];
	for (let i = 0; i < ids.length; i++) {
		if (player[ids[i]] && player[ids[i]].trainingRuns && player[ids[i]].trainingRuns.gte(1)) return true;
	}
	return false;
}

const ACHIEVEMENT_CHAPTERS = [
	{
		title: "序章 · 倒数第一",
		color: "#C8C8C8",
		requirement: "开局自动解锁",
		done() { return true; },
		line: "你从最后一排抬起头，第一次认真看黑板上的倒计时。",
		text: "百日誓师那天，你坐在教室最后一排。成绩单上的名次稳定得刺眼，倒数第一像是专门为你留的位置。可当你抬头看见黑板上的倒计时，你忽然不想再把剩下的日子交给“来不及了”。",
	},
	{
		title: "第一章 · 第一分",
		color: "#FFD700",
		requirement: "完成 5 个成就，或在中考中获得 1 分",
		done() { return player.A.Goals.gte(5) || player.E.bestPoints.gte(1); },
		line: "成绩单上第一次出现了不是零的数字。",
		text: "你从最简单的字音字形开始，把每一道错题抄进本子。第一次模拟考，你的分数只够在角落占一行，但那是你自己挣来的第一分。你把它圈了起来，像给漫长黑夜点了一盏很小的灯。",
	},
	{
		title: "第二章 · 语文的缝隙",
		color: "#D8D8D8",
		requirement: "完成 15 个成就，或名著阶层达到 1",
		done() { return player.A.Goals.gte(15) || (player.C && player.C.tier.gte(1)); },
		line: "阅读题不再像天书，字里行间开始有你能抓住的手。",
		text: "你开始每天读一点，从好词好句读到整篇文章。以前看不懂的阅读题，慢慢露出结构：这一句在铺垫，那一段在转折。语文没有立刻变成高分，但它先教会你，耐心本身也是一种得分方式。",
	},
	{
		title: "第三章 · 单词的节奏",
		color: "#909561",
		requirement: "完成 30 个成就，或英语单词达到 1",
		done() { return player.A.Goals.gte(30) || (player.Eng && player.Eng.totalpp.gte(1)); },
		line: "单词本从第一页翻到了第十页。",
		text: "英语曾经是一串你记不住的字母。你把单词拆成音节，在早读时一遍遍念。某天听力里突然跳出一个你认识的词，你第一次觉得，这门语言也许不是来嘲笑你的。",
	},
	{
		title: "第四章 · 理科的秩序",
		color: "#00BFFF",
		requirement: "完成 45 个成就，或物理 / 化学 / 生物训练 1 次",
		done() { return player.A.Goals.gte(45) || storyAnyScienceTraining(); },
		line: "公式、方程式和细胞图，开始有了各自的秩序。",
		text: "你把物理公式贴在桌前，把化学方程式抄在卡片上，把生物图册翻到卷边。理科不再只是背结论，而是先问一句“为什么”。当你能独立推出一步，那种踏实感比分数更早到来。",
	},
	{
		title: "第五章 · 时间与地图",
		color: "#E74C3C",
		requirement: "完成 60 个成就，或政治 / 历史 / 地理训练 1 次",
		done() { return player.A.Goals.gte(60) || storyAnySocialTraining(); },
		line: "年代线和地图，在你的脑子里慢慢接上了。",
		text: "你开始把历史事件按时间排开，把地理区域按位置记住，再用政治的框架去解释它们。材料题不再只是抄材料，你学会了从材料里找观点，也学会了把观点放回时代。",
	},
	{
		title: "第六章 · 跑道上的风",
		color: "#FF00FF",
		requirement: "完成 75 个成就，或体育训练 1 次",
		done() { return player.A.Goals.gte(75) || (player.PE && player.PE.trainingRuns.gte(1)); },
		line: "体育训练第一次结束，你听见了自己的呼吸。",
		text: "跑道上没有捷径，只有一圈又一圈。你从反应速度练到耐力，从喘不过气练到能稳住节奏。体育教会你的不是赢过谁，而是在想停下的时候，再往前迈一步。",
	},
	{
		title: "第七章 · 实验记录",
		color: "#32CD32",
		requirement: "完成 100 个成就，或物理 / 化学 / 生物训练 5 次",
		done() {
			return player.A.Goals.gte(100) ||
				(player.P && player.P.trainingRuns.gte(5)) ||
				(player.Chem && player.Chem.trainingRuns.gte(5)) ||
				(player.Bio && player.Bio.trainingRuns.gte(5));
		},
		line: "实验记录本上，写满了你亲手验证过的结论。",
		text: "你不再满足于记住“是什么”，开始追问“怎么证明”。物理的实验、化学的方程式、生物的观察记录互相印证，你第一次感到，知识不是一门一门的孤岛。",
	},
	{
		title: "第八章 · 材料题",
		color: "#8B5A2B",
		requirement: "完成 130 个成就，或历史 / 地理最佳达到 80 分",
		done() {
			return player.A.Goals.gte(130) ||
				(player.His && player.His.bestScore.gte(80) && player.Geo && player.Geo.bestScore.gte(80));
		},
		line: "材料题上，你写下了自己的判断。",
		text: "你开始能在材料里找到关键句，也能把历史、地理、政治的知识串起来。答案不再只是模板，而是你先想明白、再写清楚的几句话。分数只是结果，思考才是留下来的东西。",
	},
	{
		title: "第九章 · 跨学科",
		color: "#FFD700",
		requirement: "完成 160 个成就，或综合素质达到 1,000",
		done() { return player.A.Goals.gte(160) || (player.Syn && player.Syn.points.gte(1000)); },
		line: "你开始用一张网，而不是一根线，去看待知识。",
		text: "语文的阅读帮助历史史料，数学的比例帮助地理图表，化学的实验帮助生物观察。你不再问“这科有什么用”，而是开始想“它还能和什么连在一起”。",
	},
	{
		title: "第十章 · 中考前夜",
		color: "#FFFFFF",
		requirement: "完成 220 个成就，或最佳中考分数达到 256",
		done() { return player.A.Goals.gte(220) || player.E.bestPoints.gte(256); },
		line: "倒计时归零前，你把书包整理了一遍又一遍。",
		text: "准考证、2B 铅笔、黑色签字笔、橡皮。你坐在书桌前，忽然想起最初那个倒数第一的自己。你没有变成别人，只是把每一天都往前挪了一点。明天，去把这几年的答案写完。",
	},
	{
		title: "终章 · 成绩单",
		color: "#FF66FF",
		requirement: "完成全部 300 个成就",
		done() { return player.A.Goals.gte(300); },
		line: "成绩单发下来时，你先看见了那个不再躲闪的自己。",
		text: "成绩单上的数字会被记住一阵子，但真正留下来的，是你学会的耐心、方法和不肯放弃的习惯。你从倒数第一走到这里，故事没有一个神奇的转折，只有很多个普通的今天。",
	},
];

function achievementChapterForID(id) {
	if (id <= 17) return 0;
	if (id <= 27) return 1;
	if (id <= 47) return 2;
	if (id <= 67) return 3;
	if (id <= 83) return 4;
	if (id <= 95) return 6;
	if (id <= 110) return 5;
	if (id <= 159) return 9;
	if (id <= 199) return 7;
	if (id <= 229) return 8;
	if (id <= 264) return 7;
	if (id <= 290) return 10;
	return 10;
}

// 给所有成就补充剧情提示。保留原来的条件文本，不做破坏性覆盖。
for (let key in layers.A.achievements) {
	if (!/^\d+$/.test(key)) continue;
	let ach = layers.A.achievements[key];
	let chapter = ACHIEVEMENT_CHAPTERS[achievementChapterForID(Number(key))];
	if (!ach || !chapter) continue;
	ach.reward = "成就进度 +1；永久全科加成 +0.5%。";
	let rewardText = "<br><b>奖励</b>：" + ach.reward;
	if (!ach.goalTooltip) {
		ach.goalTooltip = "<b>成长目标</b><br>" + (ach.tooltip || "完成对应条件。") + "<br><i>成长档案：" + chapter.title + "</i>" + rewardText;
	}
	if (!ach.doneTooltip) {
		ach.doneTooltip = "<b>" + (ach.name || "成就") + "</b><br>" + chapter.line + "<br><i>—— " + chapter.title + "</i>" + rewardText;
	}
}

function achievementRewardMult() {
	return new OmegaNum(1).add(player.A.Goals.mul(0.005));
}

function applyAchievementRewardBonuses() {
	const ids = ["C", "E", "Eng", "M", "Nf", "Am", "Exp", "L"];
	for (let i = 0; i < ids.length; i++) {
		let id = ids[i];
		if (layers[id] && typeof layers[id].gainMult === "function") {
			let old = layers[id].gainMult;
			layers[id].gainMult = function () {
				return old.apply(this, arguments).mul(achievementRewardMult());
			};
		}
	}
	if (layers.C && typeof layers.C.perSecond === "function") {
		let old = layers.C.perSecond;
		layers.C.perSecond = function () {
			return old.call(this).mul(achievementRewardMult());
		};
	}
}
applyAchievementRewardBonuses();

function chapterHTML(chapter, index) {
	let done = chapter.done();
	let title = chapter.title;
	if (!done) {
		return "<div style='width:min(680px,92%);margin:8px auto;padding:12px;border:2px solid #444;background:#101010;color:#8f8f8f;text-align:left'>" +
			"<h3 style='color:#777;margin:0 0 6px'>" + title + "</h3>" +
			"<div style='font-size:14px'>未解锁 · " + chapter.requirement + "</div>" +
			"</div>";
	}
	return "<div style='width:min(680px,92%);margin:8px auto;padding:12px;border:3px solid " + chapter.color + ";background:#151515;color:#dedede;text-align:left'>" +
		"<h3 style='color:" + chapter.color + ";margin:0 0 6px'>" + title + "</h3>" +
		"<div style='font-size:14px;line-height:1.65'>" + chapter.text + "</div>" +
		"</div>";
}

layers.A.tabFormat["成长档案"] = {
	content: [
		["display-text", function () {
			let unlocked = 0;
			for (let i = 0; i < ACHIEVEMENT_CHAPTERS.length; i++) if (ACHIEVEMENT_CHAPTERS[i].done()) unlocked++;
			return "<h2 style='color:#FFD700'>成长档案</h2><br>已完成成就：<b style='color:#FF66FF'>" + player.A.Goals + "</b> / " + moreTotalAchievements() +
				"<br>已解锁章节：<b style='color:#FFD700'>" + unlocked + "</b> / " + ACHIEVEMENT_CHAPTERS.length +
				"<br><br>每个成就奖励：<b>成就进度 +1</b>，永久全科加成 <b>+0.5%</b>。" +
				"<br>当前成就奖励：<b style='color:#FF66FF'>x" + format(achievementRewardMult()) + "</b>";
		}],
		"blank",
		["display-text", function () {
			let html = "";
			for (let i = 0; i < ACHIEVEMENT_CHAPTERS.length; i++) html += chapterHTML(ACHIEVEMENT_CHAPTERS[i], i);
			return html;
		}],
	],
	buttonStyle: { "border-color": "#FFD700", "background-color": "#3A2A00" },
};
