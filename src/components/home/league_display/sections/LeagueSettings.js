import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { updateLeagueSettings } from '../../../../features/leagues/leagueSelectedSlice';

const StyledTextField = styled(TextField)({
    "& label": {
      color: "white"
    },
    "&:hover label": {
    //   fontWeight: 700
    },
    "& label.Mui-focused": {
      color: "white"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white"
      },
      "&:hover fieldset": {
        borderColor: "white",
  
      },
      "&.Mui-focused fieldset": {
        borderColor: "white"
      }
    }
});

const StyledFormControl = styled(FormControl)({
    "& label": {
      color: "white"
    },
    "&:hover label": {
    //   fontWeight: 700
    },
    "& label.Mui-focused": {
      color: "white"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white"
      },
      "&:hover fieldset": {
        borderColor: "white",
  
      },
      "&.Mui-focused fieldset": {
        borderColor: "white"
      }
    }
});


export default function LeagueSettings() {
    const dispatch = useDispatch();
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected);
    const {user} = useSelector((state) => state.auth)
    const [open, setOpen] = useState(false);
    const [teamCount, setTeamCount] = useState(league.team_qty);
    const [leagueName, setLeagueName] = useState(league.name);
    const [rosterSize, setRosterSize] = useState(league.roster_qty);
    const [rosterCut, setRosterCut] = useState(league.roster_cut);
    const [missCutScore, setMissCutScore] = useState(league.cut_score);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event) => {
        setTeamCount(event.target.value);

    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#2d3649',
        // bgcolor: "#ffffff",
        boxShadow: "1px 1px 15px #18202f",
        borderRadius: "2rem",
        p: 4,
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (league.id, user.id, leagueName, teamCount, rosterSize, rosterCut, missCutScore) {
            let settingsPayload = {
                id: league.id,
                admin: user.id,
                name: leagueName,
                team_qty: teamCount,
                roster_qty: rosterSize,
                roster_cut: rosterCut,
                misscut_scoreCutScore: missCutScore
            };
            console.log(settingsPayload);
            if (teamCount != league.team_qty || rosterSize != league.roster_qty) {
                //alert team settings reset
                const text = "Are you sure you want to proceed? Changing the number of teams or players on each team now will erase any existing teams, managers, and players."
                if (window.confirm(text)) {
                    dispatch(updateLeagueSettings(settingsPayload));
                }
            } else {
                dispatch(updateLeagueSettings(settingsPayload));
            }
        } else {
            window.alert("Whoops! We were unable to update league settings. Please try again.")
        }
    };
 

    console.log(leagueName);
    return (
        <Box id="leaderboard-container" sx={{  minHeight: "300px", display:"flex", flexDirection: "column", padding: "1.5rem", flexGrow: 1, borderRadius: "1.6rem", backgroundColor: "rgba(163,187,211,0.05)", border: '1px solid rgba(58,70,91)'}}>

            <Box sx={{paddingBottom: "1rem", display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Typography variant='h6'>League Settings</Typography>
                {league.admin === user.id ? 
                      <IconButton aria-label="delete" size="medium" onClick={handleOpen}>
                        <SettingsIcon sx={{color: "#fff"}}/>
                    </IconButton>
                 : null}
            </Box>
            <Box sx={{paddingTop: "0.5rem", display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Typography variant="overline" sx={{ color: "#7988a1", fontWeight: "600"}}>Number of Teams</Typography>
                <Typography variant="overline" sx={{ color: "#fff", fontWeight: "600"}}>{league.team_qty}</Typography>
            </Box>
            <Box sx={{ paddingTop: "0.5rem", display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Typography variant="overline" sx={{ color: "#7988a1", fontWeight: "600"}}>Roster Size</Typography>
                <Typography variant="overline" sx={{ color: "#fff", fontWeight: "600"}}>{league.roster_qty}</Typography>
            </Box>
            <Box sx={{ paddingTop: "0.5rem", display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Typography variant="overline" sx={{ color: "#7988a1", fontWeight: "600"}}>Roster Spots Cut</Typography>
                <Typography variant="overline" sx={{ color: "#fff", fontWeight: "600"}}>{league.roster_cut}</Typography>
            </Box>
            <Box sx={{ paddingTop: "0.5rem", display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Typography variant="overline" sx={{ color: "#7988a1", fontWeight: "600"}}>Missed Cut Score</Typography>
                <Typography variant="overline" sx={{ color: "#fff", fontWeight: "600"}}>{league.cut_score}</Typography>
            </Box>
            <Box sx={{ paddingTop: "0.5rem", display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Typography variant="overline" sx={{ color: "#7988a1", fontWeight: "600"}}>Tournament</Typography>
                <Typography variant="overline" sx={{ color: "#fff", fontWeight: "600"}}>The Masters, Augusta National</Typography>
            </Box>
            {/* <Box sx={{ paddingTop: "0.5rem", display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Typography variant="overline" sx={{ color: "#7988a1", fontWeight: "600"}}>Draft Type</Typography>
                <Typography variant="overline" sx={{ color: "#fff", fontWeight: "600"}}>{league.draft.type}</Typography>
            </Box> */}
            {/* <Box sx={{ paddingTop: "0.5rem", display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Typography variant="overline" sx={{ color: "#7988a1", fontWeight: "600"}}>Draft Date</Typography>
                <Typography variant="overline" sx={{ color: "#fff", fontWeight: "600"}}>{new Date(league.draft.date).toLocaleDateString()} {new Date(league.draft.date).toLocaleTimeString()}</Typography>
            </Box> */}
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h5" sx={{ color: "#ffffff", fontWeight: "600"}}>League Settings</Typography>
                    <Typography variant="overline" sx={{ color: "#7988a1", fontWeight: "600"}}>Edit number of teams, scoring, etc.</Typography>
                    <Box sx={{display: "flex", flexDirection: "column", gap:"1rem"}}>

                        <StyledTextField id="league-name-edit" label="League Name" variant="filled" inputProps={{ style: { color: "#ffffff"}}} placeholder={leagueName} onChange={e => setLeagueName(e.target.value)}/>

                        <StyledFormControl variant="filled"  sx={{minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-filled-label">Number of Teams</InputLabel>
                            <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={teamCount}
                            onChange={e => setTeamCount(e.target.value)}
                            sx={{ color: "#ffffff"}}
                            defaultValue={Number(league.team_qty)}
                            >
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={11}>11</MenuItem>
                                <MenuItem value={12}>12</MenuItem>
                            </Select>
                        </StyledFormControl>

                        <StyledFormControl variant="filled" sx={{ minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-filled-label">Roster Size</InputLabel>
                            <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={rosterSize}
                            onChange={e => setRosterSize(e.target.value)}
                            sx={{ color: "#ffffff"}}
                            defaultValue={Number(league.roster_qty)}
                            >
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            </Select>
                        </StyledFormControl>

                        <StyledFormControl variant="filled" sx={{ minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-filled-label">Roster Cut</InputLabel>
                            <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={rosterCut}
                            onChange={e => setRosterCut(e.target.value)}
                            sx={{ color: "#ffffff"}}
                            defaultValue={Number(league.roster_cut)}
                            >
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            </Select>
                        </StyledFormControl>

                        <StyledFormControl variant="filled" sx={{ minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-filled-label">Miss Cut Score</InputLabel>
                            <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={missCutScore}
                            onChange={e => setMissCutScore(e.target.value)}
                            sx={{ color: "#ffffff"}}
                            defaultValue={league.cut_score}
                            >
                            <MenuItem value={"avg"}>Average Round Score (active players)</MenuItem>
                            <MenuItem value={-3}>-3</MenuItem>
                            <MenuItem value={-2}>-2</MenuItem>
                            <MenuItem value={-1}>-1</MenuItem>
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            </Select>
                        </StyledFormControl>

                        <Box className="form-btn-container" sx={{width: "100%"}}>
                            <Button sx={{width: "100%"}} onClick={handleSubmit}>Submit</Button>
                        </Box>

                    </Box>

                </Box>
            </Modal>
        </Box>
    
    );

}