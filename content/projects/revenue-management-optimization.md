---
category: "core"
title: "Forecast-to-Decision Optimization Platform"
titleZh: "预测驱动的决策优化平台"
titleEn: "Forecast-to-Decision Optimization Platform"
description: "An end-to-end algorithmic system connecting demand forecasting, network optimization, bid price, and inventory control."
descriptionZh: "面向 O&D 网络从0到1搭建 Forecast-to-Decision 算法体系，将贝叶斯需求预测、需求还原、网络优化、Bid Price 与库存控制连接为完整收益决策链路。"
descriptionEn: "Built a Forecast-to-Decision system for O&D networks from the ground up, connecting Bayesian demand forecasting, unconstraining, network optimization, bid price, and inventory control."
applicationZh: "航空收益管理与容量分配"
applicationEn: "Airline Revenue Management and Capacity Allocation"
roleZh: "收益管理核心算法负责人 / Forecast-to-Decision Architect"
roleEn: "Revenue Management Algorithm Lead / Forecast-to-Decision Architect"
stageZh: "核心算法设计与 POC 验证"
stageEn: "Core algorithm design and POC validation"
proofLabelZh: "内部 POC · 与成熟商业系统逐航线对标 · 输出可直接进入库存控制"
proofLabelEn: "Internal POC · route-level benchmark against a mature commercial system · control-ready outputs"
proofPointsZh:
  - "已按生产数据粒度贯通 PNR → O&D → DCP → ODPF/ODIF → 预测均值/方差 → DLP/Bid Price → 控制"
  - "建立 MAE、VAR、NMAE、MAD_MAX 与 DIFF_CORR 指标，对自算 Bid Price 和商业系统结果逐航线诊断"
  - "部分航线的 Bid Price 已表现出较高一致性；未公开统一提升百分比，避免把局部结果外推为整体上线收益"
proofPointsEn:
  - "Connected the production-granularity path from PNR through O&D, DCP, ODPF/ODIF, forecast mean/variance, DLP/bid price, and control"
  - "Built MAE, VAR, NMAE, MAD_MAX, and DIFF_CORR diagnostics for route-level comparison against a commercial RM system"
  - "Selected routes show strong bid-price consistency; no aggregate uplift is claimed because local benchmark results should not be extrapolated to production revenue"
deliveryItemsZh:
  - "需求预测输出契约：ODIF 粒度的均值、方差、DCP 与映射键"
  - "DLP 网络优化与航段 Bid Price 计算模块"
  - "BP 对标诊断面板与异常定位指标"
  - "动态规划、可售价值与库存控制的模块接口"
deliveryItemsEn:
  - "Forecast output contract with ODIF-level mean, variance, DCP, and mapping keys"
  - "DLP network optimization and leg bid-price modules"
  - "Bid-price benchmark diagnostics and anomaly metrics"
  - "Interfaces for dynamic programming, availability value, and inventory control"
inputContractZh: "PNR、库存、航班网络、容量、O&D/ODPF/ODIF 映射、DCP、节假日与取消信息。"
inputContractEn: "PNR, inventory, flight network, capacity, O&D/ODPF/ODIF mappings, DCPs, events, and cancellation information."
outputContractZh: "ODIF 需求均值/方差、网络影子价格、航段 Bid Price、可售价值与控制模块所需决策字段。"
outputContractEn: "ODIF demand mean/variance, network shadow prices, leg bid prices, availability value, and decision fields required by inventory control."
validationBoundaryZh: "这是内部 POC 对标结果，不等同于正式生产上线；受保密限制不披露航线、绝对 BP、商业系统名称及完整汇总数值。"
validationBoundaryEn: "These are internal POC benchmark results, not a production deployment. Routes, absolute bid prices, commercial-system identity, and complete aggregate values are withheld for confidentiality."
metricCards:
  - value: "5"
    labelZh: "核心 BP 对标指标"
    labelEn: "Core bid-price benchmark metrics"
    noteZh: "MAE / VAR / NMAE / MAD_MAX / DIFF_CORR"
    noteEn: "MAE / VAR / NMAE / MAD_MAX / DIFF_CORR"
  - value: "ODIF"
    labelZh: "预测与优化衔接粒度"
    labelEn: "Forecast-to-optimization grain"
    noteZh: "输出均值、方差与映射键"
    noteEn: "Mean, variance, and mapping keys"
challengeZh: "在需求受限、数据稀疏且航班共享网络容量的条件下，将概率需求预测转化为稳定、可执行的舱位控制决策。"
challengeEn: "Turn probabilistic demand forecasts into stable, executable inventory-control decisions under censored demand, sparse data, and shared network capacity."
responsibilitiesZh:
  - "从0到1搭建收益管理算法总体架构，定义预测、网络优化、BP 与控制模块的接口和数据契约"
  - "主导核心模型选型、数学机制、参数更新逻辑及关键算法方案评审"
  - "主导完成 POC 全流程实现与验证，建立可复用的对标、异常诊断和评价指标体系"
responsibilitiesEn:
  - "Build the end-to-end algorithm architecture from the ground up and define interfaces and data contracts across forecasting, network optimization, bid price, and control"
  - "Lead model selection, mathematical mechanisms, parameter updating, and core algorithm reviews"
  - "Lead the full POC implementation and validation lifecycle, creating reusable benchmarking, diagnostics, and evaluation frameworks"
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
outcomesZh:
  - "POC 已通过内部对标验证，部分航线的 Bid Price 结果与成熟商业系统保持较高一致性"
  - "层级预测与跨粒度信息共享增强了小样本、稀疏舱位场景下的预测稳定性"
  - "将预测模型升级为可直接服务库存与收益决策的 Revenue Optimization System"
outcomesEn:
  - "The POC passed internal benchmark validation, with bid-price results on selected markets showing strong consistency with a mature commercial system"
  - "Hierarchical forecasting and cross-granularity information sharing improved stability in sparse-market and small-sample settings"
  - "Extended forecasting into a Revenue Optimization System that directly supports inventory and revenue decisions"
tags: ["Demand Forecasting", "Probabilistic Forecasting", "Revenue Optimization", "Network Optimization", "Bid Price Optimization", "Inventory Control"]
featured: true
year: 2026
order: 2
---
