import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = (theme) => ({
	root: {
		height: 'calc(100vh - 64px)',
		position: 'relative',
		backgroundColor: '#eeeeee',
		padding: '5em'
	},
	paper: {
		padding: theme.spacing(5)
	},
	progress: {
		color: '#2E84CF',
		marginTop: '3em'
	}
});

class Loading extends React.Component {
	render() {
		const { classes } = this.props;

		return (
			<React.Fragment>
				<CssBaseline />
				<div className={classes.root}>
					<Container maxWidth='md'>
						<Paper className={classes.paper}>
							<Typography component='div'>
								<Box fontWeight='fontWeightBold' fontSize='h4.fontSize' m={1}>
									Loading Data from the Server...
								</Box>
							</Typography>
							<LinearProgress color='secondary' className={classes.progress} />
						</Paper>
					</Container>
				</div>
			</React.Fragment>
		);
	}
}

Loading.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);
