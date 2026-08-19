---
title: 案例 #194 · 评级→计划草稿→显式生成任务
description: 新故事线第一个纵向试点（P0）。需求合同写得极细，独立审查"评审→修复→复审"闭环完整——和 #176 形成对照组。
tags:
  - AI-Coding
  - 案例
  - TCP
---

# 案例 #194｜评级→计划草稿→显式生成任务

> [!important] 本页怎么填写（浏览器里就能写）
> 1. 点 → [✏️ 编辑本页](https://github.com/yinhui198456/ai-coding-playbook/edit/v5/content/cases/issue-194-member-core-flow.md)（GitHub 网页编辑器，自带预览）；
> 2. `Ctrl+F` 搜「✍️」，把答案写在 `＿＿＿` 横线上；
> 3. 点绿色 **Commit changes** 保存，1~2 分钟后线上页面自动更新。

**Issue**：[#194](https://github.com/yinhui198456/team-capability-platform/issues/194)（Pilot · 核心流 · P0）｜ **PR**：[Draft #195](https://github.com/yinhui198456/team-capability-platform/pull/195) ｜ **当前站**：8/8 验收（⛔ 阻塞：等你一个授权决策，见站 8）

```mermaid
flowchart LR
    S1["✅ 1 需求"] --> S2["✅ 2 Issue"] --> S3["✅ 3 方案"] --> S4["✅ 4 Coding"] --> S5["✅ 5 测试"] --> S6["✅ 6 审查"] --> S7["⬜ 7 合并"] --> S8["⛔ 8 验收·待授权"]
    style S8 fill:#fca5a5
```

> 图例：✅ 已完成 ｜ ✍️ 黄色 = 等我来填 ｜ ⬜ 还没到 ｜ ⛔ 红色 = 阻塞，需要我做决定

## ✍️ 我要填的汇总

> 填法：[✏️ 打开本页编辑器](https://github.com/yinhui198456/ai-coding-playbook/edit/v5/content/cases/issue-194-member-core-flow.md) → `Ctrl+F` 搜「待我」→ 写在 `＿＿＿` 上 → **Commit changes** → 1~2 分钟本页自动更新。

| 站 | 要填什么 | 一句话采集方式 |
| --- | --- | --- |
| ⛔ 8 | **授权决策：要不要修数据库约束** | 读站 8 阻塞说明 → 去 Sol 会话回复"授权/不授权" |
| 1 | 业务确认（日期+方式） | 看原型图 + 读"一句话说人话" |
| 3 | 确认 AI 做的 3 个决定 | 逐条标"同意 / 改" |
| 7 | PR base + 终态七项 | 打开 PR #195 亲眼看 |
| 8 | 真实 Chrome 9 条逐条打勾 | 阻塞解除后，测试环境登录操作 |
| 末 | 我的复盘 | 手写 |

> [!note]- 本页黑话速查（看不懂的词先点这里）
> - **L3 能力**：能力地图第三级，最细颗粒度的能力项（如"能用 AI 写 SQL"）
> - **Gap**：当前级别和目标级别的差距
> - **幂等**：同一操作重复执行多次，效果和执行一次一样（重复点击不会重复建任务）
> - **零写入**：非法操作完全不碰数据库，连一半都不写
> - **红测→绿测**：先写一个注定失败的测试，证明"旧代码确实没这功能"（红），再写代码让它通过（绿）
> - **Draft PR**：草稿 PR，不能合并，用于提前展示和检查
> - **410**：HTTP 状态码"已永久删除"，这里用来让退役的旧接口稳定拒绝写入

---

## 各站记录

### 站 1 · 需求 ✅

**一句话说人话**：这是 [#187](https://github.com/yinhui198456/team-capability-platform/issues/187) 已定版故事线的**第一个纵向试点**——让 Member 在测试环境走完一段完整业务闭环：给部分能力评级 → 把想提升的放进计划草稿 → 补月份 → **手动点**"生成所选学习任务" → 在年度计划和任务列表看到正式任务。全程可中途保存、刷新不丢、非法操作零写入。

**要做什么**（Issue"用户可见结果"的人话版）：

1. 评级可以只评一部分就保存，没评的不拦着；
2. 有差距的 L3 可以加入/移出计划草稿，**刷新、退出、重新登录后草稿还在**；
3. 月份只填 `YYYY-MM`，点输入框任意位置都能打开年月选择器；
4. 只有点"生成所选学习任务"才真正生成，缺信息就整批不生成+中文提示哪项缺什么；
5. 生成成功后，不用刷新就能在年度计划/学习任务入口看到结果。

**不做什么**（非范围精选，碰了算越界）：不重做任务执行页（M05）、不动 Evidence 流程、不做看板和分析页、**不动测试环境业务数据**、不合并不发布。

**怎么算成功**：站 2 的验收单（自动检查 4 条 + 真实 Chrome 9 条）。

**先看原型图，再看字**：

![UI-02 能力评级与差距页视觉基线](https://raw.githubusercontent.com/yinhui198456/team-capability-platform/master/docs/assets/ui-prototypes/UI-02-assessment-gap.png)

- 🖥️ [M02 能力评级 · 在线交互原型](https://yinhui198456.github.io/team-capability-platform/assets/ui-prototypes/prototype-v1/index.html?collection=selected&page=M02)（本 Issue 主战场）
- 📚 [故事线确认稿](https://yinhui198456.github.io/team-capability-platform/assets/ui-prototypes/prototype-v1/storyline-v1.html)（#187 定版）

> [!todo] ✍️ 待我确认（就一件事：这条核心流是你要的吗？）
> ✏️ 填这里 → [打开本页编辑器](https://github.com/yinhui198456/ai-coding-playbook/edit/v5/content/cases/issue-194-member-core-flow.md)，`Ctrl+F` 搜「待我」，写在 `＿＿＿` 上，**Commit changes** 保存。
> 1. 看原型图和 M02 在线原型——"评级→草稿→手动生成"这条流水线，是不是你要的样子；
> 2. 特别留意：**生成是手动点按钮才发生**，不是评完级自动出现任务；
> 3. 哪里不对 → 在 [#194 评论](https://github.com/yinhui198456/team-capability-platform/issues/194)里写明。
>
> **我的确认（日期 + 方式）：**＿＿＿＿＿＿

> [!example]- 业务合同关键条款原文（想知道"细到什么程度"再展开）
> > 保存评级、维护计划草稿、生成正式任务是三个独立动作。`current_level=0` 是已评级，不得按空值处理。
>
> > 任一所选项非法时整批零生成、零复用、零部分写入；页面定位具体 L3 并说明处理方法。
>
> > 新流程不创建新的 Assessment Review，不进入 Buddy 自评复核队列……历史 Assessment Review 只读保留，不迁移、不回填、不删除。
>
> —— [#194 业务合同](https://github.com/yinhui198456/team-capability-platform/issues/194)。**这就是"需求三件套"的完全体**：不仅有要做什么/不做什么/成功标准，还把每个业务规则的边界写死了。

### 站 2 · Issue 任务单 ✅（AI 已整理）

需求细节在站 1，这里只管"这张任务单怎么派"：

| 属性 | 内容 |
| --- | --- |
| 类型 / 优先级 | 纵向试点（Pilot）· 核心流 · **P0** |
| 页面 / 角色 | Member 主战场 [M02 `/capability/assessment`；M03/M04 只做"最小承接"](https://github.com/yinhui198456/team-capability-platform/blob/master/docs/04_UI.md)（§4.9） |
| 协作模式 | 模式 B+E：Codex CLI 总控持 Goal/Plan，CC 唯一写代码，只读 Agent 分析，[夜间静默授权](https://github.com/yinhui198456/team-capability-platform/issues/194#issuecomment-5317173700) |
| 关联 Issue | #178 暂停（合同已吸收进本 Issue）；PR #193 不自动合并；#192 是部署准入依赖 |
| 验收标准 | 自动检查 4 条（站 5/6 已覆盖）+ 下面真实 Chrome 9 条（站 8 照做） |

**真实 Chrome 验收 9 条 → 可操作检查单**（站 8 照这个做，在测试环境用测试身份操作）：

| # | 验收点 | 怎么操作 | 结果 |
| --- | --- | --- | --- |
| 1 | 部分评级保存不生成任务 | 只给 2~3 个 L3 评级 → 保存 → 去看年度计划，**不该出现**任何新任务 | ⬜ |
| 2 | 草稿可恢复 | 加入几个 L3 到提升计划 → 按 F5 刷新 → 退出重登 → 选择和输入都还在？ | ⬜ |
| 3 | 年月选择器好用 | 点月份输入框的**任意位置**（不只是图标），能打开选择器并保存 `2026-09` 这种格式？ | ⬜ |
| 4 | 缺月份零写入 | 故意不填月份 → 点生成 → 什么都没生成，页面用中文指出具体哪个 L3 缺月份？ | ⬜ |
| 5 | 显式生成+不重复 | 选 1 个 L3 生成一次；再选多个生成一次；对同一批**连续点两次** → 任务数不翻倍？ | ⬜ |
| 6 | M03/M04 看得到结果 | 生成后直接去年度成长计划和学习任务入口，不用刷新就能看到？ | ⬜ |
| 7 | Buddy 无新复核待办 | 换 Buddy 身份登录，没有新的自评复核待办，Evidence Review 入口还在？ | ⬜ |
| 8 | 三种宽度可用 | 1440 和 1024 下字段不遮挡；768 下能完成评级+生成核心操作？ | ⬜ |
| 9 | 状态一致 | 操作中途按 F5、点浏览器返回、退出重登，页面状态都不乱？ | ⬜ |

### 站 3 · 方案 ✅（与实际实现一致）

方案体现在 [PR #195](https://github.com/yinhui198456/team-capability-platform/pull/195)（18 个提交，102 个文件，+4827/−4479 行）。核心两个提交的原文引用：

> 三独立动作：保存能力评级 / 加入-移出计划草稿 / 显式生成所选学习任务。仅显式生成写入 plan_item/learning_task；plan_month=YYYY-MM 为唯一时间输入。/submit 退役……历史评估只读。
> —— [commit 7af8a16](https://github.com/yinhui198456/team-capability-platform/commit/7af8a16b8627d583bdc3c8638619890d4b56ee2c)（主体实现，54 个文件）

> P1-1 缺月仍可生成：客户端预检零请求列出 L3 并定位首项，不再禁用按钮……P1-3 Buddy 自评复核退役……review POST 稳定 410 零写入……P1-4 generate-plan-items 消费 Idempotency-Key……并发同 key 单次写入。
> —— [commit 6586ed0](https://github.com/yinhui198456/team-capability-platform/commit/6586ed0b55b8baa8b630f8fff4673872ab7e1074)（评审修复，25 个文件）

**随后一夜又推进了三个阶段**（[提交列表](https://github.com/yinhui198456/team-capability-platform/pull/195/commits)）：

1. **E2E 对齐轮**（约 10 个提交）：把还在检查旧页面的浏览器测试全部对齐新合同，E2E 门禁从 189 过/80 挂修到全绿；
2. **M02 V1 原型对齐**（[commit 006bdfe](https://github.com/yinhui198456/team-capability-platform/commit/006bdfe)）：两个主操作按钮 + 行内加入/移出 + 草稿自动保存——让实现和定版原型长得一样；
3. **第三轮评审修复**（`017471f`）：批量评级后草稿保存会用旧版本号 → 改为用服务端返回的新版本号推进。

**这次需求合同写得极细**（站 1 折叠区有原文），方案基本是照合同实现，AI 自由发挥的空间很小。

> [!todo] ✍️ 待我逐条确认：AI 做的 3 个决定
> ✏️ 填这里 → [打开本页编辑器](https://github.com/yinhui198456/ai-coding-playbook/edit/v5/content/cases/issue-194-member-core-flow.md)，`Ctrl+F` 搜「待我」，写在 `＿＿＿` 上，**Commit changes** 保存。
> 合同虽细，仍有几处实现决策值得我过目（都翻成了人话）：
>
> | # | AI 的决定 | 人话解释 | 我的决定（同意/改成什么） |
> | --- | --- | --- | --- |
> | 1 | 旧的"Buddy 复核"功能彻底关闭 | 旧入口访问会直接收到"已永久关闭"的回复，而不是留着只是禁用——更干净，但没有回头路 | ＿＿＿ |
> | 2 | 一批浏览器自动化测试这轮先不修 | 它们还在检查"已经关闭的旧页面"，所以一直报错；留着以后统一改，代价是这批测试暂时一直是红的 | ＿＿＿ |
> | 3 | 代码风格检查的老问题不顺手修 | 那些问题是仓库里早就有的，不是这次改出来的；顺手修会让这次改动变大变乱 | ＿＿＿ |
>
> 确认方法：看上表想 30 秒，拿不准的点 commit 链接看改动。有不同意的 → 在 #194 评论写明。

### 站 4 · Coding ✅（AI 已整理）

**改了哪些文件、各是干什么的**（[PR #195 全部 102 个文件](https://github.com/yinhui198456/team-capability-platform/pull/195/files)，按用途归类）：

| 目录 | 文件数 | 用途（人话） |
| --- | --- | --- |
| `backend/app/assessment` | 2 | 后端·评级相关接口 |
| `backend/app/planning` | 4 | 后端·计划生成逻辑（点"生成"按钮后跑的代码） |
| `backend/app/migrations` | 2 | 数据库搬家脚本：把月份字段从数字改成 `YYYY-MM` 文本 |
| `backend/app/access` | 1 | 后端·权限（谁能看/操作什么） |
| `backend/tests` | 34 | 后端测试（大头在这，新合同全靠它们锁死） |
| `frontend/src` | 18+1 | 前端页面：M02 评级页三动作、M03 计划列表 |
| `frontend/tests/e2e` | 10+25 | 浏览器自动化测试 + 截图基线（旧 Buddy 复核页删除，其截图基线随之删除） |
| `scripts` | 1 | 服务器上的 UI 走查脚本（对齐新导航合同） |

**执行现场**：

- 分支 `feat/issue-194-member-core-flow`（从 master 创建）✅
- 写入者：CC（Claude Code），本轮模型首选 **Kimi**；只有连续两次额度/限流故障才允许换一次 DeepSeek（[夜间授权原文](https://github.com/yinhui198456/team-capability-platform/issues/194#issuecomment-5317173700)）
- 总控：Ubuntu 服务器 tmux 会话里的 Codex CLI（持有 Goal/Plan，不写代码）

> [!todo] ✍️ 待我补充（不知道就问 AI，把答案贴上来）
> ✏️ 填这里 → [打开本页编辑器](https://github.com/yinhui198456/ai-coding-playbook/edit/v5/content/cases/issue-194-member-core-flow.md)，`Ctrl+F` 搜「待我」，写在 `＿＿＿` 上，**Commit changes** 保存。
> 1. 本次实施的 worktree 目录名是？（问总控："#194 的 worktree 路径是什么"）
> 2. 本会话 CC 的 token 用量 / 会话时长？（问 CC："报告本会话 token 用量"）
>
> **记录：**＿＿＿＿＿＿

### 站 5 · 测试 ✅（证据在案）

**测试方法和工具**（[交付证据评论](https://github.com/yinhui198456/team-capability-platform/issues/194#issuecomment-5319483358)，精确到 SHA、单次串行无重跑）：

| 层 | 工具 | 测什么 | 结果 | 耗时 |
| --- | --- | --- | --- | --- |
| 后端单元/集成 | pytest（Python 测试框架） | 接口逻辑、数据库写入、权限 | 743 → 749 passed | 17 分 47 秒 |
| 后端风格 | ruff + black | 代码风格、格式 | 零新增问题 | 秒级 |
| 前端单元 | Vitest | 组件渲染、交互逻辑 | 286 → 272 passed | — |
| 前端风格 | eslint | 代码风格 | 0 errors | — |

**为本 Issue 新写的测试，测了什么、预期如何**（[commit 6586ed0](https://github.com/yinhui198456/team-capability-platform/commit/6586ed0b55b8baa8b630f8fff4673872ab7e1074) 提交信息原文列举）：

| 测试 | 预期 | 结果 |
| --- | --- | --- |
| 混合选择零写入 | 选的 L3 里有一个缺月份 → 整批一个都不生成 | ✅ |
| 同键重放 / 异载荷冲突 | 同一次生成请求重复发 → 返回首次结果不重复建；同 key 内容变了 → 拒绝（409） | ✅ |
| 并发单写 | 两个相同请求同时到 → 只写一次 | ✅ |
| M03 月份筛选展示 | 新生成项按 `YYYY-MM` 正确显示和筛选 | ✅ |
| Buddy 路由 / review POST 退役 | 旧复核入口跳走、旧接口稳定拒绝写入（410） | ✅ |

**红测→绿测**：先在 master 上跑新测试确认**失败**（证明旧代码真没这功能），实现后再跑**通过**。4 组旧合同断言族均为"修复前红、修复后绿"，没删没跳任何测试。

> [!question] 为什么没有"模拟真人操作 Chrome"的测试截图？
> 那类测试叫 E2E（端到端），TCP 用 Playwright 跑。它一度是**唯一红的**（旧用例还在检查已关闭的 Buddy 复核页：189 过 / 80 挂）——夜间"E2E 对齐轮"约 10 个提交把它们全部对齐新合同，现已全绿。**真人 Chrome 验收自动化替代不了**：站 8 里 Sol 的隔离环境预演就抓到了 E2E 没抓到的真问题。

> [!success] CI 三道门禁已全绿（顶端 `017471f`）
> 后端 / 前端 / E2E 同一 SHA 全部 ✅（[PR checks](https://github.com/yinhui198456/team-capability-platform/pull/195/checks)）。这是"同一提交全绿"的准入条件首次满足。

> [!note] GitHub 上反复出现的 Actions 是什么？
> 你看到的 [Actions 运行](https://github.com/yinhui198456/team-capability-platform/actions/runs/32124510046)是 **CI（持续集成）**：每次 push 代码，GitHub 自动跑三道门禁——`Backend Quality Gate`（后端检查+测试）、`Frontend Quality Gate`（前端检查+测试）、`E2E Tests`（浏览器自动化）。**不用人点，push 就触发**，结果直接挂在 PR 的 checks 里（见站 6）。它和站 5 的关系：站 5 是 AI 在自己机器上跑测试的报告，CI 是 GitHub 在干净环境里**独立复跑**——两份证据互相印证，防止"我机器上能过"。详见 [[glossary|术语表 · CI]]。

### 站 6 · 审查 ✅（评审→修复→复审，闭环完整）

独立只读审查由非写入者（Sol）执行，**三轮**都在 [PR #195](https://github.com/yinhui198456/team-capability-platform/pull/195) 评审区：

**第一轮**（08-17）：P0=0、**P1=4，当前不可部署**。4 个 P1 的人话版：

1. 缺月份时生成按钮直接变灰点不动——用户永远看不到中文提示 → 改为可点击但不发请求，逐项指出缺什么；
2. M03 列表还按旧字段筛选显示，新生成的任务会显示"—"甚至消失；
3. Buddy 自评复核旧入口还能操作、还能写库——与"无新复核队列"合同冲突；
4. 生成接口不是真幂等——重复点击/网络重试可能建重复任务。

**修复**：[commit 6586ed0](https://github.com/yinhui198456/team-capability-platform/commit/6586ed0b55b8baa8b630f8fff4673872ab7e1074) 逐项修复 → **第二轮复审**（08-18）：P0=0、P1=0，可进入下一门禁，但仍不自动 Ready/合并/部署。

**第三轮复审**（08-19，[原文](https://github.com/yinhui198456/team-capability-platform/pull/195#pullrequestreview-4967414284)）：代码变了就重新审——在原型对齐后的代码上**又抓到一个新 P1**：批量评级后草稿自动保存会用旧版本号，可能覆盖别人刚存的内容 → `017471f` 修复 → [增量复审通过](https://github.com/yinhui198456/team-capability-platform/pull/195#pullrequestreview-4967631654)（P0=0、P1=0）。

> [!success] 这一站是本案例的高光
> **评审不是一次性盖章，是每改一轮就要重来的门禁**：第一轮拦 4 个 P1，第三轮又拦 1 个新 P1（版本号竞态）——这种并发问题靠作者自测几乎不可能发现。

> [!note] PR 页面上的 checks 是什么？（小白扫盲）
> [PR #195 的 checks](https://github.com/yinhui198456/team-capability-platform/pull/195/checks) 是 CI 门禁在这个 PR 上的成绩单，4 项分别是：
>
> | check | 干什么的 | 状态演变 |
> | --- | --- | --- |
> | `lint-and-test` | 后端门禁：风格检查 + pytest 全套 | 🔴 → `017471f` 🟢 |
> | `lint-format-test-build` | 前端门禁：风格检查 + Vitest + 构建 | 🔴 → `017471f` 🟢 |
> | `e2e` | 浏览器自动化测试 | 🔴（189 过/80 挂：旧用例检查已退役页面）→ E2E 对齐轮修复 → `017471f` 🟢 |
> | `docker-test-stage` | 用 Docker 把整套环境装起来跑一遍，验证"干净环境能起" | 🟢 |
>
> 读法：🔴 不一定是新代码错了——点进去看日志，区分"新失败"和"已知尾巴"。但注意：**CI 全绿 ≠ 能验收**——站 8 的真实 Chrome 预演在全绿之后仍抓到了一个 500 阻塞。

> [!success] 这一站是本案例的高光
> 对照 #176"方案没确认就 Coding"，#194 全程按门禁走：合同先行 → 红测绿测 → 独立审查 → 修复 → 复审。**独立审查第一轮就拦下 4 个 P1**，其中"缺月份按钮变灰导致提示不可达"这种，靠作者自测几乎不可能发现。

### 站 7 · 合并 ⬜

> [!warning] 本 Issue 的顺序：先验收（站 8），后合并（站 7）
> 标准流水线是"合并→验收"，但 #194 的合同写明：**停在用户最终确认，merge/Ready/关闭决定必须问用户**。所以实际顺序反过来——你在测试环境验收通过 → 说"可以合并" → AI 才把 PR 转 Ready 并合并。**没看到验收结果前，任何"已完成"的说法都不算数。**

> [!todo] ✍️ 到时确认
> ✏️ 填这里 → [打开本页编辑器](https://github.com/yinhui198456/ai-coding-playbook/edit/v5/content/cases/issue-194-member-core-flow.md)，`Ctrl+F` 搜「待我」，写在 `＿＿＿` 上，**Commit changes** 保存。
> ```bash
> gh pr view 195 --repo yinhui198456/team-capability-platform --json baseRefName,isDraft
> ```
> 亲眼确认：base 是 master、已脱离 Draft。终态七项（[TCP #185](https://github.com/yinhui198456/team-capability-platform/issues/185)）：PR 状态 / Issue 评论 / 关闭原因 / Project / 计划状态 / 监控清理 / 用户说明。
>
> ⚠️ Issue 写明：**merge / Ready / 关闭的决定必须停下来问用户**——AI 无权自行合并。
>
> **记录：**＿＿＿＿＿＿

### 站 8 · 验收 ⛔ 阻塞中（等你一个决策）

**验收环境**：

| 项 | 值 |
| --- | --- |
| 隔离 UAT 环境 | `http://<Ubuntu 服务器地址>:19094`（Sol 专为本次验收建的隔离环境：独立数据库，不动共享数据） |
| 共享测试环境 | `http://<Ubuntu 服务器地址>:18081`（日常用，本次验收别用它） |
| 登录 | 配置好的测试身份（凭据在服务器上，勿外泄、勿截图） |
| 查看现场 | `ssh tch-ubuntu` 后 `tmux attach -t tcp-codex-control` 可看 Sol 总控会话（按 `Ctrl+B` 再按 `D` 退出） |

> [!failure] 08-19 阻塞事件：CI 全绿之后，真实 Chrome 抓到了真问题
> Sol 先替我做了一轮验收预演（[完整记录](https://github.com/yinhui198456/team-capability-platform/pull/195#issuecomment-5337632340)）：
>
> 1. 隔离环境部署 exact SHA `017471fe`，自动 smoke 全过；
> 2. 真实 Chrome 手测：部分评级保存（含评 0 级）、刷新/重登草稿保持、缺月份零生成+中文逐项提示、月份选择器整框可点——**全部通过** ✅；
> 3. **但点"生成所选学习任务"时服务器报 500**：数据库里有条旧约束（外键），不允许"新的评级往已有的年度计划里追加任务"——这正是本 Issue 的核心动作；
> 4. 解除它需要数据库迁移 `0016`，可它来自一个已废弃、未合并的分支（#84，标记 not-planned），不在本 PR 里（[溯源记录](https://github.com/yinhui198456/team-capability-platform/pull/195#issuecomment-5336495254)）；
> 5. **Sol 守住了规矩**：失败的事务自动回滚、零部分写入；没有偷偷手工改数据库"冒充通过"；按合同**停下来等用户授权**（改数据库结构/业务行为属于停止条件）。
>
> 人话总结：代码、测试、评审全过了，但**地基（数据库老规矩）挡路**。要不要动地基，只有你能拍板。

> [!todo] ✍️ 待我决策（当前唯一阻塞项）
> Sol 请求授权的内容：让 CC 正式纳入 0016 等价迁移 + 补"后续评级扩展既有计划"的红测 + 顺手修一行走查脚本的时序问题；**不含其他重构**。修复后要重走：复审 → CI → 隔离环境重建 → 续跑验收。
>
> 我的决定：**授权 / 不授权 / 先聊聊** → 到 Sol 会话（`tmux attach -t tcp-codex-control`）或 #194 评论里回复。
>
> **我的决定（日期 + 内容）：**＿＿＿＿＿＿

> [!todo] ✍️ 阻塞解除后：到时验收
> 1. **版本核对**：问 Sol"测试环境当前部署的 SHA 是多少"，应等于 PR 最终顶端——对不上，验收结果不算数；
> 2. 用测试身份登录**隔离 UAT 环境（19094）**；
> 3. 照站 2 检查单的 9 条逐条操作、逐条打勾（Sol 预演已过的项也要亲手再过一遍——它替你预习，不替你签字）；
> 4. 三种宽度都要试：1440、1024、768（F12 → 设备模拟）；
> 5. 截图贴到 [#194 评论](https://github.com/yinhui198456/team-capability-platform/issues/194)里当 UAT 反馈，**截图不含账号凭据**。
>
> **结果：**＿＿＿＿＿＿

## ✍️ 我的复盘（手写）

- 印证的经验卡：＿＿＿＿＿＿
- 新候选卡：＿＿＿＿＿＿（供参考的线索：① **"独立审查是第一道真门禁"**——三轮拦下 5 个 P1；② **CI 全绿 ≠ 能验收**——真实 Chrome 在全绿后仍抓到 500；③ **验收环境要隔离**——独立数据库让"随便试"和"不动共享数据"两全；④ **AI 停在授权点是对的设计**——改数据库结构这种决策，它就该停下来问人）
