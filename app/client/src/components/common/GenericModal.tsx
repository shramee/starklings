import CloseIcon from "@mui/icons-material/Close";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    Grid,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import { isMobileOnly } from "react-device-detect";


const openInNewTab = (url: string) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export interface GenericModalProps {
  open: boolean;
  handleClose: () => void;
  image_src: string;
  image_alt: string;
  title: string;
  date: string;
  description: string;
  button_text: string;
  button_link: string;
}

export const GenericModal = ({ open, handleClose, image_src, image_alt, title, date, description, button_text, button_link}: GenericModalProps) => {
  const handleDontShowAgain = () => {
    localStorage.setItem("starknet_hackathon-modal-dismissed", "true");
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: "transparent",
          boxShadow: "none",
          overflow: "visible",
          margin: 2,
        },
      }}
    >
      <DialogContent
        sx={{
          p: 0,
          borderRadius: 3,
          overflow: "hidden",
          background: "linear-gradient(135deg, #4b30aa 0%, #a22f6a 100%)",
          position: "relative",
        }}
      >
        {/* Close button */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Side-by-side layout */}
        <Grid container>
          {/* Left side - Image */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <img
                onClick={() => openInNewTab(button_link)}
                src={image_src}
                alt={image_alt}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                }}
              />
            </Box>
          </Grid>

          {/* Right side - Content */}
          {!isMobileOnly && (
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                  color: "white",
                }}
              >
                {/* Text content */}
                <Typography
                  variant="h4"
                  component="h2"
                  fontWeight="bold"
                  textAlign="center"
                  gutterBottom
                >
                    {title}
                </Typography>

                <Typography
                  variant="subtitle1"
                  textAlign="center"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                    {date}
                </Typography>

                <Typography textAlign="center" sx={{ my: 3 }}>
                   {description}
                </Typography>

                {/* Buttons */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleDontShowAgain}
                    sx={{
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      color: "white",
                      borderRadius: 2,
                      py: 1.5,
                    }}
                  >
                    Don't show again
                  </Button>

                  <Button
                    variant="contained"
                    fullWidth
                    target="_blank"
                    href={button_link}
                    sx={{
                      bgcolor: "#f37646",
                      color: "white",
                      textAlign: "center",
                      borderRadius: 2,
                      py: 1.5,
                      "&:hover": {
                        bgcolor: "#e06535",
                      },
                    }}
                  >
                    {button_text}
                  </Button>
                </Stack>
              </Box>
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
