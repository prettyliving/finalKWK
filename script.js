
function getChartData() {
    return {
        labels: ['White', 'Black', 'Hispanic', 'Asian', 'Other'],
        datasets: [{
            label: 'Average Household Wealth (in USD)',
            data: [188200, 24000, 36000, 74000, 50000],
            backgroundColor: [
                '#b8b0a1', // White - stone/earth
                '#6b4f3b', // Black - rich brown
                '#a47148', // Hispanic - clay
                '#7e6c5e', // Asian - taupe
                '#967d69'  // Other - muted beige
            ],
            borderColor: '#3f3f3f',
            borderWidth: 1
        }]
    };
}

document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('wealthChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: getChartData(),
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
