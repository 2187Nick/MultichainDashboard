import React, {Fragment, useEffect,  useState} from 'react';
import {Container, Button, Card} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav'
import "../App.css";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { Alert } from 'antd';
import ethereumLogo from "../ethereumLogo.png";

// {parseFloat(ethers.utils.formatEther(ethdata.balance)).toFixed(4)} {`${ethdata.contract_ticker_symbol }`}

/*
const baseLogo = ethereumLogo;

function checkIfImageExists(url, callback) {
    const img = new Image();
    img.src = url;

    if (img.complete) {
      callback(true);
    } else {
      img.onload = () => {
        callback(true);
      };
      
      img.onerror = () => {
        callback(false);
      };
    }
};

const LogoCheck = ({url}) => {
    const [logo1, setLogo1 ] = useState("");
    const img = new Image();
    img.src = url;
    if (img.complete) {
            //setCallBack(true);
            setLogo1(url);
            
            //console.log("true");
    }  else {
        //setCallBack(false);
        // setLogo1("C:/Users/n/wallet-360-analytics/packages/react-app/src/ethereumLogo.png")
        setLogo1(baseLogo);
         
        //console.log("false");
    };

    return(
        <div>
        <img src={logo1}></img>
        </div>
    )
    
};

*/


const EthData = ({ethdata}) => {

    //const [active, setActive ] = useState("");

    //const [callback, setCallBack ] = useState(false);

    

    

    /*
    const img = new Image();
    img.src = ethdata.logo_url;
    if (img.complete) {
            //setCallBack(true);
             console.log("true");
    }  else {
        //setCallBack(false);
         console.log("false");
    };  */
    
    //console.log("true/false: ", callback);  




    /*const [logo, setLogo ] = useState("");

    const logoURL = ethdata.logo_url;

    checkIfImageExists(logoURL, (exists) => {
        if (exists) {
            //setLogo(ethdata.logo_url);
            //ethdata.logo_url
            console.log("wegotthis3");
            
        } else {
            //setLogo("C:/Users/n/wallet-360-analytics/packages/react-app/src/ethereumLogo.png")
            console.log("wedontgotthis3");
        
        }
    }); */

    //const logoURL = ethdata.logo_url; 
    
    //const check = checkIfImageExists(logoURL);

    //console.log("check: ", check)

    //const defaultImage = "./ethereumLogo.png";

    // <LogoCheck url={ethdata.logo_url} />

    // className=' bg-dark my-3 m-3 rounded h-90

    // 
    return(
        <>
        <Container>
        <Card  style={{ width: '14rem', height: '16rem', color: 'silver' , backgroundColor: 'black'}} >
    
            <div style={{ display: "block", width: 175, padding: 30 }}>
            <Card.Img variant='top'  src={ ethdata.logo_url} roundedCircle />
            </div>
            
            <Card.Body style={{}} >
                <Card.Title className="card-img-overlay mb-2 text-yellow ">
                {parseFloat(ethers.utils.formatUnits(ethdata.balance,ethdata.contract_decimals)).toFixed(4)} {`${ethdata.contract_ticker_symbol }`}
                </Card.Title>
                
                <Card.Subtitle className="mb-2 text-white">
                    ${parseFloat(ethdata.quote).toFixed(2)}
                </Card.Subtitle>             
            </Card.Body>
         </Card>
         </Container>
        
        
        
        </>
    );
};
   
export default EthData

/*
<div style={{ margin: 32 }}>
Check out the <Link to="/hints">"Hints"</Link> tab for more tips.
</div>
*/

/*
<a href='/debug'><Button style={{borderRAdius: '4px'}} className='w-30' variant='primary'>
                    Chart
                </Button>
                </a>
                */