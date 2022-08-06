import { useState, useEffect } from 'react';
import {
    Routes,
    Route,
    Link,
} from "react-router-dom";
import Test from "./Test";
import WorldRanks from "./WorldRanks";
import ScheduleTab from "./ScheduleTab";


function Home(props) {
    //props.scheduleDataAll
    //props.leaderboardData
    //props.leaderboardInfo
    const [rankData, setRankData] = useState({rankings: []});

    // // Pull Golf Data
    // useEffect(() => {
    //     if (rankData.rankings.length === 0) {
    //         console.log("No Data yet");
    //         const options = {
    //             method: 'GET',
    //             headers: {
    //                 'X-RapidAPI-Key': '8a8c03b674msh32cd92a7c6fbf58p140730jsn7fb9bc80d982',
    //                 'X-RapidAPI-Host': 'live-golf-data.p.rapidapi.com'
    //             }
    //         };
    //         fetch('https://live-golf-data.p.rapidapi.com/stats?year=2022&statId=186', options)
    //         .then(response => response.json())
    //         .then(response => setRankData(response))
    //         .catch(err => console.error(err));
    //     } else {
    //         console.log("already got data");
    //     }
    //     console.log(rankData);
    // }, []);


    return (
        <div className="center-panel-content">
            <div className="center-panel-header">HOME</div>
            <div className="dual-content-panel">
                <div className="center-panel">
                <ul className="center-panel-tabs">
                    <Link to="" className="center-panel-tab-item">Happening Now</Link>
                    <Link to="/world-rankings" className="center-panel-tab-item">Tab 1</Link>
                    <Link to="/fedex-rankings" className="center-panel-tab-item">Tab2</Link>
                    <Link to="/news" className="center-panel-tab-item">Tab3</Link>
                </ul>
                <div className="center-panel-display">
                    <Routes>
                        <Route exact path="" element={<ScheduleTab scheduleDataAll={props.scheduleDataAll} leaderboardData={props.leaderboardData} leaderboardInfo={props.leaderboardInfo}/>}/>
                        <Route exact path="world-rankings" element={<WorldRanks topHundred={rankData.rankings}/>}/>   
                        <Route exact path="fedex-rankings" element={<Test test={"Tab 2 test, Home"}/>}/>
                        <Route exact path="news" element={<Test test={"Tab 3 test, Home"}/>}/>
                    </Routes>
                </div>
                </div>
                <div className="right-panel"></div>
            </div>
        </div>
    );



}

export default Home;