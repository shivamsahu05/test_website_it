@echo off
REM ===============================
REM 🚀 Next.js Contact Backend Setup & Test (Local)
REM ===============================

REM 1️⃣ Install dependencies
echo Installing dependencies...
npm install mongodb nodemailer

REM 2️⃣ Create .env.local at project root
echo Creating .env.local...
(
echo MONGODB_URI=mongodb+srv://Vercel-Admin-atlas-yellow-bell:Shivam_#!123@atlas-yellow-bell.1ennr99.mongodb.net/contactDB?retryWrites=true^&w=majority
echo EMAIL_USER=hello@technova.com
echo EMAIL_PASSWORD=YOUR_16_CHAR_APP_PASSWORD
) > .env.local

echo .env.local created. Please verify your credentials (especially EMAIL_PASSWORD).

REM 3️⃣ Start Next.js dev server in a new window
start cmd /k "echo Starting Next.js server... & npm run dev"

timeout /t 5

REM 4️⃣ Test API locally
echo Testing API success case...
curl -X POST http://localhost:3000/api/contact ^
-H "Content-Type: application/json" ^
-d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"message\":\"Hello!\"}"

echo.
echo Testing missing fields error...
curl -X POST http://localhost:3000/api/contact ^
-H "Content-Type: application/json" ^
-d "{\"name\":\"John Doe\"}"

echo.
echo Testing invalid email error...
curl -X POST http://localhost:3000/api/contact ^
-H "Content-Type: application/json" ^
-d "{\"name\":\"John Doe\",\"email\":\"invalid\",\"message\":\"Hello!\"}"

echo.
echo ✅ Local tests done. 
echo Please check MongoDB Atlas (contactDB → messages) and EMAIL inbox (hello@technova.com) for results.

echo.
echo If all works, push to GitHub:
echo git add .
echo git commit -m "Verified contact backend locally"
echo git push origin main

echo.
echo Then deploy to Vercel, set env vars, and test production endpoint.
pause

