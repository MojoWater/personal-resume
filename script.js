/*
    WEB DESIGN AND TECHNOLOGIES - JAVASCRIPT
    FEATURES LISTING:
    A. First feature: Dynamic World Clock API Integration (updateClocks function)
    B. Second feature: Interactive Content Filtering (filterSelection function)
    C. Third feature: Live Industry News Feed (fetchTechNews function)
    D. Fourth feature: Client Consultation Form (form handled in contact.html)
*/

/*
    FEATURE A: Dynamic World Clock API Integration
    Uses the Intl.DateTimeFormat API to display real-time clocks for
    four global operations centers. Refreshes automatically every 60 seconds.
*/
function updateClocks() {
    const container = document.getElementById('clocks-container');
    if (!container) return; // Exit if not on the Home page

    const locales = [
        { name: 'Phoenix', zone: 'America/Phoenix' },
        { name: 'Germany', zone: 'Europe/Berlin' },
        { name: 'India', zone: 'Asia/Kolkata' },
        { name: 'Singapore', zone: 'Asia/Singapore' }
    ];
    
    const clockHTML = locales.map(l => {
        const time = new Intl.DateTimeFormat('en-US', {
            timeStyle: 'short',
            timeZone: l.zone
        }).format(new Date());
        return `<div style="text-align:center;"><strong>${l.name}</strong><br>${time}</div>`;
    }).join('');

    container.innerHTML = clockHTML;
}

/*
    FEATURE B: Interactive Content Filtering
    Allows visitors to filter professional experience entries by category
    (Agile/Scrum, Infrastructure, Budget/Program, Managed Services)
    by toggling element visibility based on CSS class names.
*/
function filterSelection(category) {
    const items = document.getElementsByClassName("item");
    if (items.length === 0) return;

    for (let i = 0; i < items.length; i++) {
        // If 'all' is selected, show everything. 
        // Otherwise, show only if the class list contains the category name.
        if (category === "all") {
            items[i].style.display = "block";
        } else {
            if (items[i].classList.contains(category)) {
                items[i].style.display = "block";
            } else {
                items[i].style.display = "none";
            }
        }
    }
}

/*
    FEATURE C: Live Industry News Feed
    Fetches real-time technology headlines from an external REST API
    (ok.surf news-feed) and renders the top 5 articles dynamically.
*/
async function fetchTechNews() {
    const newsContainer = document.getElementById('news-list');
    if (!newsContainer) return;

    try {
        const response = await fetch('https://ok.surf/api/v1/cors/news-feed');
        const data = await response.json();
        const techNews = data.Technology.slice(0, 5); 
        newsContainer.innerHTML = techNews.map(article => `
            <div style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                <a href="${article.link}" target="_blank" style="color: #002d62; font-weight: bold; text-decoration: none;">
                    ${article.title}
                </a>
                <p style="font-size: 0.8em; color: #666;">Source: ${article.source}</p>
            </div>
        `).join('');
    } catch (error) {
        newsContainer.innerHTML = "Latest tech headlines are currently unavailable.";
    }
}

// EVENT LISTENERS - This ensures the code runs immediately on load
document.addEventListener('DOMContentLoaded', () => {
    // FEATURE A: Run the clocks immediately
    updateClocks();
    // Refresh the clocks every 60 seconds
    setInterval(updateClocks, 60000);
    
    // FEATURE C: Check if we are on the news page
    fetchTechNews();
    
    // FEATURE B: Initialize Experience page to show all by default
    if (document.getElementsByClassName("item").length > 0) {
        filterSelection('all');
    }
});
