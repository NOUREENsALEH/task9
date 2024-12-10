const links = document.querySelectorAll('.menu_links .container h2');
links.forEach((link) => link.addEventListener('click', () => {
    const current_category = link.textContent.toLowerCase();
    console.log("Clicked", current_category);
    fetchNewsApi(current_category);
}))
let isLoading;


async function fetchNewsApi(category) {
    isLoading = true;
    document.querySelector(".loader").classList.add("active");
    const request = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=fccf91932fc247239b625a581e98b003`, {
        method:"GET"
    });
    const finalRes = (await request.json());
    const articles =await finalRes.articles;
    console.log(finalRes);
    
    if (finalRes.status === "ok") {
        document.querySelector(".loader").classList.remove("active");
        isLoading = false;
        createRequesInHtml(articles);  
    } else {
        // isLoading = true;
        document.querySelector(".loader").classList.add("active");
    }
} 
fetchNewsApi(links[0].textContent.toLowerCase());

function createRequesInHtml(data) {
    let temp = ``;
    data.forEach(
        (news) => {
            if (news.urlToImage) {
                temp += `<div class="news_card">
                <div class="news_card_image">
                    <img src="${news.urlToImage}" alt="news_card">
                </div>
                <div class="news_card_content">
                    <h3>${news.title && news.title.slice(0, 30)}</h3>
                    <p>${news.description && news.description.slice(0, 30)}</p>
                    <a href="${news.url}" target="_blank">View More </a>
                </div>
            </div>`;
             }
        }
            
    );
    document.querySelector('.news .container').innerHTML = temp;
}

// window.addEventListener("DOMContentLoaded", () => {
//     if (isLoading) {
//         document.querySelector(".loader").classList.add("active");
//         console.log("Done", isLoading);
//     } else {
//         document.querySelector(".loader").classList.remove("active");
//         console.log("Done", isLoading);
        
//     }
// })




// payload in inspect of network when l stand over elment and click on it , it is the data tha i sand 
// preview it is his answer