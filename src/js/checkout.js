import CheckoutProcess from './CheckoutProcess.mjs';
import { loadHeaderFooter, updateCartCount } from './utils.mjs';

loadHeaderFooter();

const checkout = new CheckoutProcess('so-cart', '.checkout-summary');
const form = document.querySelector('#checkout-form');
const zipInput = document.querySelector('#zip');
const submitButton = document.querySelector('#checkout-submit');
const message = document.querySelector('#checkout-message');

checkout.init();
updateCartCount();

if (zipInput) {
  zipInput.addEventListener('change', () => {
    if (zipInput.value.trim()) {
      checkout.calculateOrderTotal();
    } else {
      checkout.resetOrderTotals();
    }
  });
}

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    checkout.calculateOrderTotal();
    if (submitButton) {
      submitButton.disabled = true;
    }
    if (message) {
      message.textContent = 'Submitting your order...';
    }

    try {
      await checkout.checkout(form);
      localStorage.removeItem('so-cart');
      updateCartCount();
      if (message) {
        message.textContent = 'Your order was submitted successfully.';
      }
    } catch (error) {
      if (message) {
        message.textContent = `Unable to submit your order: ${error.message}`;
      }
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}
