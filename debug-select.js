// Debug script to check Select component values
console.log('=== DEBUGGING SELECT COMPONENTS ===');

// Check all Select components on page
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const selects = document.querySelectorAll('[data-radix-select-trigger]');
    console.log(`Found ${selects.length} Select components`);
    
    selects.forEach((select, index) => {
      const value = select.getAttribute('data-value') || select.getAttribute('value') || 'NO_VALUE';
      const placeholder = select.getAttribute('data-placeholder') || 'NO_PLACEHOLDER';
      console.log(`Select ${index + 1}: value="${value}", placeholder="${placeholder}"`);
      
      // Check if value is empty string
      if (value === '' || value === 'undefined' || value === 'null') {
        console.error(`❌ Select ${index + 1} has invalid value: "${value}"`);
      } else {
        console.log(`✅ Select ${index + 1} has valid value: "${value}"`);
      }
    });
  }, 1000);
});