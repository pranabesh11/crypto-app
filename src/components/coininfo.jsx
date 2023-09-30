import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";
//import {Chart as ChartJS,CategoryScale,LinearScale} from 'chart.js';

import { Chart as ChartJS, registerables } from 'chart.js';





import {
    CircularProgress,
    createTheme,
    makeStyles,
    ThemeProvider,
} from "@material-ui/core";

ChartJS.register(...registerables);
//ChartJS.register(CategoryScale,LinearScale);


const CoinInfo = ({coin})=>{
    const [historicdata,setHistoricData] = useState();
    const [days,setDays] = useState(1);
    const {currency} = CryptoState();
    const [flag,setflag] = useState(false);

    const fetchHistoricalData = async()=>{
        const {data} = await axios.get(HistoricalChart(coin.id,days,currency));
        setHistoricData(data.prices);
    }

    useEffect(()=>{
        fetchHistoricalData()
    },[currency,days]);

    const darktheme = createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            type:"dark",
        },
    });


    const useStyles = makeStyles((theme) => ({
        container: {
          width: "75%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
          padding: 40,
          [theme.breakpoints.down("md")]: {
            width: "100%",
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
          },
        },
      }));
    
      const classes = useStyles();


    return(
        <ThemeProvider theme={darktheme}>
            <div className={classes.container}>
                {!historicdata ? (
                    <CircularProgress
                        style={{color:"gold"}}
                        size={250}
                        thickness={1}
                    />
                ):(
                    <>
                        <Line
                            data={{
                                labels:historicdata.map(coin=>{
                                    let date = new Date(coin[0]);
                                    let time =
                                        date.getHours() > 12
                                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                        : `${date.getHours()}:${date.getMinutes()} AM`;
                                        return days === 1 ? time : date.toLocaleDateString();
                                }),
                                datasets: [
                                    {
                                      data: historicdata.map((coin) => coin[1]),
                                      label: `Price ( Past ${days} Days ) in ${currency}`,
                                      borderColor: "#EEBC1D",
                                    },
                                ],
                            }}
                            options={{
                                elements: {
                                  point: {
                                    radius: 1,
                                  },
                                },
                              }}
                        />
                        <div
                            style={{
                                display: "flex",
                                marginTop: 20,
                                justifyContent: "space-around",
                                width: "100%",
                            }}
                        >
                            {chartDays.map((day) => (
                                <SelectButton
                                    key={day.value}
                                    onClick={() => {setDays(day.value);
                                        setflag(false);
                                    }}
                                    selected={day.value === days}
                                    >
                                    {day.label}
                                </SelectButton>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </ThemeProvider>
    );
};

export default CoinInfo;