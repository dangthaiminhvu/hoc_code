import random, math
from scipy.stats import chi2

def sinh_bai_tap_8(n=5):
    # 1) Sinh n biến cố, tần suất ni
    ns = [random.randint(10, 30) for _ in range(n)]
    N = sum(ns)
    # 2) Sinh p_i sao cho tổng =1, từng p_i chia hết .05
    # Phân phối gồm k bước đơn vị 0.05
    total_units = 20  # vì 1.00/0.05
    cuts = sorted(random.sample(range(1, total_units), n-1))
    cuts = [0] + cuts + [total_units]
    ps = [(cuts[i+1]-cuts[i])*0.05 for i in range(n)]

    alpha = round(random.randint(1, 100) / 100, 2)

    # 3) Tính chi-squared
    chisq = sum((ni - N*pi)**2/(N*pi) for ni, pi in zip(ns, ps))
    df = n - 1
    chi0 = chi2.ppf(1 - alpha, df)

    # 4) Kết luận
    conclusion = 'reject_H' if chisq > chi0 else 'accept_H'

    return {
        'params': {
            'n': n,
            'ns': ns,
            'ps': ps,
            'alpha8': alpha
        },
        'intermediate': {
            'chisq': chisq,
            'chi0': chi0,
            'conclusion': conclusion
        }
    }