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
import { useEffect } from "react";
import { isMobileOnly } from "react-device-detect";


const openInNewTab = (url: string) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export interface GenericModalBaseProps {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  image_src: string;
  image_alt: string;
  id: string;
  link: string;
};

export interface GenericModalContentProps extends GenericModalBaseProps {
  title: string;
  date: string;
  description: string;
  button_text: string;
}

export interface GenericModalNoContentProps extends GenericModalBaseProps {
  title?: undefined;
  date?: undefined;
  description?: undefined;
  button_text?: undefined;
}

type GenericModalProps = GenericModalContentProps | GenericModalNoContentProps;

export const GenericModal = ({ id, open, handleClose, handleOpen, image_src, image_alt, title, date, description, button_text, link }: GenericModalProps) => {
  useEffect(() => {
    if (localStorage.getItem(id + "-modal-dismissed") === "true") {
      return;
    } else {
      handleOpen();
    }
  }, []);

  const handleDontShowAgain = () => {
    localStorage.setItem(id + "-modal-dismissed", "true");
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
            md={title ? 6 : 12}
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
              <a href={link} style={{ display: 'block' }}>
                <img
                  onClick={() => openInNewTab(link)}
                  src={image_src}
                  alt={image_alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                  }}
                />
              </a>
              {!title && <Button
                variant="text"
                fullWidth
                onClick={handleDontShowAgain}
                sx={{
                  color: "white",
                  borderRadius: 2,
                  py: 1.5,
                }}
              >
                Don't show again
              </Button>}

            </Box>
          </Grid>

          {/* Right side - Content */}
          {!isMobileOnly && title && (
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  px: 2,
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
                >
                  <Button
                    variant="outlined"
                    onClick={handleDontShowAgain}
                    sx={{
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      color: "white",
                      borderRadius: 2,
                      flex: "0 1 22em",
                      py: 1,
                    }}
                  >
                    Don't show again
                  </Button>

                  <Button
                    variant="contained"
                    fullWidth
                    target="_blank"
                    href={link}
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
