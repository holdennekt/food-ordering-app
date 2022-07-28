function OrderProducts({ products }) {
  return (
    <div
      className="p-2 d-flex flex-grow-1 border border-dark rounded-2 overflow-auto"
      style={{ whiteSpace: "nowrap" }}
    >
      {products.map(({ product, count }) => (
        <div className="d-flex flex-column mx-1 p-2 border border-dark rounded-2" key={product.id}>
          <img className="align-self-center" src={product.img} width={100} height={100} alt="product" />
          <p className="m-0 fs-6">{product.name} x {count}</p>
          <div className="d-flex flex-row-reverse">
            <p className="m-0">{product.price} грн</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderProducts;
