import { useCallback } from "react";
import { Button } from "react-bootstrap";
import config from "../../config.json";
import OrderClient from "./OrderClient";
import OrderProducts from "./OrderProducts";

function ActiveOrders({
  token,
  orders,
  setOrders,
  COMPLETED_ORDERS_LIMIT,
  setCompletedOrders,
  setTotalCompletedOrders,
  err,
  appearSuccesToast,
  appearFailureToast,
}) {
  const markOrderCompleted = useCallback(
    async (orderId) => {
      const headers = { authorization: `Bearer ${token}` };
      await fetch(config.API_BASEURL + `/orders/${orderId}`, {
        method: "PATCH",
        headers,
      })
        .then((res) => {
          if (res.status === 500) throw new Error("Internal server error");
          return res.json();
        })
        .then(([affectedRows, markedOrder]) => {
          if (affectedRows !== 0) {
            setOrders((prevOrders) =>
              prevOrders.filter((order) => order.id !== markedOrder.id)
            );
            setTotalCompletedOrders((prevTotal) => prevTotal + 1);
            setCompletedOrders((prevOrders) => {
              if (prevOrders.length < COMPLETED_ORDERS_LIMIT)
                return [...prevOrders, markedOrder];
              else return prevOrders;
            });
            appearSuccesToast("Order was successfully completed");
          } else
            appearFailureToast(
              "order seems to be already completed, try to reload the page"
            );
        })
        .catch((err) => appearFailureToast(err.message));
    },
    [
      token,
      setOrders,
      appearSuccesToast,
      appearFailureToast,
      COMPLETED_ORDERS_LIMIT,
      setCompletedOrders,
      setTotalCompletedOrders,
    ]
  );

  return (
    <>
      {err ? (
        <div>{err}</div>
      ) : orders.length > 0 ? (
        orders.map((order) => (
          <div className="my-2 p-2 border border-dark rounded-2" key={order.id}>
            <div className="d-flex">
              <div className="p-2">
                <OrderClient
                  name={order.clientName}
                  email={order.clientEmail}
                  phoneNumber={order.clientPhoneNumber}
                  adress={order.clientAdress}
                />
              </div>
              <OrderProducts products={order.products} />
            </div>
            <div className="d-flex justify-content-between mt-2 p-2">
              <p className="m-0 fs-3">{order.price} грн</p>
              <Button
                variant={"primary"}
                onClick={() => markOrderCompleted(order.id)}
              >
                Complete
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p className="m-0 fs-3 text-center">No active orders{"("}</p>
      )}
    </>
  );
}

export default ActiveOrders;
