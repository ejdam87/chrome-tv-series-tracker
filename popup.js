function render() {
    chrome.storage.local.get(["seriesData"], (result) => {
        const data = result.seriesData || {};
        const list = document.getElementById("list");

        list.innerHTML = "";

        Object.keys(data).forEach((series) => {
            const div = document.createElement("div");
            div.textContent = `${series}: S${data[series].season}E${data[series].episode}`;
            const a = document.createElement("a");
            a.textContent = "(Open)";
            a.href = data[series].urlPatterns[0];
            a.target = "_blank";
            const spacer = document.createTextNode(" ");

            const nextBtn = document.createElement("button");
            nextBtn.innerText = "Increment Next Episode";

            const lastBtn = document.createElement("button");
            lastBtn.innerText = "The Last Episode of Series";

            nextBtn.onclick = () => {
                chrome.runtime.sendMessage({
                    type: "INCREMENT_EPISODE",
                    series
                });
                setTimeout(render, 100);
            };

            lastBtn.onclick = () => {
                chrome.runtime.sendMessage({
                    type: "LAST_EPISODE",
                    series
                });
                setTimeout(render, 100);
            };

            list.append(document.createElement("hr"))
            div.appendChild(spacer);
            div.appendChild(a);
            list.appendChild(div);
            list.append(nextBtn);
            list.append(lastBtn);
            list.append(document.createElement("hr"))

        });
    });
}

render();

document.getElementById("openOptions").onclick = () => {
    chrome.runtime.openOptionsPage();
};
