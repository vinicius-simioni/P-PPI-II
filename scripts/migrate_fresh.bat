@echo off

start cmd /k "cd backend && npx sequelize-cli db:migrate:undo:all && npx sequelize-cli db:migrate"

