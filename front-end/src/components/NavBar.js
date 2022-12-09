import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import { Link } from "react-router-dom";

const drawerWidth = 240;
// const navItems = ["Home", "Map"];

function NavBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Aesthetic Runs
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton component={Link} to="/">
            <ListItemText>Home</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component={Link} to="/Map">
            <ListItemText>Map</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component={Link} to="/Login">
            <ListItemText>Login</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" position="sticky">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Button component={Link} to="/" sx={{ color: "#fff" }}>
            Aesthetic Runs
          </Button>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          ></Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button component={Link} to="/Home" sx={{ color: "#fff" }}>
              Home
            </Button>
            <Button component={Link} to="/Map" sx={{ color: "#fff" }}>
              Map
            </Button>
            {/* <Button component={Link} to="/Profile" sx={{ color: "#fff" }}>
              Profile
            </Button> */}
            <Button component={Link} to="/QuickRuns" sx={{ color: "#fff" }}>
              QuickRuns
            </Button>
            <Button component={Link} to="/Login" sx={{ color: "#fff" }}>
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default NavBar;
