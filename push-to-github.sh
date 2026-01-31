#!/bin/bash

# Quick script to push both repos to GitHub
# Make sure you've created the repos on GitHub first!

GITHUB_USER="MostafaHamedd"
FRONTEND_REPO="hunter-ai-frontend"
BACKEND_REPO="hunter-ai-backend"

echo "Setting up GitHub remotes and pushing..."
echo ""

# Frontend
echo "Setting up frontend repository..."
cd /Users/mostafahamed/Documents/Porjects/HunterAI
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/${GITHUB_USER}/${FRONTEND_REPO}.git"
git branch -M main
echo "Frontend remote: https://github.com/${GITHUB_USER}/${FRONTEND_REPO}.git"
echo ""

# Backend
echo "Setting up backend repository..."
cd /Users/mostafahamed/Documents/Porjects/HunterAI/backend
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/${GITHUB_USER}/${BACKEND_REPO}.git"
git branch -M main
echo "Backend remote: https://github.com/${GITHUB_USER}/${BACKEND_REPO}.git"
echo ""

echo "✅ Remotes configured!"
echo ""
echo "⚠️  IMPORTANT: Create these repositories on GitHub first:"
echo "   1. https://github.com/${GITHUB_USER}/${FRONTEND_REPO}"
echo "   2. https://github.com/${GITHUB_USER}/${BACKEND_REPO}"
echo ""
echo "Then run these commands to push:"
echo ""
echo "  # Push frontend:"
echo "  cd /Users/mostafahamed/Documents/Porjects/HunterAI && git push -u origin main"
echo ""
echo "  # Push backend:"
echo "  cd /Users/mostafahamed/Documents/Porjects/HunterAI/backend && git push -u origin main"

