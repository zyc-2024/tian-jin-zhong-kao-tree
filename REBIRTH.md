# Rebirth 更新说明

这个版本根据百度贴吧「序数增量吧」的两份备份补完：

- 《天津中考树速通挑战&bug反馈帖》（2022-12-07）
- 《天津中考树：Rebirth》（2023-07-10）

## 推断依据

1. Rebirth 帖一楼是一张游戏截图，标题就是「天津中考树：Rebirth」。截图里：
   - 树上的 E 层下方多了一个粉色 `P` 节点；
   - 右侧有 `Main`、`SlowlyMilestone`、`Partner`、`Reward` 四个页签；
   - 货币是「残片」，已有 1,208 枚；
   - 搭档卡片是 `(Uncommon)Hikari`、`(Uncommon)Tairitsu`、`(Rare)Kou`；
   - 三张卡片的 FRAG / STEP / IGCE 数值和升级费用分别为 145/98/2800/190、232/232/4400/400、326/355/9600/440。
2. 现有代码的 M 层「Phigros」页签里正好有一个未实装的占位按钮：
   「重置并获得 ??????」，需求是 1e1444 英语知识、56 个英语网格节点、1e60000 语文知识。
3. 旧版本毕业条件停在 E 层 200 分，之后没有内容；Rebirth 帖的回复也在问「151 分之后怎么玩」「新版链接呢」。
4. 因此下一步更新方向是：把 M 层的 Phigros 占位按钮实装成进入 P 层的入口，在 E 层下方增加 Rebirth 层，围绕「残片 + 搭档 + 慢速里程碑 + 永久奖励」做毕业后的循环内容。

## 已实现内容

- P 层「Phigros：Rebirth」：完成 M 层 Phigros 重置后开启，位于 E 层下方。
- 首次重置至少获得 1,208 残片，与截图一致。
- 转生会重置 C / Eng / M / E 的本轮进度，但保留：
  - 中考最佳分数；
  - E 层已达成里程碑；
  - 姓名、年份、历史最佳排名；
  - P 层残片、搭档等级、SlowlyMilestone 进度。
- 搭档：Hikari、Tairitsu、Kou 初始可用；Saya、Lethe、Ilith 通过 Reward 解锁。
- 搭档属性：
  - FRAG：提高转生残片获取；
  - STEP：每秒产出研究步数；
  - IGCE：提高全科知识获取（接入 `getPointGen`）。
- SlowlyMilestone：按累计研究步数解锁的 12 个长期里程碑。
- Reward：消耗残片购买永久强化或解锁新搭档。
- 新增 5 个 Rebirth 相关成就，并修复了原本打开成就页会报错的问题。

## 兼容与测试

- 旧存档会通过 `fixOldSave` 补齐 P 层字段；196 分旧档（`saves/196.txt`）可以直接加载。
- 想快速测试 Rebirth：导入 `saves/196.txt`，把 `player.E.bestPoints` 调到 200，然后打开 M 层的 Phigros 页签点击重置。
- `saves/Rebirth.txt` 是直接进入 P 层的演示存档，搭档等级为 9 / 12 / 8，可复现预告图的 Partner 页面。
- 搭档数值在 9 / 12 / 8 级时与贴吧截图完全一致。

## 说明

Rebirth 帖只留下了一张 UI 截图和标题，没有留下完整的数值表。因此搭档成长曲线、SlowlyMilestone 阈值、Reward 内容是在截图基础上做出的可玩性补全，不代表原作者最终设定。
