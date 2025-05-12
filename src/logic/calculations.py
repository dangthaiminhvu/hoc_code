import random

def generate_random_values(n):
    values = [random.randint(0, 100) for _ in range(n)]
    return sorted(values)  # Sắp xếp tăng dần để đảm bảo giá trị sau lớn hơn giá trị trước

def calculate_x_values(pairs):
    # Tính x_i = (a_i + a_(i-1)) / 2
    return [(pair[0] + pair[1]) / 2 for pair in pairs]

def compute_statistics(x_values, n_values):
    n = sum(n_values)  # Tổng tần suất
    if n == 0:
        return 0, 0, 0, 0
    mean = sum(n * x for n, x in zip(n_values, x_values)) / n
    variance = sum(n * (x ** 2) for n, x in zip(n_values, x_values)) / n - mean ** 2
    adjusted_variance = variance * n / (n - 1) if n > 1 else 0
    std_dev = adjusted_variance ** 0.5
    return mean, variance, adjusted_variance, std_dev

def generate_exercise(n):
    a_values = generate_random_values(n + 1)  # Tạo n+1 giá trị để tạo n cặp
    pairs = [(a_values[i], a_values[i + 1]) for i in range(n)]
    x_values = calculate_x_values(pairs)  # Tính x_i
    n_values = [random.randint(1, 30) for _ in range(n)]  # Tần suất ngẫu nhiên
    mean, variance, adjusted_variance, std_dev = compute_statistics(x_values, n_values)
    return {
        "pairs": pairs,
        "n_values": n_values,
        "mean": mean,
        "variance": variance,
        "adjusted_variance": adjusted_variance,
        "std_dev": std_dev,
    }