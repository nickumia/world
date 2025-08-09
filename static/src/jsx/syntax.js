import React from 'react';
import { 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardActions, 
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormHelperText,
  FormLabel,
  Button,
  TextareaAutosize,
  Skeleton,
  useTheme,
  styled 
} from '@mui/material';
import { cyan } from '@mui/material/colors';

import json_parse from './json_parse';


// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  maxWidth: 1200,
  marginLeft: 'auto',
  marginRight: 'auto',
}));

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  fontFamily: 'monospace',
  minHeight: 200,
  margin: theme.spacing(2, 0),
}));

const OutputArea = styled('pre')(({ theme }) => ({
  whiteSpace: 'pre-wrap',
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  minHeight: 200,
  overflowX: 'auto',
  fontFamily: 'monospace',
}));

export default function SyntaxApp({ details }) {
  const theme = useTheme();
  const page_details = json_parse(details);
  const opening_array = page_details.opening.split('\n');
  const start_array = page_details.definition.start.split('\n');
  const end_array = page_details.definition.end.split('\n');

  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [out_value, setOutput] = React.useState('');
  const [text, setInput] = React.useState(page_details.definition.end);
  const [helperText, setHelperText] = React.useState('Fun Fact: This is all done with simple regular expressions!');
  const [isLoading, setIsLoading] = React.useState(false);

	const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };
	const handleTextChange = (event) => {
		setInput(event.target.value);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await fetch('/nlp/api/syntax', {
	    method: 'POST',
		  body: text,
			headers: {
	      'Content-Type': 'application/json'
		  }
	  });
		const parsed_json = await response.json();

		if (value === 'words') {
			try {
				setOutput(parsed_json.alpha_char_only.join(' \n--\n'));
			} catch (ex) {
				setOutput('There were no words found.')
			}
		} else if (value === 'quotes') {
			try {
				setOutput(parsed_json.quotes_only.join(' \n--\n'));
			} catch (ex) {
				setOutput('There were no quotes found.')
			}
		} else if (value === 'sentences') {
			try {
				setOutput(parsed_json.sentences_only.join(' \n--\n'));
			} catch (ex) {
				setOutput('There were no sentences found.')
			}
		} else if (value === 'questions') {
			try {
				setOutput(parsed_json.questions_only.join(' \n--\n'));
			} catch (ex) {
				setOutput('There were no questions found.')
			}
		} else if (value === 'exclamations') {
			try {
				setOutput(parsed_json.exclamation_only.join(' \n--\n'));
			} catch (ex) {
				setOutput('There were no exclamations found.')
			}
		} else if (value === 'enclosure') {
			try {
				setOutput(parsed_json.paren_brack_curly_only.join(' \n--\n'));
			} catch (ex) {
				setOutput('There were no enclosed statements found.')
			}
		} else if (value === 'numbers') {
			try {
				setOutput(parsed_json.numbers_only.join(' \n--\n'));
			} catch (ex) {
				setOutput('There were no numbers found.')
			}
		} else if (value === 'number_expressions') {
			try {
				setOutput(parsed_json.numbers_with_referring_expression.join(' \n--\n'));
			} catch (ex) {
				setOutput('There were no numbers with contexts found.')
			}
		} else if (value === 'nothing') {
			if (text === ''){
				setOutput('You\'re right!  There\'s nothing there 🙃');
			} else {
				setOutput('Are you messing with me?  Of course, there\'s something there! 😉')
			}
		} else {
			setOutput('');
		}
		return false;
	}

  return (
    <React.Fragment>
			<Grid
			  container
				sx={{ marginTop: 2, marginBottom: 2 }}
			  direction="column"
			  alignItems="center"
			  justifyContent="center"
			  style={{ minHeight: '100vh' }}>
				<Box sx={{ minWidth: 275, maxWidth: '80%' }}>
					<Card variant="outlined" style={{backgroundColor: cyan[50]}}>
						<CardContent>
							{opening_array.map(thing => (
								<Typography
									style={typo_style}
									color="textSecondary" >{thing}</Typography>
							))}
							<Typography variant="h6" style={{marginBottom: '10px'}} >Motivation | characters</Typography>
							<Typography style={typo_style} >{start_array[0]}</Typography>
							<Typography variant="h6" style={{marginBottom: '10px'}} >Motivation | words</Typography>
							<Typography style={typo_style} >{start_array[1]}</Typography>
							<ul>
								{page_details.definition.middle.map(lis => (
									<Typography style={typo_style} component="li"
										key={lis.key}>{lis.value}</Typography>
								))}
							</ul>
							<Typography variant="h6" style={{marginBottom: '10px'}} >Motivation | sentences and more</Typography>
							{end_array.map(thing => (
								<Typography style={typo_style} >{thing}</Typography>
							))}
						</CardContent>
					</Card>
				</Box>
				<Skeleton variant="rectangular" animation="wave"
					style={{ marginTop: '24px' }} width={'100%'} height={'16px'} />
		    <form onSubmit={handleSubmit} id="groups">
		      <FormControl sx={{ m: 3 }} error={error} variant="standard">
				    <FormLabel id="syntax-radios" style={{ justifyContent: "center" }} >
							Choose a structure class to extract
						</FormLabel>
						<div style={{ display: "flex" }}>
						  <RadioGroup
							  aria-labelledby="syntax-radios"
					      name="options"
						    value={value}
							  onChange={handleRadioChange} >
						    <FormControlLabel value="words" control={<Radio />} label="WORDS" />
							  <FormControlLabel value="quotes" control={<Radio />} label="QUOTES" />
								<FormControlLabel value="sentences" control={<Radio />} label="SENTENCES" />
						    <FormControlLabel value="questions" control={<Radio />} label="QUESTIONS" />
			          <FormControlLabel value="exclamations" control={<Radio />} label="EXCLAMATIONS" />
					      <FormControlLabel value="enclosure" control={<Radio />} label="ENCLOSURES" />
								<FormControlLabel value="numbers" control={<Radio />} label="NUMBERS" />
								<FormControlLabel value="number_expressions" control={<Radio />} label="NUMBERS WITH CONTEXT" />
					      <FormControlLabel value="nothing" control={<Radio />} label="NOTHING" />
						  </RadioGroup>
							<TextareaAutosize
							  maxRows={10}
								id="text_input"
							  aria-label="text input"
							  defaultValue={page_details.definition.end}
								onChange={handleTextChange}
							  style={{ width: "60%", height: 'auto', margin: '16px', padding: '8px' }} />
						</div>
					  <FormHelperText>{helperText}</FormHelperText>
						<Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
				      Evaluate 😮
					  </Button>
				  </FormControl>
			  </form>
				<TextareaAutosize
				  maxRows={10}
					disabled
					value={out_value}
				  aria-label="text output"
				  style={{ width: "80%", margin: '20px', padding: '12px' }} />
				<Skeleton variant="rectangular" animation="wave"
					width={'100%'} height={'16px'} />
			</Grid>
    </React.Fragment>
  );
}
