import { useSelector } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const {balance} = useSelector(store=>store.account)
  console.log(balance);
  console.log(typeof(balance));
  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
