import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Tooltip from '@mui/material/Tooltip';
import cyan from "@material-ui/core/colors/cyan";
import orange from "@material-ui/core/colors/orange";

import List from '@mui/material/List';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from "@mui/material/Button";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import json_parse from './json_parse';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));
const itemData = [
  {
    img: "./financial_concepts.mmd.svg",
    title: 'Financial Literacy',
  },
];

export default function Financial() {

  const classes = useStyles();
  const [above, setAbove] = React.useState(true);
  const [at, setAt] = React.useState(true);
  const [below, setBelow] = React.useState(true);
  const handleAbove = () => {
    setAbove(false);
    setAt(true);
    setBelow(true);
  };
  const handleAt = () => {
    setAbove(true);
    setAt(false);
    setBelow(true);
  };
  const handleBelow = () => {
    setAbove(true);
    setAt(true);
    setBelow(false);
  };

  return (
    <React.Fragment>

      <ImageList sx={{ width: "100%", height: "100%" }} cols={1} rowHeight={'100%'}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

    <ButtonGroup
      color="primary"
      disabled={false}
      orientation="horizontal"
      size="large"
      variant="contained"
      style={{display: "flex", justifyContent: "center", paddingTop: "2%", boxShadow: "none"}}
    >
      <Button onClick={handleAbove} color={above ? "primary" : "secondary"}>Living Above<br/>Your Means</Button>
      <Button onClick={handleAt} color={at ? "primary" : "secondary"}>Living At<br/>Your Means</Button>
      <Button onClick={handleBelow} color={below ? "primary" : "secondary"}>Living Below<br/>your Means</Button>
    </ButtonGroup>

    <ButtonGroup
      color="primary"
      disabled={false}
      orientation="horizontal"
      size="large"
      variant="outlined"
      style={{display: "flex", justifyContent: "center", paddingTop: "2%"}}
    >
      <Button>Net Worth</Button>
      <Button>Income</Button>
    </ButtonGroup>

    </React.Fragment>
  );
}
