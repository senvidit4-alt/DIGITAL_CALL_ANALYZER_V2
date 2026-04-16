#!/bin/bash
# install_ml.sh — MCA Cyber Dost Machine Learning Setup
echo "🚀 Setting up Machine Learning Environment..."
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r backend/requirements.txt
echo "✅ Setup complete. Use 'source venv/bin/activate' to continue."
