"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { CssBaseline, Slide, useScrollTrigger } from "@mui/material";
import OrbitFont from "@/fonts/orbit";
import { SpotifyIcon } from "@/assets/pics";
import CustomMenu from "@/components/menu/CustomMenu";
import {
  AccountBalance,
  AppRegistrationOutlined,
  Dashboard,
  Login,
  Logout,
  Money,
} from "@mui/icons-material";
import CustomButton from "@/components/inputs/Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import usePlayer from "@/hooks/usePlayer";
import useSubscribeModal from "@/hooks/useSubscribeModal";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}
function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function CustomHeader(props: any) {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const supabaseClient = useSupabaseClient();
  const { user, isLoading } = useUser();
  const onPlay = usePlayer();
  const { onOpen } = useAuthModal();
  const subscribeModal = useSubscribeModal();
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    // we have to reset any playing songs
    if (error) {
      toast.error(error.message);
    } else {
      onPlay.reset();
      toast.success(`${user?.email} logged out successfuly`);
      router.refresh();
    }
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = React.useMemo(
    () =>
      !!user
        ? [
            {
              label: "Account",
              icon: (
                <AccountBalance
                  sx={{ color: "var(--text-color) !important" }}
                />
              ),
              href: "/account",
            },
            {
              label: "Logout",
              icon: <Logout sx={{ color: "var(--text-color) !important" }} />,
              fn: () => {
                handleLogout();
              },
            },
            {
              label: "Subscribe",
              icon: <Money sx={{ color: "var(--text-color) !important" }} />,
              fn: () => {
                subscribeModal.onOpen();
              },
            },
          ]
        : [
            {
              label: "SignUp",
              icon: (
                <AppRegistrationOutlined
                  sx={{ color: "var(--text-color) !important" }}
                />
              ),
              fn: () => {
                onOpen();
              },
            },
            {
              label: "Subscribe",
              icon: <Money sx={{ color: "var(--text-color) !important" }} />,
              fn: () => {
                subscribeModal.onOpen();
              },
            },
          ],
    [user]
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll>
        <AppBar
          position="sticky"
          sx={{ background: "var(--secondary-color)", top: 0 }}
        >
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{ justifyContent: { md: "space-between" } }}
            >
              <Box sx={{ display: "flex", mr: 1 }}>
                <img src={SpotifyIcon.src} className="w-[50px] h-[50px]" />
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: "flex",
                  flexGrow: 1,
                  fontFamily: OrbitFont.style.fontFamily,
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  textDecoration: "none",
                }}
              >
                Spotify
              </Typography>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <CustomButton
                    buttonType="icon"
                    onClick={!!!isLoading ? handleOpenUserMenu : undefined}
                    className={`${
                      isLoading ? "animate-pulse" : "animate-none"
                    }`}
                  >
                    <Avatar alt="Remy Sharp" />
                  </CustomButton>
                </Tooltip>
                <CustomMenu
                  sx={{ mt: "45px" }}
                  anchorElUser={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  handleCloseUserMenu={handleCloseUserMenu}
                  Routes={settings}
                />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  );
}
export default CustomHeader;
