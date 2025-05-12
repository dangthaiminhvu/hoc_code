from flask import Flask, render_template, request, jsonify
import random
import math

# Logic Bài 1
from logic.calculations import generate_exercise as generate_exercise_b1
# Logic Bài 2
from logic.bai_tap_2 import sinh_bai_tap_2
# Logic Bài 3
from logic.bai_tap_3 import sinh_bai_tap_3
# Logic Bài 4
from logic.bai_tap_4 import sinh_bai_tap_4

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# Bài 1: thống kê cơ bản
def check_answers(ua, ca): 
    return [abs(float(u) - float(c)) <= 1e-4 for u, c in zip(ua, ca)]

@app.route('/generate1', methods=['POST'])
def generate1():
    n = int(request.json.get('n', 5))
    data = generate_exercise_b1(n)
    return jsonify(data)

@app.route('/check1', methods=['POST'])
def check1(): 
    return jsonify(check_answers(request.json['answers'], request.json['correct_answers']))

# Bài 2: phân phối chuẩn
@app.route('/generate2', methods=['POST'])
def generate2():
    data = sinh_bai_tap_2()
    return jsonify(data)

@app.route('/check2', methods=['POST'])
def check2():
    return jsonify(check_answers(request.json['answers'], request.json['correct_answers']))

# Bài 3: bài tập ước lượng điểm
@app.route('/generate3', methods=['POST'])
def generate3():
    n = int(request.json.get('n', 3))
    data = sinh_bai_tap_3(n)
    return jsonify(data)

@app.route('/check3', methods=['POST'])
def check3(): 
    return jsonify(check_answers(request.json['answers'], request.json['correct_answers']))

# Bài 4: bài tập khoảng tin cậy
@app.route('/generate4', methods=['POST'])
def generate4():
    n = int(request.json.get('n', 5))
    data = sinh_bai_tap_4(n)
    return jsonify(data)

@app.route('/check4', methods=['POST'])
def check4(): 
    return jsonify(check_answers(request.json['answers'], request.json['correct_answers']))

if __name__ == '__main__':
    app.run(debug=True)