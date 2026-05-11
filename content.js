function showPopup(series) {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,0.6)";
    overlay.style.zIndex = 999999;
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";

    const box = document.createElement("div");
    box.style.background = "white";
    box.style.padding = "20px";
    box.style.borderRadius = "10px";
    box.style.textAlign = "center";

    const title = document.createElement("h3");
    title.innerText = `Detected ${series}`;

    const nextBtn = document.createElement("button");
    nextBtn.innerText = "Next Episode";

    const lastBtn = document.createElement("button");
    lastBtn.innerText = "Last Episode of Series";

    const cancelBtn = document.createElement("button");
    cancelBtn.innerText = "Cancel";

    nextBtn.onclick = () => {
        chrome.runtime.sendMessage({
            type: "INCREMENT_EPISODE",
            series
        });
        document.body.removeChild(overlay);
    };

    lastBtn.onclick = () => {
        chrome.runtime.sendMessage({
            type: "LAST_EPISODE",
            series
        });
        document.body.removeChild(overlay);
    };

    cancelBtn.onclick = () => {
        document.body.removeChild(overlay);
    };

    box.appendChild(title);
    box.appendChild(nextBtn);
    box.appendChild(lastBtn);
    box.appendChild(cancelBtn);
    overlay.appendChild(box);

    document.body.appendChild(overlay);
}


function matchSeries(url, seriesData) {
    for (const series in seriesData) {
        const entry = seriesData[series];

        if (entry.urlPatterns) {
            for (const pattern of entry.urlPatterns) {
            if (url.includes(pattern)) {
                return series;
            }
            }
        }
    }
    return null;
}


chrome.storage.local.get(["seriesData"], (result) => {
    const data = result.seriesData || {};
    const matchedSeries = matchSeries(window.location.href, data);

    if (matchedSeries) {
        showPopup(matchedSeries);
    }
});
