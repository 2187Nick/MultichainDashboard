import React from "react";
import { Typography } from "antd";
import black from "../black.png";

const { Title, Text } = Typography;
const back_ground = black;

export default function Header({ link, link2, title, subTitle, ...props }) {
  return (
    <div style={{justifyContent: "space-between", display: "flex",  padding: "1.2rem", backgroundImage: `url(${back_ground})`, marginBottom:'-20px', backgroundSize: 'cover',minWidth: '100vw',
    }}>   
      <div style={{ display: "flex",  flexDirection: "column", flex: 1, alignItems: "start" }}>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <Title level={6} style={{ margin: "0 0.5rem 0 0",  color: "silver", fontFamily: "serif", font: "Times New Roman"}}>{title}</Title>
        </a>
        <a href={link2} target="_blank" rel="noopener noreferrer">
        <Text type="secondary" style={{ textAlign: "left", color: "silver", fontFamily: "serif", font: "Times New Roman"}}>{subTitle}</Text>
        </a>
      </div>
      {props.children}
    </div>
  );
}

Header.defaultProps = {
  link: "https://github.com/chrontast/MultiChain_Dashboard", 
  link2: "https://www.covalenthq.com/",
  title: "MultiChain Dashboard",
  subTitle: "Covalent + Scaffold-Eth + Tradingview",
};
