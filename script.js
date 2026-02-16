// 1. Tech News API Integration
async function fetchTechNews() {
    const newsContainer = document.getElementById('news-list');
    try {
        const response = await fetch('https://ok.surf/api/v1/cors/news-feed');
        const data = await response.json();
        const techNews = data.Technology.slice(0, 4); 
        newsContainer.innerHTML = techNews.map(article => `
            <div style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                <a href="${article.link}" target="_blank" style="color: #002d62; text-decoration: none; font-weight: bold;">
                    ${article.title}
                </a>
                <p style="font-size: 0.85em; color: #666; margin: 5px 0;">Source: ${article.source}</p>
            </div>
        `).join('');
    } catch (error) {
        newsContainer.innerHTML = "Latest technical insights are currently unavailable.";
    }
}

// 2. World Clock for Global Ops
function updateClocks() {
    const locales = [
        { name: 'Phoenix (HQ)', zone: 'America/Phoenix' },
        { name: 'India', zone: 'Asia/Kolkata' },
        { name: 'Philippines', zone: 'Asia/Manila' },
        { name: 'Germany', zone: 'Europe/Berlin' },
        { name: 'Singapore', zone: 'Asia/Singapore' }
    ];
    
    const container = document.getElementById('clocks-container');
    container.innerHTML = locales.map(l => {
        const time = new Intl.DateTimeFormat('en-US', {
            timeStyle: 'short',
            timeZone: l.zone
        }).format(new Date());
        return `<div style="text-align:center;"><strong>${l.name}</strong><br>${time}</div>`;
    }).join('');
}

// 3. Portfolio Filter
function filterSelection(c) {
    const items = document.getElementsByClassName("item");
    if (c === "all") c = "";
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = items[i].className.includes(c) ? "block" : "none";
    }
}

// 4. Form Validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const feedback = document.getElementById('formFeedback');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailPattern.test(email)) {
        feedback.style.color = 'red';
        feedback.innerText = 'Please enter a valid professional email address.';
    } else {
        feedback.style.color = 'green';
        feedback.innerText = 'Your message has been sent successfully.';
        this.reset();
    }
});

// Init
fetchTechNews();
updateClocks();
setInterval(updateClocks, 60000);