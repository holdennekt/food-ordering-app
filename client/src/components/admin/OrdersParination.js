import { Pagination } from "react-bootstrap";

function OrdersPagination({
  props: { currentPage, totalOrders, ORDERS_LIMIT, changePage },
}) {
  const paginationPages = [];
  const count = Math.ceil(totalOrders / ORDERS_LIMIT) || 1;
  for (let number = 1; number <= count; number++) {
    const page = (
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => changePage(number)}
      >
        {number}
      </Pagination.Item>
    );
    paginationPages.push(page);
  }

  return <Pagination className="m-0 mt-2">{paginationPages}</Pagination>;
}

export default OrdersPagination;
