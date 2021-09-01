import React from "react"
import { AppBar, Toolbar, Typography, Box } from "@material-ui/core"
import "./components.css"
const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box className="header">
          <Box className="header_title">
            <Typography variant="h4" component="h4">
              INVENTORY
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
