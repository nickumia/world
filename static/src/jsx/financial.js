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
  const [net, setNet] = React.useState(true);
  const [inc, setInc] = React.useState(true);
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
  const handleNet = () => {
    setNet(false);
    setInc(true);
  };
  const handleInc = () => {
    setNet(true);
    setInc(false);
  };

  return (
    <React.Fragment>

    <Typography variant="h4" marked="center" align="center" component="h1" style={{paddingTop: "2%"}}>
      Understanding the <i><b>Net Worth</b></i> vs. <i><b>Income</b></i> Debate
    </Typography>

      <ImageList sx={{ width: "100%", height: "100%" }} cols={1}
        style={{width: "90%", marginLeft: "auto", marginRight: "auto"}}>
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

    <Typography variant="p" marked="center" align="center" component="p" style={{paddingTop: "2%"}}>
      Select the option that describes the lifestyle of interest
    </Typography>
    <ButtonGroup
      color="primary"
      disabled={false}
      orientation="horizontal"
      size="large"
      variant="contained"
      style={{display: "flex", justifyContent: "center", boxShadow: "none"}}
    >
      <Button onClick={handleAbove} color={above ? "primary" : "secondary"}>Living Above<br/>Your Means</Button>
      <Button onClick={handleAt} color={at ? "primary" : "secondary"}>Living At<br/>Your Means</Button>
      <Button onClick={handleBelow} color={below ? "primary" : "secondary"}>Living Below<br/>your Means</Button>
    </ButtonGroup>

    <Typography variant="p" marked="center" align="center" component="p" style={{paddingTop: "2%"}}>
      Select the option that describes the financial view of interest
    </Typography>
    <ButtonGroup
      color="primary"
      disabled={false}
      orientation="horizontal"
      size="large"
      variant="contained"
      style={{display: "flex", justifyContent: "center", boxShadow: "none"}}
    >
      <Button onClick={handleNet} color={net ? "primary" : "secondary"}>Net Worth</Button>
      <Button onClick={handleInc} color={inc ? "primary" : "secondary"}>Income</Button>
    </ButtonGroup>

    <Typography variant="p" marked="center" align="center" component="p"
      style={{paddingTop: "2%", width: "90%", marginLeft: "auto", marginRight: "auto"}}>
      {!above && !net && `
        If Nick lives above his means, his net worth will have a decreasing trend.
        It is hard to sustain any level of true net worth in this type of lifestyle.
        Either Nick will use his own money, depleting his money directly, OR
        he'll take on debt that will effectively reduce his net worth, if he is not
        able to pay off or satisfy the debt through other means.
      `}
      {!above && !inc && `
        If Nick lives above his means, he will require an increasing income to meet the
        need of always spending more than he has. With only active income, this will be
        mentally, psychologically and physically demanding to maintain. Passive income
        helps to assist in the management required to sustain increasing income.
      `}
      {!at && !net && `
        If Nick lives at his current means, his net worth will remain constant.
        If nothing else changes in life, this is the "goldilocks" condition. It might
        be manageable if his current net worth can weather him through changes or
        unexpected events over the rest of his life. With a high net worth, there is
        flexibility (and possibly freedom). With a low net worth, this is a bit dangerous.
      `}
      {!at && !inc && `
        If Nick is living at his means, he simply needs to maintain the activities
        generating his current level of income. Alternatively, he can shift asset
        classes to earn the same level of income through other means. He has the
        freedom to explore without needing to constantly be looking for more. If
        Nick's net worth is high enough, it can used to generate income.
      `}
      {!below && !net && `
        If Nick lives below his means, his net worth will have an increasing trend.
        If he is looking to accumulate financial resources to achieve a goal, this
        is the only method to achieve that. There is safety in this scenario because
        there is freedom to use an increasing net worth to improve the quality of life.
      `}
      {!below && !inc && `
        If Nick lives below his means, he has freedom to not spend as much attention to
        his income activities. There is safety in knowing that his income can face some
        interruption and he'll be able to satisfy ends meet. If he wants to save money
        for unexpected future expenses, he has that luxury. If he wants to increase his
        income to increase his net worth faster, he has that option as well.
      `}
    </Typography>
    <Typography variant="p" marked="center" align="center" component="p"
      style={{paddingTop: "2%", width: "90%", marginLeft: "auto", marginRight: "auto"}}><b>
      {!above && !net && `
        It's hard to manage living above your means while being in a Net Worth mindset.
      `}
      {!above && !inc && `
        Constantly needing to increase income to sustain living above your means is unsustainable (some people might revel in this, but the great majority probably don't).
      `}
      {!at && !net && `
        Having Net Worth is a choice in this scenario because whether your Net Worth is $1T or $100, it's mostly about personal preference.  There is little to no difference in practical application.
      `}
      {!at && !inc && `
        There is some flexibility in managing income in this scenario.
      `}
      {!below && !net && `
        Living below your means is the only way of increasing financial Net Worth. (P.S. I added "financial" before Net Worth because we all technically have an infinite net worth in untapped potential.)
      `}
      {!below && !inc && `
        Living below your means gives freedom from income.
      `}
    </b></Typography>
    </React.Fragment>
  );
}
