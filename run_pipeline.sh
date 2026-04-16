#!/bin/bash
# run_pipeline.sh — MCA Cyber Dost Pipeline Executor
echo "🔍 Starting Digital Fraud Analysis Pipeline..."
cd backend
python app.py &
cd ../frontend
npm run dev
echo "🚀 Portal isActive. Monitoring 1930 Helpline..."
