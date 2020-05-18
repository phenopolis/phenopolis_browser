import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';

import { Card, CardContent, Button, Typography, Grid, TextField, IconButton, Icon, List, ListItem, Container, Menu, MenuItem, ListItemIcon, Chip } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import clsx from 'clsx';

class VirtualTableFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      anchorEl: null,
      anchorElObject: null,
      myfilter: [],
      operationOptions: {
        other: [
          { des: 'SubString', icon: '=' },
          { des: 'Equal to', icon: '==' },
          { des: 'Greater than', icon: '>' },
          { des: 'No Smaller than', icon: '≥' },
          { des: 'Smaller than', icon: '<' },
          { des: 'No Larger than', icon: '≤' }
        ],
        object: [
          { des: 'SubString', icon: '=' },
          { des: 'Include', icon: '⊂' },
          { des: 'Exclude', icon: '⊄' }
        ]
      },
      tmpFilter: 0
    };
  }

  componentDidMount() {
    console.log(this.props.tableFilter)
    console.log(this.props.variableList)
    this.setState({ myfilter: JSON.parse(JSON.stringify(this.props.tableFilter)) })
  }

  handleAddNewFilter = () => {
    this.setState({
      myfilter: [...this.state.myfilter,
      {
        column: null,
        operation: '=',
        value: [],
        andor: 'and'
      }
      ]
    })
  }

  handleSelectColumn = (event, newValue, index) => {
    const newFilter = [...this.state.myfilter];
    newFilter[index].column = newValue

    console.log(newValue)

    if (newValue === null) {
      newFilter[index].value = []
    } else {
      if (newValue.type === 'object') {
        newFilter[index].value = []
      } else {
        newFilter[index].value = ''
      }
    }



    this.setState({ myfilter: newFilter })
  }

  handleSelectObjectChip = (event, newValue, index) => {
    const newFilter = [...this.state.myfilter];
    newFilter[index].value = newValue
    this.setState({ myfilter: newFilter }, () => {
      this.handleSubmitFilter()
    })
  }

  handleOperationOpen = (event, index, column) => {

    if (column.type === 'object') {
      this.setState({ anchorElObject: event.currentTarget, tmpFilter: index })
    } else {
      this.setState({ anchorEl: event.currentTarget, tmpFilter: index })
    }
  };

  handleOperationClose = () => {
    this.setState({ anchorEl: null, anchorElObject: null })
  };

  handleOperationChange = (operation) => {
    const newFilter = [...this.state.myfilter];
    newFilter[this.state.tmpFilter].operation = operation

    if (operation === '⊂' | operation === '⊄') {
      newFilter[this.state.tmpFilter].value = []
    }

    this.setState({ myfilter: newFilter }, () => {
      this.handleSubmitFilter()
    })

    this.handleOperationClose()
  }

  handleValueChange = (event, index) => {
    const newFilter = [...this.state.myfilter];
    newFilter[index].value = event.target.value
    this.setState({ myfilter: newFilter }, () => {
      this.handleSubmitFilter()
    })
  }

  handleAndOrChange = (index) => {
    const newFilter = [...this.state.myfilter];
    if (newFilter[index].andor === 'and') {
      newFilter[index].andor = 'or'
    } else {
      newFilter[index].andor = 'and'
    }
    this.setState({ myfilter: newFilter }, () => {
      this.handleSubmitFilter()
    })
  }

  handleDeleteFilter = (index) => {
    const newFilter = [...this.state.myfilter];
    newFilter.splice(index, 1);
    this.setState({ myfilter: newFilter }, () => {
      this.handleSubmitFilter()
    })
  }

  handleSubmitFilter = () => {
    this.props.UpdateFilter(this.state.myfilter.filter((item) => item.column !== null))
  }


  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.root}>

        <Card
          className={clsx('card-box bg-composed-wrapper bg-midnight-bloom border-0 text-center m-2 mb-4', classes.card)}
        >
          <div className={clsx("bg-composed-img-1 bg-composed-wrapper--image rounded", classes.bg)} />
          <div className="bg-composed-wrapper--content text-light">
            <div className="py-0 px-0">
              <h4 className="font-size-xl font-weight-bold mb-2">
                Create Your Own Filter
              </h4>
              <p className="opacity-6 font-size-md mb-3">
                1.Select Variables; 2.Define Operations; 3.Set Value.
              </p>
            </div>
          </div>

        </Card>

        <CardContent>
          <List>
            {
              this.state.myfilter.map((item, index) => {
                return (
                  <ListItem key={index} style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <Grid container spacing={0} style={{ padding: 0, margin: 0 }} className={classes.filterList}>
                      <Grid item xs={1} className={classes.centerGrid}>
                        <span> {index + 1} </span>
                      </Grid>

                      <Grid item xs={4} className={classes.centerGrid}>
                        <Autocomplete
                          value={item.column}
                          onChange={(event, newValue) => this.handleSelectColumn(event, newValue, index)}
                          id="combo-box-demo"
                          size="small"
                          options={this.props.variableList}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => <TextField {...params} label="Select Column" variant="outlined" />}
                        />
                      </Grid>

                      <Grid item xs={1} className={classes.centerGrid}>
                        <IconButton
                          disabled={item.column === null}
                          edge="start"
                          size="small"
                          className={classes.menuButton}
                          color="inherit"
                          onClick={(event) => this.handleOperationOpen(event, index, item.column)}
                        >
                          {item.operation}
                        </IconButton>

                        <Menu
                          id="simple-menu"
                          anchorEl={this.state.anchorEl}
                          keepMounted
                          open={Boolean(this.state.anchorEl)}
                          onClose={this.handleOperationClose}
                        >
                          {
                            this.state.operationOptions.other.map((operationItem, operationIndex) => {
                              return (
                                <MenuItem key={operationIndex} onClick={() => this.handleOperationChange(operationItem.icon)}>
                                  <ListItemIcon>
                                    <Typography variant="h5" noWrap>
                                      {operationItem.icon}
                                    </Typography>
                                  </ListItemIcon>
                                  <Typography variant="body2" noWrap>
                                    {operationItem.des}
                                  </Typography>
                                </MenuItem>
                              )

                            })
                          }
                        </Menu>

                        <Menu
                          id="simple-menu"
                          anchorEl={this.state.anchorElObject}
                          keepMounted
                          open={Boolean(this.state.anchorElObject)}
                          onClose={this.handleOperationClose}
                        >
                          {
                            this.state.operationOptions.object.map((operationItem, operationIndex) => {
                              return (
                                <MenuItem key={operationIndex} onClick={() => this.handleOperationChange(operationItem.icon)}>
                                  <ListItemIcon>
                                    <Typography variant="h5" noWrap>
                                      {operationItem.icon}
                                    </Typography>
                                  </ListItemIcon>
                                  <Typography variant="body2" noWrap>
                                    {operationItem.des}
                                  </Typography>
                                </MenuItem>
                              )

                            })
                          }
                        </Menu>


                      </Grid>

                      <Grid item xs={4} className={classes.centerGrid}>
                        {
                          item.column === null ? (
                            <TextField
                              disabled={item.column === null}
                              label="Value"
                              variant="outlined"
                              id="standard-size-small"
                              size="small"
                              value={item.value}
                              onChange={(event) => this.handleValueChange(event, index)} />
                          ) : item.column.type === 'object' & item.operation !== '=' ? (
                            <Autocomplete
                              multiple
                              value={item.value}
                              onChange={(event, newValue) => this.handleSelectObjectChip(event, newValue, index)}
                              id="combo-box-demo"
                              size="small"
                              options={item.column.chips}
                              getOptionLabel={(option) => option}
                              renderInput={(params) => <TextField {...params} label="Select Items" variant="outlined" />}
                              renderTags={(tagValue, getTagProps) =>
                                tagValue.map((option, index) => (
                                  <Chip
                                    size='small'
                                    variant="outlined"
                                    label={option}
                                    className={classes.chip}
                                  />
                                ))
                              }
                            />
                          ) : (
                                <TextField
                                  disabled={item.column === null}
                                  label="Value"
                                  variant="outlined"
                                  id="standard-size-small"
                                  size="small"
                                  value={item.value}
                                  onChange={(event) => this.handleValueChange(event, index)} />
                              )
                        }

                      </Grid>

                      <Grid item xs={1} className={classes.centerGrid}>
                        {
                          index !== (this.state.myfilter.length - 1) ?

                            <Button
                              size="small"
                              variant="contained"
                              color={item.andor === "and" ? 'secondary' : 'primary'}
                              className={classes.andorButton}
                              onClick={() => this.handleAndOrChange(index)}>
                              {item.andor}
                            </Button>
                            : null
                        }

                      </Grid>

                      <Grid item xs={1} className={classes.centerGrid}>
                        <IconButton
                          edge="start"
                          size="small"
                          color="inherit"
                          onClick={() => this.handleDeleteFilter(index)}
                        >
                          <Icon className={clsx(classes.smallFilter, 'far fa-trash-alt')} />
                        </IconButton>
                      </Grid>

                    </Grid>
                  </ListItem>
                )
              })
            }
          </List>

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Button onClick={this.handleAddNewFilter}>Add New Filter</Button>
          </Grid>
        </CardContent>


        <Container>
          <Grid container
            direction="row"
            justify="flex-end"
            alignItems="center">
            <Button size="small" color="primary" onClick={this.handleSubmitFilter}>
              Apply
        </Button>
            <Button size="small" color="secondary" onClick={this.props.onClickClose}>
              Cancel
        </Button>
          </Grid>
        </Container>

      </Card >
    )
  }
}

VirtualTableFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    width: 800,
    maxHeight: 600,
    overflowY: 'auto'
  },
  media: {
    height: 80,
  },
  card: {
    border: 0
  },
  bg: {
    backgroundImage: `url(${'https://images.unsplash.com/photo-1587327903256-2265e70b5660?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'})`
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  centerGrid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(0.8)
  },
  menuButton: {
    color: '#2E84CF',
    fontWeight: 900,
    '&:hover': {
      cursor: 'pointer',
      color: 'black',
    }
  },
  iconHover: {
    fontSize: 20,
    margin: theme.spacing(0),
  },
  smallFilter: {
    fontSize: 15,
    margin: theme.spacing(0),
  },
  andorButton: {
    marginRight: theme.spacing(3)
  },
  filterList: {
    border: "1px solid white",
    '&:hover': {
      borderTop: "1px solid lightgrey",
      borderBottom: "1px solid lightgrey",
      fontWeight: 900
    }
  },
  imageIcon: {
    height: '0.8em',
    width: '0.8em',
    color: 'red'
  },
  chip: {
    margin: theme.spacing(0.5),
    textShadow: 'none',
    color: '#2E84CF',
  }
});

export default compose(withStyles(styles))(VirtualTableFilter)
