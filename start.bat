@echo off
chcp 65001 > nul
echo [매직 입체도형 3D 랩] 로컬 웹 서버 구동 중...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
pause
