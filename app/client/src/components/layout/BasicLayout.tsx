import { Link, Typography, Button, Menu, MenuItem } from "@mui/material";
import { School } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { isMobileOnly } from "react-device-detect";
import { GitHubLoginButton } from "../github/GitHubLoginButton";
import { About } from "./About";
import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AssessmentIcon from "@mui/icons-material/Assessment";

const NAV_HEIGHT = "50px";

interface IBasicLayoutProps {
  children: JSX.Element;
}
export const BasicLayout = ({ children }: IBasicLayoutProps) => {
  const location = useLocation();
  const path = location.pathname.substring(1);
  const navigate = useNavigate();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const menuOpen = Boolean(anchorEl);
  
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleGraduatesClick = () => {
    navigate("/graduates");
    handleMenuClose();
  };
  
  const handleStudentExercisesClick = () => {
    navigate("/check-student");
    handleMenuClose();
  };
  
  const handleMentorUtilsClick = () => {
    navigate("/evaluate-students");
    handleMenuClose();
  };
  return (
    <Box
      className={path.replaceAll("/", "-") || "home"}
      sx={{ height: "100%", backgroundColor: "#242424", color: "#FFF" }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Box
          component="header"
          id="site-header"
          sx={{
            height: NAV_HEIGHT,
            zIndex: 1000,
            width: "100%",
            backgroundColor: "#111",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1, ml: 2 }}>
            <img width="32px" src="/logo.svg" alt="starklings logo" />
            <Link sx={{ textDecoration: "none" }} href="/">
              <Typography
                id="logotext-header"
                className="logotext"
                variant="h3"
                sx={{ fontSize: 20, color: "#FFF", mt: "3px" }}
              >
                starklings
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", mr: 2 }}>
            <Tooltip title="Starklings App Assessment">
              <IconButton
                id="header-icon"
                onClick={handleMenuClick}
                sx={{ p: 0.5, color: "#FFF" }}
                aria-label="about"
              >
                <AssessmentIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              MenuListProps={{
                "aria-labelledby": "admin-menu-button",
              }}
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: "#333",
                  color: "#FFF",
                },
              }}
            >
              <MenuItem onClick={handleGraduatesClick}>Graduates</MenuItem>
              <MenuItem onClick={handleStudentExercisesClick}>
                Student Progress
              </MenuItem>
              <MenuItem onClick={handleMentorUtilsClick}>
                Student Evaluation
              </MenuItem>
            </Menu>
            <About />
            {!isMobileOnly && <GitHubLoginButton />}
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
