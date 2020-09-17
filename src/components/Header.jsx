import React, { useCallback, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { styled, useStyletron } from "baseui";
import { LabelSmall } from "baseui/typography";

import { ReactComponent as Logo } from "../assets/logo.svg";

const HeaderLinkRoot = styled("a", ({ $theme, $active }) => ({
  ...$theme.typography.LabelMedium,
  fontWeight: 600,
  color: $theme.colors.contentPrimary,
  textDecoration: "none",
  position: "relative",
  marginLeft: $theme.sizing.scale200,
  marginRight: $theme.sizing.scale200,
  paddingLeft: $theme.sizing.scale400,
  paddingRight: $theme.sizing.scale400,
  paddingTop: $theme.sizing.scale600,
  paddingBottom: $theme.sizing.scale600,
  borderTopLeftRadius: $theme.borders.radius200,
  borderTopRightRadius: $theme.borders.radius200,
  transition: `all ${$theme.animation.timing300} ${$theme.animation.easeInOutQuinticCurve}`,
  ":after": {
    content: '""',
    position: "absolute",
    backgroundColor: $theme.colors.contentPrimary,
    width: $active ? "100%" : "0%",
    opacity: $active ? "1" : "0",
    transition: `all ${$theme.animation.timing300} ${$theme.animation.easeInOutQuinticCurve}`,
    height: "4px",
    borderRadius: "2px",
    bottom: "-2px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  ":hover": {
    backgroundColor: "#eaeaea",
  },
}));

function HeaderLink({ to, children, ...rest }) {
  const history = useHistory();
  const location = useLocation();

  const isActive = useMemo(() => location.pathname === to, [location, to]);

  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      history.push(to);
    },
    [history, to]
  );

  return (
    <HeaderLinkRoot
      href={to}
      onClick={handleClick}
      {...(isActive && { $active: true })}
      {...rest}
    >
      {children}
    </HeaderLinkRoot>
  );
}

const HeaderRoot = styled("header", ({ $theme }) => ({
  top: 0,
  left: "30%",
  position: "fixed",
  width: "40%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: $theme.colors.backgroundSecondary,
  boxShadow: $theme.lighting.shadow400,
  borderBottomLeftRadius: $theme.borders.radius400,
  borderBottomRightRadius: $theme.borders.radius400,
  paddingTop: $theme.sizing.scale400,
}));

export default function Header({ isCompact }) {
  const [css] = useStyletron();

  return (
    <HeaderRoot
      $style={{
        ...(isCompact && {
          flexDirection: "row",
          width: "100%",
          paddingTop: 0,
          left: 0,
        }),
      }}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          flexDirection: isCompact ? "row" : "column",
          ...(!isCompact && { height: "80px" }),
          justifyContent: isCompact ? "start" : "space-evenly",
        })}
      >
        <Logo height={"30px"} />
        <LabelSmall
          $style={({ $theme }) => ({
            color: $theme.colors.contentTertiary,
            letterSpacing: "2px",
          })}
        >
          KORONAWIRUS.FYI
        </LabelSmall>
      </div>
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <HeaderLink to="/">Intro</HeaderLink>
        <HeaderLink to="/dane">Dane</HeaderLink>
      </div>
    </HeaderRoot>
  );
}
