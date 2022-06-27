import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';


const ChartComponent = ({data, backgroundColor,  lineColor, textColor, areaTopColor, areaBottomColor}) => {

    const chartContainerRef = useRef();

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({
                     //width: chartContainerRef.current.clientWidth,
                 });
			};
            const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor }, //
					textColor,
				},
                grid: {
                    vertLines: {type: ColorType.Solid, color: 'red', visible: false},
                    horzLines: {type: ColorType.Solid, color: 'red', visible: false},

                }, 
				//width: chartContainerRef.current.clientWidth,
				height: 400,
                width:  600,

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



export default ChartComponent

/*
mode: PriceScaleMode.Percentage,
                    borderColor: 'rgba(197, 203, 206, 0.4)',

                    */

                   /*

                   rightPriceScale: {
                    scaleMargins: {
                        top: 0.1,
                        bottom: 0.1,
                    },
                    mode: createChart.PriceScaleMode.Percentage,
                    borderColor: 'rgba(197, 203, 206, 0.4)',
                    
                },
                */

