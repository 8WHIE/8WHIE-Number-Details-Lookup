# 8WHIE Cyber Info API - Global Phone Number Lookup

A secure, privacy-conscious global phone number intelligence application by **8WHIE — Worldwide Hackers Intelligence & Ethics**, originally created by **Aryan Thakur**.

## Features

- **Global Number Lookup**: Lookup detailed information about international phone numbers.
- **Accurate Details**: Verifies and provides accurate data like Country, Region, Carrier, and Timezones.
- **Privacy First**: Operates on public routing data, without exposing PII (Personally Identifiable Information) or live GPS location.
- **Secure Architecture**: Backend powered by Python/Flask with rate limiting.
- **Responsive UI**: Built with React, Vite, and Tailwind CSS for mobile and desktop support.

## Architecture & Project Structure

- `backend/`: Flask application that utilizes the `phonenumbers` library to accurately trace and parse phone number routing data.
- `frontend/`: React single page application for an intuitive and responsive user experience.

## Installation

### 1. Backend Setup

Ensure you have Python 3.8+ installed.

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
```

### 2. Frontend Setup

Ensure you have Node.js 18+ installed.

```bash
cd frontend
npm install
npm run build
```
*(The React build will be placed into `frontend/dist` and served statically by the Flask backend)*

## Running the Application

Once the frontend is built, simply run the backend server:

```bash
cd backend
python app.py
```

The application will be accessible at `http://127.0.0.1:5000`.

### Development Mode

To work on the frontend with hot-reload while the backend API is running:

1. Start backend: `cd backend && python app.py`
2. Start frontend dev server: `cd frontend && npm run dev`

Navigate to `http://localhost:5173` for the Vite development preview.

## Testing

Backend unit tests can be run using `pytest`:

```bash
cd backend
pytest test_app.py
```

## Security & Privacy Considerations

- **Rate Limiting**: The backend employs `Flask-Limiter` to protect against abuse and DDOS attacks (10 requests per minute).
- **Privacy Limitations**: The service intentionally avoids returning a person's exact physical location or identifying details, as per 8WHIE ethics policies.
- **Input Validation**: All phone numbers are parsed and verified using `libphonenumber` to ensure only correct formats are evaluated.

## Limitations
- Carrier information is based on public routing and may be outdated if a number was recently ported to a different provider.
- Some VOIP numbers or specific country carriers may not return a definitive provider name.

## Credits & License

Copyright © 2026 8WHIE. All Rights Reserved.

Original project owner: **Aryan Thakur**. This project is proprietary. No permission is granted to copy, modify, distribute, or use this project without prior written permission from 8WHIE.
