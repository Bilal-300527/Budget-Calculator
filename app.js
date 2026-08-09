var expenseName = document.getElementById("expenseName");
var amount = document.getElementById("amount");
var list = document.getElementById("list");
var totalAmount = document.getElementById("totalAmount");

// Load Data
var allExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Edit Index
var editIndex = -1;

// Display existing data
listExpense();
showTotal();

function addExpense() {
  if (expenseName.value.trim() === "" || amount.value.trim() === "") {
    alert("Please fill all fields.");
    return;
  }

  var expense = {
    name: expenseName.value,
    amount: Number(amount.value),
  };

  if (editIndex === -1) {
    allExpenses.push(expense);
  } else {
    allExpenses[editIndex] = expense;
    editIndex = -1;
  }

  localStorage.setItem("expenses", JSON.stringify(allExpenses));

  expenseName.value = "";
  amount.value = "";

  listExpense();
  showTotal();
}

function listExpense() {
  list.innerHTML = "";

  for (var i = 0; i < allExpenses.length; i++) {
    list.innerHTML += `
        
        <div class="item">

            <div class="left">
                <h3>${allExpenses[i].name}</h3>
            </div>

            <div class="right">

                <span class="price">
                    Rs. ${allExpenses[i].amount}
                </span>

                <div class="actions">

                    <button class="edit" onclick="editExpense(${i})">
                        ✏️
                    </button>

                    <button class="delete" onclick="deleteExpense(${i})">
                        🗑️
                    </button>

                </div>

            </div>

        </div>

        `;
  }
}

function deleteExpense(index) {
  allExpenses.splice(index, 1);

  localStorage.setItem("expenses", JSON.stringify(allExpenses));

  listExpense();
  showTotal();
}

function editExpense(index) {
  expenseName.value = allExpenses[index].name;
  amount.value = allExpenses[index].amount;

  editIndex = index;
}

function showTotal() {
  var total = 0;

  for (var i = 0; i < allExpenses.length; i++) {
    total += Number(allExpenses[i].amount);
  }

  totalAmount.innerHTML = "Rs. " + total;
}

function downloadPDF() {
  // Optional: Customize configuration settings
  const options = {
    margin: 10,
    filename: "Expense-Record.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 }, // Higher scale means better resolution
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // // 3. Generate and automatically save the PDF file
  html2pdf().set(options).from(list).save();
}

listExpense();
showTotal();
