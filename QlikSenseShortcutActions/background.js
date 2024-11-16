function handleCommand(command) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const tabId = tabs[0].id;
        if (command === "export_app") {
            chrome.tabs.sendMessage(tabId, {action: "export"});
        } else if (command === "duplicate_app") {
            chrome.tabs.sendMessage(tabId, {action: "duplicate"});
        } else if (command === "reload_app") {
            chrome.tabs.sendMessage(tabId, {action: "reload"});
        }
    });
}

chrome.commands.onCommand.addListener(handleCommand);
