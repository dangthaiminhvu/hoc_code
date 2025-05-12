import random
import math
from scipy.special import erfinv  # type: ignore

# Hàm phân phối chuẩn tích lũy
def norm_cdf(x):
    """Hàm phân bố chuẩn tích lũy"""
    return (1 + math.erf(x / math.sqrt(2))) / 2

# Hàm nghịch đảo phân phối chuẩn tích lũy
def norm_ppf(t):
    """Hàm nghịch đảo phân phối chuẩn tích lũy"""
    if t <= 0 or t >= 1:
        raise ValueError("t phải nằm trong khoảng (0, 1)")
    return math.sqrt(2) * erfinv(2 * t - 1)  # Sử dụng scipy.special.erfinv

def sinh_bai_tap_2():
    # Random các tham số
    z1 = random.randint(15, 30)
    z2 = random.randint(1, 10)
    z3 = random.randint(15, 30)
    z4 = random.randint(1, 10)
    a, b, c = [random.randint(-10, 10) for _ in range(3)]
    d, e, f = [random.randint(-10, 10) for _ in range(3)]
    x1 = z1 - random.randint(1, 5)
    x2 = z1 + random.randint(1, 5)
    x3 = z1 + random.randint(1, 5)
    x4 = z1 - random.randint(1, 5)
    y1 = z3 - random.randint(1, 5)
    y2 = z3 + random.randint(1, 5)
    y3 = z3 + random.randint(1, 5)
    y4 = z3 - random.randint(1, 5)
    t = round(random.uniform(0.01, 0.99), 4)

    # Tính toán
    EX, DX = z1, z2
    EY, DY = z3, z4
    E1 = a * EX + b * EY + c
    D1 = d**2 * DX + e**2 * DY
    Pcx = norm_cdf((x2 - EX) / math.sqrt(DX)) - norm_cdf((x1 - EX) / math.sqrt(DX))
    Pdx = 1 - norm_cdf((x3 - EX) / math.sqrt(DX))
    Pex = norm_cdf((x4 - EX) / math.sqrt(DX))
    Pfy = norm_cdf((y2 - EY) / math.sqrt(DY)) - norm_cdf((y1 - EY) / math.sqrt(DY))
    Pgy = 1 - norm_cdf((y3 - EY) / math.sqrt(DY))
    Phy = norm_cdf((y4 - EY) / math.sqrt(DY))
    X_t = norm_ppf(t)

    # Đề bài
    question = f"""
    Cho X∈N({z1},{z2}), Y∈N({z3},{z4}), X và Y độc lập.
    a) Tính E(({a}).X + ({b}).Y + ({c}))
    b) Tính D(({d}).X + ({e}).Y + ({f}))
    c) Tính P({x1} < X < {x2})
    d) Tính P(X > {x3})
    e) Tính P(X < {x4})
    f) Tính P({y1} < Y < {y2})
    g) Tính P(Y > {y3})
    h) Tính P(Y < {y4})
    i) Với ϕ(X) = {t}, Tính X.
    """

    correct_answers = [E1, D1, Pcx, Pdx, Pex, Pfy, Pgy, Phy, X_t]

    return {
        "question": question.strip(),
        "correct_answers": correct_answers
    }