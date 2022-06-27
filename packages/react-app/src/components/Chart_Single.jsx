import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

const ChartSingle = ({portData, address, backgroundColor,  lineColor, textColor, areaTopColor, areaBottomColor}) => {

	const chartContainerRef = useRef();
    const dataArray = [];
    
    portData.map((tokens)=> {
            
        if (tokens.contract_address == address) {
          for(let i = 30; i > 0; i--){
              const chartDataNew = {};
              chartDataNew["time"] = ((tokens.holdings[i].timestamp).split('T')[0]).toString();
              chartDataNew["value"] = tokens.holdings[i].close.quote;
              dataArray.push(chartDataNew);
          };
        }
    });

    const data = dataArray;

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({
                     //width: chartContainerRef.current.clientWidth,
                 });
			};
            const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				grid: {
                    vertLines: {type: ColorType.Solid, color: 'red', visible: false},
                    horzLines: {type: ColorType.Solid, color: 'red', visible: false},

                }, 
				//width: chartContainerRef.current.clientWidth,
				height: 300,
				width: 600,
			});

			const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor});
			newSeries.setData(data);

            chart.timeScale().fitContent();
			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
				chart.remove();
			};
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	return (
		<div
			ref={chartContainerRef}
		/>
	);
};



export default ChartSingle
