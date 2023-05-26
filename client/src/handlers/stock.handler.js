import axios from "axios";

const apiKey = process.env.REACT_APP_STOCK_API_KEY;

export const fetchStockDetails = async (
  symbol = "AAPL",
  date = "2023-05-15"
) => {
  const apiUrl = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${apiKey}`;

  const { data } = await axios.get(apiUrl);
  const stockData = data.historical.reverse();
  const stockDetails = stockData.find((stock) => stock.date === date);

  return stockDetails;
};
