import React, { useEffect, useState } from "react";
import axios from "axios";

import { Form, Container, Table, Button, Card, Alert } from "react-bootstrap";
import "../App.css";
import "./Header.css";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Primeiro() {
  const [ticker, setTicker] = useState("");
  const [dataTicker, setDataTicker] = useState([]);
  const [error, setError] = useState({type: '', status: false, text: ''})


  function handleSelectTicker(event) {
    const serializedTicker = event.target.value;
    setTicker(serializedTicker);
  }

  function handleKeyPress(event) {
    setError({type: '', status: false, text: ''})
    if (event.charCode === 13) {
      handleSubmitTicker();
    }
  }

  function handleSubmitTicker() {
    axios
      .get(
        `https://api.hgbrasil.com/finance/stock_price?format=json-cors&key=f75a05cf&symbol=${ticker}`
      )
      .then((res) => {
        
        if(res.data.results[ticker].error) {
          setError({type: 'warning', status: true, text: 'Ops... Não encontramos ação com este ticker :('})
          return
        }
        const existe = dataTicker.find((element) => element.symbol === ticker);
        console.log(existe);

        if (!existe) {
          const array = [...dataTicker, res.data.results[ticker]];
          setDataTicker(array);
          return
        }

        setError({type: 'danger', status: true, text: 'Ops... Você já incluiu esta ação!'})


      })
    setTicker("");
  }

  return (
    <Container className="mt-5">
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Digite o Ticker aqui"
          value={ticker}
          onKeyPress={handleKeyPress}
          onChange={handleSelectTicker}
        />
        <>
          <br></br>
          
          <Button
            variant="primary"
            disabled={!ticker}
            onClick={handleSubmitTicker}
          >
            Submit
          </Button>{" "}
        </>
      </Form.Group>
      
      {error.type && <Alert variant={error.type}>
        {error.text}
      </Alert>}

      

      <div className="wrap-cards">
        {dataTicker.map((item) => (
          <Card
            key={item.symbol}
            className="mb-3 ml-3 "
            style={{ width: "18rem" }}
          >
            <Card.Body
              className={
                item.change_percent > 0
                  ? "variacao-positiva"
                  : "variacao-negativa"
              }
            >
              <Card.Title>
                {item.symbol}
                <RiDeleteBin6Line />
              </Card.Title>

              <Card.Subtitle className="mb-2 text-muted">
                {item.company_name}
              </Card.Subtitle>

              <Card.Text>CHART</Card.Text>
              <div className="flex cotacao">
                <span>{item.price}</span>

                <span>{item.change_percent}</span>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
}
