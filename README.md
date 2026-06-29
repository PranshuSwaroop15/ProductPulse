# 🚀 ProductPulse

> AI-powered customer feedback intelligence platform built with Next.js, OpenAI, Prisma, and Amazon Aurora PostgreSQL.

![ProductPulse](./public/icon.png)

## 📖 Overview

ProductPulse helps businesses transform raw customer feedback into actionable business intelligence.

Instead of manually reading hundreds of customer reviews, survey responses, and support tickets, ProductPulse automatically analyzes feedback using AI and provides executives with meaningful insights through an interactive dashboard.

The application supports both manual feedback submission and CSV uploads, performs AI-powered analysis, stores results in Amazon Aurora PostgreSQL, and generates real-time analytics and executive reports.

---

# ✨ Features

- 🤖 AI-powered feedback analysis
- 😊 Sentiment Analysis (Positive / Neutral / Negative)
- 🏷 Automatic Category Classification
- 🚨 Priority Detection
- 📝 AI-generated Executive Summaries
- 💡 Suggested Business Actions
- 📈 Interactive Analytics Dashboard
- 📊 Sentiment Trend Visualization
- 📂 CSV Bulk Import
- 📄 Executive Report Generation
- ⚡ Real-time Dashboard Updates

---

# 🏗 Architecture

```
                        User
                          │
                          ▼
                Next.js Frontend (Vercel)
                          │
                 HTTPS REST API Calls
                          │
                          ▼
            Next.js API Routes (Serverless)
                          │
                     Prisma ORM
                  ┌────────┴─────────┐
                  ▼                  ▼
        OpenAI GPT-4o-mini    Amazon Aurora PostgreSQL
     AI Analysis Pipeline        Persistent Storage
                  │                  │
                  └────────┬─────────┘
                           ▼
            Dashboard & Executive Reports
```

---

# 🛠 Tech Stack

### Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Recharts
- shadcn/ui

### Backend

- Next.js API Routes
- Prisma ORM

### AI

- OpenAI GPT-4o-mini

### Database

- Amazon Aurora PostgreSQL

### Deployment

- Vercel

---

# 🧠 AI Analysis Pipeline

Each customer feedback is automatically analyzed to determine:

- Sentiment
- Category
- Priority
- Executive Summary
- Suggested Action
- Business Impact

The analyzed data is then stored inside Amazon Aurora PostgreSQL and visualized on the dashboard.

---

# 📊 Dashboard

The dashboard includes:

- Total Feedback
- Positive / Neutral / Negative Distribution
- High Priority Issues
- Sentiment Trends
- Top Complaints
- Feature Requests
- Recent Feedback
- AI Executive Insights

---

# 📄 Executive Report

Executives receive:

- Overall Product Health Score
- Customer Sentiment Breakdown
- Business Risks
- AI Generated Recommendations
- Executive Summary

---

# 🗄 AWS Database

This project uses:

**Amazon Aurora PostgreSQL**

Aurora stores:

- Customer Feedback
- AI Analysis Results
- Categories
- Priorities
- Executive Summaries
- Suggested Actions
- Metadata

Prisma ORM is used as the database access layer.

---

# 🚀 Running Locally

Clone the repository

```bash
git clone https://github.com/PranshuSwaroop15/ProductPulse.git
```

Install dependencies

```bash
npm install
```

Create an `.env` file

```env
DATABASE_URL=your_aurora_connection_string
OPENAI_API_KEY=your_openai_key
```

Run Prisma

```bash
npx prisma generate
```

Start the application

```bash
npm run dev
```

---

# 📂 Project Structure

```
app/
components/
lib/
prisma/
public/
```

---

# 🎯 Problem Statement

Organizations receive thousands of customer feedback entries every day.

Manually reviewing every review, support ticket, or survey response is expensive and slow.

ProductPulse uses AI to automatically analyze customer feedback, identify trends, prioritize issues, and generate executive insights, helping businesses make faster and more informed product decisions.

---

# 🌟 Future Improvements

- Authentication & Multi-tenancy
- Real-time Streaming Analytics
- Background AI Processing Queue
- PDF Report Export
- Email Reports
- Slack & Microsoft Teams Integrations
- Multi-language Sentiment Analysis

---

# 👨‍💻 Author

**Pranshu Swaroop**

Boston University  
M.S. Computer Science

GitHub:
https://github.com/PranshuSwaroop15

LinkedIn:
https://linkedin.com/in/pranshuswaroop

---

# 📜 License

MIT License
