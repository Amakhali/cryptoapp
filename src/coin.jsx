/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./coin.css"
import "./coins.css"
import axios from "axios";
import DOMPurify from "dompurify";
const Coin = () => {
    const { koinId } = useParams()
    const [koin, setKoin] = useState([])
    const [pending, setPending] = useState(true)

    useEffect(() => {

        const url =
            `https://api.coingecko.com/api/v3/coins/${koinId}`

        axios.get(url).then((res) => {
            setKoin(res.data)
            setPending(false)
        }).catch((err) => {
            console.log(err);
        })

    }, []);
    return (
        <>

            {
                pending ?
                    <div className='pending'>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    :
                    <div className="container_coin">
                        <h1 className="coin_name">{koin.name}</h1>

                        <div className="price">
                            <div>
                                <span className="rank"><span style={{ color: "lightblue" }}>
                                    Rank</span> #{koin.market_cap_rank}</span>
                                <img alt="coin" src={koin.image.small} />
                                <h3>{koin.name}</h3>
                                <h4>({koin.symbol.toUpperCase()}/USD)</h4>
                            </div>
                            <h2>${koin.market_data.current_price.usd.toLocaleString()}</h2>
                        </div>
                        <div className="changePrice">
                            <span className="dailyPrice">1h</span>
                            <span className="dailyPrice">24h</span>
                            <span className="dailyPrice">7d</span>
                            <span className="dailyPrice">14d</span>
                            <span className="dailyPrice">30d</span>
                            <span className="dailyPrice">1y</span>

                            <span style=
                                {{
                                    color: koin.market_data.price_change_percentage_1h_in_currency
                                    .usd
                                        .toFixed(1) > 0 ? 'green' : "red"
                                }}>
                                {koin.market_data.price_change_percentage_1h_in_currency.usd
                                    .toFixed(1)}%
                            </span>

                            <span style=
                                {{
                                    color: koin.market_data.price_change_percentage_24h_in_currency
                                    .usd
                                        .toFixed(1) > 0 ? 'green' : "red"
                                }}>
                                {koin.market_data.price_change_percentage_24h_in_currency.usd
                                    .toFixed(1)}%
                            </span>

                            <span style=
                                {{
                                    color: koin.market_data.price_change_percentage_7d_in_currency
                                    .usd
                                        .toFixed(1) > 0 ? 'green' : "red"
                                }}>
                                {koin.market_data.price_change_percentage_7d_in_currency.usd
                                    .toFixed(1)}%
                            </span>

                            <span style=
                                {{
                                    color: koin.market_data.price_change_percentage_14d_in_currency
                                    .usd
                                        .toFixed(1) > 0 ? 'green' : "red"
                                }}>
                                {koin.market_data.price_change_percentage_14d_in_currency.usd
                                    .toFixed(1)}%
                            </span>

                            <span style=
                                {{
                                    color: koin.market_data.price_change_percentage_30d_in_currency
                                    .usd
                                        .toFixed(1) > 0 ? 'green' : "red"
                                }}>
                                {koin.market_data.price_change_percentage_30d_in_currency.usd
                                    .toFixed(1)}%
                            </span>

                            <span style=
                                {{
                                    color: koin.market_data.price_change_percentage_1y_in_currency
                                    .usd
                                        .toFixed(1) > 0 ? 'green' : "red"
                                }}>
                                {koin.market_data.price_change_percentage_1y_in_currency.usd
                                    .toFixed(1)}%
                            </span>


                        </div>

                        <div className="more_details">
                            <div className="inside_more_details">
                                <span>24 hour low </span>
                                ${koin.market_data.low_24h.usd.toLocaleString()}
                            </div>
                            <div className="inside_more_details">
                                <span>market cap </span>
                                ${koin.market_data.market_cap.usd.toLocaleString()}
                            </div>
                            <div className="inside_more_details">
                                <span>24 hour high </span>
                                ${koin.market_data.high_24h.usd.toLocaleString()}
                            </div>
                            <div className="inside_more_details">
                                <span>circulating supply </span>
                                {koin.market_data.circulating_supply.toLocaleString()}
                            </div>
                        </div>

                        <div className="about">
                            <h3>
                                About
                            </h3>
                            <p dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(koin.description.en)
                            }}>
                            </p>
                        </div>

                    </div>
            }
        </>
    );
}

export default Coin;