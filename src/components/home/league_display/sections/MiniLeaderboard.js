import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export default function MiniLeaderboard() {
    const [players, setPlayers] = useState([])


    const getPlayerScores = async () => {
        await axios.get(process.env.REACT_APP_API_URL+"/players/leaderboard/all")
        .then(function (response) {
            let sortedTop = response.data.players.slice(0,10)
            setPlayers(sortedTop);
        })
    }

    useEffect(() => {
        //send request for ranks data
        //filter and sort by docs with rank values
        //set state
        getPlayerScores();
    },[]);

    return (
        <Box id="leaderboard-container" sx={{  minHeight: "300px", display:"flex", flexDirection: "column", padding: "1.5rem", flexGrow: 1, borderRadius: "1.6rem", backgroundColor: "rgba(163,187,211,0.05)", border: '1px solid rgba(58,70,91)'}}>
            <Typography variant='h6'>Leaderboard</Typography>

            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">

                    <TableHead>
                        <TableRow>
                            <TableCell align="left">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Pos.</Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Golfer</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>To Par</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Rd. 1</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Rd. 2</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Rd. 3</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Rd. 4</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody>
                    {players.map((row) => (
                        <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left" component="th" scope="row">
                                {row ? <Typography variant="overline" sx={{ color: "#fff", fontWeight: "600"}}>{row.event_pos}</Typography> : <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography> }
                            </TableCell>
                            <TableCell align="left" component="th" scope="row">
                                <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>{row.first_name} {row.last_name}</Typography>
                            </TableCell>
                            <TableCell align="center">
                                {row ? <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{row.event_to_par}</Typography> : <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography> }
                            </TableCell>
                            <TableCell align="center">
                                {row ? <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{row.event_r_one}</Typography> : <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography> }
                            </TableCell>
                            <TableCell align="center">
                                {row ? <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{row.event_r_two}</Typography> : <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography> }
                            </TableCell>
                            <TableCell align="center">
                                {row ? <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{row.event_r_three}</Typography> : <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography> }
                            </TableCell>
                            <TableCell align="center">
                                {row ? <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{row.event_r_four}</Typography> : <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography> }
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}