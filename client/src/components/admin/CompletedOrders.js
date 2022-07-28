import { useCallback, useEffect, useState } from "react";
import OrdersPagination from "./OrdersParination";
import config from "../../config.json";
import OrderClient from "./OrderClient";
import OrderProducts from "./OrderProducts";

function CompletedOrders({
  token,
  orders,
  setOrders,
  totalOrders,
  setTotalOrders,
  ORDERS_LIMIT,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [err, setErr] = useState("");

  const fetchOrdersByPage = useCallback(
    (page) => {
      const headers = { authorization: `Bearer ${token}` };
      fetch(
        config.API_BASEURL +
          `/orders/completed?page=${page}&limit=${ORDERS_LIMIT}`,
        {
          headers,
        }
      )
        .then((res) => {
          if (res.status === 500) throw new Error("Internal server error");
          return res.json();
        })
        .then(({ count, rows }) => {
          setOrders(rows);
          setTotalOrders(count);
        })
        .catch((err) => setErr(err.message));
    },
    [token, ORDERS_LIMIT, setOrders, setTotalOrders]
  );

  useEffect(() => {
    fetchOrdersByPage(currentPage);
  }, [currentPage, fetchOrdersByPage]);

  const changePage = useCallback(
    (page) => {
      if (page === currentPage) return;
      setCurrentPage(page);
    },
    [currentPage, setCurrentPage]
  );

  return (
    <>
      {err ? (
        <div>{err}</div>
      ) : (
        orders.map((order) => (
          <div
            className="d-flex my-2 p-2 border border-dark rounded-2"
            key={order.id}
          >
            <div className="p-2">
              <OrderClient
                name={order.clientName}
                email={order.clientEmail}
                phoneNumber={order.clientPhoneNumber}
                adress={order.clientAdress}
              />
              <p className="m-0 pt-2 fs-3">{order.price} грн</p>
            </div>
            <OrderProducts products={order.products} />
          </div>
        ))
      )}
      <OrdersPagination
        props={{
          currentPage,
          totalOrders,
          ORDERS_LIMIT,
          changePage,
        }}
      />
    </>
  );
}

export default CompletedOrders;
