# Cognitive Skills & Student Performance Dashboard

This repository contains a Next.js dashboard and a Jupyter Notebook analyzing relationships between cognitive skills and student performance using a synthetic dataset.

## Tech
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Recharts for charts
- Jupyter (Python) for EDA, ML, clustering

## Quick Start
```bash
npm install
npm run generate:data
npm run dev
```
Visit http://localhost:3000

## Dataset
Generated to `public/data/students.json` and `public/data/students.csv` with columns:
`student_id, name, class, comprehension, attention, focus, retention, engagement_time, assessment_score`.

The generation script adds realistic correlations (assessment is a weighted sum of skills and engagement plus noise).

## Notebook
Open `notebooks/analysis.ipynb`. It includes:
- Summary statistics and distributions
- Correlation analysis
- A regression model to predict `assessment_score`
- KMeans clustering to create learning personas


## Deployment
- Live Demo: https://assignment-igebra-2-0.vercel.app/
- GitHub Repository: https://github.com/Madhav-150/Assignment-igebra--2.0

## Submission
- Vercel URL (public)
- GitHub repository URL


