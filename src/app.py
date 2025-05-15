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
# Logic Bài 5
from logic.bai_tap_5 import sinh_bai_tap_5
# Logic Bài 6
from logic.bai_tap_6 import sinh_bai_tap_6
# Logic Bài 8
from logic.bai_tap_8 import sinh_bai_tap_8
# Logic Bài 8b
from logic.bai_tap_8b import sinh_bai_tap_8b

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# Bài 1: thống kê cơ bản
def check_answers(ua, ca): 
    return [abs(float(u) - float(c)) <= 1e-3 for u, c in zip(ua, ca)]

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

#Bài 5: bài tập kiểm định giả thuyết
@app.route('/generate5', methods=['POST'])
def generate5():
    n = int(request.json.get('n', 5))
    data = sinh_bai_tap_5(n)
    return jsonify(data)

@app.route('/check5', methods=['POST'])
def check5():
    # Nhận mảng user answers và mảng correct answers
    ua = request.json.get('answers', [])           # ví dụ ['1.23', '1.96', 'reject_H', ...]
    ca = request.json.get('correct_answers', [])    # ví dụ ['1.23','1.96','reject_H', ...]

    results = []
    for i, user_val in enumerate(ua):
        try:
            # với phần conclusion (các ô select), index tương ứng là 2 và 5
            if i in (2, 5):
                results.append(user_val == ca[i])
            else:
                results.append(abs(float(user_val) - float(ca[i])) < 1e-3)
        except:
            results.append(False)
    return jsonify(results)

@app.route('/generate6', methods=['POST'])
def generate6():
    data = sinh_bai_tap_6()
    return jsonify(data)

@app.route('/check6', methods=['POST'])
def check6():
    ua = request.json.get('answers', [])      # [z_qs_user, z0_user]
    conclusion = request.json.get('conclusion')
    ca = request.json.get('correct', {})      # {'z_qs','z0','conclusion'}
    results = []
    # kiểm tra z_qs, z0
    try:
        results.append(abs(float(ua[0]) - ca['z_qs']) < 1e-3)
        results.append(abs(float(ua[1]) - ca['z0']) < 1e-3)
    except:
        results.extend([False, False])
    # kiểm tra kết luận
    results.append(conclusion == ca['conclusion'])
    return jsonify(results)

# Bài 8: bài tập kiểm định giả thuyết với phân phối chi bình phương

@app.route('/generate8', methods=['POST'])
def generate8():
    n = int(request.json.get('n', 5))
    data = sinh_bai_tap_8(n)
    return jsonify(data)

@app.route('/check8', methods=['POST'])
def check8():
    answers = request.json.get('answers', [])  # [chiqs, chi0]
    conclusion = request.json.get('conclusion')
    ca = request.json.get('correct', {})       # {'chisq','chi0','conclusion'}
    results = []
    try:
        results.append(abs(float(answers[0]) - ca['chisq']) < 1e-3)
        results.append(abs(float(answers[1]) - ca['chi0']) < 1e-3)
    except:
        results.extend([False, False])
    results.append(conclusion == ca['conclusion'])
    return jsonify(results)

# Bài 8b: bài tập kiểm định giả thuyết với phân phối chi bình phương
@app.route('/generate8b', methods=['POST'])
def generate8b():
    n = int(request.json.get('n', 5))
    data = sinh_bai_tap_8b(n)
    return jsonify(data)

@app.route('/check8b', methods=['POST'])
def check8b():
    answers = request.json.get('answers', [])  # [chiqs, chi0]
    conclusion = request.json.get('conclusion')
    ca = request.json.get('correct', {})       # {'chisq','chi0','conclusion'}
    results = []
    try:
        results.append(abs(float(answers[0]) - ca['chisq']) < 1e-3)
        results.append(abs(float(answers[1]) - ca['chi0']) < 1e-3)

        print("Người dùng nhập:", answers[0])
        print("Đáp án đúng:", ca['chisq'])
        print("Sai số:", abs(float(answers[0]) - ca['chisq']))
    except:
        results.extend([False, False])
    results.append(conclusion == ca['conclusion'])

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)