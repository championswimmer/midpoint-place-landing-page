// Theme switching based on system preference

// Get CSS root element to manipulate CSS variables
const root = document.documentElement;

// Function to set color scheme based on user's system preference
function setColorScheme() {
  // Check if the user prefers dark mode
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Update the data attribute on the document root
  document.documentElement.setAttribute('data-theme', prefersDarkMode ? 'dark' : 'light');
  
  // Update the logo based on theme
  const logoImg = document.getElementById('logo-img');
  if (logoImg) {
    logoImg.src = prefersDarkMode ? 'images/logo-white.svg' : 'images/logo.svg';
  }
  
  // Set --color-bg-rgb variable for header transparency
  if (prefersDarkMode) {
    root.style.setProperty('--color-bg-rgb', '17, 24, 39');
  } else {
    root.style.setProperty('--color-bg-rgb', '255, 255, 255');
  }
  
  // Set --color-accent-rgb variable for pulse animation
  root.style.setProperty('--color-accent-rgb', prefersDarkMode ? '64, 245, 213' : '54, 226, 195');
}

// Set the initial color scheme
setColorScheme();

// Listen for changes to the user's preferred color scheme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setColorScheme);