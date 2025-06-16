import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-title">Career Path Prediction</div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="#">Profile</a>
        </div>
      </nav>

      {/* About Section */}
      <div className="about-section">
        <h1>Welcome to the Career Path Predictor</h1>
        <p>
          Making informed career decisions is crucial for professional success. This tool helps predict potential career paths
          based on your academic background, skills, and preferences. Our AI-powered system analyzes various factors to suggest
          the most suitable career options for you.
        </p>
        <p>
          Whether you're a student planning your future or a professional considering a career change, our prediction tool
          can provide valuable insights to guide your decision-making process.
        </p>
        <button className="check-yours-btn" onClick={() => navigate('/form')}>
          Predict Your Career Path
        </button>
      </div>

      {/* Contact Section */}
      <footer className="contact-bar">
        <p>Contact Us: Email - contact@careerprediction.com | Phone - +1 234 567 890</p>
      </footer>
    </div>
  );
}

function FormPage() {
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    gender: '',
    age: '',
    gpa: '',
    major: '',
    concentration: '',
    interestedDomain: '',
    projects: '',
    futureCareer: '',
    python: '',
    sql: '',
    java: '',
    programmingLanguages: '',
    certifications: '',
    internshipExperience: '',
    researchExperience: '',
    expectedGraduationYear: '',
    workPreference: '',
    hackathonsAttended: '',
    leadershipRole: ''
  });

  const [currentPage, setCurrentPage] = useState(0);
  const progressPercentage = (currentPage + 1) * (100 / 3);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Clear error for the current field
    }));
  };

  const validatePage = () => {
    const pageFields = {
      0: ['studentId', 'name', 'gender', 'age', 'gpa', 'major', 'concentration'],
      1: ['interestedDomain', 'projects', 'futureCareer', 'python', 'sql', 'java', 'programmingLanguages'],
      2: ['certifications', 'internshipExperience', 'researchExperience', 'expectedGraduationYear', 'workPreference', 'hackathonsAttended', 'leadershipRole'],
    };
    const currentFields = pageFields[currentPage];
    const newErrors = {};
    currentFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validatePage()) {
      if (currentPage < 2) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validatePage()) {
      try {
        const response = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.prediction) {
          window.location.href = `/result?prediction=${encodeURIComponent(data.prediction)}`;
        } else {
          alert('Prediction failed: ' + (data.error || 'Unknown error'));
        }
      } catch (err) {
        alert('Error connecting to backend: ' + err.message);
      }
    }
  };

  const renderFormPage = () => {
    switch (currentPage) {
      case 0:
        return (
          <div>
            <h2>Page 1 of 3: Basic Information</h2>
            <div className="form-group">
              <label>Student ID:
                <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} placeholder="e.g., CS2023123" />
                {errors.studentId && <p className="error-text">{errors.studentId}</p>}
              </label>
            </div>
            <div className="form-group">
              <label>Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Priya Sharma" />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </label>
            </div>
            <div className="form-group">
              <label>Gender:
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">-- Select --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Other">Other</option>
                </select>
                <small className="field-description">Select your gender identity</small>
                {errors.gender && <p className="error-text">{errors.gender}</p>}
              </label>
            </div>
            <div className="form-group">
              <label>Age:
                <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="e.g., 21" required />
                <small className="field-description">Your age in years</small>
                {errors.age && <p className="error-text">{errors.age}</p>}
              </label>
            </div>
            <div className="form-group">
              <label>GPA:
                <input type="number" step="0.1" min="0" max="10" name="gpa" value={formData.gpa} onChange={handleChange} placeholder="e.g., 8.7" required />
                <small className="field-description">Grade Point Average on 10-point scale</small>
                {errors.gpa && <p className="error-text">{errors.gpa}</p>}
              </label>
            </div>
            <div className="form-group">
              <label>Major:
                <input type="text" name="major" value={formData.major} onChange={handleChange} placeholder="e.g., Computer Science" required />
                <small className="field-description">Your core discipline</small>
                {errors.major && <p className="error-text">{errors.major}</p>}
              </label>
            </div>
            <div className="form-group">
              <label>Concentration:
                <input type="text" name="concentration" value={formData.concentration} onChange={handleChange} placeholder="e.g., Artificial Intelligence" required />
                <small className="field-description">Area of specialization within your major</small>
                {errors.concentration && <p className="error-text">{errors.concentration}</p>}
              </label>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <h2>Page 2 of 3: Skills and Interests</h2>
            <div className="form-group">
              <label>Interested Domain:
                <input type="text" name="interestedDomain" value={formData.interestedDomain} onChange={handleChange} placeholder="e.g., Data Science" required />
                <small className="field-description">Your preferred future work domain</small>
                {errors.interestedDomain && <p className="error-text">{errors.interestedDomain}</p>}
              </label>
            </div>
            <div className="form-group">
              <label>Projects:
                <input type="number" name="projects" value={formData.projects} onChange={handleChange} placeholder="e.g., 5" required />
                <small className="field-description">Number of significant academic or personal projects</small>
                {errors.projects && <p className="error-text">{errors.projects}</p>}
              </label>
            </div>
            <div className="form-group">
              <label>Future Career:
                <input type="text" name="futureCareer" value={formData.futureCareer} onChange={handleChange} placeholder="e.g., Data Scientist" required />
                <small className="field-description">Your targeted or expected job role</small>
                {errors.futureCareer && <p className="error-text">{errors.futureCareer}</p>}
              </label>
            </div>
            <div className="form-group">
              <label>Python Skills:
                <select name="python" value={formData.python} onChange={handleChange} required>
                  <option value="">-- Select --</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <small className="field-description">Your proficiency level in Python</small>
                {errors.python && <p className="error-text">{errors.python}</p>}
              </label>
            </div>
            <div className="form-group">
              <label>SQL Skills:
                <select name="sql" value={formData.sql} onChange={handleChange} required>
                  <option value="">-- Select --</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <small className="field-description">Your proficiency level in SQL</small>
                {errors.sql && <p className="error-text">{errors.sql}</p>}
              </label>
            </div>
            <div className="form-group">
              <label>Java Skills:
                <select name="java" value={formData.java} onChange={handleChange} required>
                  <option value="">-- Select --</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <small className="field-description">Your proficiency level in Java</small>
                {errors.java && <p className="error-text">{errors.java}</p>}
              </label>
            </div>
            <div className="form-group">
              <label>Other Programming Languages:
                <input type="text" name="programmingLanguages" value={formData.programmingLanguages} onChange={handleChange} placeholder="e.g., Python, Java, C++" required />
                <small className="field-description">Comma-separated list of other languages you know</small>
                {errors.programmingLanguages && <p className="error-text">{errors.programmingLanguages}</p>}
              </label>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Page 3 of 3: Experience and Preferences</h2>
            <div className="form-group">
              <label>Certifications:
                <input type="text" name="certifications" value={formData.certifications} onChange={handleChange} placeholder="e.g., Google Data Analytics, AWS CP" required />
                <small className="field-description">Names of your completed certifications</small>
                {errors.certifications && <p className="error-text">{errors.certifications}</p>}
              </label>
            </div>
            <div className="form-group">
              <label>Internship Experience:
                <select name="internshipExperience" value={formData.internshipExperience} onChange={handleChange} required>
                  <option value="">-- Select --</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <small className="field-description">Do you have any internship experience?</small>
                {errors.internshipExperience && <p className="error-text">{errors.internshipExperience}</p>}
              </label>
            </div>
            <div className="form-group">
              <label>Research Experience:
                <select name="researchExperience" value={formData.researchExperience} onChange={handleChange} required>
                  <option value="">-- Select --</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <small className="field-description">Do you have any research experience?</small>
                {errors.researchExperience && <p className="error-text">{errors.researchExperience}</p>}
              </label>
            </div>
            <div className="form-group">
              <label>Expected Graduation Year:
                <input type="number" name="expectedGraduationYear" value={formData.expectedGraduationYear} onChange={handleChange} placeholder="e.g., 2025" required />
                <small className="field-description">Your final year of degree program</small>
                {errors.expectedGraduationYear && <p className="error-text">{errors.expectedGraduationYear}</p>}
              </label>
            </div>
            <div className="form-group">
              <label>Work Preference:
                <select name="workPreference" value={formData.workPreference} onChange={handleChange} required>
                  <option value="">-- Select --</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                <small className="field-description">Your preferred work arrangement</small>
                {errors.workPreference && <p className="error-text">{errors.workPreference}</p>}
              </label>
            </div>
            <div className="form-group">
              <label>Hackathons Attended:
                <input type="number" name="hackathonsAttended" value={formData.hackathonsAttended} onChange={handleChange} placeholder="e.g., 3" required />
                <small className="field-description">Number of hackathons you've participated in</small>
                {errors.hackathonsAttended && <p className="error-text">{errors.hackathonsAttended}</p>}
              </label>
            </div>
            <div className="form-group">
              <label>Leadership Role:
                <input type="text" name="leadershipRole" value={formData.leadershipRole} onChange={handleChange} placeholder="e.g., Technical Club Secretary" required />
                <small className="field-description">Any leadership positions held (e.g., "Class Representative", "Club President", "None")</small>
                {errors.leadershipRole && <p className="error-text">{errors.leadershipRole}</p>}
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-page">
      <nav className="navbar">
        <div className="nav-title">Career Path Prediction</div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="#">Profile</a>
        </div>
      </nav>

      <div className="form-container">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
        </div>

        <form onSubmit={handleSubmit}>
          {renderFormPage()}

          <div className="form-buttons">
            {currentPage > 0 && (
              <button type="button" onClick={handlePrevious} className="form-button prev-btn">
                Previous
              </button>
            )}
            {currentPage < 2 ? (
              <button type="button" onClick={handleNext} className="form-button next-btn">
                Next
              </button>
            ) : (
              <button type="submit" className="form-button submit-btn">
                Predict Career Path
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function ResultPage() {
  const [searchParams] = useSearchParams();
  const prediction = searchParams.get('prediction');
  const navigate = useNavigate();

  return (
    <div className="result-page">
      <nav className="navbar">
        <div className="nav-title">Career Path Prediction</div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="#">Profile</a>
        </div>
      </nav>

      <div className="result-container">
        <h2>Your Career Path Prediction</h2>
        <div className="prediction-result">
          <p>{prediction}</p>
        </div>
        <button onClick={() => navigate('/form')} className="try-again-btn">
          Try Another Prediction
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
