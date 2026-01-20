# 🚀 AWS FinOps Automation Platform

An end-to-end **AWS FinOps automation system** that detects underutilized EC2 instances using CloudWatch metrics, automatically stops wasteful resources, calculates real cost savings, and visualizes optimization insights through a modern dashboard.

This project demonstrates real-world **cloud cost optimization**, combining AWS automation, backend APIs, and a data-driven frontend UI.

---

## ✨ Key Features

- 🔍 Automatically discovers EC2 instances across regions  
- 📉 Monitors CPU utilization using AWS CloudWatch  
- 🛑 Auto-stops underutilized EC2 instances via a FinOps rules engine  
- 💰 Calculates real-time cost savings based on instance type and runtime  
- 📊 Interactive dashboard with charts and optimization history  
- 🔗 Direct links to AWS Console for each optimized instance  
- 🔄 Real-time data refresh from backend APIs  

---

## 🏗 Architecture Overview


::contentReference[oaicite:0]{index=0}


### Components

#### 1. FinOps Bot (Python)
- Uses `boto3` to:
  - Discover EC2 instances
  - Fetch CloudWatch CPU metrics
  - Evaluate utilization thresholds
  - Stop underutilized instances
  - Calculate estimated cost savings

#### 2. Backend API (Node.js + Express)
- Exposes REST APIs for:
  - Optimized instance metadata
  - Savings calculations
  - Optimization history
- Uses in-memory storage (demo-friendly)

#### 3. Frontend Dashboard (React)
- Displays:
  - Cost savings over time
  - Optimization actions
  - EC2 instance details
- Built with Recharts for interactive visualizations

---

## 🧰 Tech Stack

**Cloud**
- AWS EC2
- AWS CloudWatch
- AWS IAM

**Automation**
- Python
- boto3

**Backend**
- Node.js
- Express

**Frontend**
- React
- Recharts
- Axios

**Infrastructure as Code (Optional)**
- Terraform

**Security**
- AWS credentials managed via AWS CLI  
- No credentials stored in the repository

---

## 🔄 Workflow

1. FinOps Bot scans EC2 instances across configured regions  
2. CloudWatch CPU metrics are evaluated against utilization thresholds  
3. Underutilized instances are automatically stopped  
4. Cost savings are calculated using instance type and runtime  
5. Backend APIs store optimization data  
6. Frontend dashboard visualizes savings and optimization history  

---

## 📊 Use Case

This project simulates how real organizations apply **FinOps principles** to:

- Reduce unnecessary cloud spend  
- Improve cost visibility  
- Enforce governance through automation  

It is ideal for:
- Cloud Engineers  
- DevOps Engineers  
- FinOps Practitioners  
- AWS learners building portfolio projects  

---

## ⚠️ Disclaimer

> This project is intended for **learning and demonstration purposes only**.  
> Always review automation rules and test in non-production environments before applying cost-optimization actions in production AWS accounts.

---

## 📌 Future Enhancements

- Persistent database (DynamoDB / PostgreSQL)
- Multi-metric optimization (Network I/O, Memory)
- Approval workflows before stopping instances
- Scheduled optimization windows
- Slack / Email notifications

---

## 📄 License

MIT License

---

⭐ If you find this project helpful, consider starring the repository!
