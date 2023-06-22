import * as React from "react";
import { useSelector } from "react-redux";
//import react router dom
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export const TemporaryDrawer = () => {
  const navigate = useNavigate();
  // const userRole = useSelector((state) => state.user.currentUser.role);
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  //getlink will get the text when user click on button and make it a route to that text, then it will push the user to the link
  const getLink = (text) => {
    // const lowerCase = text.toLowerCase();
    // if (userRole) {
    //   navigate(`/${userRole}/${lowerCase}`);
    // } else {
    //   return;
    // }
  };
  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      // role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          "Bookings",
          "Services",
          "Customers",
          "Technicians",
          "Income",
          "Sign-out",
        ].map((text, index) => (
          <ListItem key={text}>
            <ListItemButton onClick={(e) => getLink(text)}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            {/* <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton> */}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <Button onClick={toggleDrawer("left", true)}>MENU</Button>
        <Drawer open={state["left"]} onClose={toggleDrawer("left", false)}>
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
};
