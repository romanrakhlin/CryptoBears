import React, { useState, useEffect } from "react";
import '../css/BearsFactory.css';
import '../css/bear.scss';
import CustomSlider from "../components/CustomSlider";
import { Slider, Typography, Paper, Grid, Button } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import HeaderBar from "../components/HeaderBar"

const useStyles = makeStyles(theme => ({
    gridContainer: {

    },
    sliderPaper: {
        padding: 24
    },
}));

const PrettoSlider = withStyles({
  root: {
    color: "#a2df77",
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

function BearsFactory() {
    const [value, setValue] = React.useState(50);

    useEffect(() => {
        console.log("Slider value: " + value);
    }, [value]);

    const classes = useStyles();

    return (
        <div>
            <Grid item spacing={2} style={{ display: "flex", align: "center", margin: "40px" }}>
            {/*<Grid container spacing={2} columns={16}>*/}
                <Grid item xs={8}>
                    <div class="bearWrapper">
                            <div class="ear right"></div>
                            <div class="ear left"></div>
                            <div class="jowls right"></div>
                            <div class="jowls left"></div>
                                
                            <div class="face">
                                <div class="eye right"></div>
                                <div class="eye left"></div>
                                    
                                <div class="cheeks">
                                    <div class="nose"></div>
                                    <div class="mouth"></div>
                                </div>

                                <div class="belly"></div>
                                    
                                <div class="foot right">
                                    <div class="pads"></div>
                                </div>
                                    
                                <div class="foot left">
                                    <div class="pads"></div>
                                </div>
                            </div>
                        </div> 
                </Grid>

                <Grid item xs={10}>
                    <Paper className={classes.sliderPaper} style={{ margin: "10px" }}>
                        <Typography gutterBottom>Head and Body</Typography>
                        <PrettoSlider
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            defaultValue={10}
                            value={value}
                            onChange={(event, v) => {
                                setValue(v);
                            }}
                        />
                    </Paper>

                    <Paper className={classes.sliderPaper} style={{ margin: "10px" }}>
                        <Typography gutterBottom>Mouth and Belly</Typography>
                        <PrettoSlider
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            defaultValue={10}
                            value={value}
                            onChange={(event, v) => {
                                setValue(v);
                            }}
                        />
                    </Paper>

                    <Paper className={classes.sliderPaper} style={{ margin: "10px" }}>
                        <Typography gutterBottom>Ears and Feets</Typography>
                        <PrettoSlider
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            defaultValue={10}
                            value={value}
                            onChange={(event, v) => {
                                setValue(v);
                            }}
                        />
                    </Paper>

                    <Paper className={classes.sliderPaper} style={{ margin: "10px" }}>
                        <Typography gutterBottom>Eyes Color</Typography>
                        <PrettoSlider
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            defaultValue={10}
                            value={value}
                            onChange={(event, v) => {
                                setValue(v);
                            }}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default BearsFactory;
