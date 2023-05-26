import React, { useEffect } from "react";
import { fetchStockDetails } from "../handlers/stock.handler";
import { Alert, Button, Card, Skeleton, Space } from "antd";

function DisplayStock() {
  const [stock, setStock] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState(null);
  
  const stockSymbol = "AMZN";

  const fetchStock = async () => {
    try {
      const stockDetails = await fetchStockDetails(stockSymbol, "2023-05-15");
      setStock(stockDetails);
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.response.data["Error Message"]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const sendEmail = () => {
    window.open(
      `mailto:boss@gmail.com
        ?subject=Stock Details for ${stockSymbol}
        &body=The stock price on the 15th of May is
        Open : ${stock?.open}
        High : ${stock?.high}
        Low : ${stock?.low}
        Close : ${stock?.close}
        Volume : ${stock?.volume}

        `,
      "_self"
    );
  };

  const sendWhatsapp = () => {
    window.open(
      `https://api.whatsapp.com/send?phone=917709387663&text=Stock Details for ${stockSymbol} Stock Date : ${stock?.date} \n Open : ${stock?.open} \n High : ${stock?.high} Low : ${stock?.low} \n Close : ${stock?.close} \n Volume : ${stock?.volume}
        `,
      "_blank"
    );
  };

  return (
    <div className=" mx-auto ">
      <Card
        title={`Showing stock details for ${stockSymbol} `}
        className=" w-[400px] mx-auto mt-10"
      >
        <Skeleton loading={loading} active />
        {errorMessage && <Alert message={errorMessage} type="error" />}
        {stock && (
          <>
            <h1> Stock Date : {stock?.date}</h1>
            <h1> Open : {stock?.open}</h1>
            <h1> High : {stock?.high}</h1>
            <h1> Low : {stock?.low}</h1>
            <h1>Close : {stock?.close}</h1>
            <h1>Volume : {stock?.volume}</h1>
          </>
        )}
      </Card>

      {stock && (
        <div className=" text-center mt-5">
          Share to Boss <Button onClick={sendEmail}>Via Email</Button>{" "}
          <Button onClick={sendWhatsapp}>Via Whatsapp</Button>
        </div>
      )}
    </div>
  );
}

export default DisplayStock;
