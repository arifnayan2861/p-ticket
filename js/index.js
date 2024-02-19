const seats = document.getElementsByClassName("seat-btn");
const selectedSeatsCount = document.getElementById("selected-seat-count");
const remainingSeats = document.getElementById("remaining-seats");
const singleSelectedSeat = document.getElementById("single-selected-seat");
const selectedSeatList = document.getElementById("selected-seat-list");
const totalPrice = document.getElementById("total-price");
const grandTotal = document.getElementById("grand-total");
const couponInput = document.getElementById("coupon-input");
const couponBtn = document.getElementById("coupon-btn");
const couponInfo = document.getElementById("coupon-info");
const phoneNoInput = document.getElementById("phone-no-input");
const nextBtn = document.getElementById("next-btn");
const inputError = document.getElementById("input-error");

// storing the selected seats
let selectedSeats = [];

//selecting seats
for (let seat of seats) {
  seat.addEventListener("click", () => {
    //checking if the selected seat count is more than 4.
    if (selectedSeats.length <= 3) {
      // checking if the seat is already selected or not
      if (!selectedSeats.includes(seat.innerText)) {
        selectedSeats.push(seat.innerText);

        // enabling coupon input if any seat is selected
        if (selectedSeats.length == 4) {
          couponInput.removeAttribute("disabled");
          couponBtn.removeAttribute("disabled");
        }

        seat.classList.add("bg-[#1DD100]");

        //updating seat availability
        selectedSeatsCount.innerText = selectedSeats.length;
        remainingSeats.innerText = 40 - selectedSeatsCount.innerText;

        // creating new div to dynamically store seat info.
        const div = document.createElement("div");
        div.classList.add("flex", "justify-between");

        // creating seat info
        div.appendChild(createSeatElement("h3", seat.innerText));
        div.appendChild(createSeatElement("h3", "Economy"));
        div.appendChild(createSeatElement("h3", "550"));

        // appending seat info in div
        selectedSeatList.appendChild(div);

        // calculating total
        calculatePrice(totalPrice);
        calculatePrice(grandTotal);
      }
    } else {
      alert("You can not select more than 4 seats!");
    }
  });
}

couponBtn.addEventListener("click", () => {
  if (couponInput.value === "NEW15") {
    calculateDiscount(15);
    couponInfo.classList.add("hidden");
  } else if (couponInput.value === "Couple 20") {
    calculateDiscount(20);
    couponInfo.classList.add("hidden");
  } else {
    alert("Please enter a valid coupon!");
  }
});

phoneNoInput.addEventListener("input", (e) => {
  if (e.target.value !== "" && selectedSeats.length !== 0) {
    const regex = /^\d+$/;
    if (regex.test(e.target.value)) {
      nextBtn.removeAttribute("disabled");
    }
  }
});

const createSeatElement = (htmlElement, text) => {
  const selectedSeat = document.createElement(htmlElement);
  selectedSeat.innerText = text;
  return selectedSeat;
};

const calculatePrice = (idName) => {
  let totalCount = parseInt(idName.innerText);
  totalCount += 550;
  idName.innerText = totalCount;
};

const calculateDiscount = (discountAmount) => {
  const discount = parseFloat((grandTotal.innerText * discountAmount) / 100);
  grandTotal.innerText = parseFloat(grandTotal.innerText - discount);
};
