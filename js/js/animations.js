function initDemoAnimation() {
  const demoElement = document.getElementById('demo-animation');
  
  if (!demoElement) return;
  
  // Demo animation elements
  const user1 = document.getElementById('demo-user-1');
  const user2 = document.getElementById('demo-user-2');
  const user3 = document.getElementById('demo-user-3');
  const midpoint = document.querySelector('.demo-midpoint');
  const radius = document.querySelector('.demo-radius');
  const venue1 = document.getElementById('demo-venue-1');
  const venue2 = document.getElementById('demo-venue-2');
  const venue3 = document.getElementById('demo-venue-3');
  const venue4 = document.getElementById('demo-venue-4');
  const vote = document.querySelector('.demo-vote');

  // Set initial positions
  if (user1) {
    user1.style.top = '30%';
    user1.style.left = '20%';
    user1.style.borderRadius = '50%';
  }
  
  if (user2) {
    user2.style.top = '60%';
    user2.style.left = '70%';
    user2.style.borderRadius = '50%';
  }
  
  if (user3) {
    user3.style.top = '20%';
    user3.style.left = '60%';
    user3.style.borderRadius = '50%';
  }
  
  if (midpoint) {
    midpoint.style.top = '40%';
    midpoint.style.left = '50%';
  }
  
  if (radius) {
    radius.style.top = '40%';
    radius.style.left = '50%';
  }
  
  if (venue1) {
    venue1.style.top = '35%';
    venue1.style.left = '45%';
  }
  
  if (venue2) {
    venue2.style.top = '40%';
    venue2.style.left = '55%';
  }
  
  if (venue3) {
    venue3.style.top = '45%';
    venue3.style.left = '48%';
  }
  
  if (venue4) {
    venue4.style.top = '38%';
    venue4.style.left = '52%';
  }
  
  if (vote) {
    vote.style.top = '40%';
    vote.style.left = '55%';
  }

  // Function to run the animation sequence
  function runDemoAnimation() {
    // Step 1: Show users
    setTimeout(() => {
      if (user1) { user1.style.opacity = '1'; }
    }, 500);
    
    setTimeout(() => {
      if (user2) { user2.style.opacity = '1'; }
    }, 1000);
    
    setTimeout(() => {
      if (user3) { user3.style.opacity = '1'; }
    }, 1500);
    
    // Step 2: Calculate midpoint
    setTimeout(() => {
      if (midpoint) { 
        midpoint.style.opacity = '1';
        midpoint.classList.add('pulse');
      }
    }, 2000);
    
    setTimeout(() => {
      if (radius) { radius.style.opacity = '0.7'; }
    }, 2300);
    
    // Step 3: Show venues
    setTimeout(() => {
      if (venue1) { 
        venue1.style.opacity = '1';
        venue1.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    }, 3000);
    
    setTimeout(() => {
      if (venue2) { 
        venue2.style.opacity = '1';
        venue2.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    }, 3200);
    
    setTimeout(() => {
      if (venue3) { 
        venue3.style.opacity = '1';
        venue3.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    }, 3400);
    
    setTimeout(() => {
      if (venue4) { 
        venue4.style.opacity = '1';
        venue4.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    }, 3600);
    
    // Step 4: Show vote result
    setTimeout(() => {
      if (venue2) { venue2.style.boxShadow = '0 0 0 3px var(--color-success)'; }
    }, 4000);
    
    setTimeout(() => {
      if (vote) { 
        vote.style.opacity = '1';
        vote.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    }, 4300);
    
    // Reset animation
    setTimeout(() => {
      // Hide all elements
      if (user1) { user1.style.opacity = '0'; }
      if (user2) { user2.style.opacity = '0'; }
      if (user3) { user3.style.opacity = '0'; }
      if (midpoint) { 
        midpoint.style.opacity = '0';
        midpoint.classList.remove('pulse');
      }
      if (radius) { radius.style.opacity = '0'; }
      if (venue1) { 
        venue1.style.opacity = '0';
        venue1.style.transform = 'translate(-50%, -50%) scale(0)';
      }
      if (venue2) { 
        venue2.style.opacity = '0';
        venue2.style.transform = 'translate(-50%, -50%) scale(0)';
        venue2.style.boxShadow = 'none';
      }
      if (venue3) { 
        venue3.style.opacity = '0';
        venue3.style.transform = 'translate(-50%, -50%) scale(0)';
      }
      if (venue4) { 
        venue4.style.opacity = '0';
        venue4.style.transform = 'translate(-50%, -50%) scale(0)';
      }
      if (vote) { 
        vote.style.opacity = '0';
        vote.style.transform = 'translate(-50%, -50%) scale(0)';
      }
      
      // Restart animation
      setTimeout(runDemoAnimation, 1000);
    }, 6000);
  }

  // Start the animation when the demo section is in view
  const demoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runDemoAnimation();
      }
    });
  }, {
    threshold: 0.5
  });
  
  demoObserver.observe(demoElement);

  // Also start the animation when the "Try Demo" button is clicked
  const demoButton = document.querySelector('.demo .btn-primary');
  if (demoButton) {
    demoButton.addEventListener('click', () => {
      // Reset and restart animation
      if (user1) { user1.style.opacity = '0'; }
      if (user2) { user2.style.opacity = '0'; }
      if (user3) { user3.style.opacity = '0'; }
      if (midpoint) { 
        midpoint.style.opacity = '0';
        midpoint.classList.remove('pulse');
      }
      if (radius) { radius.style.opacity = '0'; }
      if (venue1) { 
        venue1.style.opacity = '0';
        venue1.style.transform = 'translate(-50%, -50%) scale(0)';
      }
      if (venue2) { 
        venue2.style.opacity = '0';
        venue2.style.transform = 'translate(-50%, -50%) scale(0)';
        venue2.style.boxShadow = 'none';
      }
      if (venue3) { 
        venue3.style.opacity = '0';
        venue3.style.transform = 'translate(-50%, -50%) scale(0)';
      }
      if (venue4) { 
        venue4.style.opacity = '0';
        venue4.style.transform = 'translate(-50%, -50%) scale(0)';
      }
      if (vote) { 
        vote.style.opacity = '0';
        vote.style.transform = 'translate(-50%, -50%) scale(0)';
      }
      
      setTimeout(runDemoAnimation, 500);
      handleWaitlistFormSubmission();
    });
  }
}

// Map illustration animation in hero section
document.addEventListener('DOMContentLoaded', function() {
  const midpointMarker = document.querySelector('.midpoint-marker');
  if (midpointMarker) {
    midpointMarker.classList.add('pulse');
  }
});
