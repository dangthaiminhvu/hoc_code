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

// Bài 5 - generate và check
const genBtn = document.getElementById("generate5");
const chkBtn = document.getElementById("check5");

genBtn.addEventListener("click", () => {
  const n = parseInt(document.getElementById("num-values5").value) || 5;
  fetch("/generate5", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ n }),
  })
    .then((res) => res.json())
    .then((data) => {
      // Hiển thị desc và nút kiểm tra
      document.getElementById("desc5").style.display = "block";
      chkBtn.style.display = "inline-block";

      // Gán thông số cho câu a
      document.getElementById("delta5").innerText = data.params.delta;
      document.getElementById("alpha5").innerText = data.params.alpha_a;
      document.getElementById("relation5").innerText = data.params.relation_a;
      document.getElementById("a05").innerText = data.params.a0_a;

      // Gán thông số cho câu b
      document.getElementById("alpha5b").innerText = data.params.alpha_b;
      document.getElementById("relation5b").innerText = data.params.relation_b;
      document.getElementById("a05b").innerText = data.params.a0_b;

      // Vẽ cả hai bảng X và n
      ["table5", "table5b"].forEach((id) => {
        const table = document.getElementById(id);
        // clear old columns except first
        table.querySelectorAll("thead tr").forEach((tr) => {
          tr.querySelectorAll("th:not(:first-child)").forEach((th) =>
            th.remove()
          );
        });
        const xs = data.params.ranges.map((r) => `${r[0]} - ${r[1]}`);
        const ns = data.params.ns;
        const rows = table.querySelectorAll("thead tr");
        xs.forEach((v) => {
          const th = document.createElement("th");
          th.innerText = v;
          rows[0].appendChild(th);
        });
        ns.forEach((v) => {
          const th = document.createElement("th");
          th.innerText = v;
          rows[1].appendChild(th);
        });
      });

      // Lưu đáp án cho câu a
      const zqs = data.intermediate.z_qs;
      const z0 = data.intermediate.z0;
      const relA = data.params.relation_a;
      let corrA = "accept_H";
      if (relA === "≠") corrA = Math.abs(zqs) > z0 ? "reject_H" : "accept_H";
      else if (relA === ">") corrA = zqs > z0 ? "reject_H" : "accept_H";
      else corrA = zqs < -z0 ? "reject_H" : "accept_H";
      document.getElementById("zqs-5a").dataset.correct = zqs;
      document.getElementById("z0-5a").dataset.correct = z0;
      document.getElementById("conclusion-5a").dataset.correct = corrA;

      // Lưu đáp án cho câu b
      const tqs = data.intermediate.t_qs;
      const t0b = data.intermediate.t0;
      const relB = data.params.relation_b;
      let corrB = "accept_H";
      if (relB === "≠") corrB = Math.abs(tqs) > t0b ? "reject_H" : "accept_H";
      else if (relB === ">") corrB = tqs > t0b ? "reject_H" : "accept_H";
      else corrB = tqs < -t0b ? "reject_H" : "accept_H";
      document.getElementById("tqs-5b").dataset.correct = tqs;
      document.getElementById("t0-5b").dataset.correct = t0b;
      document.getElementById("conclusion-5b").dataset.correct = corrB;

      // reset inputs
      [
        "zqs-5a",
        "z0-5a",
        "conclusion-5a",
        "tqs-5b",
        "t0-5b",
        "conclusion-5b",
      ].forEach((id) => {
        const el = document.getElementById(id);
        if (el.tagName === "SELECT") el.value = "reject_H";
        else el.value = "";
        el.style.backgroundColor = "";
      });
    });
});

// Bài 5 - check chung
chkBtn.addEventListener("click", () => {
  const ids = [
    "zqs-5a",
    "z0-5a",
    "conclusion-5a",
    "tqs-5b",
    "t0-5b",
    "conclusion-5b",
  ];
  const answers = ids.map((id) => document.getElementById(id).value);
  const correct = ids.map((id) => document.getElementById(id).dataset.correct);
  fetch("/check5", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers, correct_answers: correct }),
  })
    .then((res) => res.json())
    .then((results) => {
      ids.forEach((id, i) => {
        document.getElementById(id).style.backgroundColor = results[i]
          ? "lightgreen"
          : "lightcoral";
      });
    });
});

// Bài 6 - generate
document.getElementById("generate6").addEventListener("click", () => {
  fetch("/generate6", { method: "POST" })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("desc6").style.display = "block";
      document.getElementById("check6").style.display = "inline-block";

      // Hiển thị tham số
      document.getElementById("p6").innerText = data.params.p6;
      document.getElementById("relation6").innerText = data.params.relation6;
      document.getElementById("alpha6").innerText = data.params.alpha6;
      document.getElementById("n6").innerText = data.params.n6;
      document.getElementById("m6").innerText = data.params.m6;

      // Lưu đáp án để check
      document.getElementById("zqs6").dataset.correct = data.intermediate.z_qs;
      document.getElementById("z06").dataset.correct = data.intermediate.z0;
      document.getElementById("conclusion6").dataset.correct =
        data.intermediate.conclusion;

      // Reset input
      ["zqs6", "z06", "conclusion6"].forEach((id) => {
        const el = document.getElementById(id);
        if (el.tagName === "SELECT") el.value = "reject_H";
        else el.value = "";
        el.style.backgroundColor = "";
      });
    });
});

// Bài 6 - check
document.getElementById("check6").addEventListener("click", () => {
  const ua_zqs = document.getElementById("zqs6").value;
  const ua_z0 = document.getElementById("z06").value;
  const ua_concl = document.getElementById("conclusion6").value;

  const ca = {
    z_qs: parseFloat(document.getElementById("zqs6").dataset.correct),
    z0: parseFloat(document.getElementById("z06").dataset.correct),
    conclusion: document.getElementById("conclusion6").dataset.correct,
  };

  fetch("/check6", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      answers: [ua_zqs, ua_z0],
      conclusion: ua_concl,
      correct: ca,
    }),
  })
    .then((res) => res.json())
    .then((results) => {
      ["zqs6", "z06", "conclusion6"].forEach((id, i) => {
        document.getElementById(id).style.backgroundColor = results[i]
          ? "lightgreen"
          : "lightcoral";
      });
    });
});

// Bài 8 - generate
document.getElementById("generate8").addEventListener("click", () => {
  const n = parseInt(document.getElementById("num-values8").value) || 5;
  fetch("/generate8", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ n }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("desc8").style.display = "block";
      document.getElementById("check8").style.display = "inline-block";
      // Vẽ động cột A và n
      const table = document.getElementById("table8");
      table
        .querySelectorAll("thead tr")
        .forEach((tr) =>
          tr
            .querySelectorAll("th:not(:first-child)")
            .forEach((th) => th.remove())
        );
      const rows = table.querySelectorAll("thead tr");
      data.params.ns.forEach((v, i) => {
        const thA = document.createElement("th");
        thA.innerText = `A${i + 1}`;
        rows[0].appendChild(thA);
        const thN = document.createElement("th");
        thN.innerText = v;
        rows[1].appendChild(thN);
      });

      // Hiển thị xác suất lý thuyết P(A_i)
      document.getElementById("p8-list").innerText = data.params.ps
        .map((p, i) => `P(A${i + 1})=${p.toFixed(2)}`)
        .join(", ");

      // Hiển thị tham số
      document.getElementById("alpha8").innerText = data.params.alpha8;
      // lưu đáp án
      document.getElementById("chiqs8").dataset.correct =
        data.intermediate.chisq;
      document.getElementById("chi08").dataset.correct = data.intermediate.chi0;
      document.getElementById("conclusion8").dataset.correct =
        data.intermediate.conclusion;
    });
});

// Bài 8 - check
document.getElementById("check8").addEventListener("click", () => {
  const ua = [
    document.getElementById("chiqs8").value,
    document.getElementById("chi08").value,
  ];
  const concl = document.getElementById("conclusion8").value;
  const ca = {
    chisq: parseFloat(document.getElementById("chiqs8").dataset.correct),
    chi0: parseFloat(document.getElementById("chi08").dataset.correct),
    conclusion: document.getElementById("conclusion8").dataset.correct,
  };
  fetch("/check8", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers: ua, conclusion: concl, correct: ca }),
  })
    .then((r) => r.json())
    .then((res) => {
      ["chiqs8", "chi08", "conclusion8"].forEach((id, i) => {
        document.getElementById(id).style.backgroundColor = res[i]
          ? "lightgreen"
          : "lightcoral";
      });
    });
});

// Bài 8b - generate
document.getElementById("generate8b").addEventListener("click", () => {
  const n = parseInt(document.getElementById("num-values8b").value) || 5;
  fetch("/generate8b", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ n }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("desc8b").style.display = "block";
      document.getElementById("check8b").style.display = "inline-block";
      // vẽ bảng
      const table = document.getElementById("table8b");
      // clear old rows
      table
        .querySelectorAll("thead tr")
        .forEach((tr) =>
          tr
            .querySelectorAll("th:not(:first-child)")
            .forEach((th) => th.remove())
        );
      const rows = table.querySelectorAll("thead tr");
      data.params.ns.forEach((ni, i) => {
        const thA = document.createElement("th");
        thA.innerText = `${data.params.a[i]} - ${data.params.a[i + 1]}`;
        rows[0].appendChild(thA);
        const thN = document.createElement("th");
        thN.innerText = ni;
        rows[1].appendChild(thN);
      });
      // hiển thị giả thuyết và tham số
      let h = data.params.h8b;
      if (h === "∈N(a,δ²)") {
        h = `∈ N(${data.params.a_par}, ${data.params.delta2})`;
      }
      document.getElementById("h8b").innerText = h;
      document.getElementById("alpha8b").innerText = data.params.alpha8b;
      // lưu đáp án
      document.getElementById("chiqs8b").dataset.correct =
        data.intermediate.chisq;
      document.getElementById("chi08b").dataset.correct =
        data.intermediate.chi0;
      document.getElementById("conclusion8b").dataset.correct =
        data.intermediate.conclusion;
      // reset inputs
      ["chiqs8b", "chi08b", "conclusion8b"].forEach((id) => {
        const el = document.getElementById(id);
        if (el.tagName === "SELECT") el.value = "reject_H";
        else el.value = "";
        el.style.backgroundColor = "";
      });
    });
});

// Bài 8b - check
document.getElementById("check8b").addEventListener("click", () => {
  const ua = [
    document.getElementById("chiqs8b").value,
    document.getElementById("chi08b").value,
  ];
  const concl = document.getElementById("conclusion8b").value;
  const ca = {
    chisq: parseFloat(document.getElementById("chiqs8b").dataset.correct),
    chi0: parseFloat(document.getElementById("chi08b").dataset.correct),
    conclusion: document.getElementById("conclusion8b").dataset.correct,
  };
  fetch("/check8b", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers: ua, conclusion: concl, correct: ca }),
  })
    .then((r) => r.json())
    .then((res) => {
      ["chiqs8b", "chi08b", "conclusion8b"].forEach((id, i) => {
        document.getElementById(id).style.backgroundColor = res[i]
          ? "lightgreen"
          : "lightcoral";
      });
    });
});
