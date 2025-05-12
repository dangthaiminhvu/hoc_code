import random

def sinh_bai_tap_3(n):
    # sinh x_i tăng dần, 1 ≤ x_i ≤ 99, x_{i+1}-x_i ≤ 0.4
    xs = sorted([round(random.uniform(1, 99), 2) for _ in range(n)])
    for i in range(1, n):
        if xs[i] - xs[i-1] > 0.4:
            xs[i] = round(xs[i-1] + random.uniform(0.01, 0.4), 2)
    # sinh tần suất n_i
    ns = [random.randint(1, 30) for _ in range(n)]
    total_n = sum(ns)
    # ước lượng điểm không chệch của EX
    est_mean = sum(x * f for x, f in zip(xs, ns)) / total_n
    # ước lượng điểm không chệch của DX
    est_var = sum(f * (x - est_mean)**2 for x, f in zip(xs, ns)) / (total_n - 1)
    return {
        "params": {"xs": xs, "ns": ns},
        "correct": [est_mean, est_var]
    }