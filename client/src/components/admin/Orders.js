import { useEffect, useRef, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router";
import { io } from "socket.io-client";
import config from "../../config.json";
import useLocalStorage from "../../hooks/useLocalStorage";
import MyToasts from "../NotificationToasts";
import ActiveOrders from "./ActiveOrders";
import CompletedOrders from "./CompletedOrders";

function Orders() {
  const [token, setToken] = useLocalStorage("token", "");
  const socketRef = useRef(null);
  const navigate = useNavigate();

  const [key, setKey] = useState("active");
  const [activeOrders, setActiveOrders] = useState([]);
  const [fetchErr, setFetchErr] = useState("");

  const [completedOrders, setCompletedOrders] = useState([]);
  const [totalCompletedOrders, setTotalCompletedOrders] = useState(0);
  const COMPLETED_ORDERS_LIMIT = 5;

  const [succesText, setSuccesText] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const appearSuccesToast = (succesText) => {
    setSuccesText(succesText);
    setShowSuccessToast(true);
  };
  const [failureText, setFailureText] = useState("");
  const [showFailureToast, setShowFailureToast] = useState(false);
  const appearFailureToast = (failureText) => {
    setFailureText(failureText);
    setShowFailureToast(true);
  };

  useEffect(() => {
    if (!token) return;
    const headers = { authorization: `Bearer ${token}` };
    fetch(config.API_BASEURL + "/orders/active", { headers })
      .then((res) => res.json())
      .then((orders) => setActiveOrders(orders))
      .catch((err) => setFetchErr(err.message));
  }, [token]);

  useEffect(() => {
    socketRef.current = io(config.WS_BASEURL, { auth: { token } });

    socketRef.current.onAny(console.log);

    socketRef.current.on("authError", () => {
      setToken("");
      navigate("/admin/login");
    });

    socketRef.current.on("order", (order) =>
      setActiveOrders((prevOrders) => [...prevOrders, order])
    );

    return () => socketRef.current.disconnect();
  }, [navigate, token, setToken]);

  return (
    <Container className="p-3 border border-dark rounded-2">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="active" title="Active">
          <ActiveOrders
            token={token}
            orders={activeOrders}
            setOrders={setActiveOrders}
            COMPLETED_ORDERS_LIMIT={COMPLETED_ORDERS_LIMIT}
            setCompletedOrders={setCompletedOrders}
            setTotalCompletedOrders={setTotalCompletedOrders}
            err={fetchErr}
            appearSuccesToast={appearSuccesToast}
            appearFailureToast={appearFailureToast}
          />
        </Tab>
        <Tab eventKey="completed" title="Completed">
          <CompletedOrders
            token={token}
            orders={completedOrders}
            setOrders={setCompletedOrders}
            totalOrders={totalCompletedOrders}
            setTotalOrders={setTotalCompletedOrders}
            ORDERS_LIMIT={COMPLETED_ORDERS_LIMIT}
          />
        </Tab>
      </Tabs>
      <MyToasts
        props={{
          succesText: succesText,
          showSuccessToast,
          setShowSuccessToast,
          failureText: failureText,
          showFailureToast,
          setShowFailureToast,
        }}
      />
    </Container>
  );
}

export default Orders;
