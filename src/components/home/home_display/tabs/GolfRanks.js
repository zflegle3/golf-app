import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LongMenu from '../../league_display/LongMenu';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import axios from 'axios';


export default function GolfRanks({managerId}) {
    const {user} = useSelector((state) => state.auth)
    const [ranks, setRanks] = useState(null);

    const options = ["All","Available","Rostered"]

    const getRanks = async () => {
        await axios.get(process.env.REACT_APP_API_URL+"/players/world/all")
        .then(function (response) {
            let filteredRanks = response.data.players.filter((element, index) => 
                element.world_rank != null
            );
            filteredRanks.sort((a,b) => {
                return Number(a.world_rank) -  Number(b.world_rank)
            } )
            setRanks(filteredRanks)
        })
    }

    useEffect(() => {
        getRanks();
    },[]);


    if (ranks) {
        return (
            <div id="league-home-container">
                <Box id="players-container" sx={{ display:"flex", flexDirection: "column", padding: "1.5rem", flexGrow: 1, borderRadius: "1.6rem", backgroundColor: "rgba(163,187,211,0.05)", border: '1px solid rgba(58,70,91)'}}>
                    <Box sx={{ display:"flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <Typography variant='h6'>World Golf Rankings</Typography>
                        {/* <LongMenu options={options} title="Filter"/> */}
                    </Box>
    
                    <TableContainer >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
    
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">
                                        <Typography variant="h6" sx={{ color: "#fff", fontWeight: "600"}}>Rank</Typography>
                                    </TableCell>
                                    {/* <TableCell align="center">
                                        <ImportExportIcon sx={{ color: "#d8e2ed"}}/>
                                    </TableCell> */}
                                    <TableCell align="center">
                                        <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Golfer</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Total Points</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Avg Points</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Points Gained</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>Points Lost</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>Earnings</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>Events</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
    
    
                            <TableBody>
                            {ranks.map((player, index) => (
                                <TableRow
                                key={player._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left" >
                                        <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>{player.world_rank}</Typography>
                                    </TableCell>
                                    {/* <TableCell align="center">
                                        <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography>
                                    </TableCell> */}
                                    <TableCell align="center">
                                        <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{player.first_name} {player.last_name}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{player.world_total}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{player.world_avg}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{player.world_gain}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{player.world_lost}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{player.world_earn}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{player.world_events}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </div>
        );
    } else {
        return(<div>Loading</div>)
    }
}