import { getParam, loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';
import { updateCartCount } from './utils.mjs';

loadHeaderFooter();
updateCartCount();

const dataSource = new ExternalServices('tents');
const productId = getParam('product');
const product = new ProductDetails(productId, dataSource);
product.init();
