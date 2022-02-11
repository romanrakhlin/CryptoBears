import React, { useState, useEffect } from "react";
import { Slider, Typography, Paper, Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import BearSvg from "../components/BearSvg";
import tinygradient from "tinygradient";
import { createBearGen0, totalSupply } from "../components/Web3Client";
import "../css/BearsFactory.css";

const PrettoSlider = withStyles({
    root: {
        color: "#4A2E07",
        height: 2,
    },
    thumb: {
        height: 14,
        width: 14,
        backgroundColor: "#fff",
        border: "2px solid currentColor",
        marginTop: -4,
        marginLeft: 0,
        "&:focus,&:hover,&$active": {
            boxShadow: "inherit"
        }
    },
    active: {},
    track: {
        height: 8,
        borderRadius: 4
    },
    rail: {
        height: 8,
        borderRadius: 4
    }
})(Slider);

// work with colors
var gradient = tinygradient(["#fc6203", "#fcf003", "#80fc03"]);
var colorsHsv = gradient.hsv(89, true);

function BearsFactory() {

    // Int values
    const [headAndBodyColor, setHeadAndBodyColor] = useState(10);
    const [mouthAndBellyColor, setMouthAndBellyColor] = useState(10);
    const [earsColor, setEarsColor] = useState(10);
    const [nailsColor, setNailsColor] = useState(10);

    const [bearDNA, setBearDNA] = useState("10101010");

    // colors that change dynamicly on SVG Bear
    const [colorOne, setColorOne] = useState("#D41C1C");
    const [colorTwo, setColorTwo] = useState("#000");
    const [colorThree, setColorThree] = useState("#000");
    const [colorFour, setColorFour] = useState("#000");

    // for Created Alert
    const [showCreatedAlert, setShowCreatedAlert] = useState(false);
    const hideCreatedAlert = () => {
        setShowCreatedAlert(false);
    }

    const recalculateBearDNA = React.useCallback(() => {
        setBearDNA(`${headAndBodyColor}${mouthAndBellyColor}${earsColor}${nailsColor}`);
    }
    , [headAndBodyColor, mouthAndBellyColor, earsColor, nailsColor]);

    const setColorByDNA = () => {
        let currectColorOne = colorsHsv[headAndBodyColor - 1].toString(16);
        let currectColorTwo = colorsHsv[mouthAndBellyColor - 1].toString(16);
        let currectColorThree = colorsHsv[earsColor - 1].toString(16);
        let currectColorFour = colorsHsv[nailsColor - 1].toString(16);
        setColorOne(currectColorOne);
        setColorTwo(currectColorTwo);
        setColorThree(currectColorThree);
        setColorFour(currectColorFour);
    }

    const createNewBear = (genes) => {
        createBearGen0(genes).then(transaction => {
            console.log("SUCCSESS!!!!!!!!!");
            console.log(transaction);
            setShowCreatedAlert(true);
        }).catch(error => {
            console.log("ERRORRRRRRRROOOOO!R!!!");
            console.log(error);
        });
    };

    const getTotalSupply = (genes) => {
        totalSupply().then(transaction => {
            console.log("SUCCSESS!!!!!!!!!");
            console.log(transaction);
        }).catch(error => {
            console.log("ERRORRRRRRRROOOOO!R!!!");
            console.log(error);
        });
    };

    useEffect(() => {
        recalculateBearDNA();
        setColorByDNA();
    });

    return (
        <div>
            <Grid item spacing={2} style={{ display: "flex", align: "center", margin: "40px" }}>
                <Dialog
                    open={showCreatedAlert}
                    onClose={hideCreatedAlert}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        You created a new Bear
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Congratulations!!!
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={hideCreatedAlert} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                <Grid item xs={20} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "40px" }}>
                    <BearSvg headAndBodyColor={colorOne} mouthAndBellyColor={colorTwo} earsColor={colorThree} nailsColor={colorFour} />
                    <Typography variant="h4" gutterBottom>{bearDNA}</Typography>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                            createNewBear(Number(bearDNA));
                        }}
                    >
                        Create New Bear
                    </Button>

                    <br/>

                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                            getTotalSupply();
                        }}
                    >
                        Get Total Supply
                    </Button>
                </Grid>

                <Grid item xs={10}>
                    <Paper style={{ margin: "10px", "padding": "12px" }}>
                       <Typography variant="h7" gutterBottom>Head and Body</Typography>
                        <PrettoSlider
                            min={10}
                            max={99}
                            step={1}
                            marks
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            defaultValue={0}
                            value={headAndBodyColor}
                            onChange={(event, value) => {
                                setHeadAndBodyColor(value);
                                recalculateBearDNA();
                                let currectColorOne = colorsHsv[headAndBodyColor - 1].toString(16);
                                setColorOne(currectColorOne);
                            }}
                        />
                    </Paper>

                    <Paper style={{ margin: "10px", "padding": "12px" }}>
                        <Typography variant="h7" gutterBottom>Mouth, Belly and Ears</Typography>
                        <PrettoSlider
                            min={10}
                            max={99}
                            step={1}
                            marks
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            defaultValue={0}
                            value={mouthAndBellyColor}
                            onChange={(event, value) => {
                                setMouthAndBellyColor(value);
                                recalculateBearDNA();
                                setColorTwo(colorsHsv[mouthAndBellyColor - 1].toString(16));
                            }}
                        />
                    </Paper>

                    <Paper style={{ margin: "10px", "padding": "12px" }}>
                        <Typography variant="h7" gutterBottom>Ears Color</Typography>
                        <PrettoSlider
                            min={10}
                            max={99}
                            step={1}
                            marks
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            defaultValue={0}
                            value={earsColor}
                            onChange={(event, value) => {
                                setEarsColor(value);
                                recalculateBearDNA();
                                setColorThree(colorsHsv[earsColor - 1].toString(16));
                            }}
                        />
                    </Paper>

                    <Paper style={{ margin: "10px", "padding": "12px" }}>
                        <Typography variant="h7" gutterBottom>Nails Color</Typography>
                        <PrettoSlider
                            min={10}
                            max={99}
                            step={1}
                            marks
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            defaultValue={0}
                            value={nailsColor}
                            onChange={(event, value) => {
                                setNailsColor(value);
                                recalculateBearDNA();
                                setColorFour(colorsHsv[nailsColor - 1].toString(16));
                            }}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default BearsFactory;
