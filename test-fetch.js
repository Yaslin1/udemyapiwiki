function start() {
    const btnGETDATA = document.getElementById('btn_get_data');
    btnGETDATA.onclick = getPageViewsForTopic;
}

function getPageViewsForTopic() {
    let searchTerm = document.getElementById('search_term').value;
    let outputSpan = document.getElementById('output');

    outputSpan.innerHTML = "<h2>Results for " + searchTerm + "</h2>";

    searchTerm = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);

    console.log(searchTerm);

    fetch(`https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/de.wikipedia/all-access/all-agents/${searchTerm}/daily/20220901/20221001`)
        .then((response) => response.json())
        .then((data) => {
            const dataArray = data.items;
            dataArray.forEach((dayData) => {
                const dateData = dayData.timestamp;
                const year = dateData.slice(0,4);
                const month = dateData.slice(4,6);
                const day = dateData.slice(6,8);
                const dateString = `${year}-${month}-${day}`;

                outputSpan.innerHTML += dateString + ":&nbsp;&nbsp;";
                outputSpan.innerHTML += dayData.views + "<br>";
            });
        });
}

window.onload = start;
