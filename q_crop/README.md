# Quantum Farming - Agricultural Yield Prediction Platform

**Quantum Farming** is an agricultural technology platform designed to model and forecast crop yields using agronomic variables, weather parameters, and experimental quantum-enhanced algorithms.

---

## 🌟 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, React Router DOM, Recharts, Lucide Icons.
- **Service Layer**: Centralized API service module under `src/services/` with environment-based configuration and input validation.

---

## 🔌 Connecting a Future Python Backend API

The frontend application is fully prepared for integration with a future Python backend (such as **FastAPI** or **Flask**).

### 1. Environment Configuration

Create a `.env` file in the root folder (or copy `.env.example`):

```bash
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 2. Required API Endpoints Contract

The centralized service layer in `src/services/yieldPredictionService.js` expects the following JSON endpoints:

#### A. Yield Prediction Endpoint
- **URL**: `POST /api/v1/predict/yield`
- **Request Body**:
  ```json
  {
    "cropType": "Wheat",
    "region": "North American Corn Belt",
    "growingSeason": "Spring",
    "irrigation": "Fully Irrigated",
    "rainfall": 650,
    "temperature": 22,
    "humidity": 60,
    "soilPh": 6.5,
    "soilNitrogen": 120
  }
  ```
- **Response Format (HTTP 200)**:
  ```json
  {
    "predictedYield": 4.82,
    "confidenceScore": 98.6,
    "lowerBound": 4.55,
    "upperBound": 5.09,
    "cropCondition": "Optimal Growth",
    "recommendations": "Apply nitrogen top-dressing at V6 stage.",
    "modelVersion": "VQE-v2.4",
    "timestamp": "2026-10-09T23:40:00Z"
  }
  ```

#### B. Health Status Endpoint
- **URL**: `GET /api/v1/health`
- **Response Format (HTTP 200)**:
  ```json
  {
    "classicalMlStatus": "HEALTHY",
    "quantumMlStatus": "QPU_ONLINE",
    "version": "1.0.0",
    "timestamp": "2026-10-09T23:40:00Z"
  }
  ```

#### C. Quantum Nodes Status Endpoint
- **URL**: `GET /api/v1/quantum/nodes`
- **Response Format (HTTP 200)**: Array of node status objects.

---

## 🐍 Sample Python FastAPI Implementation Blueprint

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="Quantum Farming API", version="1.0.0")

class PredictionRequest(BaseModel):
    cropType: str
    region: str
    growingSeason: str
    irrigation: str
    rainfall: float = Field(..., ge=0, le=3000)
    temperature: float = Field(..., ge=-10, le=60)
    humidity: float = Field(..., ge=0, le=100)
    soilPh: float = Field(..., ge=0, le=14)
    soilNitrogen: float = Field(..., ge=0, le=500)

@app.post("/api/v1/predict/yield")
def predict_yield(payload: PredictionRequest):
    # Execute classical ML regression or Qiskit/PennyLane VQE circuit calculation here
    return {
        "predictedYield": 4.82,
        "confidenceScore": 98.6,
        "lowerBound": 4.55,
        "upperBound": 5.09,
        "cropCondition": "Optimal Growth",
        "recommendations": "Balanced nitrogen levels observed.",
        "modelVersion": "VQE-FastAPI-v1",
        "timestamp": "2026-10-09T23:40:00Z"
    }

@app.get("/api/v1/health")
def health_check():
    return {
        "classicalMlStatus": "HEALTHY",
        "quantumMlStatus": "SIMULATED",
        "version": "1.0.0",
        "timestamp": "2026-10-09T23:40:00Z"
    }
```

---

## 🚀 Running the Frontend Development Server

```bash
npm run dev
```

## 🏗️ Production Build

```bash
npm run build
```
