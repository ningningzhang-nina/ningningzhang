---
title: "Real-time Choice-based Pricing Engine"
titleZh: "实时动态定价与旅客选择引擎"
titleEn: "Real-time Choice-based Pricing Engine"
description: "Choice-aware pricing that connects demand, willingness to pay, and opportunity cost."
descriptionZh: "从0到1主导构建动态定价 Pricing Engine，将旅客选择、WTP、价格弹性、购买概率与机会成本统一到可约束、可验证的实时收益最大化框架中。"
descriptionEn: "Built a dynamic-pricing engine from the ground up, unifying customer choice, WTP, price elasticity, purchase probability, and opportunity cost in a constrained and testable real-time revenue-maximization framework."
roleZh: "动态定价算法负责人 / Pricing Engine Architect"
roleEn: "Dynamic Pricing Algorithm Lead / Pricing Engine Architect"
stageZh: "算法原型与 Demo 验证"
stageEn: "Algorithm prototype and demo validation"
challengeZh: "在价格响应不可直接观测、选择集合复杂且受到库存和业务规则约束的场景下，估计旅客购买行为并给出收益更优的可执行价格。"
challengeEn: "Estimate passenger purchase behavior and produce executable, revenue-improving prices when price response is latent and decisions are constrained by choice sets, inventory, and business rules."
responsibilitiesZh:
  - "从0到1搭建旅客选择—需求响应—收益优化—价格输出的完整算法架构"
  - "主导旅客选择模型、WTP 分布、购买概率与 Revenue Maximization Engine 的核心机制设计"
  - "定义价格、Bid Price、需求响应与边际收益之间的数学关系及模块接口"
  - "建立冷启动、参数约束、业务保护规则、回测与决策解释机制"
responsibilitiesEn:
  - "Build the end-to-end customer-choice, demand-response, revenue-optimization, and pricing-output architecture from the ground up"
  - "Lead the core mechanisms for choice modeling, WTP, purchase probability, and the Revenue Maximization Engine"
  - "Define the mathematical relationships and interfaces among price, bid price, demand response, and marginal revenue"
  - "Establish cold-start handling, parameter constraints, guardrails, backtesting, and decision explanations"
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
  - "将旅客选择与机会成本统一建模，避免只根据销量或静态价格弹性进行局部调价"
  - "对价格系数施加方向和范围约束，并通过层级收缩增强稀疏场景稳定性"
  - "显式处理 No-purchase、选择集合变化及相似航线冷启动问题"
  - "通过业务规则、调价阈值和可追溯日志控制线上决策风险"
highlightsEn:
  - "Unify passenger choice and opportunity cost instead of optimizing from sales or elasticity alone"
  - "Constrain price coefficients and use hierarchical shrinkage for stable sparse-market estimates"
  - "Explicitly handle no-purchase, changing choice sets, and cold starts from similar markets"
  - "Control decision risk through business rules, adjustment thresholds, and traceable logs"
outcomesZh:
  - "算法原型已完成内部回测与 Demo 验证，证明旅客选择与机会成本可以形成可执行的价格决策闭环"
  - "相较规则驱动或仅依赖静态弹性的定价方式，能够更完整地刻画价格—选择—收益之间的联动"
  - "沉淀出可迁移至酒旅、电商与双边平台场景的 Marketplace Pricing 算法框架"
outcomesEn:
  - "The prototype completed internal backtesting and demo validation, establishing an executable loop from customer choice and opportunity cost to price decisions"
  - "Captures the interaction among price, choice, and revenue more completely than rule-based or static-elasticity pricing"
  - "Created a marketplace-pricing framework transferable to travel, hospitality, e-commerce, and two-sided platforms"
tags: ["Real-time Pricing", "Choice Modeling", "WTP", "Price Elasticity Modeling", "Revenue Maximization Engine", "Marketplace Pricing"]
featured: true
year: 2026
order: 1
---
