from flask import Flask, request, jsonify
from flask_cors import CORS
import json, difflib, os

app = Flask(__name__)
CORS(app)

DB_PATH = "local_db.json"

# -------- Initialize DB --------
default_data = {
    "show today's milk collection report.": "Here is today's collection: Cow Milk — 82L, Buffalo Milk — 47L.",
    "how much milk was collected in the last 7 days?": "In the last 7 days, total milk collected was 892 liters.",
    "generate full monthly summary for shusila upvan dairy.": "Monthly Summary: Total Milk = 3120L, Avg per day = 104L, Best day = 14th (156L)."
}

def load_db():
    if not os.path.exists(DB_PATH):
        with open(DB_PATH, "w", encoding="utf-8") as f:
            json.dump(default_data, f, indent=4)
        return default_data

    try:
        with open(DB_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except json.JSONDecodeError:
        with open(DB_PATH, "w", encoding="utf-8") as f:
            json.dump(default_data, f, indent=4)
        return default_data

# -------- Lookup Function --------
def get_best_answer(user_query, threshold=0.65):
    db = load_db()
    user_query_clean = user_query.lower().strip()

    # Exact match
    if user_query_clean in db:
        return db[user_query_clean]

    # Fuzzy match
    best_key, best_score = None, 0
    for key in db.keys():
        score = difflib.SequenceMatcher(None, user_query_clean, key.lower()).ratio()
        if score > best_score:
            best_key, best_score = key, score

    if best_score >= threshold:
        return db[best_key]

    return "No matching answer found in database."

# -------- API Endpoint --------
@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json() or request.form
    user_query = data.get("query", "").strip()

    if not user_query:
        return jsonify({"answer": "Please enter a valid question."}), 400

    answer = get_best_answer(user_query)
    return jsonify({"answer": answer})

# -------- Root Route (optional) --------
@app.route("/")
def home():
    return "Shusila Upvan Milk Diary Backend is Running!"

# -------- Start Server --------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
