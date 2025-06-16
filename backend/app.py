import warnings
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score, confusion_matrix
from imblearn.over_sampling import SMOTE
warnings.filterwarnings('ignore')

# Load dataset
dataset_url = r"C:\Users\nehal\OneDrive\MTHIL DOCS\Career\cs_students_expanded.csv"
data = pd.read_csv(dataset_url)

# Drop identifier columns
data.drop(columns=["Student ID", "Name"], axis=1, inplace=True)

# Store original career names before encoding
original_careers = data["Future Career"].unique()

# Encode categorical features
for col in data.columns:
    if data[col].dtype == 'object':
        data[col] = LabelEncoder().fit_transform(data[col].astype(str))

# Define features and target
X = data.drop("Future Career", axis=1)
y = data["Future Career"]

# Scale numerical features
scaler = StandardScaler()
X[['Age', 'GPA']] = scaler.fit_transform(X[['Age', 'GPA']])

# Handle class imbalance
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X, y)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.2, random_state=42)

# Random Forest with GridSearch
param_grid = {
    'n_estimators': [100],
    'max_depth': [20],
    'min_samples_split': [5],
    'min_samples_leaf': [2]
}
grid_search = GridSearchCV(RandomForestClassifier(random_state=42), param_grid, cv=3, n_jobs=-1)
grid_search.fit(X_train, y_train)
best_model = grid_search.best_estimator_

# Predictions
y_pred = best_model.predict(X_test)

# Evaluation
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Classification Report:\n", classification_report(y_test, y_pred))

# ✅ IMPROVED, COLORFUL CONFUSION MATRIX WITH PROPER LABELS
cm = confusion_matrix(y_test, y_pred)

# Create label mapping for career names
unique_labels = np.unique(np.concatenate([y_test, y_pred]))
career_names = [original_careers[i] for i in unique_labels]

# Create a custom confusion matrix with distinct colors for true/false predictions
cm_visual = np.zeros_like(cm, dtype=float)
max_val = cm.max()

# Create diagonal mask for true predictions (correct predictions)
diagonal_mask = np.eye(cm.shape[0], dtype=bool)

# Assign values: 0 for zero counts (white), positive values for true predictions (blue),
# negative values for false predictions (purple)
for i in range(cm.shape[0]):
    for j in range(cm.shape[1]):
        if cm[i, j] == 0:
            cm_visual[i, j] = 0  # White for zero values
        elif i == j:  # Diagonal (true predictions)
            cm_visual[i, j] = cm[i, j] / max_val  # Normalize true predictions (0 to 1 for blue scale)
        else:  # Off-diagonal (false predictions)
            cm_visual[i, j] = -cm[i, j] / max_val  # Negative values for purple scale

plt.figure(figsize=(18, 16))

# Create custom colormap: white (0), blue (positive), bright red (negative)
from matplotlib.colors import LinearSegmentedColormap
colors = ['red', 'white', 'blue']
n_bins = 256
cmap = LinearSegmentedColormap.from_list('custom', colors, N=n_bins)

# Create the heatmap with custom colors
sns.heatmap(cm_visual,
            annot=False,  # No numbers in cells
            cmap=cmap,  # Custom colormap
            center=0,   # Center the colormap at 0 (white)
            square=True,
            cbar_kws={'shrink': 0.8, 'label': 'Blue: Correct Predictions | Red: Incorrect Predictions'},
            xticklabels=career_names,   # Use actual career names
            yticklabels=career_names,   # Use actual career names
            linewidths=1.0,           # Thicker grid lines for better separation
            linecolor='gray',        # Gray grid lines for better contrast
            vmin=-1, vmax=1)         # Set range from -1 to 1

# Enhance the plot styling
plt.title("Confusion Matrix - Career Path Predictions\n(Blue: Correct | Red: Incorrect | White: No Predictions)",
          fontsize=20, fontweight='bold', pad=25)
plt.xlabel("Predicted Career Path", fontsize=18, fontweight='bold')
plt.ylabel("Actual Career Path", fontsize=18, fontweight='bold')

# Rotate x-axis labels for better readability
plt.xticks(rotation=45, ha='right', fontsize=11, fontweight='medium')
plt.yticks(rotation=0, fontsize=11, fontweight='medium')

# Add accuracy text on the plot
accuracy = accuracy_score(y_test, y_pred)
plt.figtext(0.02, 0.02, f'Overall Accuracy: {accuracy:.3f}', fontsize=16,
            bbox=dict(boxstyle="round,pad=0.5", facecolor="yellow", alpha=0.9, edgecolor='black'))

plt.tight_layout()
plt.show()

# --- Feature Correlation Matrix ---
plt.figure(figsize=(14, 10))
sns.heatmap(pd.DataFrame(X_resampled).corr(), cmap='coolwarm', annot=False)
plt.title("Feature Correlation Matrix")
plt.show()

# --- Feature Importances ---
feat_imp = pd.Series(best_model.feature_importances_, index=X.columns).sort_values(ascending=False)
plt.figure(figsize=(12, 8))
sns.barplot(x=feat_imp.values[:15], y=feat_imp.index[:15])
plt.title("Top 15 Feature Importances")
plt.xlabel("Importance Score")
plt.tight_layout()
plt.show()

# --- Extra Dataset Visualizations ---
# 1. Pie chart of Future Career distribution
plt.figure(figsize=(8, 8))
y.value_counts().plot.pie(autopct='%1.1f%%', startangle=140, colors=sns.color_palette('pastel'))
plt.title("Future Career Distribution")
plt.ylabel("")
plt.tight_layout()
plt.show()

# 2. Boxplot of GPA by Future Career
plt.figure(figsize=(12, 6))
sns.boxplot(x=y, y=data['GPA'])
plt.title("GPA Distribution by Future Career")
plt.xlabel("Future Career")
plt.ylabel("GPA")
plt.tight_layout()
plt.show()

# 3. Count Plot of Programming Languages (encoded)
plt.figure(figsize=(12, 6))
sns.countplot(x=data['Programming Languages'])
plt.title("Programming Language Usage Count")
plt.xlabel("Programming Languages (encoded)")
plt.ylabel("Count")
plt.tight_layout()
plt.show()
