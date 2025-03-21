const apiKey = "a338b132ec4790e700c995b9"; // Replace with your valid ExchangeRate API key
const apiBaseURL = "https://v6.exchangerate-api.com/v6/";

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const convertBtn = document.getElementById("convert");
const convertedAmount = document.getElementById("convertedAmount");

const countries = {
    "USD": "United States Dollar",
    "INR": "Indian Rupee",
    "EUR": "Euro",
    "GBP": "British Pound",
    "JPY": "Japanese Yen",
    "CAD": "Canadian Dollar",
    "AUD": "Australian Dollar",
    "CNY": "Chinese Yuan",
    "SGD": "Singapore Dollar",
    "AED": "UAE Dirham"
};

// Load currency dropdowns
async function loadCurrencies() {
    Object.keys(countries).forEach(currency => {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        option1.value = option2.value = currency;
        option1.textContent = `${countries[currency]} (${currency})`;
        option2.textContent = `${countries[currency]} (${currency})`;
        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
    });

    fromCurrency.value = "INR";
    toCurrency.value = "USD";
}

convertBtn.addEventListener("click", async () => {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amountValue = parseFloat(amount.value);

    if (isNaN(amountValue) || amountValue <= 0) {
        alert("Enter a valid amount!");
        return;
    }

    try {
        // Fetch exchange rates first
        const response = await fetch(`${apiBaseURL}${apiKey}/latest/${from}`);
        const data = await response.json();

        if (data.result === "success") {
            const exchangeRate = data.conversion_rates[to];
            const convertedValue = (amountValue * exchangeRate).toFixed(2);

            convertedAmount.innerHTML = `${amountValue} ${from} = <strong>${convertedValue} ${to}</strong>`;
            
            // jQuery animation effect
            $(".result").fadeIn(500);
        } else {
            alert("Error fetching conversion rate. Please check your API key and try again!");
        }
    } catch (error) {
        console.error("Error fetching conversion:", error);
        alert("Something went wrong. Check your API key or internet connection.");
    }
});

// Load currencies on page load
loadCurrencies();
