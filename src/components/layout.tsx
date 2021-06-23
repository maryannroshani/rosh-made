import React, { FC, useState } from "react"
import {
  AppBar,
  createMuiTheme,
  CssBaseline,
  IconButton,
  MuiThemeProvider,
  useMediaQuery,
  useTheme,
} from "@material-ui/core"
import styled from "styled-components"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import { graphql, navigate, useStaticQuery } from "gatsby"
import SlideInMenu from "./slide-in-menu"
import CloseIcon from "@material-ui/icons/Close"

const Header = styled(AppBar)`
  min-height: 8rem;
  padding-left: 4rem;
  padding-right: 4rem;
  box-shadow: none;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #5f5f5f;
  background-color: #fff;
  z-index: 34;
`

const LogoHeader = styled.div`
  min-height: 8rem;
`

const Container = styled.div`
  padding-left: 4rem;
  padding-right: 4rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const themeLight = createMuiTheme({
  palette: {
    background: {
      default: "#fff",
    },
  },
})

const BottomBar = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  background-color: #fff;
  border-top: solid 1px #f0f0f0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  z-index: 36;
`

const Layout: FC = ({ children }) => {
  const [visible, setVisible] = useState(false)
  const theme = useTheme()
  const mdAndUp = useMediaQuery(theme.breakpoints.up("md"))

  const data = useStaticQuery(graphql`
    query LogoQuery {
      logo: file(base: { eq: "logo.png" }) {
        publicURL
      }
    }
  `)

  return (
    <MuiThemeProvider theme={themeLight}>
      <CssBaseline />
      <Header position={mdAndUp ? "fixed" : "relative"}>
        <div>
          {mdAndUp && (
            <>
              <IconButton onClick={() => setVisible(true)} aria-label="menu">
                <MenuIcon fontSize="large" />
              </IconButton>
              <SlideInMenu visible={visible} close={() => setVisible(false)} />
            </>
          )}
        </div>
        <div onClick={() => navigate("/")}>
          <img
            style={{ height: "4.5rem", marginTop: 4 }}
            src={data.logo.publicURL}
            alt="logo"
          />
        </div>
        <div>{mdAndUp && <SearchIcon fontSize="large" />}</div>
      </Header>
      {mdAndUp && <LogoHeader />}
      <Container>{children}</Container>
      {mdAndUp || (
        <>
          <BottomBar>
            <div>
              <IconButton
                onClick={() => setVisible(!visible)}
                aria-label="menu"
              >
                {visible ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </div>
            <div>
              <IconButton aria-label="menu">
                <SearchIcon fontSize="default" />
              </IconButton>
            </div>
          </BottomBar>
          <SlideInMenu visible={visible} close={() => setVisible(false)} />
        </>
      )}
    </MuiThemeProvider>
  )
}

export default Layout
