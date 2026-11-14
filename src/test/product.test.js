describe('ProductDetails', () => {
  const createElement = () => ({
    innerHTML: '',
    textContent: '',
  });

  beforeEach(() => {
    const elements = {
      productDetail: createElement(),
      productStatus: createElement(),
    };

    global.document = {
      getElementById: jest.fn((id) => elements[id] || null),
    };
  });

  test('renders a discount when the suggested retail price is higher than the final price', async () => {
    const { default: ProductDetails } = await import('../js/ProductDetails.mjs');
    const product = {
      Brand: { Name: 'North Face' },
      NameWithoutBrand: 'Talus 4-Person Tent',
      Name: 'Talus 4-Person Tent',
      Image: 'tent.jpg',
      FinalPrice: 99.99,
      SuggestedRetailPrice: 149.99,
      Colors: [{ ColorName: 'Golden Oak' }],
      DescriptionHtmlSimple: '<p>Great for family camping.</p>',
    };

    const productDetails = new ProductDetails('tent', null);
    productDetails.product = product;

    productDetails.renderProductDetails();

    expect(document.getElementById('productDetail').innerHTML).toContain('Save $50.00');
    expect(document.getElementById('productDetail').innerHTML).toContain('33% off');
    expect(document.getElementById('productDetail').innerHTML).toContain('Was <s>$149.99</s>');
  });
});
