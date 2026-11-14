import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, updateCartCount } from './utils.mjs';

loadHeaderFooter();
updateCartCount();

const dataSource = new ExternalServices('tents');
const productList = new ProductList(
  'tents',
  dataSource,
  document.querySelector('.product-list'),
); 


productList.init();