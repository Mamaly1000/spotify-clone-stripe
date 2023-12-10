import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import CustomButton from "../inputs/Button";
import cover from "@/assets/cover.jpg";
import LikeButton from "../inputs/LikeButton";
import { Info } from "@mui/icons-material";
import CustomMenu from "../menu/CustomMenu";
import { ListItem, MenuItem } from "@mui/material";

export default function MediaControlCard({
  image,
  displayLike,
  displayFollowing,
  displayInfo,
  info,
}: {
  displayFollowing?: boolean;
  info?: { title?: string; value?: string; icon?: any }[];
  displayInfo?: boolean;
  displayLike?: boolean;
  image?: {
    src?: string;
    alt?: string;
  };
}) {
  const [displayInfos, setDisplayInfos] = React.useState<any>(false);
  const theme = useTheme();
  return (
    <Card
      sx={{
        display: "flex",
        background: "var(--secondary-color)",
        color: "var(--text-color)",
        minWidth: { xs: "100%", lg: "400px" },
        justifyContent: "space-between",
        maxWidth: "fit-content",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: { xs: "auto", md: "250px" },
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="text" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <Box
          sx={{
            minWidth: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            pb: 2,
            gap: 2,
          }}
        >
          <CustomButton buttonType="icon" aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </CustomButton>
          <CustomButton buttonType="icon" aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </CustomButton>
          <CustomButton buttonType="icon" aria-label="next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </CustomButton>{" "}
          {displayLike && <LikeButton />}
          {displayInfo && (
            <Box>
              <CustomButton buttonType="icon" onClick={setDisplayInfos}>
                <Info />
              </CustomButton>
              <CustomMenu
                anchorElUser={displayInfos}
                handleCloseUserMenu={() => setDisplayInfos(null)}
                anchorOrigin={{
                  horizontal: "center",
                  vertical: "center",
                }}
                keepMounted
                transformOrigin={{
                  horizontal: "center",
                  vertical: "center",
                }}
                sx={{
                  minWidth: { xs: "150px", md: "300px" },
                }}
              >
                {info?.map((i) => (
                  <ListItem
                    sx={{
                      textTransform: "capitalize",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                    key={i.value}
                  >
                    {i.icon} {i.title} : {i.value}
                  </ListItem>
                ))}
              </CustomMenu>
            </Box>
          )}
          {displayFollowing && <CustomButton>follow</CustomButton>}
        </Box>
      </Box>
      {!!image && (
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={cover.src}
          alt="Live from space album cover"
        />
      )}
    </Card>
  );
}
