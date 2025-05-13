import random, math
from scipy.stats import norm, chi2

def sinh_bai_tap_8b(n):
    # 1) Sinh biên giới a0..an tăng dần, mỗi khoảng ≤ 10 đơn vị
    a = [random.randint(1, 100)]
    for _ in range(n):
        # mỗi bước tăng không quá 10
        step = random.randint(1, 10)
        a.append(a[-1] + step)

    # 2) Sinh tần suất
    ns = [random.randint(1, 30) for _ in range(n)]
    N = sum(ns)

    # 3) Giả thuyết h8b
    h = random.choice(['có phân bố đều', '∈N(a,δ²)'])
    if h == '∈N(a,δ²)':
        mid = (a[0] + a[-1]) / 2
        min_ap = round(mid - 5, 1)
        max_ap = round(mid + 5, 1)
        min_unit = int(min_ap * 10)
        max_unit = int(max_ap * 10)
        a_par = round(random.randint(min_unit, max_unit) / 10, 1)
    else:
        a_par = None
    delta2 = random.randint(1, 10)

    # 4) alpha
    alpha = round(random.randint(1, 99), 2)

    # 5) Tính p_i và E_i
    ps = []
    if h == 'có phân bố đều':
        total_width = a[-1] - a[0]
        for i in range(1, n + 1):
            width = a[i] - a[i - 1]
            ps.append(width / total_width)
    else:
        sigma = math.sqrt(delta2)
        for i in range(1, n + 1):
            if i == 1:
                ps.append(norm.cdf((a[1] - a_par) / sigma))
            elif i == n:
                ps.append(1 - norm.cdf((a[-2] - a_par) / sigma))
            else:
                ps.append(norm.cdf((a[i] - a_par) / sigma) - norm.cdf((a[i - 1] - a_par) / sigma))
    Es = [N * p for p in ps]

    # 6) Tính chi-squared
    chisq = sum((ni - ei) ** 2 / ei for ni, ei in zip(ns, Es))
    df = n - 1

    chi0 = chi2.ppf(1 - alpha / 100, df)

    # 7) Kết luận
    conclusion = 'reject_H' if chisq > chi0 else 'accept_H'

    return {
        'params': {
            'a': a,
            'ns': ns,
            'h8b': h,
            'a_par': a_par,
            'delta2': delta2,
            'alpha8b': alpha,
            'n': n
        },
        'intermediate': {
            'ps': ps,
            'Es': Es,
            'chisq': chisq,
            'chi0': chi0,
            'conclusion': conclusion
        }
    }