import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Tooltip from '@mui/material/Tooltip';
import amber from "@material-ui/core/colors/amber";
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

import SchoolIcon from '@mui/icons-material/School';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

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
const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

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
  const stayTunedClick = () => {
    alert('Stay Tuned for <a href="https://github.com/nickumia/nlp-web/issues/80">more information!</a>')
  }

  return (
    <React.Fragment>

    <Typography variant="h4" marked="center" align="center" component="h1" style={{paddingTop: "2%", paddingBottom: "2%"}}>
      Financial Literacy... Where to start?
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

		<Paper
      className="mobilec"
			style={{backgroundColor: amber[50], marginTop: '10px'}} sx={{py: 4}}>
    <Typography variant="h5" marked="center" align="center" component="h2">
      Understanding the <i><b>Net Worth</b></i> vs. <i><b>Income</b></i> Debate
    </Typography>
		<Paper
      className="mobilec"
			style={{backgroundColor: amber[100], marginTop: '10px'}} sx={{py: 4}}>
    <Typography variant="body1" marked="center" align="center" component="p">
      Select a lifestyle
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

    <Typography variant="body1" marked="center" align="center" component="p" style={{paddingTop: "2%"}}>
      Select a Financial Mindset
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

    <Typography variant="body1" marked="center" align="center" component="p"
      style={{paddingTop: "2%", marginLeft: "auto", marginRight: "auto"}}>
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
        Nick's net worth is high enough, it can be used to generate income.
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
    <Typography variant="body1" marked="center" align="center" component="p"
      style={{paddingTop: "2%", marginLeft: "auto", marginRight: "auto"}}><b>
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
    </Paper>
      <Typography variant="body1" marked="center" align="center" component="p" style={{paddingTop: "2%"}}>
        <i>Living above one's means</i> generally requires an <b>Income</b> mindset.
        <br/>
        <i>Living below one's means</i> generally allows for a <b>Net Worth</b> mindset.
        <br/>
        <i>Living above one's means</i> is more restrictive and demands more effort from a person.
        <br/>
        <i>Living below one's means</i> gives freedom from financial stress.
        <br/><br/>
        All of this doesn't mean that a person can't <i>live above their means</i> AND
        have a <b>Net Worth</b> mindset.<br/>
        It also doesn't mean that a person
        can't <i>live below their means</i> AND have an <b>Income</b> mindset.
        <br/><br/>
        <i>Living above one's means</i> and having a <b>Net Worth</b> mindset
        will result in an increasing <b>Income</b> as a byproduct.
        <br/>
        <i>Living below one's means</i> and having an <b>Income</b> mindset
        will result in having a high <b>Net Worth</b> as a byproduct.
      </Typography>
      <hr/>
      <Typography variant="body1" marked="center" align="center" component="p" style={{paddingTop: "2%"}}>
        Understanding who you are and your habits are key to having control
        of your finances.  In reality, we don't fit into just one of the
        scenarios outlined above.  We go through different seasons of each one.
        As a result, it's important to understand how to operate in each of them
        in some capacity.  Being able to identify which one describes our
        current situation will help to prioritize the financial decisions to
        make.  Some months we'll have more income.  Some months we'll have more
        expenses.  Being able to manage variations in the short-term will enable
        us to be aligned with our goals in the long-term.
        <br/>
      </Typography>
    </Paper>
		<Paper
      className="mobilec"
			style={{backgroundColor: amber[50], marginTop: '10px'}} sx={{py: 4}}>
    <Typography variant="h5" marked="center" align="center" component="h2">
      Defining goals
    </Typography>
    <Typography variant="body1" marked="center" align="center" component="p" style={{paddingTop: "2%"}}>
      A lot of financial advice tends to ask people to re-evaluate their entire
      life.  Given how unique each person's life and priorities are, it's not
      fair to give blanket advice for "common" situations.  Everyone should
      definitely introspect on whether they are doing what they want to.  However,
      if someone is looking to have a certain lifestyle, they should be able to
      work towards it.  Depending on the gravity of a person's situation some
      harsh sacrifices may help to more rapidly align their reality to their goals.
      However, that should be a personal, and <b>most importantly</b> an INFORMED,
      decision.<br/><br/>
      Finding and/or building a financial circle that supports your goals,
      activities and lifestyle are key in learning about finances and growing
      with life.<br/><br/>
      These goals should generally be assessed with respect to these dimensions:
    </Typography>
    <ButtonGroup
      color="primary"
      disabled={false}
      orientation="horizontal"
      size="large"
      variant="contained"
      style={{display: "flex", justifyContent: "center", boxShadow: "none"}}
    >
      <Button className="chip-button" onClick={stayTunedClick} style={{backgroundColor: "transparent"}}>
        <Chip className="chip-chip" icon=<SchoolIcon className="chip-svg" /> label={"Knowledge"} /></Button>
      <Button className="chip-button" onClick={stayTunedClick} style={{backgroundColor: "transparent"}}>
        <Chip className="chip-chip" icon=<BatteryChargingFullIcon className="chip-svg" /> label={"Energy"} /></Button>
      <Button className="chip-button" onClick={stayTunedClick} style={{backgroundColor: "transparent"}}>
        <Chip className="chip-chip" icon=<AccessTimeFilledIcon className="chip-svg" /> label={"Time"} /></Button>
      <Button className="chip-button" onClick={stayTunedClick} style={{backgroundColor: "transparent"}}>
        <Chip className="chip-chip" icon=<PeopleAltIcon className="chip-svg" /> label={"People"} /></Button>
      <Button className="chip-button" onClick={stayTunedClick} style={{backgroundColor: "transparent"}}>
        <Chip className="chip-chip" icon=<ShoppingBagIcon className="chip-svg" /> label={"Physical Manifestation"} /></Button>
    </ButtonGroup>
    </Paper>
    </React.Fragment>
  );
}
