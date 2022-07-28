function Product({ product: { name, img, price }, addToCart }) {
  return (
    <div className="d-inline-block border border-dark rounded m-2 p-3">
      <img src={img} width="200" height="200" alt="product" />
      <h4 className="m-0 mt-2">{name}</h4>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <h4 className="m-0">{price} грн</h4>
        <button className="btn btn-outline-primary" onClick={addToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Product;
