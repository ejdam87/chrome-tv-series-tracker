chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "INCREMENT_EPISODE") {
        const { series } = msg;

        chrome.storage.local.get(["seriesData"], (result) => {
            const data = result.seriesData || {};

            if (!data[series]) return;

            data[series].episode += 1;

            chrome.storage.local.set({ seriesData: data }, () => {
            chrome.notifications.create({
                type: "basic",
                title: "Episode Updated",
                message: `${series} → Episode ${data[series].episode}`
            });
            });
        });
    }
    if (msg.type === "LAST_EPISODE") {
        const { series } = msg;

        chrome.storage.local.get(["seriesData"], (result) => {
            const data = result.seriesData || {};

            if (!data[series]) return;

            // move to next season, reset episode
            data[series].season += 1;
            data[series].episode = 1;

            chrome.storage.local.set({ seriesData: data }, () => {
            chrome.notifications.create({
                type: "basic",
                iconUrl: "icon.png",
                title: "New Season Started 🎬",
                message: `${series} → S${data[series].season}E1`
            });
            });
        });
    }
});
