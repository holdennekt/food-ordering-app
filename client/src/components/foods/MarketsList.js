import { ListGroup } from "react-bootstrap";

function MarketsList({ markets, selectedMarket, setSelectedMarket }) {
  return (
    <ListGroup>
      {markets.map((market) => {
        const isSelected = market.id === selectedMarket.id;
        return (
          <ListGroup.Item
            key={market.id}
            className={
              "my-2 border border-dark rounded-2" +
              (isSelected ? " active" : "")
            }
            onClick={() => {
              setSelectedMarket(market);
            }}
          >
            {market.name}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

export default MarketsList;
