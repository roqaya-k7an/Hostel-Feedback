@echo off
REM Start the IIUI Hostel Feedback System on Windows
cd /d "%~dp0"

if not exist ".venv" (
    python -m venv .venv
)
call .venv\Scripts\activate.bat
pip install -q -r requirements.txt

echo.
echo Starting IIUI Hostel Feedback on http://localhost:5000
echo Open that address in your browser. Press Ctrl+C here to stop.
echo.
python app.py
pause
