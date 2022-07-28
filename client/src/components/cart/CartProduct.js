function CartProduct({
  product: { img, name, description, price, count },
  setCount,
}) {
  return (
    <div className="d-flex border border-dark rounded m-2 p-3">
      <img src={img} width="200" height="200" alt="product" />
      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <h4 className="m-0 mt-1">{name}</h4>
        <h6 className="m-0 mt-1">{description}</h6>
        <h4 className="m-0 mt-1">{price} грн</h4>
        <input
          className="text-center mt-1"
          type={"number"}
          min={0}
          onWheel={(e) => e.target.blur()}
          onChange={(e) => setCount(parseInt(e.target.value))}
          value={count}
        />
      </div>
    </div>
  );
}

export default CartProduct;
