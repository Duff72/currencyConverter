document.getElementById('latestRates').addEventListener('click', function(event) {
    event.preventDefault();
    getLatestConversion();
});

document.getElementById('historicalRates').addEventListener('click', function(event) {
    event.preventDefault();
    getHistoricalConversion();
});

document.getElementById('saveFavorite').addEventListener('click', function(event) {
    event.preventDefault();
    saveFavorite();

});

function getLatestConversion() {
    let base = document.getElementById('baseCurrency').value;
    let target = document.getElementById('targetCurrency').value;
    let amount = document.getElementById('amount').value;

    fetch(`https://api.freecurrencyapi.com/v1/latest?base_currency=${base}&currencies=${target}&apikey=fca_live_RyKW9w3cpgCMH06ZRRoGw2EH8giXkfgvqRXmMEOe`, {
        method: 'GET',
        // Additional fetch options
    })
    .then(response => response.json())
    .then(data => {
        // Handle fetched data
        console.log('Fetched data:', data);
        let conversionRate = data.data[target];
        document.getElementById('convertedAmount').innerHTML = `${amount} ${base} is worth ${conversionRate*amount} ${target}`;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
};

function getHistoricalConversion() {
    let base = document.getElementById('baseCurrency').value;
    let target = document.getElementById('targetCurrency').value;
    let date = document.getElementById('date').value;
    let amount = document.getElementById('amount').value; // Parse amount as a float

    fetch(`https://api.freecurrencyapi.com/v1/historical?date=${date}&base_currency=${base}&currencies=${target}&apikey=fca_live_RyKW9w3cpgCMH06ZRRoGw2EH8giXkfgvqRXmMEOe`, {
        method: 'GET',
        // Additional fetch options
    })
    .then(response => response.json())
    .then(data => {
        // Handle fetched data
        console.log('Fetched data:', data);
        
            let conversionRate = data.data[date][target];
            console.log(conversionRate);

            // Display the converted amount and details
            document.getElementById('historicalConvertedAmount').innerHTML = `${amount} ${base} was worth ${conversionRate*amount} ${target} on ${date}`;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

(function getCurrencies() {
    fetch(`https://api.freecurrencyapi.com/v1/currencies?apikey=fca_live_RyKW9w3cpgCMH06ZRRoGw2EH8giXkfgvqRXmMEOe`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        // Initialize arrays to store currency abbreviations and names
        let abbr = [];
        let name = [];

        // Loop through each currency object in the data
        Object.keys(data.data).forEach(key => {
            abbr.push(key); // Push abbreviation (e.g., "AED", "AFN", etc.)
            name.push(data.data[key].name); // Push name (e.g., "United Arab Emirates Dirham", "Afghan Afghani", etc.)
        });

        const baseCurrencySelect = document.getElementById('baseCurrency');
    const targetCurrencySelect = document.getElementById('targetCurrency');
    let currencies = data.data;

    // Clear existing options
    baseCurrencySelect.innerHTML = '';
    targetCurrencySelect.innerHTML = '';

    // Iterate over each currency in the data and create <option> elements
    Object.keys(currencies).forEach(currencyCode => {
        const currencyName = currencies[currencyCode].name;

        // Create option elements for baseCurrencySelect and targetCurrencySelect
        const baseOption = document.createElement('option');
        baseOption.value = currencyCode;
        baseOption.textContent = currencyName;

        const targetOption = document.createElement('option');
        targetOption.value = currencyCode;
        targetOption.textContent = currencyName;

        // Append options to their respective select elements
        baseCurrencySelect.appendChild(baseOption);
        targetCurrencySelect.appendChild(targetOption);
    });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
})();

(async function getFavorites() {
    fetch('/favorites', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        // Display the favorite currencies on the page
        const favoriteCurrencyPairs = document.getElementById('favoriteCurrencyPairs');
        favoriteCurrencyPairs.innerHTML = `${data.favoriteBase} - ${data.favoriteTarget}`;
    })
})();

async function saveFavorite() {
    let baseCurrency = document.getElementById('baseCurrency').value;
    let targetCurrency = document.getElementById('targetCurrency').value;

    // Create a JSON object with the selected currencies
    let favorite = {
        favoriteBase: baseCurrency,
        favoriteTarget: targetCurrency
    };

    // Send a POST request to the server endpoint to save the favorite
    fetch('/saveFavorite', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(favorite)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Favorite saved:', data);
    })
    .catch(error => {
        console.error('Error saving favorite:', error);
    });
}
