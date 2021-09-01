import React from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { MobileStepper } from "@material-ui/core"

import SwipeableViews from "react-swipeable-views"
import { autoPlay } from "react-swipeable-views-utils"

import "./components.css"
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const tutorialSteps = [
  {
    label: "1",
    imgPath: "https://c0.wallpaperflare.com/preview/105/765/236/blue-building-ikea-store.jpg",
    text: true,
  },
  {
    label: "2",
    imgPath: "https://www.desktopbackground.org/p/2012/12/27/505553_ikea-makes-first-greentech-investment_1024x768_h.jpg",
  },
  {
    label: "3",
    imgPath: "https://c1.wallpaperflare.com/preview/149/687/609/ikea-building-warehouse-furniture.jpg",
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 400,
    display: "block",
    maxWidth: "100%",
    overflow: "hidden",
    width: "100%",
  },
}))

function SwipeableTextMobileStepper() {
  const classes = useStyles()
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = tutorialSteps.length

  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
        {tutorialSteps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <>
                <div className="slider_img" style={{ backgroundImage: `url(${step.imgPath})` }}></div>{" "}
              </>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper steps={maxSteps} position="static" variant="dots" activeStep={activeStep} />
    </div>
  )
}

export default SwipeableTextMobileStepper
