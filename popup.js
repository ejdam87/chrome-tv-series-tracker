function render() {
    chrome.storage.local.get(["seriesData"], (result) => {
        const data = result.seriesData || {};
        const list = document.getElementById("list");

        list.innerHTML = "";

        Object.keys(data).forEach((series) => {
            const div = document.createElement("div");
            div.textContent = `${series}: S${data[series].season}E${data[series].episode}`;
            list.appendChild(div);
        });
    });
}

render();

document.getElementById("openOptions").onclick = () => {
    chrome.runtime.openOptionsPage();
};
