import random, math
from scipy.stats import norm, t

def sinh_bai_tap_5(n):
    # 1. Sinh bảng khoảng và tần suất giống bài 4
    a = [random.randint(1, 10)]
    for _ in range(n):
        a.append(a[-1] + random.randint(1, 10))
    ranges = [(a[i], a[i+1]) for i in range(n)]
    ns = [random.randint(1, 30) for _ in range(n)]
    total_n = sum(ns)
    xs = [(low+high)/2 for low, high in ranges]
    mean = sum(x*f for x,f in zip(xs, ns)) / total_n

    # Sinh độ lệch chuẩn σ (delta) cho câu a
    delta = round(random.randint(1, 20) / 10, 1)  # 0.1 - 2.0

    # 2. Sinh tham số cho câu a
    alpha_a = round(random.randint(1, 99) / 100, 2)
    min_val = int((mean - 0.5) * 10)
    max_val = int((mean + 0.5) * 10)
    a0_a = round(random.randint(min_val, max_val) / 10, 1)
    kind_a = random.choice([1,2,3])
    relation_map = {1: '≠', 2: '>', 3: '<'}
    relation_a = relation_map[kind_a]

    # Tính z_qs và z0 cho câu a
    z_qs = (mean - a0_a) / (delta / math.sqrt(total_n))
    if kind_a == 1:
        z0 = norm.ppf(1 - alpha_a/2)
    else:
        z0 = norm.ppf(1 - alpha_a)

    # 3. Sinh tham số cho câu b
    alpha_b = round(random.randint(1, 99) / 100, 2)
    a0_b = round(random.randint(min_val, max_val) / 10, 1)
    kind_b = random.choice([1,2,3])
    relation_b = relation_map[kind_b]

    # Tính t_qs và t0 cho câu b
    s2 = sum(f*(x-mean)**2 for x,f in zip(xs, ns)) / total_n
    s2_unb = total_n/(total_n-1) * s2
    s_prime = math.sqrt(s2_unb)
    t_qs = (mean - a0_b) / (s_prime / math.sqrt(total_n))
    df = total_n - 1
    if kind_b == 1:
        t0 = t.ppf(1 - alpha_b/2, df)
    else:
        t0 = t.ppf(1 - alpha_b, df)

    return {
        'params': {
            'ranges': ranges,
            'ns': ns,
            'delta': delta,
            'alpha_a': alpha_a,
            'a0_a': a0_a,
            'relation_a': relation_a,
            'alpha_b': alpha_b,
            'a0_b': a0_b,
            'relation_b': relation_b
        },
        'intermediate': {
            'mean': mean,
            'z_qs': z_qs,
            'z0': z0,
            't_qs': t_qs,
            't0': t0,
            's2_unbiased': s2_unb
        }
    }