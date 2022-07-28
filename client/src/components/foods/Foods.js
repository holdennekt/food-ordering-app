import { useEffect, useRef, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import MarketsList from "./MarketsList";
import Product from "./Product";
import config from "../../config.json";
import MyToasts from "../NotificationToasts";

function Foods({ cart, setCart }) {
  const marketsRef = useRef([]);
  const [selectedMarket, setSelectedMarket] = useState({ productItems: [] });
  const [err, setErr] = useState("");

  const [failureText, setFailureText] = useState("");
  const [showFailureToast, setShowFailureToast] = useState(false);

  useEffect(() => {
    fetch(config.API_BASEURL + "/markets")
      .then((res) => {
        if (res.status === 500) throw new Error("Internal server error");
        return res.json();
      })
      .then((markets) => {
        if (markets.length > 0) {
          marketsRef.current = markets;
          setSelectedMarket(marketsRef.current[0]);
        } else setErr("No data");
      })
      .catch((err) => setErr(err.message));
  }, []);

  const addToCart = (product) => {
    if (cart[0] && cart[0].marketId !== product.marketId) {
      setFailureText("Products only from same market allowed");
      return setShowFailureToast(true);
    }
    const cartProduct = cart.find((val) => val.id === product.id);
    if (cartProduct) {
      setCart((prevCart) =>
        prevCart.map((val) =>
          cartProduct.id === val.id ? { ...val, count: val.count + 1 } : val
        )
      );
    } else setCart((prevCart) => [...prevCart, { ...product, count: 1 }]);
  };

  return (
    <Container>
      <Row className="my-2">
        <Col md={3} className="mb-2">
          <div className="p-3 d-flex flex-column border border-dark rounded-2">
            <p className="m-0 text-center">Shops:</p>
            {err ? (
              <p className="text-danger text-center m-0 my-2">
                Cannot fetch shops: {err}
              </p>
            ) : marketsRef.current.length > 0 ? (
              <MarketsList
                markets={marketsRef.current}
                selectedMarket={selectedMarket}
                setSelectedMarket={setSelectedMarket}
              />
            ) : (
              <Spinner
                className="align-self-center mt-2"
                animation="border"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </div>
        </Col>
        <Col md={9} className="mb-2">
          {err ? (
            <div className="p-2 h-100 d-flex justify-content-center align-items-center border border-dark rounded-2">
              <p className="text-danger text-center m-0 my-2">
                Cannot fetch products: {err}
              </p>
            </div>
          ) : selectedMarket.productItems.length > 0 ? (
            <div className="p-2 border border-dark rounded-2">
              {selectedMarket.productItems.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  addToCart={() => addToCart(product)}
                />
              ))}
            </div>
          ) : (
            <div className="p-2 h-100 d-flex justify-content-center align-items-center border border-dark rounded-2">
              <Spinner
                className="align-self-center mt-2"
                animation="border"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
        </Col>
      </Row>
      <MyToasts
        props={{
          succesText: "",
          showSuccessToast: false,
          setShowSuccessToast: () => {},
          failureText,
          showFailureToast,
          setShowFailureToast,
        }}
      />
    </Container>
  );
}

export default Foods;
