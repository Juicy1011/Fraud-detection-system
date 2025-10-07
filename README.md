# 🚀 Fraud Detection System



## Overview

This project is a comprehensive, full-stack fraud detection system designed to analyze mobile payment transactions in real-time, identify suspicious activity, and display alerts on an interactive monitoring dashboard. It simulates a real-world fintech environment, combining a powerful machine learning backend with a modern, responsive frontend.

This system is built to showcase a full range of skills from data science and machine learning to backend API development, frontend user interface design, and DevOps. It is directly inspired by the challenges faced by leading mobile money platforms like M-Pesa.

## 🌟 Key Features

-   **Real-Time Fraud Detection:** A Python-based backend service that uses a trained XGBoost model to predict fraudulent transactions with sub-second latency.
-   **Interactive Dashboard:** A live-updating dashboard built in React that displays a feed of incoming transactions, highlights fraud alerts, and visualizes key metrics.
-   **Advanced Machine Learning Pipeline:** The model is trained on a synthetic dataset with realistic fraud patterns. The pipeline includes robust feature engineering, data preprocessing, and model evaluation techniques to handle imbalanced data.
-   **Full-Stack Architecture:** A clear separation of concerns with a dedicated ML research environment, a backend API for serving the model, and a decoupled frontend for user interaction.
-   **Containerized & Deployable:** The entire application is containerized using Docker and Docker Compose, allowing for easy, reproducible deployment in any environment.

## 🛠️ Tech Stack

-   **Machine Learning (`ml/`):**
    -   **Python**, **Pandas**, **NumPy** for data manipulation and analysis.
    -   **Scikit-learn** for data preprocessing and building model pipelines.
    -   **XGBoost** for the high-performance gradient boosting model.
    -   **Jupyter Notebook** for research, experimentation, and model training.

-   **Backend (`backend/`):**
    -   **Python** with **Flask** for creating a lightweight and robust REST API.
    -   **Flask-CORS** for handling cross-origin requests from the frontend.
    -   **Gunicorn** (for production deployment) as the WSGI server.

-   **Frontend (`frontend/`):**
    -   **React** for building a dynamic and component-based user interface.
    -   **Axios** for making asynchronous API calls to the backend.
    -   **Recharts** for creating beautiful and interactive data visualizations.
    -   **CSS** for custom styling and animations.

-   **Deployment & DevOps:**
    -   **Docker** & **Docker Compose** for containerizing the entire application stack.

## 📂 Project Structure

```
fraud-detection-system/
│
├── backend/                # Flask API and ML model server
│   ├── models/
│   │   └── fraud_detector.pkl  # The saved, trained ML model
│   ├── app.py              # Main Flask application
│   └── Dockerfile          # Container definition for the backend
│
├── frontend/               # React dashboard application
│   ├── src/
│   │   ├── components/     # Reusable React components (charts, feed)
│   │   └── App.js          # Main application component
│   └── Dockerfile          # Container definition for the frontend
│
├── ml/                     # ML research and training environment
│   ├── data/
│   │   └── transactions.csv  # Synthetic dataset
│   └── fraud_model.ipynb   # Jupyter Notebook for data generation and model training
│
├── docker-compose.yml      # Orchestrates the multi-container application
└── README.md               # You are here!
```

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or later)
-   [Python](https://www.python.org/) (v3.9 or later)
-   [Docker](https://www.docker.com/products/docker-desktop/) & Docker Compose

### Running the Application with Docker (Recommended)

This is the easiest way to get the entire full-stack application running.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/juicy1011/fraud-detection-system.git
    cd fraud-detection-system
    ```

2.  **Build and run the containers:**
    ```bash
    docker-compose up --build
    ```

3.  **Access the application:**
    -   The **Frontend Dashboard** will be available at `http://localhost:3000`.
    -   The **Backend API** will be running at `http://localhost:5000`.

### Running Manually (for Development)

**1. Backend Server:**

```bash
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python app.py
```
The backend will be running on `http://localhost:5000`.

**2. Frontend Dashboard:**

```bash
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Run the React development server
npm start
```
The frontend will open in your browser at `http://localhost:3000`.

## 🧠 Machine Learning Model Insights

The fraud detection model is an `XGBoost Classifier` trained on a synthetically generated dataset of over 50,000 transactions.

### Feature Engineering
The model's performance relies on carefully engineered features, including:
-   **Time-based Features:** Hour of the day and day of the week to capture temporal patterns.
-   **Behavioral Features:**
    -   `time_since_last_txn`: Time elapsed since the user's last transaction.
    -   `amount_deviation`: How much a transaction amount deviates from the user's historical average.
    -   `txn_count_24h`: The number of transactions a user has made in the last 24 hours.

### Handling Imbalanced Data
Since fraud is a rare event, the model was trained using techniques to handle class imbalance, such as `scale_pos_weight` in XGBoost, ensuring it pays extra attention to fraudulent cases. The result is a model with high **recall** for the fraud class, minimizing the risk of missing actual fraud.



**Live Dashboard View:**
![Dashboard Screenshot](<INSERT_SCREENSHOT_URL_HERE>)

**Fraud Alert Example:**
![Fraud Alert Screenshot](<INSERT_ALERT_SCREENSHOT_URL_HERE>)

## Future Improvements

-   [ ] **Database Integration:** Persist all incoming transactions and their fraud scores to a PostgreSQL database.
-   [ ] **User Authentication:** Add role-based access for security analysts.
-   [ ] **Explainable AI (XAI):** Integrate SHAP or LIME to explain *why* a specific transaction was flagged as fraudulent.
-   [ ] **Real-time Alerting:** Send alerts via Email (SendGrid) or SMS (Twilio / Africa's Talking).
