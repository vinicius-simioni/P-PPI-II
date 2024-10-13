@echo off

:: Abrir terminal para backend
start cmd /k "cd backend && npm run dev"

:: Abrir terminal para frontend
start cmd /k "cd frontend && npm run dev"
