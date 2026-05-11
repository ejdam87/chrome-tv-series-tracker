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
            div.appendChild(spacer);
            div.appendChild(a);
            list.appendChild(div);
        });
    });
}

render();

document.getElementById("openOptions").onclick = () => {
    chrome.runtime.openOptionsPage();
};
