# GitHub Repository Setup Guide

## Step 1: Create Repositories on GitHub

1. Go to https://github.com/new
2. Create **Frontend Repository**:
   - Name: `hunter-ai-frontend` (or your preferred name)
   - Description: "React frontend for HunterAI Job Hunting Platform"
   - Visibility: Public or Private (your choice)
   - **DO NOT** initialize with README, .gitignore, or license
   - Click "Create repository"

3. Create **Backend Repository**:
   - Name: `hunter-ai-backend` (or your preferred name)
   - Description: "Spring Boot backend with R2DBC for HunterAI"
   - Visibility: Public or Private (your choice)
   - **DO NOT** initialize with README, .gitignore, or license
   - Click "Create repository"

## Step 2: Push to GitHub

### Frontend Repository

```bash
cd /Users/mostafahamed/Documents/Porjects/HunterAI
git remote add origin https://github.com/YOUR_USERNAME/hunter-ai-frontend.git
git branch -M main
git push -u origin main
```

### Backend Repository

```bash
cd /Users/mostafahamed/Documents/Porjects/HunterAI/backend
git remote add origin https://github.com/YOUR_USERNAME/hunter-ai-backend.git
git branch -M main
git push -u origin main
```

## Alternative: Use the Setup Script

You can also run the interactive setup script:

```bash
cd /Users/mostafahamed/Documents/Porjects/HunterAI
./setup-github.sh
```

Then follow the prompts and push when ready.

## Quick Push Commands (After Setting Remotes)

**Frontend:**
```bash
cd /Users/mostafahamed/Documents/Porjects/HunterAI && git push
```

**Backend:**
```bash
cd /Users/mostafahamed/Documents/Porjects/HunterAI/backend && git push
```

