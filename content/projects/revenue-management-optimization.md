---
title: "Airline Revenue Management Decision System"
titleZh: "民航收益管理决策系统"
titleEn: "Airline Revenue Management Decision System"
description: "An end-to-end algorithmic system connecting demand forecasting, network optimization, bid price, and inventory control."
descriptionZh: "面向 O&D 航班网络，主导从贝叶斯需求预测、需求还原到网络优化、Bid Price 与舱位控制的核心算法设计，形成预测—优化—控制的完整决策链路。"
descriptionEn: "Leading the core algorithm design for an O&D network revenue management system, from Bayesian demand forecasting and unconstraining to network optimization, bid price, and inventory control."
roleZh: "核心算法负责人 / 算法架构设计者"
roleEn: "Core Algorithm Lead / Algorithm Architect"
stageZh: "核心算法设计与 POC 验证"
stageEn: "Core algorithm design and POC validation"
challengeZh: "在需求受限、数据稀疏且航班共享网络容量的条件下，将概率需求预测转化为稳定、可执行的舱位控制决策。"
challengeEn: "Turn probabilistic demand forecasts into stable, executable inventory-control decisions under censored demand, sparse data, and shared network capacity."
responsibilitiesZh:
  - "规划收益管理算法总体架构，定义预测、网络优化、BP 与控制模块之间的输入输出关系"
  - "负责核心模型选型、数学机制设计、参数更新逻辑及关键算法方案评审"
  - "牵头 POC 实现、对标验证、异常诊断与算法评价指标体系设计"
responsibilitiesEn:
  - "Own the end-to-end algorithm architecture and interfaces across forecasting, network optimization, bid price, and control"
  - "Lead model selection, mathematical mechanism design, parameter updating, and core algorithm reviews"
  - "Drive POC implementation, benchmark validation, anomaly diagnosis, and evaluation design"
pipelineZh:
  - "订座、库存与航班网络数据治理"
  - "贝叶斯层级需求预测、节假日与取消率建模、需求还原"
  - "ODPF/ODIF 粒度聚合与需求均值、方差输出"
  - "DLP 网络优化与 Bid Price 计算"
  - "动态规划、可售价值与舱位控制决策"
pipelineEn:
  - "Booking, inventory, and flight-network data preparation"
  - "Hierarchical Bayesian forecasting, event and cancellation modeling, and demand unconstraining"
  - "ODPF/ODIF aggregation with demand mean and uncertainty outputs"
  - "DLP network optimization and bid-price calculation"
  - "Dynamic programming, availability value, and inventory-control decisions"
highlightsZh:
  - "通过层级结构与概率输出处理小样本、稀疏舱位及跨层级信息共享"
  - "保留 ODPF—ODIF 映射，使预测粒度与网络优化粒度能够一致衔接"
  - "建立 BP 对标与诊断框架，定位趋势、波动和容量变化下的异常结果"
  - "采用模块化设计，为节假日、取消率和需求分解等能力持续扩展预留接口"
highlightsEn:
  - "Use hierarchical structure and probabilistic outputs for sparse cabins, small samples, and cross-level information sharing"
  - "Preserve ODPF–ODIF mapping to align forecasting and network-optimization granularity"
  - "Design bid-price benchmarking and diagnostics for trend, volatility, and capacity-related anomalies"
  - "Keep modular interfaces for events, cancellations, demand decomposition, and future extensions"
tags: ["Bayesian Forecasting", "Demand Unconstraining", "DLP", "Bid Price", "Dynamic Programming"]
featured: true
year: 2026
order: 1
---
