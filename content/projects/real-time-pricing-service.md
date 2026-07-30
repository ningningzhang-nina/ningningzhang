---
category: "frontier"
title: "Streaming Features & Real-time Pricing Service"
titleZh: "流式特征与实时定价服务"
titleEn: "Streaming Features & Real-time Pricing Service"
description: "A reproducible online-pricing engineering pipeline."
descriptionZh: "用公开出行数据回放模拟实时请求，补齐分钟级特征更新、在线推断、缓存、模型热更新与监控的工程链路。"
descriptionEn: "Replay public mobility data as live requests to build minute-level features, online inference, caching, model hot updates, and monitoring."
stageZh: "规划中 · 公开数据项目"
stageEn: "Planned · Public-data project"
challengeZh: "将离线定价模型转化为低延迟、可监控、可降级的在线服务，并保证实时特征与训练口径一致。"
challengeEn: "Turn an offline pricing model into a low-latency, observable, fault-tolerant online service while keeping training and serving features consistent."
pipelineZh:
  - "使用公开时空出行数据回放实时请求"
  - "构建分钟级流式特征与在线特征存储"
  - "部署在线推断、缓存与模型热更新"
  - "验证延迟、吞吐、降级与监控机制"
pipelineEn:
  - "Replay public spatiotemporal mobility data as live requests"
  - "Build minute-level streaming features and an online feature store"
  - "Deploy online inference, caching, and model hot updates"
  - "Validate latency, throughput, fallback, and monitoring"
dataPlanZh: "NYC Taxi 等公开时空出行数据"
dataPlanEn: "Public spatiotemporal mobility data such as NYC Taxi"
deliverableZh: "可复现流式 Demo、延迟与吞吐压测、降级及监控方案"
deliverableEn: "Reproducible streaming demo, latency and throughput tests, fallback strategy, and monitoring"
outcomesZh:
  - "形成从实时特征到定价 API 的可复现工程闭环"
outcomesEn:
  - "Build a reproducible engineering loop from streaming features to a pricing API"
tags: ["Kafka", "Flink", "Redis", "FastAPI"]
year: 2026
order: 2
---
