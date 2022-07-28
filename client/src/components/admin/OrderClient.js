function OrderClient({ name, email, phoneNumber, adress }) {
  return (
    <div>
      <p className="m-0 fs-4">{name}</p>
      {email && <p className="m-0 fst-italic fw-lighter">{email}</p>}
      <p className="m-0 mt-2 fw-bolder">+{phoneNumber}</p>
      <p className="m-0 mt-2 fw-normal">Adress: {adress}</p>
    </div>
  );
}

export default OrderClient;
