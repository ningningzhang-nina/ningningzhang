---
title: "Dynamic Pricing & Passenger Choice"
titleZh: "旅客选择与动态定价引擎"
titleEn: "Choice-based Dynamic Pricing Engine"
description: "Choice-aware pricing that connects demand, willingness to pay, and opportunity cost."
descriptionZh: "主导旅客选择、支付意愿与动态定价核心算法设计，将购买概率、价格和机会成本统一到可约束、可验证的收益最大化框架中。"
descriptionEn: "Leading the core passenger-choice and dynamic-pricing algorithms, combining purchase probability, price, and opportunity cost in a constrained and testable revenue-maximization framework."
roleZh: "动态定价核心算法负责人 / 算法架构设计者"
roleEn: "Dynamic Pricing Algorithm Lead / Algorithm Architect"
stageZh: "算法原型与 Demo 验证"
stageEn: "Algorithm prototype and demo validation"
challengeZh: "在价格响应不可直接观测、选择集合复杂且受到库存和业务规则约束的场景下，估计旅客购买行为并给出收益更优的可执行价格。"
challengeEn: "Estimate passenger purchase behavior and produce executable, revenue-improving prices when price response is latent and decisions are constrained by choice sets, inventory, and business rules."
responsibilitiesZh:
  - "负责旅客选择模型、WTP 分布、购买概率与动态定价目标函数的整体算法设计"
  - "定义价格、Bid Price、需求响应与收益最大化之间的数学关系"
  - "设计冷启动、参数约束、业务保护规则、回测及结果解释机制"
responsibilitiesEn:
  - "Own the algorithm design for passenger choice, WTP, purchase probability, and dynamic-pricing objectives"
  - "Define the mathematical relationship among price, bid price, demand response, and revenue maximization"
  - "Design cold-start handling, parameter constraints, guardrails, backtesting, and decision explanations"
pipelineZh:
  - "交易、Shopping、库存与价格上下文构建"
  - "旅客选择模型与 WTP / 价格敏感性估计"
  - "候选价格下购买概率与预期需求计算"
  - "基于 Price − Bid Price 的边际收益优化"
  - "规则校验、调价输出与效果反馈"
pipelineEn:
  - "Transaction, shopping, inventory, and price-context construction"
  - "Passenger-choice and WTP / price-sensitivity estimation"
  - "Purchase-probability and expected-demand calculation by candidate price"
  - "Marginal-revenue optimization using Price minus Bid Price"
  - "Rule validation, pricing output, and outcome feedback"
highlightsZh:
  - "将旅客选择与机会成本统一建模，避免只根据销量或价格弹性进行局部调价"
  - "对价格系数施加方向和范围约束，并通过层级收缩增强稀疏场景稳定性"
  - "显式处理 No-purchase、选择集合变化及相似航线冷启动问题"
  - "通过业务规则、调价阈值和可追溯日志控制线上决策风险"
highlightsEn:
  - "Unify passenger choice and opportunity cost instead of optimizing from sales or elasticity alone"
  - "Constrain price coefficients and use hierarchical shrinkage for stable sparse-market estimates"
  - "Explicitly handle no-purchase, changing choice sets, and cold starts from similar markets"
  - "Control decision risk through business rules, adjustment thresholds, and traceable logs"
tags: ["Choice Modeling", "WTP", "Purchase Probability", "Bid Price", "Optimization"]
featured: true
year: 2026
order: 2
---
