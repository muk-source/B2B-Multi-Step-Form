const stepForm = document.querySelector(".step-Form");
const formSteps=[...document.querySelectorAll(".data-step")]
const progress = document.getElementById("progress");
const progressSteps = document.querySelectorAll(".progress-step");
const Confirmation = document.querySelector(".Confirmation");
const select = document.getElementById("myDropdown");
const UserInfo = document.getElementById("UserInfo");
const CompanyInfoInfo = document.getElementById("CompanyInfo");
const OrderInfo = document.getElementById("OrderInfo");
const Confirm = document.getElementById("Confirm");
const inputDisable = document.querySelectorAll(".disable");
const submit=document.querySelector(".submit")
let clicked=false
select.selectedIndex = -1;

const arrNew=[...document.getElementsByClassName("disable")];



let currentStep = formSteps.findIndex((step) => {
  return step.classList.contains("active");
});

if (currentStep < 0) {
  currentStep = 0;
  showCurrentStep();
}

// functions
function Calculate(){
  const productQuantity = document.getElementById("ProductQty").value;
  const NegotiatedPrice = document.getElementById("NegotiatedPrice").value;
  document.getElementById("TotalPrice").value =
  productQuantity * NegotiatedPrice;
}
// Getting Current Step
function showCurrentStep() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  
  });
}

// updating Progress Bar
function updateProgressbar() {
  progressSteps.forEach((progressStep, index) => {
    if (index < currentStep + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });
  const progressActive = document.querySelectorAll(".progress-step-active");
  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}


// posting data to API
function postData(bodyContent){
  fetch("http://localhost:9001/posts", {
    method: "POST",
    body: JSON.stringify(bodyContent),

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.querySelectorAll(".disable").disabled = true;
      Confirmation.innerHTML = `<h1>Order Confirmed</h1>
      <h1>Order ID ${data.id}`;
    })
    .catch((error) => {
      console.log(error);
    });
}

// Event Listeners

// 
stepForm.addEventListener("click", (e) => {
  let move;
  if (e.target.matches(".data-next")) {
    move = 1;
  } else if (e.target.matches(".data-previous")) {
    move = -1;
  }
  if (move == null) {
    return;
  }
  const inputFields = [...formSteps[currentStep].querySelectorAll("input")];
  const allValid = inputFields.every((inputs) => inputs.reportValidity());
  if (allValid || move == -1) {
    currentStep += move;
    showCurrentStep();
    updateProgressbar();
  }
});

UserInfo.addEventListener("click", () => {
  currentStep = 0;
  showCurrentStep();
  updateProgressbar();
});

CompanyInfo.addEventListener("click", () => {
  currentStep = 1;
  const inputFields = [...formSteps[currentStep - 1].querySelectorAll("input")];
  const allValid = inputFields.every((inputs) => inputs.reportValidity());
  if (allValid) {
    console.log(currentStep);
    showCurrentStep();
    updateProgressbar();
  }
});

OrderInfo.addEventListener("click", () => {
  currentStep = 2;
  const inputFields = [...formSteps[currentStep - 1].querySelectorAll("input")];
  const allValid = inputFields.every((inputs) => inputs.reportValidity());
  if (allValid) {
    console.log(currentStep);
    showCurrentStep();
    updateProgressbar();
  }
});

Confirm.addEventListener("click", () => {
  currentStep = 3;
  const inputFields = [...formSteps[currentStep - 1].querySelectorAll("input")];
  const allValid = inputFields.every((inputs) => inputs.reportValidity());
  console.log(clicked)
  if (allValid && clicked===true) {
    console.log(currentStep);
    showCurrentStep();
    updateProgressbar();
  }
});


stepForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clicked=true
  const FirstName = document.getElementById("FirstName").value;
  const LastName = document.getElementById("LastName").value;
  const Phone = document.getElementById("Phone").value;
  const Email = document.getElementById("Email").value;
  const CompanyName = document.getElementById("CompanyName").value;
  const CompanyType = select.options[select.selectedIndex].value;
  const PANNO = document.getElementById("PANNO").value;
  const GSTNO = document.getElementById("GSTNO").value;
  const ProductId = document.getElementById("ProductId").value;
  const ProductQty = document.getElementById("ProductQty").value;
  const NegotiatedPrice = document.getElementById("NegotiatedPrice").value;
  const TotalPrice=document.getElementById("TotalPrice").value

  let bodyContent={
    FirstName,
    LastName,
    Phone,
    Email,
    CompanyName,
    CompanyType,
    PANNO,
    GSTNO,
    ProductId,
    ProductQty,
    NegotiatedPrice,
    TotalPrice,
  }
 
  postData(bodyContent)
  
  arrNew.forEach((item)=>{
    item.disabled=true
  })
  submit.disabled=true
  select.disabled=true
  
 
  

  
});


