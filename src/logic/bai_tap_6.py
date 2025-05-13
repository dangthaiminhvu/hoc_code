import random, math
from scipy.stats import norm

def sinh_bai_tap_6():
    # 1. Sinh p6, relation, alpha6, n6, m6
    p = round(random.randint(10, 70) / 100, 2)
    q = 1 - p
    # Dùng tiếng Việt cho quan hệ
    relation = random.choice(['lớn hơn', 'nhỏ hơn', 'khác'])
    alpha = round(random.randint(1, 20) / 100, 2)
    n = random.randint(100, 500)
    m = random.randint(n//4, n//2)

    # 2. Tính z_qs và z0
    phat = m / n
    z_qs = (phat - p) / math.sqrt(p * q / n)
    # Chọn ngưỡng z0 theo quan hệ
    if relation == 'khác':
        z0 = norm.ppf(1 - alpha/2)
    else:
        z0 = norm.ppf(1 - alpha)

    # 3. Kết luận đúng dựa trên tiếng Việt
    if relation == 'khác':
        conclusion = 'reject_H' if abs(z_qs) > z0 else 'accept_H'
    elif relation == 'lớn hơn':
        conclusion = 'reject_H' if z_qs > z0 else 'accept_H'
    else:  # 'nhỏ hơn'
        conclusion = 'reject_H' if z_qs < -z0 else 'accept_H'

    return {
        'params': {
            'p6': p,
            'q6': q,
            'relation6': relation,
            'a06': p,
            'alpha6': alpha,
            'n6': n,
            'm6': m
        },
        'intermediate': {
            'z_qs': z_qs,
            'z0': z0,
            'conclusion': conclusion
        }
    }