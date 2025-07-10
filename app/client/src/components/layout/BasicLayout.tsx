import { Link, Typography, Button, Menu, MenuItem, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Box from "@mui/material/Box";
import { isMobileOnly } from "react-device-detect";
import { GitHubLoginButton } from "../github/GitHubLoginButton";
import { About } from "./About";
import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const NAV_HEIGHT = "50px";

interface IBasicLayoutProps {
  children: JSX.Element;
}
export const BasicLayout = ({ children }: IBasicLayoutProps) => {
  const location = useLocation();
  const path = location.pathname.substring(1);
  const navigate = useNavigate();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [accountInput, setAccountInput] = useState("");
  
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
    setDialogOpen(true);
    handleMenuClose();
  };
  
  const handleMentorUtilsClick = () => {
    navigate("/evaluate-students");
    handleMenuClose();
  };
  
  const handleDialogClose = () => {
    setDialogOpen(false);
    setAccountInput("");
  };
  
  const handleAccountSubmit = () => {
    if (accountInput.trim()) {
      navigate(`/check/${accountInput.trim()}`);
      handleDialogClose();
    }
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
            <About />
            <Button
              onClick={handleMenuClick}
              sx={{
                color: "#FFF",
                textTransform: "none",
                fontSize: 14,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              Admin ▼
            </Button>
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
              <MenuItem onClick={handleGraduatesClick}>Graduados</MenuItem>
              <MenuItem onClick={handleStudentExercisesClick}>
                Ejercicios completados de un alumno
              </MenuItem>
              <MenuItem onClick={handleMentorUtilsClick}>
                Utils para mentores
              </MenuItem>
            </Menu>
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
        
        <Dialog 
          open={dialogOpen} 
          onClose={handleDialogClose}
          PaperProps={{
            sx: {
              backgroundColor: "#333",
              color: "#FFF",
            },
          }}
        >
          <DialogTitle>Consultar ejercicios completados</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre de usuario de GitHub"
              type="text"
              fullWidth
              variant="outlined"
              value={accountInput}
              onChange={(e) => setAccountInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAccountSubmit();
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#FFF",
                  "& fieldset": {
                    borderColor: "#666",
                  },
                  "&:hover fieldset": {
                    borderColor: "#999",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#dd3d3d",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#CCC",
                  "&.Mui-focused": {
                    color: "#dd3d3d",
                  },
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} sx={{ color: "#CCC" }}>
              Cancelar
            </Button>
            <Button 
              onClick={handleAccountSubmit} 
              variant="contained"
              disabled={!accountInput.trim()}
              sx={{ 
                backgroundColor: "#dd3d3d",
                "&:hover": {
                  backgroundColor: "#bb2d2d",
                },
              }}
            >
              Consultar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};
