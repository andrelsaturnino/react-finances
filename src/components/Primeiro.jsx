import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Container, Table, Button, Card, Alert } from "react-bootstrap";
import '../App.css';


export default function Primeiro() {
  const [ticker, setTicker] = useState("");
const [dataTicker, setDataTicker] = useState([]);

console.log(dataTicker)

  useEffect(() => {
   
      
  }, [ticker]);

  
  function handleSelectTicker(event) {
    const serializedTicker = event.target.value
          setTicker(serializedTicker);
  }
  function handleSubmitTicker() {
    axios
    .get(`https://api.hgbrasil.com/finance/stock_price?format=json-cors&key=f75a05cf&symbol=${ticker}`)
    .then((res) => {
       
        const existe = dataTicker.find(element => element.symbol === ticker)
        console.log(existe)

        if(!existe) {
            const array = [...dataTicker, res.data.results[ticker]]
            setDataTicker(array)
        }
        
    });
    setTicker("")
  }



  return (
    
      <Container>

<Form.Group>
   <Form.Control type="text" placeholder="Digite o Ticker aqui" value={ticker} onChange = {handleSelectTicker}/>
   <>
   <br></br>
  <Button variant="primary" disabled={!ticker} onClick={handleSubmitTicker} >Submit</Button>{' '}

</>
  </Form.Group>


          <div className="wrap-cards">
          {dataTicker.map(item => (
      <Card key={item.symbol} className="mb-3 ml-3" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{item.symbol}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{item.company_name}</Card.Subtitle>
        <Card.Text >
        {item.document}
        
        
        </Card.Text>
      <div className="flex">
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
