// script.js

const searchForm = document.getElementById('search-form');
const countryInput = document.getElementById('country-input');
const searchButton = document.getElementById('search-button');
const allButton = document.getElementById('all-button');
const numCountries = document.getElementById('num-countries');
const totalCitizens = document.getElementById('total-citizens');
const citizensAverage = document.getElementById('citizens-average');
const countryTable = document.getElementById('country-table').querySelector('tbody');
const regionTable = document.getElementById('region-table').querySelector('tbody');

const apiUrl = 'https://restcountries.com/v3.1';

// Function to fetch and display country data
async function fetchCountryData(name) {
    try {
        const response = await fetch(`${apiUrl}/name/${name}`);
        let data = await response.json();
        showStatistics(data)
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to fetch and display country data
async function fetchAllCountriesData() {
    try {
        const response = await fetch(`${apiUrl}/all`);
        let data = await response.json();
        showStatistics(data)
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function showStatistics(data) {
    if (!data?.length) data = []
    // Update statistics
    numCountries.textContent = data.length;

    const totalCitizensCount = data.reduce((acc, country) => acc + country.population, 0);
    totalCitizens.textContent = totalCitizensCount;
    citizensAverage.textContent = (totalCitizensCount / data.length).toFixed(2);

    // Clear previous table data
    countryTable.innerHTML = '';
    regionTable.innerHTML = '';

    // Populate tables
    const regionCounts = {};
    data.forEach(country => {
        // Country table
        const row = countryTable.insertRow();
        row.insertCell(0).textContent = country.name.common;
        row.insertCell(1).textContent = country.population;

        // Region table
        const region = country.region;
        regionCounts[region] = (regionCounts[region] || 0) + 1;
    });

    for (const region in regionCounts) {
        const row = regionTable.insertRow();
        row.insertCell(0).textContent = region;
        row.insertCell(1).textContent = regionCounts[region];
    }
}

// Event listeners
searchButton.addEventListener('click', () => {
    const countryName = countryInput.value;
    if (countryName) {
        fetchCountryData(countryName);
    }
});

allButton.addEventListener('click', () => {
    fetchAllCountriesData();
});
