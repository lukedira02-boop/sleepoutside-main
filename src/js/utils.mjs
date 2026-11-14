// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false,
) {
  if (clear) {
    parentElement.innerHTML = '';
  }

  const html = list.map(templateFn).join('');
  parentElement.insertAdjacentHTML(position, html);
}

export function renderWithTemplate(template, parentElement, data, callback) {
  if (!parentElement) {
    return;
  }

  parentElement.innerHTML = template;

  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load template: ${path}`);
  }

  return response.text();
}

export async function loadHeaderFooter() {
  const headerElement = document.querySelector('#main-header');
  const footerElement = document.querySelector('#main-footer');

  if (!headerElement && !footerElement) {
    return;
  }

  if (headerElement) {
    const headerTemplate = await loadTemplate('/partials/header.html');
    renderWithTemplate(headerTemplate, headerElement, null, updateCartCount);
  }

  if (footerElement) {
    const footerTemplate = await loadTemplate('/partials/footer.html');
    renderWithTemplate(footerTemplate, footerElement);
  }
}

// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function getCartItems() {
  const cartItems = getLocalStorage('so-cart');
  if (Array.isArray(cartItems)) {
    return cartItems;
  }
  return cartItems ? [cartItems] : [];
}
export function updateCartCount() {
  const cartItems = getCartItems();
  const count = cartItems.reduce(
    (total, item) => total + (Number(item.quantity) || 1),
    0,
  );
  const cartLink = document.querySelector('.cart a');

  if (!cartLink) {
    return;
  }

  let badge = cartLink.querySelector('.cart-count');
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'cart-count';
    badge.setAttribute('aria-label', 'Cart item count');
    cartLink.appendChild(badge);
  }

  badge.textContent = String(count);
  badge.hidden = count === 0;
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}
