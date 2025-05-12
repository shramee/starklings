import React from "react";
import { Dialog, DialogContent, IconButton, Button, Grid, Box, Typography, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  content?: React.ReactNode;
  primaryButton?: {
    text: string;
    onClick: () => void;
    style?: object;
  };
  secondaryButton?: {
    text: string;
    onClick: () => void;
    style?: object;
  };
  imageUrl?: string;
  imageAlt?: string;
  sideBySide?: boolean;
  backgroundStyles?: object;
  dialogStyles?: object;
}

export const GenericModal: React.FC<GenericModalProps> = ({
  open,
  onClose,
  title,
  subtitle,
  content,
  primaryButton,
  secondaryButton,
  imageUrl,
  imageAlt,
  sideBySide = true,
  backgroundStyles = {},
  dialogStyles = {},
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: "transparent",
          boxShadow: "none",
          overflow: "visible",
          margin: 2,
          ...dialogStyles,
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
          ...backgroundStyles,
        }}
      >
        {/* Close button */}
        <IconButton
          onClick={onClose}
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

        {/* Layout */}
        <Grid container>
          {/* Left side - Image */}
          {imageUrl && sideBySide && (
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
                  src={imageUrl}
                  alt={imageAlt}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                  }}
                />
              </Box>
            </Grid>
          )}

          {/* Right side - Content */}
          <Grid item xs={12} md={sideBySide ? 6 : 12}>
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
              {/* Title */}
              {title && (
                <Typography
                  variant="h4"
                  component="h2"
                  fontWeight="bold"
                  textAlign="center"
                  gutterBottom
                >
                  {title}
                </Typography>
              )}

              {/* Subtitle */}
              {subtitle && (
                <Typography
                  variant="subtitle1"
                  textAlign="center"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  {subtitle}
                </Typography>
              )}

              {/* Content */}
              {content && (
                <Typography textAlign="center" sx={{ my: 3 }}>
                  {content}
                </Typography>
              )}

              {/* Buttons */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mt: 2 }}
              >
                {secondaryButton && (
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={secondaryButton.onClick}
                    sx={{
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      color: "white",
                      borderRadius: 2,
                      py: 1.5,
                      ...secondaryButton.style,
                    }}
                  >
                    {secondaryButton.text}
                  </Button>
                )}

                {primaryButton && (
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={primaryButton.onClick}
                    sx={{
                      bgcolor: "#f37646",
                      color: "white",
                      textAlign: "center",
                      borderRadius: 2,
                      py: 1.5,
                      "&:hover": {
                        bgcolor: "#e06535",
                      },
                      ...primaryButton.style,
                    }}
                  >
                    {primaryButton.text}
                  </Button>
                )}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};