import React from "react";
import { AppBar, Box, IconButton, Typography } from "@material-ui/core";
import IconPerson from "@material-ui/icons/Person";
import Toolbar from "@material-ui/core/Toolbar";
import { styled } from "@material-ui/core/styles";

const AppBarContainer = styled(AppBar)({
  // background: '#000'
  display: "flex",
});

const ToolBarContainer = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const LogoContainer = styled(Box)({});

const BedgeContainer = styled(Box)({
  display: "flex",
  // flexDirection: 'row-reverse',
  justifyContent: "flex-end",
});

// const SearchContainer = styled('div')({
//   position: 'relative',
//   borderRadius: '10px',
//   backgroundColor: 'rgba(255, 255, 255, 0.1)',
//   display: 'flex',
//   width: '100%',
//   marginLeft: '15px',
// })

// const SearchIconContainer = styled('div')({
//   height: '32px',
//   display: 'flex',
//   alignItems: 'center',
//   paddingLeft: '10px',
//   paddingRight: '10px',
// })

// const SearchInputContainer = styled(InputBase) ({
//   color: '#fff',
//   height: '32px',
// })

// interface SearchOptionProps {
//   value: string;
//   label: string;
// }

const TopBar: React.FC = () => {
  // const classes = useStyles();
  return (
    <div>
      <AppBarContainer position={"static"}>
        <ToolBarContainer>
          <LogoContainer>
            <Typography variant={"h6"}>TEST</Typography>
          </LogoContainer>
          <BedgeContainer>
            <IconButton component={"span"}>
              <IconPerson />
            </IconButton>
          </BedgeContainer>
        </ToolBarContainer>
      </AppBarContainer>
    </div>
  );
};

export default TopBar;
