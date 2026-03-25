@echo off
cd /d "%~dp0"
start "Recipe Backend" cmd /k "cd /d backend && npm.cmd start"
start "Recipe Frontend" cmd /k "cd /d frontend && npm.cmd start"
echo Backend and frontend are starting in separate windows.
