function load() {
    chrome.storage.local.get(["seriesData"], (result) => {
        const data = result.seriesData || {};

        const list = document.getElementById("list");
        list.innerHTML = "";

        Object.entries(data).forEach(([name, val]) => {
            const row = document.createElement("div");

            row.innerHTML = `
            <b>${name}</b> - S${val.season}E${val.episode}
            <button data-name="${name}">Edit</button>
            <button data-del="${name}">Delete</button>
            `;

            // DELETE
            row.querySelector("[data-del]").onclick = (e) => {
                delete data[e.target.dataset.del];
                chrome.storage.local.set({ seriesData: data }, load);
            };

            // EDIT (NEW)
            row.querySelector("[data-name]").onclick = (e) => {
                const key = e.target.dataset.name;

                document.getElementById("name").value = key;
                document.getElementById("season").value = data[key].season;
                document.getElementById("episode").value = data[key].episode;
                document.getElementById("url").value =
                    (data[key].urlPatterns || []).join(",");
            };

            list.appendChild(row);
        });
    });
}

document.getElementById("add").onclick = () => {
    const name = document.getElementById("name").value;
    const season = parseInt(document.getElementById("season").value);
    const episode = parseInt(document.getElementById("episode").value);
    const url = document.getElementById("url").value.split(",");

    chrome.storage.local.get(["seriesData"], (result) => {
        const data = result.seriesData || {};
        data[name] = { season, episode, urlPatterns: url };
        chrome.storage.local.set({ seriesData: data }, load);
    });
};

load();
