// content.js

// Function to click on the "More actions" button then find the target element by its text
function clickButtonByText(buttonText) {
    const moreActionsButton = document.querySelector('#qmc\\.actionbar\\.more button');
  
    if (moreActionsButton) {
      moreActionsButton.click();
      console.log("Clicked on More actions button");
  
      // Wait a longer time to ensure the menu is fully loaded
      setTimeout(() => {
        const actionsContainer = document.querySelector('div.content');
        
        if (actionsContainer) {
          // List all <a> elements present in the container to diagnose
          const links = actionsContainer.querySelectorAll('a');
          console.log("Links found in actions container:", links);
  
          // Find target element by text
          let found = false;
          links.forEach(link => {
            if (link.innerText.trim() === buttonText) {
              // Simulate click with full event
              found = true;
              console.log(`Found and clicking link with text: ${buttonText}`);
              link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
            }
          });
  
          if (!found) {
            console.error(`No link with text "${buttonText}" found in actions container.`);
          }
        } else {
          console.error("Actions container not found.");
        }
  
      }, 100);  // 100ms delay to ensure menu loads completely
    } else {
      console.error('More actions button not found.');
    }
  }
  
  // Listen to messages sent by background.js
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "export") {
      clickButtonByText("Export");
    } else if (message.action === "duplicate") {
      clickButtonByText("Duplicate");
    } else if (message.action === "reload") {
      clickButtonByText("Reload now");
    }
  });
  