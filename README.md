# 🚀 ProductPulse

> AI-powered customer feedback intelligence platform built with Next.js, OpenAI, Prisma, and Amazon Aurora PostgreSQL.


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

# 🏗 Architecture [Link](https://miro.com/app/board/uXjVHA_e4T8=/?share_link_id=243283777624)

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

<img width="1912" height="1018" alt="Screenshot 2026-06-29 165928" src="https://github.com/user-attachments/assets/904470ab-e422-4959-a35a-5cf5ae67b960" />
<img width="1585" height="550" alt="Screenshot 2026-06-29 193218" src="https://github.com/user-attachments/assets/8aa561a8-d323-4503-bffc-74b05f85db97" />
<img width="1910" height="1027" alt="Screenshot 2026-06-29 193235" src="https://github.com/user-attachments/assets/ca29c294-aff6-4c99-a23c-172b0d2a606b" />
---

# 📄 Executive Report

Executives receive:

- Overall Product Health Score
- Customer Sentiment Breakdown
- Business Risks
- AI Generated Recommendations
- Executive Summary
- 
<img width="1918" height="855" alt="Screenshot 2026-06-29 193255" src="https://github.com/user-attachments/assets/8d238834-dd56-46ba-9f80-5d0fd097a229" />

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

<img width="1918" height="1007" alt="Screenshot 2026-06-29 194535" src="https://github.com/user-attachments/assets/286eb2d1-7488-4cba-9490-0a5f449f00c9" />

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

GitHub:
https://github.com/PranshuSwaroop15

LinkedIn:
https://linkedin.com/in/pranshuswaroop

---

# 📜 License

MIT License
