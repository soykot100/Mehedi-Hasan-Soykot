// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.querySelector('#contactForm button[type="submit"]');

  contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      
      try {
          const formData = {
              name: document.getElementById('name').value,
              email: document.getElementById('email').value,
              message: document.getElementById('message').value
          };
          
          // Validate inputs
          if (!formData.name || !formData.email || !formData.message) {
              throw new Error('Please fill in all fields');
          }
          
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
              throw new Error('Please enter a valid email address');
          }
          
          // Simulate sending to a server (replace with actual API call)
          await simulateServerCall(formData);
          
          // Show success message
          showMessage('success', `Thank you, ${formData.name}! Your message has been sent successfully.`);
          
          // Reset form
          contactForm.reset();
      } catch (error) {
          showMessage('error', error.message);
      } finally {
          // Reset button state
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Send Message';
      }
  });

  // Helper function to simulate server call
  function simulateServerCall(data) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              // In a real app, this would be a fetch() call to your backend
              console.log('Message data:', data);
              resolve();
          }, 1500);
      });
  }

  // Helper function to show messages
  function showMessage(type, text) {
      // Remove any existing messages
      const existingMsg = document.querySelector('.form-message');
      if (existingMsg) existingMsg.remove();
      
      // Create message element
      const msg = document.createElement('div');
      msg.className = `form-message form-message-${type}`;
      msg.textContent = text;
      
      // Insert before the submit button
      submitBtn.parentNode.insertBefore(msg, submitBtn);
      
      // Auto remove after 5 seconds
      setTimeout(() => {
          msg.remove();
      }, 5000);
  }
});