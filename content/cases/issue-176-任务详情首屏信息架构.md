---
title: 案例 #176 · 任务详情首屏信息架构
description: 从 UAT 缺陷到验收的完整跟踪单；开工当天撞上分支误写，是 AC-004 的活教材。
tags:
  - AI-Coding
  - 案例
  - TCP
---

# 案例 #176｜任务详情首屏改造

> [!important] 本页怎么填写
> 网页只读，**动笔请改源文件**：用编辑器打开 `content/cases/issue-176-任务详情首屏信息架构.md`，搜索黄色的「✍️ 待我」，把答案写在 `＿＿＿` 横线处。推荐用 Obsidian 或 VS Code 打开 `content/` 目录（支持实时预览）。保存后 `npx quartz build --serve` 会自动刷新页面。

**Issue**：[#176](https://github.com/yinhui198456/team-capability-platform/issues/176)（UAT 体验 · P1）｜ **当前站**：4/8 Coding

```mermaid
flowchart LR
    S1["✅ 1 需求"] --> S2["✅ 2 Issue"] --> S3["✍️ 3 方案"] --> S4["🔨 4 Coding"] --> S5["⬜ 5 测试"] --> S6["⬜ 6 审查"] --> S7["⬜ 7 合并"] --> S8["⬜ 8 验收"]
    style S3 fill:#fde68a
    style S4 fill:#93c5fd
```

## ✍️ 我要填的汇总

| 站 | 要填什么 | 一句话采集方式 |
| --- | --- | --- |
| 1 | 业务确认（日期+方式） | 对照原型图走一遍真实页面 |
| 3 | 确认 AI 做的 4 个假设 | 逐条标"同意 / 改" |
| 5 | 测试证据 | 跑下面给的两条命令 |
| 6 | 独立审查结论 | 复制给的提示词派只读 Agent |
| 7 | PR base + 终态七项 | 打开 PR 亲眼看 |
| 8 | 验收 6 条逐条打勾 | 真实 Chrome 两种尺寸 |
| 末 | 我的复盘 | 手写 |

---

## 各站记录

### 站 1 · 需求 ✅

**"需求写清楚"的行业标准动作**（外部原文，不是我编的）：

> 明确目标：写清楚**要做什么、不要做什么、成功标准是什么**。
> —— [vibe-coding-cn · 开发流程](https://github.com/tradecatlabs/vibe-coding-cn/blob/develop/docs/workflow/development-process.md) 第 1 条

> 针对我的计划，反复追问每一个细节，直到我们形成共同理解……每次只问一个问题，等我回答了再问下一个……确认双方理解一致之前，不要开始行动。
> —— [鱼皮 ai-guide · 用 grill-me 让 AI 拷问你的需求](https://github.com/liyupi/ai-guide/blob/main/Vibe%20Coding%20%E9%9B%B6%E5%9F%BA%E7%A1%80%E6%95%99%E7%A8%8B/30%20%E7%BB%8F%E9%AA%8C%E6%8A%80%E5%B7%A7/%E7%94%A8%20grill-me%20%E8%AE%A9%20AI%20%E6%8B%B7%E9%97%AE%E4%BD%A0%E7%9A%84%E9%9C%80%E6%B1%82.md)（安装命令：`npx skills add https://github.com/mattpocock/skills --skill grill-me`）

对照检查本 Issue：✅ 要做什么（首屏渐进式结构）✅ 不做什么（不改状态机/门禁/后端）✅ 成功标准（验收 6 条）——**三条齐全，需求站合格**。

**本 Issue 的原型图**（涉及前端，先看图再看字）：

![UI-03 年度计划与任务页视觉基线](https://raw.githubusercontent.com/yinhui198456/team-capability-platform/master/docs/assets/ui-prototypes/UI-03-annual-plan-task.png)

- 交互原型定版：[M05 学习任务详情 · 定版候选](https://github.com/yinhui198456/team-capability-platform/blob/master/docs/assets/ui-prototypes/prototype-v1/pages/m05-selected.html)（HTML 文件，在本地 TCP 仓库里双击 `docs/assets/ui-prototypes/prototype-v1/index.html` 可交互浏览全部页面）
- 业务故事线确认稿：[storyline-v1](https://github.com/yinhui198456/team-capability-platform/blob/master/docs/assets/ui-prototypes/prototype-v1/storyline-v1.html) ｜ 页面职责：[page-map-v1](https://github.com/yinhui198456/team-capability-platform/blob/master/docs/assets/ui-prototypes/prototype-v1/page-map-v1.html)

> [!todo] ✍️ 待我确认
> 1. 打开上面的原型图和 M05 定版原型，看懂"首屏该长什么样"；
> 2. 打开 UAT 环境真实页面，展开一个进行中的任务对比；
> 3. 不一致就先改 Issue，不进 Coding。
>
> **我的确认（日期 + 方式）：**＿＿＿＿＿＿

### 站 2 · Issue 任务单 ✅（AI 已整理）

- 期望结构：任务摘要 → 可执行操作 → 填写表单 → 日志/Evidence → 可折叠完整资料
- **不改**：状态机、完成门禁、Evidence 规则、历史数据、后端、数据库
- 分工：#176 管桌面信息架构；#93 管全局壳层与响应式

**验收 6 条 → 可操作检查单**（站 8 照这个做，每条都是具体动作）：

| # | 验收点 | 怎么操作 | 结果 |
| --- | --- | --- | --- |
| 1 | 首屏可见状态、操作和入口 | Chrome 设 1440×900 → 展开任务 → **不滚动**，能看到状态标签和操作按钮？ | ⬜ |
| 2 | 空值/低频字段不占首屏 | 找一个没填多少内容的任务展开，首屏是否大片空白字段？ | ⬜ |
| 3 | 日志/Evidence/表单分区清晰 | 从上往下滚动，能不能说出每块是什么？ | ⬜ |
| 4 | 768 下可读可操作 | 窗口拖到 768 宽（或 F12 设备模拟），布局不乱、按钮点得到？ | ⬜ |
| 5 | 状态行为不回归 | 各做一次：暂停→恢复、延期、取消、完成，提示和状态都对？ | ⬜ |
| 6 | 刷新后定位状态一致 | 展开任务后按 F5 刷新，页面不跳走、状态不丢？ | ⬜ |

### 站 3 · 方案 ✅ 已收集（实际开发方案）

开发由 CC 执行，方案即两个提交的原文：

> 任务详情首屏改为：能力路径 + 状态 + 实际耗时 + 优先级 + 可执行操作 + 计划起止日期编辑；**22 个静态字段移入可折叠"查看完整资料"区**；日志、Evidence、流转历史顺序不变；768px 以下垂直堆叠。
> —— [commit 8d59359](https://github.com/yinhui198456/team-capability-platform/commit/8d59359cf041a8b5c3317ec36207ae913d5c0b43)（3 个文件，+338/−131 行）

> #176 将任务内容等静态字段移入可折叠区，原断言 toBeVisible 命中隐藏元素；仅新增展开步骤，断言本身不变，不删除/跳过任何断言。
> —— [commit b6ad583](https://github.com/yinhui198456/team-capability-platform/commit/b6ad583ff945f8ea1932d06ff2f5a25b65119dbc)（E2E 测试适配）

> [!todo] ✍️ 待我逐条确认：AI 替我做的 4 个假设
> 方案没提前确认就进了 Coding（AC-001 的老毛病），现在补确认：
>
> | # | AI 的假设 | 我的决定（同意/改成什么） |
> | --- | --- | --- |
> | 1 | 首屏保留的 6 类信息就是我要的 | ＿＿＿ |
> | 2 | 其余 22 个字段都算"低频"，全进折叠区 | ＿＿＿ |
> | 3 | 折叠区默认收起 | ＿＿＿ |
> | 4 | 768px 以下垂直堆叠即可 | ＿＿＿ |
>
> 确认方法：打开真实页面或原型，逐条对着看。有不同意的 → 在 Issue #176 评论里写明，让 AI 改。

### 站 4 · Coding 🔨 进行中（AI 已整理）

- 分支 `fix/issue-176-task-detail-layout`，从 master 创建 ✅
- 改动范围：仅前端 3 文件 + 1 个 E2E 适配，未碰后端/状态机 ✅（与站 2"不改"清单一致）

开工三步确认（自己随时可复查）：

```bash
git branch --show-current   # 期望：fix/issue-176-task-detail-layout
git status                  # 期望：working tree clean 或只有本 Issue 的文件
git log --oneline -3        # 期望：顶部两条是 #176 的提交
```

> [!warning]- 08-17 纠错事件（AC-004 活教材，点开看）
> 主控与写入者未分离 + 复用历史目录名 → 第一轮改动误写进长期测试环境 → 无损撤回，worktree 重建为规范的 `tcp-issue-176`。
> [完整记录](https://github.com/yinhui198456/team-capability-platform/issues/176#issuecomment-5312115520)。遗留悬念：移动运行中的 worktree 后，会话登记和 hook 有残留问题（评论被截断）。

### 站 5 · 测试 ⬜

> [!todo] ✍️ 到时采集（命令已备好，在 TCP 仓库 `frontend/` 目录跑）
> ```bash
> npm run test          # 单元测试，含 AnnualPlanTaskPage.test.tsx 的 73 行新断言
> npm run test:e2e      # E2E 全量；重点看 smoke/issue-63 相关用例
> ```
> 跑完追问 AI："全量测试里哪些是历史失败（对照 #183 基线）、哪些是这次新增的？"
>
> **记录：**＿＿＿＿＿＿

### 站 6 · 审查 ⬜

> [!todo] ✍️ 到时派单（提示词直接复制）
> ```
> 你是只读审查者，不许修改任何文件。审查 fix/issue-176-task-detail-layout
> 相对 master 的全部改动，专门检查：1) 任务状态机、完成门禁、Evidence
> 规则有没有被改动；2) 是否有本 Issue 范围外的顺手修改；3) 768px
> 响应式是否与 #93 的修复冲突。输出发现清单和结论。
> ```
>
> **结论：**＿＿＿＿＿＿

### 站 7 · 合并 ⬜

> [!todo] ✍️ 到时确认
> ```bash
> gh pr list --head fix/issue-176-task-detail-layout   # 找到本 Issue 的 PR
> gh pr view <编号> --json baseRefName                  # 亲眼确认 base 是 master
> ```
> 终态七项（TCP #185）：PR 状态 / Issue 评论 / 关闭原因 / Project / 计划状态 / 监控清理 / 用户说明。
>
> **记录：**＿＿＿＿＿＿

### 站 8 · 验收 ⬜

> [!todo] ✍️ 到时验收
> 1. 真实 Chrome 打开年度成长计划页，按站 2 检查单的 6 个操作逐条做、逐条打勾；
> 2. 两种尺寸都要：1440×900 和 768×900（F12 → 设备模拟）；
> 3. 截图存 UAT 反馈，不含凭据。
>
> **结果：**＿＿＿＿＿＿

## ✍️ 我的复盘（手写）

- 印证的经验卡：[[AC-004-AI改代码前先确认分支|AC-004]]（开工当天即中招）、[[AC-001-复杂功能先画用户流程|AC-001]]（方案没确认就 Coding，站 3 在补票）
- 新候选卡：＿＿＿＿＿＿
