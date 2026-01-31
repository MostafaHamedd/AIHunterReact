#!/bin/bash

# Script to set up GitHub repositories for HunterAI
# Run this after creating the repos on GitHub

echo "Setting up GitHub repositories..."
echo ""
echo "Please create two repositories on GitHub first:"
echo "1. Frontend repo (e.g., hunter-ai-frontend)"
echo "2. Backend repo (e.g., hunter-ai-backend)"
echo ""
read -p "Enter your GitHub username: " GITHUB_USERNAME
read -p "Enter frontend repo name: " FRONTEND_REPO
read -p "Enter backend repo name: " BACKEND_REPO

# Frontend setup
cd /Users/mostafahamed/Documents/Porjects/HunterAI
git remote add origin "https://github.com/${GITHUB_USERNAME}/${FRONTEND_REPO}.git"
git branch -M main
echo "Frontend remote added: https://github.com/${GITHUB_USERNAME}/${FRONTEND_REPO}.git"

# Backend setup
cd /Users/mostafahamed/Documents/Porjects/HunterAI/backend
git remote add origin "https://github.com/${GITHUB_USERNAME}/${BACKEND_REPO}.git"
git branch -M main
echo "Backend remote added: https://github.com/${GITHUB_USERNAME}/${BACKEND_REPO}.git"

echo ""
echo "Setup complete! Now you can push with:"
echo "  Frontend: cd /Users/mostafahamed/Documents/Porjects/HunterAI && git push -u origin main"
echo "  Backend: cd /Users/mostafahamed/Documents/Porjects/HunterAI/backend && git push -u origin main"

