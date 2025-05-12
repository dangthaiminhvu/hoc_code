// Bài 1
document.getElementById("generate1").addEventListener("click", () => {
  const n = parseInt(document.getElementById("num-values1").value);
  fetch("/generate1", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ n }),
  })
    .then((response) => response.json())
    .then((data) => {
      const table = document.getElementById("table1");
      const thead = table.querySelector("thead");
      const rows = thead.querySelectorAll("tr");

      // Tạo nhãn khoảng [a_i, a_{i+1}] cho hàng X
      const intervalLabels = data.pairs.map(
        (pair) => `${pair[0]} - ${pair[1]}`
      );

      // Hàng X: in ra khoảng thay vì trung điểm
      rows[0].innerHTML =
        "<th>X (giá trị)</th>" +
        intervalLabels.map((lbl) => `<th>${lbl}</th>`).join("");

      // Hàng n vẫn như cũ
      rows[1].innerHTML =
        "<th>n (tần suất)</th>" +
        data.n_values.map((f) => `<th>${f}</th>`).join("");

      // Lưu đáp án và reset input
      const correct = [
        data.mean,
        data.variance,
        data.adjusted_variance,
        data.std_dev,
      ];
      correct.forEach((v, i) => {
        const input = document.getElementById(`ans1-${i}`);
        input.dataset.correct = v;
        input.value = "";
        input.style.backgroundColor = "";
      });
    })
    .catch((err) => console.error("Error generating Bài 1:", err));
});

const chk1 = document.getElementById("check1");
chk1.addEventListener("click", () => {
  const ua = [0, 1, 2, 3].map(
    (i) => document.getElementById(`ans1-${i}`).value
  );
  const ca = [0, 1, 2, 3].map(
    (i) => document.getElementById(`ans1-${i}`).dataset.correct
  );
  fetch("/check1", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers: ua, correct_answers: ca }),
  })
    .then((res) => res.json())
    .then((results) => {
      results.forEach((result, index) => {
        const input = document.getElementById(`ans1-${index}`);
        input.style.backgroundColor = result ? "lightgreen" : "lightcoral";
      });
    })
    .catch((err) => console.error("Error checking Bài 1:", err));
});

// Bài 2
document.getElementById("generate2").addEventListener("click", () => {
  fetch("/generate2", { method: "POST" })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("exercise2-question").innerText = data.question;
      const correctAnswers = data.correct_answers;
      correctAnswers.forEach((answer, index) => {
        const input = document.getElementById(`ans2-${index}`);
        input.dataset.correct = answer;
        input.value = "";
        input.style.backgroundColor = "";
      });
    })
    .catch((err) => console.error("Error generating Bài 2:", err));
});

document.getElementById("check2").addEventListener("click", () => {
  const userAnswers = Array.from(
    { length: 9 },
    (_, i) => document.getElementById(`ans2-${i}`).value
  );
  const correctAnswers = Array.from(
    { length: 9 },
    (_, i) => document.getElementById(`ans2-${i}`).dataset.correct
  );

  fetch("/check2", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      answers: userAnswers,
      correct_answers: correctAnswers,
    }),
  })
    .then((response) => response.json())
    .then((results) => {
      results.forEach((result, index) => {
        const input = document.getElementById(`ans2-${index}`);
        input.style.backgroundColor = result ? "lightgreen" : "lightcoral";
      });
    })
    .catch((err) => console.error("Error checking Bài 2:", err));
});

// Bài 3
document.getElementById("generate3").addEventListener("click", () => {
  const n = parseInt(document.getElementById("num-values3").value);
  fetch("/generate3", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ n }),
  })
    .then((res) => res.json())
    .then((data) => {
      const xs = data.params.xs;
      const ns = data.params.ns;
      // Render table
      const table = document.getElementById("table3");
      // đầu tiên xóa nội dung cũ
      table
        .querySelectorAll("thead, tbody")
        .forEach((el) => (el.innerHTML = ""));
      // thêm header X và row giá trị
      const theadX = document.createElement("thead");
      theadX.innerHTML = `<tr><th>X (giá trị)</th>${xs
        .map((x) => `<th>${x}</th>`)
        .join("")}</tr>`;
      table.appendChild(theadX);
      // thêm header n và row tần suất
      const theadN = document.createElement("thead");
      theadN.innerHTML = `<tr><th>n (tần suất)</th>${ns
        .map((f) => `<th>${f}</th>`)
        .join("")}</tr>`;
      table.appendChild(theadN);

      // Lưu đáp án đúng vào data-attribute
      const [meanAns, varAns] = data.correct;
      document.getElementById("ans3-0").dataset.correct = meanAns;
      document.getElementById("ans3-1").dataset.correct = varAns;
      // reset input
      ["ans3-0", "ans3-1"].forEach((id) => {
        const ip = document.getElementById(id);
        ip.value = "";
        ip.style.backgroundColor = "";
      });
    })
    .catch((err) => console.error("Error generating Bài 3:", err));
});

document.getElementById("check3").addEventListener("click", () => {
  const ua = [0, 1].map((i) => document.getElementById(`ans3-${i}`).value);
  const ca = [0, 1].map(
    (i) => document.getElementById(`ans3-${i}`).dataset.correct
  );
  fetch("/check3", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers: ua, correct_answers: ca }),
  })
    .then((res) => res.json())
    .then((results) => {
      results.forEach((ok, idx) => {
        document.getElementById(`ans3-${idx}`).style.backgroundColor = ok
          ? "lightgreen"
          : "lightcoral";
      });
    })
    .catch((err) => console.error("Error checking Bài 3:", err));
});

// Bài 4
document.getElementById("generate4").addEventListener("click", () => {
  const n = parseInt(document.getElementById("num-values4").value);
  fetch("/generate4", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ n }),
  })
    .then((res) => res.json())
    .then((data) => {
      // 1) Tạo bảng khoảng [a_i, a_{i+1}]
      const ranges = data.params.ranges;
      const intervalLabels = ranges.map((r) => `${r[0]} - ${r[1]}`);

      const ns = data.params.ns;
      const table = document.getElementById("table4");
      table.querySelectorAll("thead, tbody").forEach((el) => el.remove());

      const theadX = document.createElement("thead");
      theadX.innerHTML = `
        <tr>
          <th>X (giá trị) </th>
          ${intervalLabels.map((lbl) => `<th>${lbl}</th>`).join("")}
        </tr>`;
      table.appendChild(theadX);

      const theadN = document.createElement("thead");
      theadN.innerHTML = `
        <tr>
          <th>n (tần suất)</th>
          ${ns.map((f) => `<th>${f}</th>`).join("")}
        </tr>`;
      table.appendChild(theadN);

      // 2) Hiển thị gamma, delta
      const p = data.params;
      document.getElementById("gamma1").innerText = p.gamma1;
      document.getElementById("delta").innerText = p.delta;
      document.getElementById("gamma2").innerText = p.gamma2;
      document.getElementById("gamma3").innerText = p.gamma3;

      // 3) Gán đáp án đúng vào data-correct
      const m = data.intermediate;
      const ci = data.ci;

      document.getElementById("mean-input").dataset.correct = m.mean;
      document.getElementById("z0-input").dataset.correct = m.z0;
      // gán đúng s' từ backend
      document.getElementById("sprime-input").dataset.correct = m.s_prime;
      document.getElementById("t0-input").dataset.correct = m.t0;

      // CI EX dùng z0, delta
      document.getElementById("ci-a-low").dataset.correct = ci.mean[0];
      document.getElementById("ci-a-high").dataset.correct = ci.mean[1];
      // CI EX dùng t0, s
      document.getElementById("ci2-low").dataset.correct = ci.mean_t[0];
      document.getElementById("ci2-high").dataset.correct = ci.mean_t[1];

      // Hoán đổi α₁ và α₂ (cái này làm sai nhưng lười sửa tận gốc quá...)
      document.getElementById("alpha1-input").dataset.correct = m.alpha2;
      document.getElementById("alpha2-input").dataset.correct = m.alpha1;

      document.getElementById("s2-input").dataset.correct = m.s2;
      document.getElementById("ci3-low").dataset.correct = ci.var[0];
      document.getElementById("ci3-high").dataset.correct = ci.var[1];

      // 4) Reset giá trị + màu nền
      [
        "mean-input",
        "z0-input",
        "sprime-input",
        "t0-input",
        "ci-a-low",
        "ci-a-high",
        "ci2-low",
        "ci2-high",
        "alpha1-input",
        "alpha2-input",
        "s2-input",
        "ci3-low",
        "ci3-high",
      ].forEach((id) => {
        const ip = document.getElementById(id);
        ip.value = "";
        ip.style.backgroundColor = "";
      });
    })
    .catch((err) => console.error("Error generating Bài 4:", err));
});

document.getElementById("check4").addEventListener("click", () => {
  // Danh sách ids cần kiểm tra (không lặp lại)
  const ids = [
    "mean-input",
    "z0-input",
    "sprime-input",
    "t0-input",
    "ci-a-low",
    "ci-a-high",
    "ci2-low",
    "ci2-high",
    "alpha1-input",
    "alpha2-input",
    "s2-input",
    "ci3-low",
    "ci3-high",
  ];
  const ua = ids.map((id) => document.getElementById(id).value);
  const ca = ids.map((id) => document.getElementById(id).dataset.correct);

  fetch("/check4", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers: ua, correct_answers: ca }),
  })
    .then((res) => res.json())
    .then((results) => {
      results.forEach((ok, i) => {
        document.getElementById(ids[i]).style.backgroundColor = ok
          ? "lightgreen"
          : "lightcoral";
      });
    })
    .catch((err) => console.error("Error checking Bài 4:", err));
});
