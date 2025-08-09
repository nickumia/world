import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography, Tooltip } from '@mui/material';
import { amber, orange } from '@mui/material/colors';
import Link from '@mui/material/Link';

import Grid from '@mui/material/Grid';

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


const buttonTheme = createTheme({
  palette: {
    primary: {
      main: '#388e3c',
      light: '#81c784',
      dark: '#13540c',
      contrastText: '#fff',
    },
    secondary: {
      main: '#81c784',
      light: '#81c784',
      dark: '#81c784',
      contrastText: '#fff',
    },
  },
});

// Styled components using MUI v5 styled API
const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  maxWidth: 345,
}));

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));
const itemData = [
  {
    img: "/static/img/financial_concepts.svg",
    title: 'Financial Literacy',
  },
];
const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const FinancialCard = ({ title, description, icon: Icon, color = 'primary' }) => (
  <StyledCard>
    <CardActionArea>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          {Icon && <Icon color={color} sx={{ mr: 1 }} />}
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
  </StyledCard>
);

export default function Financial() {
  const [above, setAbove] = React.useState(true);
  const [at, setAt] = React.useState(true);
  const [below, setBelow] = React.useState(true);
  const [net, setNet] = React.useState(true);
  const [inc, setInc] = React.useState(true);
  const [consideration, setConsideration] = React.useState("Click a button to learn more 😊");
  
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
  
  const knowledge = () => {
    setConsideration("How much learning is needed to achieve this goal? Will this learning requirement align with my learning ability?");
  };
  
  const energy = () => {
    setConsideration("How much energy is required to achieve this goal? Do I have that much energy and/or am I willing to spend the energy for this goal?");
  }
  const time = () => {
    setConsideration("How much time do I need to spend to achieve this goal? How much time will I save after achieving this goal?");
  }
  const people = () => {
    setConsideration("What kind of people does this goal put me in contact with? Am I spending time with people that make me more of who I want to be? Will I be able to spend time with people that I care about?")
  }
  const physical = () => {
    setConsideration("What do I get out of achieving this goal? What does it look like? Is it what I want?")
  }

  return (
    <React.Fragment>

    <Typography variant="h4" marked="center" align="center" component="h1" style={{paddingTop: "2%", paddingBottom: "0.5%", paddingLeft: "5%", paddingRight: "5%"}}>
      Redefining Financial Literacy
    </Typography>
    <Typography variant="body1" marked="center" align="center" component="p">
      Written by: nickumia<br/>
      March 15th, 2024
    </Typography>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/UNITN9AK1bk?si=sIiwEOB1KY1qnaC3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{margin: 'auto', marginTop: '10px', marginBottom: '10px'}}></iframe>
		<Paper
      className="mobilec"
			style={{backgroundColor: amber[50], marginTop: '10px'}} sx={{py: 4}}>
    <Typography variant="h5" marked="center" align="center" component="h2">
      <b>Prelude</b>
    </Typography>
    <Typography variant="h6" marked="center" align="center" component="h3">
      <i>What will you find in this post?</i>
    </Typography>
    <Typography variant="body1" marked="center" align="center" component="p" style={{paddingTop: "2%"}}>
      There is sooo much to learn about how to understand and manage finances.
      You will not find concepts or information about specific assets.  You will
      not find catchy phrases about stocks, real estate, cryptocurrencies or anything
      else like that.<br/><br/>
      You WILL find a method for evaluating whether you should explore a new asset
      class.  This method will help to frame how you can understand the asset and
      what the asset will do for you.  The hope is that you will be able to explore
      and learn in more deliberate way.
    </Typography>
    <Typography variant="h6" marked="center" align="center" component="h3" style={{paddingTop: "2%"}}>
      Shortcuts
    </Typography>
    <Typography variant="body1" marked="center" align="center" component="p">
    <Link href="#netvinc">Understanding the Net Worth vs. Income Debate</Link>
    </Typography>
    <Typography variant="body1" marked="center" align="center" component="p">
    <Link href="#goals">Defining goals</Link>
    </Typography>
    <Typography variant="body1" marked="center" align="center" component="p">
    <Link href="#value">What makes money valuable?</Link>
    </Typography>
    <Typography variant="body1" marked="center" align="center" component="p">
    <Link href="#timevenergy">Time vs. Energy</Link>
    </Typography>
    <Typography variant="body1" marked="center" align="center" component="p">
    <Link href="#gainloss">Ups and Downs.. Positive and Negative.. Gains and Loss.. The Pendulum of Finance</Link>
    </Typography>
    <Typography variant="body1" marked="center" align="center" component="p">
    <Link href="#risk">Risk Management</Link>
    </Typography>
    <Typography variant="body1" marked="center" align="center" component="p">
    <Link href="#future">Where does this leave us?</Link>
    </Typography>
    </Paper>

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
    <span id="netvinc" style={{paddingTop: "60px"}}></span>
    <Typography variant="h5" marked="center" align="center" component="h2">
      Understanding the <i><b>Net Worth</b></i> vs. <i><b>Income</b></i> Debate
    </Typography>
		<Paper
      className="mobilec"
			style={{backgroundColor: amber[100], marginTop: '10px'}} sx={{py: 4}}>
    <Typography variant="body1" marked="center" align="center" component="p">
      Select a lifestyle
    </Typography>
    <ThemeProvider theme={buttonTheme}>
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
    </ThemeProvider>

    <Typography variant="body1" marked="center" align="center" component="p" style={{paddingTop: "2%"}}>
      Select a Financial Mindset
    </Typography>
    <ThemeProvider theme={buttonTheme}>
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
    </ThemeProvider>

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
        current situation will help you make the best financial decisions.
        Some months we'll have more income.  Some months we'll have more
        expenses.  Being able to manage variations in the short-term will enable
        us to be aligned with our goals in the long-term.
        <br/>
      </Typography>
    </Paper>
		<Paper
      className="mobilec"
			style={{backgroundColor: amber[50], marginTop: '10px'}} sx={{py: 4}}>
    <span id="goals" style={{paddingTop: "60px"}}></span>
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
      These goals should generally be assessed with the following in mind:
    </Typography>
    <ButtonGroup
      color="primary"
      disabled={false}
      orientation="horizontal"
      size="large"
      variant="contained"
      style={{display: "flex", justifyContent: "center", boxShadow: "none", flexWrap: "wrap"}}
    >
      <Button className="chip-button" onClick={knowledge} style={{backgroundColor: "transparent"}}>
        <Chip className="chip-chip" icon=<SchoolIcon className="chip-svg" /> label={"Knowledge"} /></Button>
      <Button className="chip-button" onClick={energy} style={{backgroundColor: "transparent"}}>
        <Chip className="chip-chip" icon=<BatteryChargingFullIcon className="chip-svg" /> label={"Energy"} /></Button>
      <Button className="chip-button" onClick={time} style={{backgroundColor: "transparent"}}>
        <Chip className="chip-chip" icon=<AccessTimeFilledIcon className="chip-svg" /> label={"Time"} /></Button>
      <Button className="chip-button" onClick={people} style={{backgroundColor: "transparent"}}>
        <Chip className="chip-chip" icon=<PeopleAltIcon className="chip-svg" /> label={"People"} /></Button>
      <Button className="chip-button" onClick={physical} style={{backgroundColor: "transparent"}}>
        <Chip className="chip-chip" icon=<ShoppingBagIcon className="chip-svg" /> label={"Physical Manifestation"} /></Button>
    </ButtonGroup>
    <Typography variant="body1" marked="center" align="center" component="p" style={{paddingTop: "2%"}}>
    {consideration}
    </Typography>

    <Typography variant="body1" marked="center" align="center" component="p" style={{paddingTop: "4%"}}>
      Goals are defined mostly based on what a person finds valuable.  An adventurous
      person might favor opportunities to experience the world.  A homebody might
      favor building and customizing their house.  A family-oriented person might
      take on more expenses to be able to support the ones they love.  The intrinsic
      qualities a person is born with and the beliefs and values that a person is
      nurtured with have a great effect on how a person manages their relationship
      with money.
    </Typography>
    </Paper>
		<Paper
      className="mobilec"
			style={{backgroundColor: amber[50], marginTop: '10px'}} sx={{py: 4}}>
    <span id="value" style={{paddingTop: "60px"}}></span>
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
      things that we value most.  Some of us value things that aren't valued
      effectively through money and so, we don't need as much money.  What
      makes all of this more difficult is the way that the "<i>standard of living</i>"
      has evolved in the world and the cost of achieving the ever increasing
      standard of living.<br/><br/>
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
    <span id="timevenergy" style={{paddingTop: "60px"}}></span>
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
      With the right energy, motivation, inspiration ... and willpower levels, we can
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
      vs. energy best, e.g.  a software engineer needing to debug software...  a doctor
      needing to remember knowledge and information in high pressure environments...
      an architect creatively solving design challenges...  there are sooo many more..
      but I'll leave you with that for now. <br/><br/>
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
		<Paper
      className="mobilec"
			style={{backgroundColor: amber[50], marginTop: '10px'}} sx={{py: 4}}>
    <span id="gainloss" style={{paddingTop: "60px"}}></span>
    <Typography variant="h5" marked="center" align="center" component="h2">
      Ups and Downs..  Positive and Negative.. Gains and Loss.. The Pendulum of Finance
    </Typography>
    <Typography variant="body1" marked="center" align="center" component="p" style={{paddingTop: "2%"}}>
      All of finance is essentially classified in three ways:<br/>
      (1) There's a surplus of money (a gain)<br/>
      (2) There's a deficit of money (a loss)<br/>
      (3) There's the same amount of money (neutral)<br/><br/>

      Investment gains.. Savings interst.. Dividends.. Income.. Royalties..
      Asset Appreciation.. Taxes.. are all conditions where there's MORE money
      on your side.<br/><br/>
      Investment losses.. Debt payments.. Expenses.. Loss of principal..
      Asset Depreciation.. are all conditions where there's LESS money on your
      side.<br/><br/>
      Anything that's essentially free presents the case where there's the same
      amount of money.. along with the case when there's a zero interest rate.<br/><br/>
      Even in the simplest case, most people have soo many things that either go
      up or down in financial value, it's hard to keep it all in perspective.
      In the <i>Net Worth</i> mindset, assets and liabilities that either
      appreciate or depreciate in value are usually cornerstones of tracking finances.
      In the <i>Income</i> mindset, revenue and expenses that represent the inflow
      or outflow of money are the comparable cornerstones of finances.<br/><br/>
      The concept is simple, but the ways in which it manifests are almost innumerable.
      It gets exceedingly complicated when there are multiple people involved,
      such as a supply chain, or when time in involved, such as a series of
      transactions or a history of owners.  When learning about a financial
      concept or product, the simplest way to understand it is by decomposing it
      into its gain, loss or neutral components.<br/><br/>
      Let's take a savings account as an example.  Money deposited into a savings
      account earns interest, a gain.  The account charges fees, a loss.  The interest
      earned is taxed, a loss.  The original principle is insured by the FDIC and
      remains constant, a neutral component.  There's two other aspects, being
      contributions and withdrawals, that effect the math.  While it is a bit
      unconventional, contributions increase the value of the account and can be
      viewed from the perspective of being a "gain".  Similarly, a withdrawal is a
      decrease in value and can be viewed as a "loss".  It is NOT gain/loss in the
      traditional sense, but these activiies have a positive (contribution) or
      negative (withdrawal) effect on the total value.  Viewing it from this lens
      helps to qualify the activities in general.
      Tangentially related to the last statement, transfers are an example of
      having the same amount of money, having a neutral or net-zero change.  There
      is a change, but it doesn't effect the big picture.  Another term for this is
      reallocation (i.e. moving money around).<br/><br/>
      Having a clear picture of these three concepts provides a solid foundation for
      learning more advanced financial concepts.
    </Typography>
    </Paper>
		<Paper
      className="mobilec"
			style={{backgroundColor: amber[50], marginTop: '10px'}} sx={{py: 4}}>
    <span id="risk" style={{paddingTop: "60px"}}></span>
    <Typography variant="h5" marked="center" align="center" component="h2">
      Risk Management
    </Typography>
    <Typography variant="body1" marked="center" align="center" component="p" style={{paddingTop: "2%"}}>
      Risk is the possibility of a loss.  At face value, Risk might sound like only
      a financial loss. For all intents and purposes, a loss is almost entirely
      tied to a monetary value.  But risk is not just in the financial aspect.  A
      risk puts the value that money represents at stake.  By understanding the true
      value of money.. understanding your value of money.. risk can be better managed.
      This is why understanding what value money has is so important.  In the most
      general sense, <b>risk is the potential loss of access to the things you value.</b>
    </Typography>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{py: 4}}>
      <Grid item xs={6}>
        <Item>
    <Typography variant="h6" marked="center" align="center" component="h3">
    Inflation
    </Typography>
    <Typography variant="body1" marked="center" align="center" component="p" style={{paddingTop: "2%"}}>
      Money may have less purchasing power in the future.
    </Typography>
        </Item>
      </Grid>
      <Grid item xs={6}>
        <Item>
    <Typography variant="h6" marked="center" align="center" component="h3">
    Market
    </Typography>
    <Typography variant="body1" marked="center" align="center" component="p" style={{paddingTop: "2%"}}>
      Investments may cause a loss of money.
    </Typography>
        </Item>
      </Grid>
      <Grid item xs={6}>
        <Item>
    <Typography variant="h6" marked="center" align="center" component="h3">
    Tax
    </Typography>
    <Typography variant="body1" marked="center" align="center" component="p" style={{paddingTop: "2%"}}>
      Money may be taxed at an indeterminate rate in the future (more likely to be higher).
    </Typography>
        </Item>
      </Grid>
      <Grid item xs={6}>
        <Item>
    <Typography variant="h6" marked="center" align="center" component="h3">
    Health
    </Typography>
    <Typography variant="body1" marked="center" align="center" component="p" style={{paddingTop: "2%"}}>
      There may not be enough money to cover your entire life.
    </Typography>
        </Item>
      </Grid>
    </Grid>
    <Typography variant="body1" marked="center" align="center" component="p" style={{paddingTop: "2%"}}>
      Everyone has a different risk tolerance.  Even risky people are conservative
      (or want to do everything in their power) to protect the things they value.
      Conservative people may be risky in ways they don't realize.  Life is defined
      by changes.  Change is, by definition, risky because it can always go either
      way.  Being able to handle unexpected changes is one way of looking at the
      problem of risk.  What are you willing to lose and when?
    </Typography>
    <Typography variant="body1" marked="center" align="center" component="p" style={{paddingTop: "2%"}}>
      There is no golden ticket for managing risk.  It's a very personal choice and
      it's very dependent on the circumstances.  I'm both an adventurous and risky
      person.  I love doing spontaneous things to make the most of moments.  Many
      people judge me for my picky appetite which is not at all adventurous and is
      not open to change.  This is only to highlight the ways in which a person's
      risk tolerance may differ.  If I was truly adventurous, some might argue that
      I should love to try new foods too.  As it relates to our discussion,
      a person may take on more risk in stocks; but they really don't think the risk
      of cryptocurrencies is worth it.  It's important to understand why certain
      risks are acceptable and others are not.  This will help evaluate the
      advantages and disadvantages of not taking on that risk.
    </Typography>
    </Paper>
		<Paper
      className="mobilec"
			style={{backgroundColor: amber[50], marginTop: '10px'}} sx={{py: 4}}>
    <span id="future" style={{paddingTop: "60px"}}></span>
    <Typography variant="h5" marked="center" align="center" component="h2">
      Where does this leave us?
    </Typography>
    <Typography variant="body1" marked="center" align="center" component="p" style={{paddingTop: "2%"}}>
      Money is an extension of who a person is.  If someone doesn't know themselves,
      it's hard to manage and use money effectively.  There's still a lot to learn;
      but this at least acts as one of many filters for what needs to be learned and
      to what extent it needs to be learned.  To remember some of the concepts
      mentioned above, ask yourself these questions:<br/><br/>
      What does money give me access to?  What do I want to do with it?<br/>
      Can I use it when I need it for what I need it for?<br/>
      Is it safe?  Will it be what I expect it to be when I use it?  Will it
      lose value?<br/>
      Can it grow so that I can free up mental and physical pressure?  Does it
      need to grow?<br/>
      Are there any taxes owed on the money?  Or will there be taxes imposed when
      using it in the future?
    </Typography>
    </Paper>
    </React.Fragment>
  );
}
