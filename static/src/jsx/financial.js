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
    alert('Stay Tuned for more information: https://github.com/nickumia/nlp-web/issues/80')
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
    <Typography variant="body1" marked="center" align="center" component="p" style={{paddingTop: "2%"}}>
      Goals are defined mostly based on what a person find valuable.  An adventurous
      person might favor opportunities to experience the world.  A homebody might
      favor building and customizing their house.  A family-oriented person might
      take on more expenses to be able to support the ones they love.  The intrinsic
      quialites a person is born with and the beliefs and values that a person is 
      nurtured with have a great effect on how a person manages their relationship
      with money.
    </Typography>
    </Paper>
		<Paper
      className="mobilec"
			style={{backgroundColor: amber[50], marginTop: '10px'}} sx={{py: 4}}>
    <Typography variant="h5" marked="center" align="center" component="h2">
      What makes money valuable?
    </Typography>
    <Typography variant="body1" marked="center" align="center" component="p" style={{paddingTop: "2%"}}>
      The value of money lies in what is important to us.  I'm in the minority
      in saying that I think money is garbage and I hate the idea of how money
      exists in the world today (as well as during most of the history of the
      world).  The secret sauce of the universe.. Our connection to Bhagavan
      (God).. Life.. Love.. Whatever is fundamental to all of these different views
      is what I think is the only valuable thing that exists. <br/><br/>
      Money is a tool.. a utility.. a technology that attempts to "standardize" value
      to be something that we can exchange.  I agree that this ability is important.
      It's just been poorly implemented and maliciously warped and abused. 😮‍💨
      😅  Let me chill on the deep philosophy for now though haha..<br/><br/>
      To draw on an idea that I heard from Trevor Noah,<br/><br/>
      <i>money gives us access</i><br/><br/>
      I'll re-define the way that he meant it.  Money gives us access to the
      things that we value most.  Some of us value things that money doesn't
      capture effectively and so, we don't need as much money.  The part that
      makes this all more difficult is the "<i>standard of living</i>" that has
      evolved in the world and the cost of achieving the ever increasing standard
      of living.<br/><br/>
      My advice to you... <b>figure out what you value and then understand how money
      works for you to represent that value</b>.  I value people and energy.
      Money is not particularly equipped to work for me.  I use money to help
      people I can and I use it to free up my energy to be able to support the
      the people I care about.  I have aspirations about things that would be
      nice-to-have; but my primary focus is to become financially independent so
      that I can free myself up to take care of my family and loved ones and to
      work on projects to build the foundations of a people-first technological
      future.<br/><br/>
      Find your value.  Find what you value.  Work towards understanding money
      as it relates to those things.
    </Typography>
    </Paper>
		<Paper
      className="mobilec"
			style={{backgroundColor: amber[50], marginTop: '10px'}} sx={{py: 4}}>
    <Typography variant="h5" marked="center" align="center" component="h2">
      Time vs. Energy
    </Typography>
    <Typography variant="body1" marked="center" align="center" component="p" style={{paddingTop: "2%"}}>
      Another unpopular belief I have is that Energy is way more important than Time.
      I'm not actually trying to argue one way or another.  Time resonates as a
      core resource for many people.  All I will say is that time is a byproduct
      of life.  Regardless of what happens, time will move forward.  Time cannot
      be optimized.  It cannot be controlled or influenced in any meaningful way.
      If technology evolves where time travel is possible and time becomes an
      infinite resource...  Or if health advancements are made and we live healthier
      longer, we'll have more of it.  If bio-tech advancements are made and we're
      able to access more of our brain capacity or our physical capacity, the story
      of time will surely be different ...<br/><br/>
      My point lies in each of these sentences.  What do we have access to that
      makes time valuable?  <i>Energy.</i><br/><br/>
      With the right energy, motivation, inspiration ... willpower levels, we can
      actually make the most of time.  If we work too hard, we'll burn out and
      waste time.  If we laze around too much, we'll waste time.  The only limit
      to energy is the limit that we think we have.  Energy takes on so many forms.
      Physical.  Emotional.  Mental.  Electricity.  Solar.  Hydro, Wind, Nuclear.
      Spiritual.  Internal.  External.  Potential.  Kinetic. ... <br/><br/>
      By all means, use your time effectively. <br/><br/>
      One of my favorite things to talk about on this topic is the issue of being
      "paid for time" vs. "paid for energy".  Whether salaried or hourly, we are
      compensated for our time at work.  But there is no direct correlation from <i>
      time spent</i> to <i>results achieved</i>.  We've all been on teams where
      we see the disparity between a highly-motivated person and the average or
      below average person.  Both can have the same position, the same salary,
      for all intents and purposes, the same compensation and they can and do
      deliver different results.  Instead of a "minimum wage", I think people
      would appreciate getting paid for the effort they give.  I <i>"think"</i> the
      idea is if a person <i>"works harder"</i> and gives more energy per time
      unit, they <i>"will"</i> be valued and <i>"promoted"</i>.  But the equation is
      fundamentally broken.  Why would a person give more of something that they
      are not being paid for? <br/><br/>
      One caveat to the "paid for time" vs. "paid for energy" conversation is older
      more repetitive, mechanic, robotic type jobs where it was about completing a
      set limit of work a day (based on limitations of the human body).  Factory
      work, assembly lines and such were prime  candidates.  I think people are
      realizing that those jobs were just compensating for incomplete autonomous
      robotic systems.  As technology continues to evolve, there are very few jobs
      that can't be automated.  Mentally demanding jobs highlight the issue of time
      vs. energy best.  A software engineer needs to debug software.  A doctor needing
      to remember knowledge and information in high pressure environments.  Architects
      creatively solving design challenges.  There are sooo many more.. but I'll
      leave you with that for now. <br/><br/>
      This is not to say that time is not important.  It's super important to
      understand the effect that time has on things.  Just to be clear, life happens,
      which has time as an attribute or an effect.  This attribute can be a great
      reference to view other things.  Time doesn't directly influence anything.
      It is still a byproduct.<br/><br/>
      The most common thing to hear about is the <i>time-value of money</i>.  Money
      today is worth more than money in the future.  This is not because time
      creates value for money.  Psychologically, you can't use something that you
      don't have right now.  To compensate for "lost" time in the past, people
      expect money to have more value in the future.  If future money is worth
      the same or less value in the future, it's seen as a loss.  There is
      the world of accounting and finance math that was created to quantify this
      subjective view.  But at the end of the day, the value that money has is
      whatever someone else is willing to give you for it.
    </Typography>
    </Paper>
    </React.Fragment>
  );
}
