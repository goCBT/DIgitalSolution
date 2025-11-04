// js/install.js

let deferredPrompt; // Variable to store the event

const installButton = document.getElementById('installButton');

// 1. Listen for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default browser prompt from showing immediately
  e.preventDefault();
  
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  
  // Show your custom install button/UI
  // The PWA is now ready to be installed!
  installButton.style.display = 'block';

  console.log('beforeinstallprompt fired and stored.');
});

// 2. Handle the click on your custom install button
installButton.addEventListener('click', async () => {
  // Hide your custom button/UI immediately
  installButton.style.display = 'none';

  if (deferredPrompt) {
    // Show the browser's native installation prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // Log the user's choice (e.g., 'accepted' or 'dismissed')
    console.log(`User response to the A2HS prompt: ${outcome}`);

    // We've used the prompt, so clear the variable
    deferredPrompt = null;
  }
});

// Optional: 3. Track successful installation
window.addEventListener('appinstalled', () => {
  console.log('PWA was successfully installed!');
  // You might hide any remaining install UI or show a thank you message
});