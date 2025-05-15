import random, math
from scipy.stats import norm, t, chi2

def sinh_bai_tap_4(n, max_start=5, max_width=10):
    # 1) Sinh các a_i: a_0 ngau nhien tu 1..max_start, sau do cong width ngau nhien 1..max_width
    a = [ random.randint(1, max_start) ]
    for _ in range(n):
        a.append(a[-1] + random.randint(1, max_width))
    # Tao list cac khoang
    ranges = [(a[i], a[i+1]) for i in range(n)]
    
    # 2) Sinh tan suat
    ns = [random.randint(1, 30) for _ in range(n)]
    total_n = sum(ns)
    
    # 3) Tinh x_i va trung binh mau
    xs = [ (low + high)/2 for low, high in ranges ]
    mean = sum(x * f for x, f in zip(xs, ns)) / total_n
    
    # 4) Tinh s^2 mau
    s2 = sum(f * (x - mean)**2 for x, f in zip(xs, ns)) / total_n
    s2_unbiased = total_n / (total_n - 1) * s2
    s = math.sqrt(s2_unbiased)

    # Sau khi tính s2_unbiased và s
    s_prime = math.sqrt(s2_unbiased)
    
    # 5) Chon cac do tin cay
    gamma1 = random.randint(1, 99)
    gamma2 = random.randint(1, 99)
    gamma3 = random.randint(1, 99)
    delta = round(random.choice([i/10 for i in range(1, 21)]), 1)
    
    # 6) Tinh cac thong so phan phoi
    z0 = norm.ppf((1 + gamma1/100) / 2)
    t0 = t.ppf((1 + gamma2/100) / 2, df=total_n - 1)
    alpha1 = chi2.ppf((1 - gamma3/100) / 2, df=total_n - 1)
    alpha2 = chi2.ppf((1 + gamma3/100) / 2, df=total_n - 1)
    
    # 7) Khoang tin cay
    ci_mean = (
        mean - z0 * delta / math.sqrt(total_n),
        mean + z0 * delta / math.sqrt(total_n)
    )
    ci_mean_t = (
        mean - t0 * s / math.sqrt(total_n),
        mean + t0 * s / math.sqrt(total_n)
    )
    ci_var = (
        total_n * s2 / alpha2,
        total_n * s2 / alpha1
    )
    
    return {
        "params": {
            "ranges": ranges,
            "ns": ns,
            "gamma1": gamma1,
            "gamma2": gamma2,
            "gamma3": gamma3,
            "delta": delta
        },
        "intermediate": {
            "mean": mean,
            "z0": z0,
            "t0": t0,
            "s2": s2,
            "s2_unbiased": s2_unbiased,
            "s_prime": s_prime,
            "alpha1": alpha1,
            "alpha2": alpha2
        },
        "ci": {
            "mean": ci_mean,
            "mean_t": ci_mean_t,
            "var": ci_var
        }
    }
