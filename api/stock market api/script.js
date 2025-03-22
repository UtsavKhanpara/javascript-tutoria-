const apiKey = "D9KT4Q1DWFTA5ML9"; // Replace with your API key
const apiUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=";

$("#getStock").click(async function () {
    let stockSymbol = $("#stockSymbol").val().toUpperCase();
    
    if (!stockSymbol) {
        alert("Please enter a stock symbol!");
        return;
    }

    try {
        let response = await fetch(`${apiUrl}${stockSymbol}&interval=5min&apikey=${apiKey}`);
        let data = await response.json();

        if (!data["Time Series (5min)"]) {
            alert("Invalid Stock Symbol! Try again.");
            return;
        }

        let stockData = data["Time Series (5min)"];
        let latestTimestamp = Object.keys(stockData)[0];
        let latestInfo = stockData[latestTimestamp];

        $("#companyName").text(stockSymbol);
        $("#currentPrice").text(parseFloat(latestInfo["1. open"]).toFixed(2));
        $("#highPrice").text(parseFloat(latestInfo["2. high"]).toFixed(2));
        $("#lowPrice").text(parseFloat(latestInfo["3. low"]).toFixed(2));
        
        $("#stockInfo").fadeIn();

        // Chart Data
        let timestamps = Object.keys(stockData).slice(0, 10).reverse();
        let prices = timestamps.map(time => parseFloat(stockData[time]["1. open"]).toFixed(2));

        renderChart(timestamps, prices);

    } catch (error) {
        console.error("Error fetching stock data:", error);
        alert("Something went wrong! Check your API key or internet connection.");
    }
});

// Render Chart using Chart.js
function renderChart(labels, data) {
    const ctx = document.getElementById("stockChart").getContext("2d");

    if (window.stockChart) {
        window.stockChart.destroy();
    }

    window.stockChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Stock Price",
                data: data,
                borderColor: "rgba(0, 255, 0, 0.8)",
                backgroundColor: "rgba(0, 255, 0, 0.2)",
                borderWidth: 2,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
