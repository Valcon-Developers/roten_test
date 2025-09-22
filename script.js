let filledCount = 0;
let historyStack = []; // لتخزين الصفوف المملوءة (Undo)

function getRandomInRange(min, max, decimals = 1) {
  const rand = Math.random() * (max - min) + min;
  return parseFloat(rand.toFixed(decimals));
}

function fillRow(lineNumber) {
  if (lineNumber === "") {
    alert("من فضلك أدخل رقم الخط أولاً");
    return;
  }

  const lineMeasure = getRandomInRange(4.1, 8.2, 1);
  const plusOrMinus = Math.random() < 0.5 ? -0.2 : 0.2;
  const adjustedValue = parseFloat((lineMeasure + plusOrMinus).toFixed(1));

  let table, row;
  if (filledCount < 40) {
    table = document.getElementById("routineTable1");
    let body = table.tBodies[0];
    row = body.rows[filledCount];
  } else if (filledCount < 80) {
    table = document.getElementById("routineTable2");
    row = table.tBodies[0].rows[filledCount - 40];
  } else {
    alert("الجدولين ممتلئين (80 صف)!");
    return;
  }

  // ملء البيانات
  row.cells[0].innerText = lineNumber;
  row.cells[1].innerText = lineMeasure;
  row.cells[2].innerText = adjustedValue;
  row.cells[3].innerText = "✔";
  row.cells[4].innerText = "✔";

  // نخزن الصف في الـ historyStack
  historyStack.push(row);

  filledCount++;
}

// ########## دالة التراجع ##########
function undoRow() {
  if (historyStack.length === 0) {
    alert("مفيش حاجة ترجعها!");
    return;
  }

  // رجع آخر صف فاضي
  let lastRow = historyStack.pop();
  for (let i = 0; i < lastRow.cells.length; i++) {
    lastRow.cells[i].innerText = "";
  }

  filledCount--; // تقليل العداد
}

// ########## Events ##########
document.getElementById("formCenteral").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("divc").innerHTML = `سنترال : ${document.getElementById("centeral").value}`;
});

document.getElementById("formDate").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("divd").innerHTML = `التاريخ : ${document.getElementById("date").value}`;
});

document.getElementById("formKabinate").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("divk").innerHTML = `الكابينة : ${document.getElementById("kabinate").value}`;
});

document.getElementById("formLine").addEventListener("submit", function(e) {
  e.preventDefault();
  fillRow(document.getElementById("lineInput").value);
  document.getElementById("lineInput").value = "";
});



window.addEventListener("beforeunload", function (e) {
    e.preventDefault(); 
    e.returnValue = "هل أنت متأكد إنك عايز تعمل تحديث أو تخرج؟ البيانات اللي كتبتها ممكن تضيع.";
});
