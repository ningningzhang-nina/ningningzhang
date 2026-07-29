---
title: "Airline Revenue Management Simulation & Evaluation Platform"
titleZh: "航空收益管理仿真与算法评测平台"
titleEn: "Airline Revenue Management Simulation & Evaluation Platform"
description: "A controlled simulation and benchmarking environment for validating airline revenue-management algorithms end to end."
descriptionZh: "从0到1搭建可控、可复现的航空收益管理实验环境，贯通旅客生成、选择与取消、订座仿真、预测、网络优化、库存控制和算法评测。"
descriptionEn: "Built a controlled and reproducible airline revenue-management experimentation environment spanning passenger generation, choice and cancellation, booking simulation, forecasting, network optimization, inventory control, and benchmarking."
roleZh: "平台与算法负责人 / Simulation & Evaluation Architect"
roleEn: "Platform & Algorithm Lead / Simulation & Evaluation Architect"
stageZh: "可运行原型、算法验证与可视化评测"
stageEn: "Working prototype, algorithm validation, and visual evaluation"
challengeZh: "真实业务数据难以提供完整反事实，线上试验成本高且不同策略面对的旅客流不一致，因此难以判断收益变化究竟来自预测、控制策略还是随机波动。"
challengeEn: "Real-world data rarely exposes complete counterfactuals, online experiments are costly, and competing policies do not naturally face identical passenger streams—making it difficult to separate forecasting value, control value, and random variation."
responsibilitiesZh:
  - "从0到1设计仿真平台架构，定义网络、需求、旅客选择、取消、库存、预测、优化和评测模块的接口"
  - "构建传统基线与新算法的统一实验框架，保证所有方案在相同旅客流和随机数下公平复跑"
  - "主导 Oracle 诊断、压力场景、在线学习、预测准确率与收益分解等验证机制设计"
responsibilitiesEn:
  - "Design the simulation architecture from the ground up and define interfaces across network, demand, choice, cancellation, inventory, forecasting, optimization, and evaluation modules"
  - "Build a unified experiment framework for traditional baselines and new algorithms under identical passenger streams and random draws"
  - "Lead the design of Oracle diagnostics, stress scenarios, online learning, forecast-accuracy evaluation, and revenue decomposition"
pipelineZh:
  - "构建枢纽—支线网络、容量、O&D 市场、联程产品与多档票价"
  - "生成带客群、提前期、WTP、同行人数和共同随机数的潜在旅客"
  - "通过 MNL 选择、库存约束与取消过程推进逐日订座仿真"
  - "对比历史均值 + leg EMSR-b 与贝叶斯在线预测 + DLP + Bellman DP"
  - "用 Oracle、压力场景、多随机种子和可视化面板解释预测与控制的独立贡献"
pipelineEn:
  - "Construct a hub-and-spoke network with capacities, O&D markets, connecting products, and fare classes"
  - "Generate potential passengers with segment, booking horizon, WTP, party size, and common random numbers"
  - "Run daily booking simulation through MNL choice, inventory constraints, and cancellation processes"
  - "Compare historical-mean plus leg EMSR-b against Bayesian online forecasting plus DLP and Bellman DP"
  - "Use Oracle controls, stress scenarios, multiple seeds, and dashboards to isolate forecasting and control contributions"
highlightsZh:
  - "7个机场、12条有向航段和42个O&D市场，支持直飞与联程共享容量的网络位移场景"
  - "Gamma-Poisson 到达、动态商务/休闲比例、预订提前期、WTP、MNL 选择和取消风险共同刻画旅客行为"
  - "共同随机数保证算法 A/B 面对完全相同的潜在请求、选择和取消随机性"
  - "10个DCP窗口驱动预训练后的逐窗口贝叶斯更新，并在每个检查点重新求解 DLP 与有限时域 Bellman DP"
  - "Streamlit 面板统一展示需求、客群、WTP、取消率、Bid Price 和预测准确率"
highlightsEn:
  - "Model 7 airports, 12 directed legs, and 42 O&D markets with shared-capacity displacement across local and connecting traffic"
  - "Represent passenger behavior through Gamma-Poisson arrivals, dynamic business/leisure mix, booking horizons, WTP, MNL choice, and cancellation risk"
  - "Use common random numbers so every A/B policy faces identical potential requests, choices, and cancellation randomness"
  - "Drive post-training Bayesian updates through 10 DCP windows and re-solve DLP plus finite-horizon Bellman DP at each checkpoint"
  - "Unify demand, segment mix, WTP, cancellation, bid price, and forecast-accuracy diagnostics in a Streamlit dashboard"
outcomesZh:
  - "建立了从旅客真值生成、历史数据形成、模型训练到在线控制和反事实评测的完整闭环"
  - "在固定随机种子的三个月网络压力场景中，贝叶斯在线预测 + DLP + Bellman DP 相对历史均值 + EMSR-b 的仿真收益提升56.8%"
  - "在相同 Oracle 需求下，网络 DLP + DP 相对 leg EMSR-b 提升39.24%，将预测误差与网络控制价值分离验证"
outcomesEn:
  - "Established a complete loop from latent passenger generation and historical-data formation to model training, online control, and counterfactual evaluation"
  - "In a three-month network-stress simulation with a fixed random seed, Bayesian online forecasting plus DLP and Bellman DP improved simulated revenue by 56.8% over historical-mean forecasting plus EMSR-b"
  - "Under identical Oracle demand, network DLP plus DP improved revenue by 39.24% over leg EMSR-b, separating network-control value from forecast error"
tags: ["Simulation", "Revenue Management", "Passenger Choice", "Bayesian Online Learning", "DLP", "Bellman DP", "Algorithm Evaluation"]
featured: true
year: 2026
order: 5
---
