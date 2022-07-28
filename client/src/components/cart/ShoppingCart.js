import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CartProduct from "./CartProduct";
import useLocalStorage from "../../hooks/useLocalStorage";
import ClientData from "./ClientData";
import config from "../../config.json";
import MyToasts from "../NotificationToasts";

function ShoppingCart({ cart, setCart }) {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailureToast, setShowFailureToast] = useState(false);
  const [name, setName] = useLocalStorage("name", "");
  const [email, setEmail] = useLocalStorage("email", "");
  const [phoneNumber, setPhoneNumber] = useLocalStorage("phoneNumber", "");
  const [adress, setAdress] = useLocalStorage("adress", "");
  const [err, setErr] = useState({});

  const setCount = (product, count) => {
    setCart((prevCart) =>
      prevCart.map((val) => (product.id === val.id ? { ...val, count } : val))
    );
  };

  useEffect(() => {
    setErr((prevErr) => ({ ...prevErr, name: undefined }));
  }, [name]);

  useEffect(() => {
    setErr((prevErr) => ({ ...prevErr, email: undefined }));
  }, [email]);

  useEffect(() => {
    setErr((prevErr) => ({ ...prevErr, phoneNumber: undefined }));
  }, [phoneNumber]);

  useEffect(() => {
    setErr((prevErr) => ({ ...prevErr, adress: undefined }));
  }, [adress]);

  const totalPrice = cart.reduce((acc, val) => acc + val.count * val.price, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr({});
    if (!name)
      setErr((prevErr) => ({
        ...prevErr,
        name: "Name field cannot be empty.",
      }));
    const emailRegExp = new RegExp(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    );
    const isEmailValid = emailRegExp.test(email.toLowerCase());
    if (email && !isEmailValid) {
      setErr((prevErr) => ({
        ...prevErr,
        email: "Wrong email. Provide correct one or leave field empty",
      }));
    }
    if (phoneNumber.length !== 12)
      setErr((prevErr) => ({
        ...prevErr,
        phoneNumber: "Please provide existing number to contact to.",
      }));
    if (!adress)
      setErr((prevErr) => ({
        ...prevErr,
        adress: "Adress field cannot be empty.",
      }));
    if (
      name &&
      phoneNumber.length === 12 &&
      (isEmailValid || !email) &&
      adress
    ) {
      fetch(config.API_BASEURL + "/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: name,
          email,
          phoneNumber,
          adress,
          products: cart,
          price: totalPrice,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          setShowSuccessToast(true);
          setCart([]);
        })
        .catch((err) => {
          setShowFailureToast(true);
          setErr((prevErr) => ({ ...prevErr, post: err.message }));
        });
    }
    window.scrollTo(0, 0);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row className="my-2">
          <Col md={4} className="mb-2">
            <ClientData
              props={{
                name,
                setName,
                email,
                setEmail,
                phoneNumber,
                setPhoneNumber,
                adress,
                setAdress,
                err,
              }}
            />
          </Col>
          <Col md={8} className="mb-2">
            {cart.length > 0 ? (
              <div className="p-3 border border-dark rounded-2">
                {cart.map((product) => (
                  <CartProduct
                    key={product.id}
                    product={product}
                    setCount={(count) => setCount(product, count)}
                  />
                ))}
                <div className="d-flex justify-content-between mt-3 px-2">
                  <p className="m-0 fs-4">Total price: {totalPrice} грн</p>
                  <Button type={"submit"}>Submit</Button>
                </div>
              </div>
            ) : (
              <div className="h-100 d-flex justify-content-center align-items-center border border-dark rounded-2">
                <div className="fs-3">Shopping cart is empty</div>
              </div>
            )}
          </Col>
        </Row>
      </Form>
      <MyToasts
        props={{
          showSuccessToast,
          setShowSuccessToast,
          succesText: "Your order was sent to the manager",
          showFailureToast,
          setShowFailureToast,
          err,
        }}
      />
    </Container>
  );
}

export default ShoppingCart;
