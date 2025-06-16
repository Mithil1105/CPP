# 🎓 Career Path Prediction System

A full-stack machine learning web application that predicts students' future career paths based on academic, technical, and extracurricular profile data.

---

## 📌 Overview

Career counseling in universities often lacks personalization and data-driven insights. This system uses a trained machine learning model to forecast potential career outcomes for students—helping both students and academic advisors make informed decisions.

Built with a robust backend using a Random Forest Classifier (optimized with GridSearchCV and SMOTE for class balancing) and a responsive React.js frontend, this project is production-ready and easily deployable.

---

## 🚀 Features

### ✅ Machine Learning Backend
- Trained on structured data with features like GPA, certifications, internships, and projects.
- Random Forest Classifier with hyperparameter tuning via GridSearchCV.
- SMOTE to resolve class imbalance.
- Outputs predicted career path with 90% accuracy.

### 🎨 Frontend Interface
- Built using *React.js* with responsive UI.
- Clean input form for entering student details.
- Displays predicted career path and relevant confidence metrics.

### ⚙ System Design
- REST API using Flask (or Django optionally).
- Dockerized for deployment on Heroku, Render, or any cloud provider.
- Easily extendable to support new input features.

---

## 🧰 Tech Stack

| Layer       | Technologies                            |
|-------------|------------------------------------------|
| Frontend    | React.js, Tailwind CSS / Bootstrap       |
| Backend     | Python, Flask (REST API)                 |
| ML Model    | Scikit-learn, Pandas, SMOTE (Imbalanced-learn) |
| Deployment  | Docker, Heroku/Render/AWS                |

---


## 🛠 Setup Instructions

### Clone the Repository

bash
git clone https://github.com/yourusername/career-path-prediction.git
cd career-path-prediction


### Backend Setup

bash
cd backend
python -m venv venv
source venv/bin/activate   # Use 'venv\Scripts\activate' on Windows
pip install -r requirements.txt
python app.py


### Frontend Setup

bash
cd frontend
npm install
npm run dev


### Access the App
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/predict

---

## 📊 Input Fields

| Field                    | Example                         |
|--------------------------|----------------------------------|
| Gender                   | Female                          |
| Age                      | 21                              |
| GPA                      | 8.7                             |
| Certifications           | Google Data Analytics, AWS CP   |
| Internships              | Yes                             |
| Hackathons Attended      | 3                               |
| Leadership Role          | Technical Club Secretary        |
| Programming Languages    | Python, Java, SQL               |

---

## 📡 API Endpoint

### POST /predict

*Request Body*:

json
{
  "Gender": "Male",
  "Age": 22,
  "GPA": 9.1,
  "Certifications": "AWS, IBM ML",
  "Internship Experience": "Yes",
  "Hackathons Attended": 4,
  "Leadership Role": "Class Representative"
}


*Response*:

json
{
  "predicted_career": "Data Scientist",
  "confidence": 0.91
}


---

## 📈 Model Performance

| Metric     | Score   |
|------------|---------|
| Accuracy   | 90%     |
| Precision  | 0.89    |
| Recall     | 0.91    |
| F1-Score   | 0.90    |

---

## 🧩 Future Improvements

- Extend to other disciplines beyond computer science.
- Add SHAP/LIME for model interpretability.
- Integrate resume/GitHub parser for richer input.
- Admin dashboard for monitoring predictions and usage.

---

## 👨‍💻 Authors

- *[Your Name]* – Machine Learning, Backend
- *[Collaborator Name]* – Frontend & UI/UX
- *[Mentor/Professor]* – Research & Guidance

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## 📬 Contact

For suggestions, queries, or collaboration:
📧 mithil20056mistry@gmail.com
🔗 https://www.linkedin.com/in/mithil-mistry-394a38250/
