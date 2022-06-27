import { ethers } from "ethers";
import React, {useCallback, useState} from 'react';
import { Input } from "antd";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Col, Row, Button, Card } from "react-bootstrap";
import ChartTotal from '../components/Chart_Total';
import ChartSingle from '../components/Chart_Single';
import bnb from '../bnb.png';
import ftm from '../ftm.png';
import avax from '../avax.png';
import eth from '../eth.png';
import poly from '../poly.png';
import trans from '../trans.png';
import black from "../black.png";
import { Checkmark } from 'react-checkmark'
import {  Blockie } from "../components";
import { useLookupAddress } from "eth-hooks/dapps/ens";

function Home({mainnetProvider}) {

  const [searchAddress, setSearchAddress] = useState("");
  const isENS = (address = "") => address.endsWith(".eth") || address.endsWith(".xyz");
  const ensProvider = mainnetProvider;
  const onChange = 0;
  const [value, setValue] = useState("");
  const currentValue = typeof value !== "undefined" ? value : value;
  const ens = useLookupAddress(ensProvider, currentValue);

  const updateAddress = useCallback(
    async newValue => {
      if (typeof newValue !== "undefined") {
        let address = newValue;
        if (isENS(address)) {
          try {
            const possibleAddress = await ensProvider.resolveName(address);
            if (possibleAddress) {
              address = possibleAddress;
            }
          } catch (e) {}
        }
        setValue(address);
        setSearchAddress(address)
        if (typeof onChange === "function") {
          onChange(address);
        }
      }
    },
    [ensProvider, onChange],
  );
  
  const logo = trans;
  const back_ground = black;
  const [active, setActive ] = useState("");
  
  const [ethData, setEthData] = useState([])
  const [polyData, setPolyData] = useState([])
  const [fantomData, setFantomData] = useState([])
  const [binanceData, setBinanceData] = useState([])
  const [avalancheData, setAvalancheData] = useState([])
  const [loadingEthBal, setLoadingEthBal] = useState(false)
  const [loadingPolyBal, setLoadingPolyBal] = useState(false)
  const [loadingFantomBal, setLoadingFantomBal] = useState(false)
  const [loadingBinanceBal, setLoadingBinanceBal] = useState(false)
  const [loadingAvalancheBal, setLoadingAvalancheBal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingPoly, setLoadingPoly] = useState(false)
  const [loadingFantom, setLoadingFantom] = useState(false)
  const [loadingBinance, setLoadingBinance] = useState(false)
  const [loadingAvalanche, setLoadingAvalanche] = useState(false)
  const [activeTotalAll, setActiveTotalAll ] = useState(false);
  const [activeTotalEth, setActiveTotalEth ] = useState(false);
  const [activeTotalPoly, setActiveTotalPoly ] = useState(false);
  const [activeTotalBinance, setActiveTotalBinance] = useState(false);
  const [activeTotalFantom, setActiveTotalFantom] = useState(false);
  const [activeTotalAvalanche, setActiveTotalAvalanche] = useState(false);

  const [ethPortData, setEthPortData] = useState([]);
  const [loadingEthPort,setLoadingEthPort] = useState(false);
  const [loadingAllPort, setLoadingAllPort] = useState(false);
  const [polyPortData, setPolyPortData] = useState([]);
  const [loadingPolyPort,setLoadingPolyPort] = useState(false);
  const [fantomPortData, setFantomPortData] = useState([]);
  const [loadingFantomPort,setLoadingFantomPort] = useState(false);
  const [binancePortData, setBinancePortData] = useState([]);
  const [loadingBinancePort,setLoadingBinancePort] = useState(false);
  const [avalanchePortData, setAvalanchePortData] = useState([]);
  const [loadingAvalanchePort,setLoadingAvalanchePort] = useState(false);

  const [allPortData , setAllPortData] = useState([]);
  const [ethPortfolio,setEthPortfolio] = useState([]);
  const [polyPortfolio,setPolyPortfolio] = useState([]);
  const [fantomPortfolio,setFantomPortfolio] = useState([]);
  const [binancePortfolio,setBinancePortfolio] = useState([]);
  const [avalanchePortfolio,setAvalanchePortfolio] = useState([]);
  const [loadingAllPortfolio, setLoadingAllPortfolio] = useState(false);
  
  const backgroundColor = 'black';
  const lineColor = 'black';
  //const textColor =  '#2962FF';
  const areaTopColor = 'black';
  //const areaBottomColor = 'rgba(41, 98, 255, 0.28)';

  const myStyle={
    backgroundImage: `url(${back_ground})`,
    minWidth: '100vw',
    minHeight: '100vh',
    //backgroundSize: 'auto',
    backgroundSize: ' cover',

  };
  
  const activeArrays = []
  const chartDataArray1 = []
  const chartDataArray2 = []
  const chartDataArray3 = []
  const chartDataArray4 = []
  const chartDataArray5 = []
  const validEthContracts = [];
  const validPolyContracts = [];
  const validFantomContracts = [];
  const validBinanceContracts = [];
  const validAvalancheContracts = [];
  const validEthItemNumbers = [];
  const validPolyItemNumbers = [];
  const validFantomItemNumbers = [];
  const validBinanceItemNumbers = [];
  const validAvalancheItemNumbers = [];

  const api_key = "";

  const getDataBalances = async () => {

      try {
          const res = await axios.get("https://api.covalenthq.com/v1/1/address/" + searchAddress + "/balances_v2/?key=" + api_key);
          const blackListEth = [];
          const valid = [];
          let x = 0;
          res.data.data.items.map((validstuff)=> {
            
            if (validstuff.quote > 0 && validstuff.quote_rate_24h && !blackListEth.includes(validstuff.contract_ticker_symbol)){
              setLoadingEthBal(true)
              setLoading(true);
              const img = new Image();
              img.src = validstuff.logo_url; 
              img.onerror = () => {
                validstuff.logo_url = logo;
              };
              valid.push(validstuff)
              validEthContracts.push(validstuff.contract_address)
              validEthItemNumbers.push(x)
              x++
            } else x++
          });

          setEthData(valid);
          
      } catch (err) {
          console.log(err.message);
      }
      try {
        const resPoly = await axios.get("https://api.covalenthq.com/v1/137/address/" + searchAddress + "/balances_v2/?key=" + api_key)
        const valid = [];
        let x = 0;

        resPoly.data.data.items.map((validstuff)=> {
          
          if (validstuff.quote > 0 && validstuff.quote_rate_24h ){
            setLoadingPolyBal(true)
            setLoadingPoly(true)
            const img = new Image();
            img.src = validstuff.logo_url; 
            img.onerror = () => {
              validstuff.logo_url = logo;
            };
            valid.push(validstuff)
            validPolyContracts.push(validstuff.contract_address)
            validPolyItemNumbers.push(x)
            x++

          } else x++
        
        });

        setPolyData(valid);
      } catch (err) {
        console.log(err.message);
      }
      try {
        const resBinance = await axios.get("https://api.covalenthq.com/v1/56/address/" + searchAddress + "/balances_v2/?key=" + api_key);
        const blacklist = ["MNEB"];
        const valid = [];
        let x = 0;
          resBinance.data.data.items.map((validstuff)=> {
            if (validstuff.quote > 0 && validstuff.quote_rate_24h && !blacklist.includes(validstuff.contract_ticker_symbol)){
              setLoadingBinanceBal(true)
              setLoadingBinance(true)
              const img = new Image();
              img.src = validstuff.logo_url; 
              img.onerror = () => {
                validstuff.logo_url = logo;
              };
              valid.push(validstuff)
              validBinanceContracts.push(validstuff.contract_address)
              validBinanceItemNumbers.push(x)
              x++
            } else x++
          
        });
        setBinanceData(valid);
      } catch (err) {
        console.log(err.message);
      }
      try {
        const resAvalanche = await axios.get("https://api.covalenthq.com/v1/43114/address/" + searchAddress + "/balances_v2/?key=" + api_key);
        const blacklist = [];
        const valid = [];
        let x = 0;
          resAvalanche.data.data.items.map((validstuff)=> {
            if (validstuff.quote > 0 && validstuff.quote_rate_24h && !blacklist.includes(validstuff.contract_ticker_symbol)){
              setLoadingAvalancheBal(true)
              setLoadingAvalanche(true)
              const img = new Image();
              img.src = validstuff.logo_url; 
              img.onerror = () => {
                validstuff.logo_url = logo;
              };
              valid.push(validstuff)
              validAvalancheContracts.push(validstuff.contract_address)
              validAvalancheItemNumbers.push(x)
              x++
            } else x++
            
          });
          setAvalancheData(valid);
      } catch (err) {
        console.log(err.message);
      }
      try {
        const resFantom = await axios.get("https://api.covalenthq.com/v1/250/address/" + searchAddress + "/balances_v2/?key=" + api_key);
        const blacklist = [];
        const valid = [];
        let x = 0;
          resFantom.data.data.items.map((validstuff)=> {
            if (validstuff.quote > 0 && validstuff.quote_rate_24h && !blacklist.includes(validstuff.contract_ticker_symbol)){
              setLoadingFantomBal(true)
              setLoadingFantom(true);
              const img = new Image();
              img.src = validstuff.logo_url; 
              img.onerror = () => {
                validstuff.logo_url = logo;
              };
              valid.push(validstuff)
              validFantomContracts.push(validstuff.contract_address)
              validFantomItemNumbers.push(x)
              x++
            } else x++
          
        });
        setFantomData(valid);
      } catch (err) {
        console.log(err.message);
      }
    getDataPortEth();  
  };

  const getDataPortEth = async () => {
    try {
      if(validEthContracts.length > 0) {
        const response = await axios.get("https://api.covalenthq.com/v1/1/address/" + searchAddress + "/portfolio_v2/?key=" + api_key);
        setEthPortfolio(response.data.data.items)
        const tokenCount = validEthItemNumbers.length

        let q = 1;
        for(let i = 29; i > 0; i--){
          const chartDataNew = {};
          chartDataNew["time"] = ((response.data.data.items[validEthItemNumbers[0]].holdings[i].timestamp).split('T')[0]).toString();
          chartDataNew["value"] = response.data.data.items[validEthItemNumbers[0]].holdings[i].close.quote;
          chartDataArray1.push(chartDataNew);
        };
        for (let x = 1; x < tokenCount && !response.data.error  && response.data.data.items[x]; x++ && q++) {
          for(let i = 29; i > 0; i--){
            chartDataArray1[29-i]["value"] += response.data.data.items[validEthItemNumbers[q]].holdings[i].close.quote;
            
          };
        };
        setEthPortData(chartDataArray1);
        setLoadingEthPort(true)
        setLoadingEthBal(false)
        console.log("EthReady")
        activeArrays.push(chartDataArray1)
      }
    } catch (err) {
        console.log(err.message);
    }
    try {

      if(validPolyContracts.length > 0) {
        const response = await axios.get("https://api.covalenthq.com/v1/137/address/" + searchAddress + "/portfolio_v2/?key=" + api_key);
        setPolyPortfolio(response.data.data.items)
        const tokenCount = validPolyItemNumbers.length
        let q = 1;
        for(let i = 29; i > 0; i--){
          const chartDataNew = {};
          chartDataNew["time"] = ((response.data.data.items[validPolyItemNumbers[0]].holdings[i].timestamp).split('T')[0]).toString();
          chartDataNew["value"] = response.data.data.items[validPolyItemNumbers[0]].holdings[i].close.quote;
          chartDataArray2.push(chartDataNew);
        };
        for (let x = 1; x < tokenCount && !response.data.error  && response.data.data.items[x]; x++ && q++) {
            for(let i = 29; i > 0; i--){
              chartDataArray2[29-i]["value"] += response.data.data.items[validPolyItemNumbers[q]].holdings[i].close.quote;
            };
        };
        setPolyPortData(chartDataArray2);
        setLoadingPolyPort(true)
        setLoadingPolyBal(false)
        console.log("PolygonReady")
        activeArrays.push(chartDataArray2)
      }
    } catch (err) {
        console.log(err.message);
    }
    try {
      if(validFantomContracts.length > 0) {
        const response = await axios.get("https://api.covalenthq.com/v1/250/address/" + searchAddress + "/portfolio_v2/?key=" + api_key);
        setFantomPortfolio(response.data.data.items)
        const tokenCount = validFantomItemNumbers.length
        let q = 1;
        for(let i = 29; i > 0; i--){
          const chartDataNew = {};
          chartDataNew["time"] = ((response.data.data.items[validFantomItemNumbers[0]].holdings[i].timestamp).split('T')[0]).toString();
          chartDataNew["value"] = response.data.data.items[validFantomItemNumbers[0]].holdings[i].close.quote;
          chartDataArray3.push(chartDataNew);
        };
        for (let x = 1; x < tokenCount && !response.data.error  && response.data.data.items[x]; x++ && q++) {
          for(let i = 29; i > 0; i--){
            chartDataArray3[29-i]["value"] += response.data.data.items[validFantomItemNumbers[q]].holdings[i].close.quote;
          };
        };
        setFantomPortData(chartDataArray3);
        setLoadingFantomPort(true)
        setLoadingFantomBal(false)
        console.log("FantomReady")
        console.log("validFantomContracts: ", validFantomContracts.length)
        activeArrays.push(chartDataArray3)
      }
    } catch (err) {
      console.log(err.message);
    }
    try {
      if(validBinanceContracts.length > 0) {
        const response = await axios.get("https://api.covalenthq.com/v1/56/address/" + searchAddress + "/portfolio_v2/?key=" + api_key);
        setBinancePortfolio(response.data.data.items)
        const tokenCount = validBinanceItemNumbers.length
        let q = 1;
        for(let i = 29; i > 0; i--){
          const chartDataNew = {};
          chartDataNew["time"] = ((response.data.data.items[validBinanceItemNumbers[0]].holdings[i].timestamp).split('T')[0]).toString();
          chartDataNew["value"] = response.data.data.items[validBinanceItemNumbers[0]].holdings[i].close.quote;
          chartDataArray4.push(chartDataNew);
        };
        for (let x = 1; x < tokenCount && !response.data.error  && response.data.data.items[x]; x++ && q++) {
          for(let i = 29; i > 0; i--){
            chartDataArray4[29-i]["value"] += response.data.data.items[validBinanceItemNumbers[q]].holdings[i].close.quote;
          };
        };
        setBinancePortData(chartDataArray4);
        setLoadingBinancePort(true)
        setLoadingBinanceBal(false)
        console.log("BinanceReady")
        console.log("validBinanceContracts: ", validBinanceContracts.length)
        activeArrays.push(chartDataArray4)
      }
    } catch (err) {
        console.log(err.message);
    }
    try {
      if(validAvalancheContracts.length > 0) {
        const response = await axios.get("https://api.covalenthq.com/v1/43114/address/" + searchAddress + "/portfolio_v2/?key=" + api_key);
        setAvalanchePortfolio(response.data.data.items)
        const tokenCount = validAvalancheItemNumbers.length
        let q = 1;
        for(let i = 29; i > 0; i--){
          const chartDataNew = {};
          chartDataNew["time"] = ((response.data.data.items[validAvalancheItemNumbers[0]].holdings[i].timestamp).split('T')[0]).toString();
          chartDataNew["value"] = response.data.data.items[validAvalancheItemNumbers[0]].holdings[i].close.quote;
          chartDataArray5.push(chartDataNew);
        };
        for (let x = 1; x < tokenCount && !response.data.error  && response.data.data.items[x]; x++ && q++) {
          for(let i = 29; i > 0; i--){
            chartDataArray5[29-i]["value"] += response.data.data.items[validAvalancheItemNumbers[q]].holdings[i].close.quote;
          };
        };
        setAvalanchePortData(chartDataArray5);
        setLoadingAvalanchePort(true)
        setLoadingAvalancheBal(false)
        activeArrays.push(chartDataArray4)
      }
    } catch (err) {
      console.log(err.message);
    }
    try {
      setLoadingAllPortfolio(true) 
      const chartDataArrayAll = [];
      const arrayLength = activeArrays.length;
      
      for(let i = 0; i <29; i++){
        const chartDataNew = {};
        chartDataNew["time"] = activeArrays[0][i]["time"] 
        chartDataNew["value"] = activeArrays[0][i]["value"]
        chartDataArrayAll.push(chartDataNew);
      }

      for (let g = 1; g < arrayLength; g++) {
        for(let i = 0; i < 29; i++){
          chartDataArrayAll[i]["value"] += activeArrays[g][i]["value"]
        };
      };

      setLoadingAllPort(true)
      setLoadingAllPortfolio(false)
      setAllPortData(chartDataArrayAll);
    } catch (err) {
        console.log(err.message);
    }
    console.log("All_Blocks_Calculated")
  };

  const { Search } = Input;

  return (
    <div style={myStyle}>
        <nav>
        <Button  variant="outline-secondary" onClick={() => setActiveTotalEth((s) => !s)}><img src={eth} width={75} height={75} mode='fit' />
        {loadingEthBal && <div style={{ display: activeTotalEth ? "none" : "block"}}><text style={{fontSize:"15px"}} >Loading...</text></div>}
        {loadingEthPort && <Checkmark size='medium' color='silver'/> }</Button> 
        <Button  variant="outline-secondary" onClick={() => setActiveTotalPoly((s) => !s)}><img src={poly} width={75} height={75} mode='fit' />
        {loadingPolyBal && <div style={{ display: activeTotalPoly ? "none" : "block"}}><text style={{fontSize:"15px"}} >Loading...</text></div>}
        {loadingPolyPort && <Checkmark size='medium' color='#6960EC'/> }</Button>
        <Button  variant="outline-info" onClick={() => setActiveTotalFantom((s) => !s)}><img src={ftm} width={75} height={75} mode='fit' />
        {loadingFantomBal && <div style={{ display: activeTotalFantom ? "none" : "block"}}><text style={{fontSize:"15px"}} >Loading...</text></div>}
        {loadingFantomPort && <Checkmark size='medium' color='#82CAFF'/> }</Button>
        <Button  variant="outline-danger" onClick={() => setActiveTotalAvalanche((s) => !s)}><img src={avax} width={75} height={75} mode='fit' />
        {loadingAvalancheBal && <div style={{ display: activeTotalAvalanche ? "none" : "block"}}><text style={{fontSize:"15px"}} >Loading...</text></div>}
        {loadingAvalanchePort && <Checkmark size='medium' color='red'/> }</Button> 
        <Button  variant="outline-warning" onClick={() => setActiveTotalBinance((s) => !s)}><img src={bnb} width={75} height={75} mode='fit' />
        {loadingBinanceBal && <div style={{ display: activeTotalBinance ? "none" : "block"}}><text style={{fontSize:"15px"}} >Loading...</text></div>}
        {loadingBinancePort && <Checkmark size='medium' color='yellow'/> }</Button> 
        <Button style={{height: 90, width: 90, fontSize:"30px", fontFamily: "serif", font: "Times New Roman"}} variant="outline-success" onClick={() => setActiveTotalAll((s) => !s)}>All
        {loadingAllPortfolio && <div style={{  display: activeTotalAll ? "none" : "block"}}><text style={{fontSize:"15px" }} >Loading...</text></div>}
        {loadingAllPort && <Checkmark size='medium' color='green'/> } </Button>
        </nav>

        <div>
          {activeTotalAll && <ChartTotal data={allPortData} backgroundColor={backgroundColor}  lineColor={lineColor} textColor={'green'} areaTopColor={areaTopColor} areaBottomColor={'green'}  />}
          {activeTotalEth && <ChartTotal data={ethPortData} backgroundColor={backgroundColor}  lineColor={lineColor} textColor={'silver'} areaTopColor={areaTopColor} areaBottomColor={'silver'}  />}
          {activeTotalPoly  && <ChartTotal data={polyPortData} backgroundColor={backgroundColor}  lineColor={lineColor} textColor={'#6960EC'} areaTopColor={areaTopColor} areaBottomColor={'#6960EC'}  />}
          {activeTotalFantom  && <ChartTotal data={fantomPortData} backgroundColor={backgroundColor}  lineColor={lineColor} textColor={'#82CAFF'} areaTopColor={areaTopColor} areaBottomColor={'#82CAFF'}  />}
          {activeTotalBinance  && <ChartTotal data={binancePortData} backgroundColor={backgroundColor}  lineColor={lineColor} textColor={'yellow'} areaTopColor={areaTopColor} areaBottomColor={"yellow"}  />}
          {activeTotalAvalanche  && <ChartTotal data={avalanchePortData} backgroundColor={backgroundColor}  lineColor={lineColor} textColor={'red'} areaTopColor={areaTopColor} areaBottomColor={"red"}  />}
        </div>

        <br></br>
        <div>
          
        <Search style={{width:500, height:50}}
        id="0xAddress" 
        name="0xAddress" 
        autoComplete="off"
        size="large" 
        prefix={<Blockie address={currentValue} size={8} scale={3} />}
        value={ethers.utils.isAddress(currentValue) && !isENS(currentValue) && isENS(ens) ? ens : currentValue}
        allowClear
        placeholder="Enter address"
        //enterButton
        
        onChange={e => {
          updateAddress(e.target.value);
        }}

        onSearch={async () => {
          getDataBalances();
        }}
        />

        <Container fluid>
            <Row>
                {loading && ethData.map((ethdata)=>(
                    <Col md key={ethdata.contract_name}>
                       <h6 align='left' style={{ color: "silver"}}><img src={eth} width={25} height={25} mode='fit' /></h6>
                        <Card  border="secondary" style={{ width: '14rem', height: '18rem', color: 'silver' , backgroundColor: 'black'}} > 
                        <div style={{ display: "block", width: 175, padding: 30 }}>
                        <Card.Img variant='top'  src={ ethdata.logo_url}  />
                        </div>
                        <Card.Body style={{}} >
                            <Card.Title className="card-img-overlay mb-2 text-yellow ">
                            {parseFloat(ethers.utils.formatUnits(ethdata.balance,ethdata.contract_decimals)).toFixed(4)} {`${ethdata.contract_ticker_symbol }`}
                            </Card.Title>
                        <Card.Subtitle className="mb-2 text-white">
                            ${parseFloat(ethdata.quote).toFixed(2)}
                        </Card.Subtitle>  <br></br>
                        </Card.Body>
                        <Button style={{ background: "black" }} variant="outline-secondary"  onClick={() => setActive(ethdata.contract_name)}>Chart</Button>
                    </Card>
                    <br></br>
                    {active === ethdata.contract_name && <ChartSingle portData={ethPortfolio} address={ethdata.contract_address} backgroundColor={backgroundColor}  lineColor={lineColor} textColor={"silver"} areaTopColor={areaTopColor} areaBottomColor={"silver"}  />}
                    </Col>
                ))}
            </Row>
            <Row>
                {loadingPoly && polyData.map((ethdata)=>(
                    <Col sm={12} md={6} lg={4} key={ethdata.contract_name}>
                      <h6 align='left' style={{ color: "purple" }}><img src={poly} width={25} height={25} mode='fit' /></h6>
                      <Card border="secondary" style={{ width: '14rem', height: '18rem', color: '#6960EC' , backgroundColor: 'black'}} >
                        <div style={{ display: "block", width: 175, padding: 30 }}>
                        <Card.Img variant='top'  src={ ethdata.logo_url}  />
                        </div>
                        <Card.Body style={{}} >
                            <Card.Title className="card-img-overlay mb-2 text-yellow ">
                            {parseFloat(ethers.utils.formatUnits(ethdata.balance,ethdata.contract_decimals)).toFixed(4)} {`${ethdata.contract_ticker_symbol }`}
                            </Card.Title>
                        <Card.Subtitle className="mb-2 text-white">
                            ${parseFloat(ethdata.quote).toFixed(2)}
                        </Card.Subtitle>  <br></br> 
                        </Card.Body>
                        <Button style={{ background: "black" }} variant="outline-secondary"  onClick={() => setActive(ethdata.contract_name) }>Chart</Button>
                     </Card><br></br>
                      {active === ethdata.contract_name && <ChartSingle portData={polyPortfolio} address={ethdata.contract_address} backgroundColor={backgroundColor}  lineColor={lineColor} textColor={"#6960EC"} areaTopColor={areaTopColor} areaBottomColor={"#6960EC"}  />}
                  </Col>
                ))}
            </Row>
            <Row>
                {loadingBinance && binanceData.map((ethdata)=>(
                  <Col sm={12} md={6} lg={4} key={ethdata.contract_name}>
                      <h6 align='left' style={{ color: "yellow" }}><img src={bnb} width={25} height={25} mode='fit' /></h6>
                    <Card  border="warning" style={{ width: '14rem', height: '18rem', color: 'yellow' , backgroundColor: 'black'}} >
                      <div style={{ display: "block", width: 175, padding: 30 }}>
                      <Card.Img variant='top'  src={ ethdata.logo_url}  />
                      </div>
                      <Card.Body style={{}} >
                          <Card.Title className="card-img-overlay mb-2 text-yellow ">
                          {parseFloat(ethers.utils.formatUnits(ethdata.balance,ethdata.contract_decimals)).toFixed(4)} {`${ethdata.contract_ticker_symbol }`}
                          </Card.Title>
                      <Card.Subtitle className="mb-2 text-white">
                          ${parseFloat(ethdata.quote).toFixed(2)}
                      </Card.Subtitle>  <br></br>
                      </Card.Body>
                      <Button style={{ background: "black" }} variant="outline-warning"  onClick={() => setActive(ethdata.contract_name) }>Chart</Button>
                   </Card>  <br></br>
                    {active === ethdata.contract_name && <ChartSingle portData={binancePortfolio} address={ethdata.contract_address} backgroundColor={backgroundColor}  lineColor={lineColor} textColor={"yellow"} areaTopColor={areaTopColor} areaBottomColor={"yellow"}  />}
                  </Col>
                ))}
            </Row>
            <Row>
                {loadingAvalanche && avalancheData.map((ethdata)=>(
                  <Col sm={12} md={6} lg={4} key={ethdata.contract_name}>
                      <h6 align='left' style={{ color: "red" }}><img src={avax} width={25} height={25} mode='fit' /></h6>
                    <Card border="danger" style={{ width: '14rem', height: '18rem', color: 'red' , backgroundColor: 'black'}} >
                      <div style={{ display: "block", width: 175, padding: 30 }}>
                      <Card.Img variant='top'  src={ ethdata.logo_url}  />
                      </div>
                      <Card.Body style={{}} >
                          <Card.Title className="card-img-overlay mb-2 text-yellow ">
                          {parseFloat(ethers.utils.formatUnits(ethdata.balance,ethdata.contract_decimals)).toFixed(4)} {`${ethdata.contract_ticker_symbol }`}
                          </Card.Title>
                      <Card.Subtitle className="mb-2 text-white">
                          ${parseFloat(ethdata.quote).toFixed(2)}
                      </Card.Subtitle>  <br></br>           
                      </Card.Body>
                      <Button style={{ background: "black" }} variant="outline-danger"  onClick={() => setActive(ethdata.contract_name) }>Chart</Button>
                    </Card> <br></br>
                   {active === ethdata.contract_name && <ChartSingle portData={avalanchePortfolio} address={ethdata.contract_address} backgroundColor={backgroundColor}  lineColor={lineColor} textColor={"red"} areaTopColor={areaTopColor} areaBottomColor={"red"}  />}
                  </Col>
                ))}
            </Row>
            <Row>
                {loadingFantom && fantomData.map((ethdata)=>(
                  <Col sm={12} md={6} lg={4} key={ethdata.contract_name}>
                      <h6 align='left' style={{ color: "blue" }}><img src={ftm} width={25} height={25} mode='fit' /></h6>
                     <Card border="info" style={{ width: '14rem', height: '18rem', color: '#82CAFF' , backgroundColor: 'black'}} >
                        <div style={{ display: "block", width: 175, padding: 30 }}>
                        <Card.Img variant='top'  src={ ethdata.logo_url}  />
                        </div>
                        <Card.Body style={{}} >
                            <Card.Title className="card-img-overlay mb-2 text-yellow ">
                            {parseFloat(ethers.utils.formatUnits(ethdata.balance,ethdata.contract_decimals)).toFixed(4)} {`${ethdata.contract_ticker_symbol }`}
                            </Card.Title>
                        <Card.Subtitle className="mb-2 text-white">
                            ${parseFloat(ethdata.quote).toFixed(2)}
                        </Card.Subtitle>  <br></br>          
                        </Card.Body>
                        <Button style={{ background: "black", textcolor: "red" }} variant="outline-info"  onClick={() => setActive(ethdata.contract_name) }>Chart</Button>
                     </Card><br></br>
                     {active === ethdata.contract_name && <ChartSingle portData={fantomPortfolio} address={ethdata.contract_address}backgroundColor={backgroundColor}  lineColor={lineColor} textColor={"#82CAFF"} areaTopColor={areaTopColor} areaBottomColor={"#82CAFF"}  />}
                  </Col>
                ))}
            </Row>
      </Container>
      </div>
    </div>
  );
}

export default Home;

