import React, { useState, useEffect } from "react";
import '../css/BearsFactory.css';
import '../css/bear.scss';
import CustomSlider from "../components/CustomSlider";
import { Slider, Typography, Paper, Grid, Button } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import HeaderBar from "../components/HeaderBar";
import BearSvg from "../components/BearSvg";
import tinygradient from "tinygradient";

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
var colorsHsv = gradient.hsv(256, true);

function BearsFactory() {

    // Int values
    const [headAndBodyColor, setHeadAndBodyColor] = useState(0);
    const [mouthAndBellyColor, setMouthAndBellyColor] = useState(0);
    const [earsColor, setEarsColor] = useState(0);
    const [nailsColor, setNailsColor] = useState(0);

    const [bearDNA, setBearDNA] = useState("");

    // colors that change dynamicly on SVG Bear
    const [colorOne, setColorOne] = useState("#D41C1C");
    const [colorTwo, setColorTwo] = useState("#000");
    const [colorThree, setColorThree] = useState("#000");
    const [colorFour, setColorFour] = useState("#000");

    const recalculateBearDNA = React.useCallback(() => {
        var stringFirst = `${headAndBodyColor}`;
        var stringSecond = `${mouthAndBellyColor}`;
        var stringThird = `${earsColor}`;
        var stringFourth = `${nailsColor}`;

        if (stringFirst.length == 1) {
            stringFirst = "00" + stringFirst;
        } else if (stringFirst.length == 2) {
            stringFirst = "0" + stringFirst;
        }

        if (stringSecond.length == 1) {
            stringSecond = "00" + stringSecond;
        } else if (stringSecond.length == 2) {
            stringSecond = "0" + stringSecond;
        }

        if (stringThird.length == 1) {
            stringThird = "00" + stringThird;
        } else if (stringThird.length == 2) {
            stringThird = "0" + stringThird;
        }

        if (stringFourth.length == 1) {
            stringFourth = "00" + stringFourth;
        } else if (stringFourth.length == 2) {
            stringFourth = "0" + stringFourth;
        }

        setBearDNA(stringFirst + stringSecond + stringThird + stringFourth);
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

    useEffect(() => {
        recalculateBearDNA()
    });

    return (
        <div>
            <Grid item spacing={2} style={{ display: "flex", align: "center", margin: "40px" }}>
                <Grid item xs={20} style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: "center", margin: "40px" }}>
                    <BearSvg headAndBodyColor={colorOne} mouthAndBellyColor={colorTwo} earsColor={colorThree} nailsColor={colorFour} />
                    <Typography variant="h4" gutterBottom>{bearDNA}</Typography>
                </Grid>

                <Grid item xs={10}>
                    <Paper style={{ margin: "10px", "padding": "12px" }}>
                       <Typography variant="h7" gutterBottom>Head and Body</Typography>
                        <PrettoSlider
                            min={1}
                            max={256}
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
                            min={1}
                            max={256}
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
                            min={1}
                            max={256}
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
                            min={1}
                            max={256}
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
