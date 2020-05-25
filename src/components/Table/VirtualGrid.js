import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { VariableSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import calculateSize from 'calculate-size'
import memoize from 'memoize-one'
import CountUp from 'react-countup';

import GridColumn from "./GridColumn"
import StickyHeader from "./StickyHeader"

// Import Toolbar components for the table
import VirtualTableFilter from "./VirtualTableFilter"
import HideColumn from "./HideColumn"
import Plots from "./Plots"

import { Filter, EyeOff, Briefcase, LifeBuoy } from 'react-feather';
import DeleteIcon from '@material-ui/icons/Delete';

import "./styles.css";
import { Toolbar, Paper, IconButton, Typography, Box, Icon, Popover, Dialog, Button, Container, Card, Collapse } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { composeInitialProps } from "react-i18next";
var focusField;

const getRenderedCursor = children =>
  children.reduce(
    (
      [minRow, maxRow, minColumn, maxColumn],
      { props: { columnIndex, rowIndex } }
    ) => {
      if (rowIndex < minRow) {
        minRow = rowIndex;
      }

      if (rowIndex > maxRow) {
        maxRow = rowIndex;
      }

      if (columnIndex < minColumn) {
        minColumn = columnIndex;
      }

      if (columnIndex > maxColumn) {
        maxColumn = columnIndex;
      }
      return [minRow, maxRow, minColumn, maxColumn];
    },
    [
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY
    ]
  );

const headerBuilder = (minColumn, maxColumn, columnWidth, stickyHeight, mycolumns) => {
  const columns = [];
  let left = [0], pos = 0;

  for (let c = 1; c <= maxColumn; c++) {
    pos += columnWidth(c - 1);
    left.push(pos);
  }

  for (let i = minColumn; i <= maxColumn; i++) {
    columns.push({
      height: stickyHeight,
      width: columnWidth(i),
      left: left[i],
      label: mycolumns[i].name,
      key: mycolumns[i].key
    });
  }

  return columns;
};

const columnsBuilder = (minRow, maxRow, rowHeight, stickyWidth) => {
  const rows = [];
  let top = [0],
    pos = 0;

  for (let c = 1; c <= maxRow; c++) {
    pos += rowHeight(c - 1);
    top.push(pos);
  }

  for (let i = minRow; i <= maxRow; i++) {
    rows.push({
      height: rowHeight(i),
      width: stickyWidth,
      top: top[i],
      label: `Sticky Row ${i}`
    });
  }

  return rows;
};

const StickyColumns = ({ rows, stickyHeight, stickyWidth }) => {
  const leftSideStyle = {
    top: stickyHeight,
    width: stickyWidth,
    height: `calc(100% - ${stickyHeight}px)`
  };

  return (
    <div className={"sticky-grid__sticky-columns__container"} style={leftSideStyle}>
      {
        rows.map(({ label, ...style }, i) => {
          return (
            <div
              className={"sticky-grid__sticky-columns__row"}
              style={style}
              key={i}>
              {label}
            </div>
          )
        })
      }
    </div>
  )
};

const StickyGridContext = React.createContext();
StickyGridContext.displayName = "StickyGridContext";

const innerGridElementType = React.forwardRef(({ children, ...rest }, ref) =>
  <StickyGridContext.Consumer>
    {
      ({
        stickyHeight,
        stickyWidth,
        headerBuilder,
        columnsBuilder,
        columnWidth,
        mycolumns,
        rowHeight,
        order,
        orderBy,
        onRequestSort
      }) => {

        const [minRow, maxRow, minColumn, maxColumn] = getRenderedCursor(
          children
        ); // TODO maybe there is more elegant way to get this

        const headerColumns = headerBuilder(
          minColumn,
          maxColumn,
          columnWidth,
          stickyHeight,
          mycolumns
        );

        const leftSideRows = columnsBuilder(
          minRow,
          maxRow,
          rowHeight,
          stickyWidth
        );

        const containerStyle = {
          ...rest.style,
          width: `${parseFloat(rest.style.width) + stickyWidth}px`,
          height: `${parseFloat(rest.style.height) + stickyHeight}px`
        };

        const containerProps = {
          ...rest,
          style: containerStyle
        };

        const gridDataContainerStyle = {
          top: stickyHeight,
          left: stickyWidth
        };

        return (
          <div ref={ref} className="sticky-grid__container" {...containerProps}>
            <StickyHeader
              headerColumns={headerColumns}
              stickyHeight={stickyHeight}
              stickyWidth={stickyWidth}
              order={order}
              orderBy={orderBy}
              onRequestSort={onRequestSort}
            />
            {/* <StickyColumns
              rows={leftSideRows}
              stickyHeight={stickyHeight}
              stickyWidth={stickyWidth}
            /> */}
            <div className="sticky-grid__data__container" style={gridDataContainerStyle}>
              {children}
            </div>
          </div>
        )
      }
    }
  </StickyGridContext.Consumer>
);


const createItemData = memoize((rows, columns, toggleItemActive, currentRow, currentColumn) => ({
  rows,
  columns,
  toggleItemActive,
  currentRow,
  currentColumn
}));



class StickyGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.listRef = React.createRef();
  }

  listRef = React.createRef();

  componentDidMount() {
    this.props.onRecalculateWidth(this.props.width)
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.myrows !== this.props.myrows | nextProps.columnValue !== this.props.columnValue) {
      this.handleActive()
    }

    if (nextProps.width !== this.props.width) {
      this.props.onRecalculateWidth(nextProps.width)
    }
  }

  handleActive = () => {

    if (this.listRef.current) {
      this.listRef.current.resetAfterColumnIndex(0)
      this.listRef.current.resetAfterRowIndex(0);
    }
  }

  render() {
    const { stickyHeight, stickyWidth, columnWidth, rowHeight, myrows, mycolumns, children, toggleItemActive, currentRow, currentColumn, order, orderBy, onRequestSort, ...rest } = this.props

    const itemData = createItemData(myrows, mycolumns, toggleItemActive, currentRow, currentColumn);

    return (
      <StickyGridContext.Provider
        value={{
          stickyHeight,
          stickyWidth,
          columnWidth,
          rowHeight,
          headerBuilder,
          columnsBuilder,
          mycolumns,
          myrows,
          order,
          orderBy,
          onRequestSort,
        }}
      >
        <Grid
          ref={this.listRef}
          columnWidth={columnWidth}
          rowHeight={rowHeight}
          innerElementType={innerGridElementType}
          itemData={itemData}
          {...rest}>
          {children}
        </Grid>
      </StickyGridContext.Provider>
    );
  }
}

// Cause a grid cell to blur when scrolling
function handleScroll(event) {
  document.activeElement.blur();
}

// Record cell changes
function handleCellChange(props, value) {
}

// - * - * - * - * - * - * - * - * - * - * - * - * 
// - * - * - * - * - * - * - * - * - * - * - * - * 


function desc(a, b, orderBy) {
  if (!isNaN(b[orderBy])) {
    if (Number(b[orderBy]) < Number(a[orderBy])) {
      return -1;
    }
    if (Number(b[orderBy]) > Number(a[orderBy])) {
      return 1;
    }
    return 0;
  } else {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis;
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

class VirtualGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TableColumnWidth: [120, 140, 160, 180],
      TableRowHeight: [120, 80, 100, 60],
      rowCount: 0,
      colCount: 0,
      currentRow: null,
      currentColumn: null,
      anchorEl: null,

      filterPopoverOpen: -1,

      colNames: [],
      tableFilter: [],

      fullData: [],
      fullColumn: [],
      filteredData: [],
      filteredColumn: [],
      filteredColumnWidth: [],
      filteredRowHeight: [],

      order: 'asc',
      orderBy: 'variant_id',
      tableReady: false,

      toolButtons: [
        { label: 'Filter Rows', icon: 'fas fa-filter' },
        { label: 'Hide Columns', icon: 'fas fa-eye-slash' },
        { label: 'Plots', icon: 'fas fa-chart-bar' },
        { label: 'Genome', icon: 'fas fa-dna' },
        { label: 'Export Excel', icon: 'fas fa-file-download' },
      ],

      columnHide: []
    };
  }

  componentWillMount() {
    var tableData = JSON.parse(JSON.stringify(this.props.tableData))
    var myrows = tableData.data
    var mycolumns = tableData.colNames

    if (myrows.length !== 0) {
      let maxColumn = 400
      let minColumn = 80

      let minHeight = 40
      let HeightIncrease = 30

      let tmpWidth = Array(mycolumns.length).fill(minColumn)
      let tmpHeight = Array(myrows.length).fill(minHeight)

      var tmpColnames = []

      for (let j = 0; j < mycolumns.length; j++) {
        let headSize = calculateSize(mycolumns[j].name, { font: 'Arial', fontSize: '14px' })
        if (headSize.width + 50 > tmpWidth[j]) tmpWidth[j] = headSize.width + 50

        tmpColnames.push({ name: mycolumns[j].name, key: mycolumns[j].key, type: typeof myrows[0][mycolumns[j].key], chips: [], show: mycolumns[j].default })
      }
      for (let j = 0; j < mycolumns.length; j++) {
        for (let i = 0; i < myrows.length; i++) {

          var key = mycolumns[j].key
          let cellData = myrows[i][key]

          if (typeof cellData === 'object' & cellData !== null) {

            let chipsSize = 0
            var tmpMax = maxColumn

            cellData.forEach((chip) => {
              if (typeof chip === 'object' & chip !== null) {
                tmpColnames[j].chips.push(chip.display)
                var size = calculateSize(chip.display, { font: 'Arial', fontSize: '12px' })
              } else {
                tmpColnames[j].chips.push(chip)
                var size = calculateSize(chip, { font: 'Arial', fontSize: '12px' })
              }


              if (size.width + 60 > tmpMax) {
                tmpMax = size.width + 60
              }
              chipsSize = chipsSize + size.width + 60
            })

            let cellHeight = minHeight + (Math.round(chipsSize / tmpMax) * HeightIncrease)
            let cellWidth = chipsSize / tmpMax > 1 ? tmpMax : chipsSize

            if (cellWidth > tmpWidth[j]) tmpWidth[j] = cellWidth
            if (cellHeight > tmpHeight[i]) tmpHeight[i] = cellHeight

          } else {
            let cellSize = calculateSize(cellData, { font: 'Arial', fontSize: '14px' })

            let cellWidth = cellSize.width + 20
            if (cellWidth > tmpWidth[j]) tmpWidth[j] = cellWidth
          }
        }
        tmpColnames[j].chips = [...new Set(tmpColnames[j].chips)]
      }

      this.setState({
        TableColumnWidth: tmpWidth,
        TableRowHeight: tmpHeight,
        rowCount: myrows.length,
        colCount: mycolumns.length,
        colNames: tmpColnames,
        columnHide: tmpColnames,

        fullData: myrows,
        fullColumn: mycolumns,
        filteredData: myrows,
        filteredColumn: mycolumns,

        filteredColumnWidth: tmpWidth,
        filteredRowHeight: tmpHeight,

        tableReady: true
      }, () => {
        this.columnFilter(this.state.columnHide)
      })
    }
  }

  getRowHeight = (index) => {
    // return index % 2 ? 60 : 30;
    return this.state.filteredRowHeight[index]
  }

  getColumnWidth = (index) => {
    // return index % 2 ? 240 : 120;
    return this.state.filteredColumnWidth[index]
  }

  toggleItemActive = (rowIndex, columnIndex) => {
    this.setState({ currentRow: rowIndex, currentColumn: columnIndex })
  }

  handleFilterPopoverOpen = (index) => {
    this.setState(index !== this.state.filterPopoverOpen ? { filterPopoverOpen: index } : { filterPopoverOpen: -1 })
    // this.state.ancherEl ? this.setState({ anchorEl: null, filterPopoverOpen: false }) : this.setState({ anchorEl: event.currentTarget, filterPopoverOpen: true });
  }

  // handleFilterPopoverClose = () => {
  //   this.setState({ anchorEl: null, filterPopoverOpen: false })
  // }

  handleUpdateFilter = (newFilter) => {
    this.setState({ tableFilter: newFilter }, () => {
      this.rowFilter(this.state.fullData, this.state.tableFilter);
    })
  }

  handleRequestSort = (event, key) => {
    const isDesc = this.state.orderBy === key && this.state.order === 'desc';
    this.setState({ order: isDesc ? 'asc' : 'desc', orderBy: key }, () => {
      this.SortRowandHeight()
    });
  }

  handleRecalculateWidth = (currentWidth) => {

    let sumWidth = this.state.filteredColumnWidth.reduce(function (a, b) { return a + b; }, 0)

    if (currentWidth > sumWidth) {
      var expendedWidth = this.state.filteredColumnWidth.map((item) => {
        return item + (item / sumWidth) * (currentWidth - 15 - sumWidth)
      })

      this.setState({ filteredColumnWidth: expendedWidth })
    }
  }

  handleHideColumn = (index) => {

    const newHide = [...this.state.columnHide];

    if (index === -1) {
      for (let i = 0; i < newHide.length - 1; i++) {
        newHide[i].show = true
      }
    } else {
      newHide[index].show = !newHide[index].show
    }

    this.setState({ columnHide: newHide }, () => {
      this.columnFilter(this.state.columnHide)
    })
  }

  SortRowandHeight = () => {
    let arraySort = stableSort(
      this.state.filteredData,
      getSorting(this.state.order, this.state.orderBy)
    )
    var sortedArray = arraySort.map(el => el[0])

    var indices = arraySort.map(el => el[1])

    var newRowHeight = indices.map(i => this.state.filteredRowHeight[i]);
    this.setState({ filteredData: sortedArray, filteredRowHeight: newRowHeight })
  }

  columnFilter = (columnHide) => {

    let indices = columnHide.map((x, idx) => x.show ? idx : '').filter(String);
    let tmpNewColumnWidth = indices.map(i => this.state.TableColumnWidth[i]);
    let tmpfilteredColumn = indices.map(i => this.state.fullColumn[i]);

    this.setState({ filteredColumn: tmpfilteredColumn, filteredColumnWidth: tmpNewColumnWidth, tableReady: tmpNewColumnWidth.length > 0 }, () => {
      this.SortRowandHeight()
    });
  }

  rowFilter = (data, filters) => {

    var tmpNewRowHeight = []

    var filtered = data.filter((item, rowIndex) => {
      // var judge = true;
      var tmpJudge = new Array(filters.length).fill(true);

      Array.prototype.forEach.call(filters, (filter, index) => {

        switch (filter.operation) {
          case '>':
            if (Number(item[filter.column.key]) > Number(filter.value)) {
            } else {
              // judge = false; 
              tmpJudge[index] = false
            }
            break;
          case '≥':
            if (Number(item[filter.column.key]) >= Number(filter.value)) {
            } else {
              // judge = false;
              tmpJudge[index] = false
            }
            break;
          case '<':
            if (Number(item[filter.column.key]) < Number(filter.value)) {
            } else {
              // judge = false;
              tmpJudge[index] = false
            }
            break;
          case '≤':
            if (Number(item[filter.column.key]) <= Number(filter.value)) {
            } else {
              // judge = false;
              tmpJudge[index] = false
            }
            break
          case '=':
            if (typeof item[filter.column.key] !== 'object') {
              if (RegExp(filter.value).test(item[filter.column.key])) {
              } else {
                // judge = false;
                tmpJudge[index] = false
              }
            } else {
              if (typeof item[filter.column.key][0] === 'object' & item[filter.column.key][0] !== null) {
                let displays = item[filter.column.key].filter(chip => {
                  return RegExp(filter.value).test(chip.display);
                });
                if (displays.length > 0) {
                } else {
                  // judge = false;
                  tmpJudge[index] = false
                }
              } else {
                if (RegExp(filter.value).test(item[filter.column.key].join(','))) {
                } else {
                  // judge = false;
                  tmpJudge[index] = false
                }
              }
            }
            break;
          case '==':
            if (JSON.stringify(item[filter.column.key]) === JSON.stringify(filter.value)) {
            } else {
              // judge = false;
              tmpJudge[index] = false
            }
            break;

          case '⊂':
            if (typeof item[filter.column.key] !== 'object') {
              break
            } else {
              if (typeof item[filter.column.key][0] === 'object' & item[filter.column.key][0] !== null) {
                let displays = item[filter.column.key].filter(chip => {
                  return filter.value.includes(chip.display)
                });

                if (displays.length > 0) {
                } else {
                  tmpJudge[index] = false
                }
              } else {
                tmpJudge[index] = false
              }
            }
            break;

          case '⊄':
            if (typeof item[filter.column.key] !== 'object') {
              break
            } else {
              if (typeof item[filter.column.key][0] === 'object' & item[filter.column.key][0] !== null) {
                let displays = item[filter.column.key].filter(chip => {
                  return filter.value.includes(chip.display)
                });
                if (displays.length > 0) {
                  tmpJudge[index] = false
                } else {

                }
              } else {
              }
            }
            break;
          default:
            break;
        }
      });



      if (filters.length === 0) {
        var judge = true
      } else {
        var stringForEval = ''
        for (let i = 0; i < filters.length; i++) {

          stringForEval = stringForEval + tmpJudge[i]

          if (i !== (filters.length - 1)) {
            if (filters[i].andor === 'and') {
              stringForEval = stringForEval + ' & '
            } else {
              stringForEval = stringForEval + ' | '
            }
          }
        }
        var judge = eval(stringForEval)
      }

      if (judge) {
        tmpNewRowHeight.push(this.state.TableRowHeight[rowIndex])
      }
      return judge;
    });
    // return filtered;

    this.setState({ filteredData: filtered, filteredRowHeight: tmpNewRowHeight, tableReady: filtered.length > 0 }, () => {
      this.SortRowandHeight()
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography component='div'>
          <Box fontWeight='fontWeightBold' fontSize='h4.fontSize' mb={0}>
            {this.props.title}
            {/* <span style={{ fontSize: '0.5em' }}>
              <b style={{ color: '#2196f3' }}> <CountUp end={this.state.filteredData.length} /> </b>
            rows and
            <b style={{ color: '#2196f3' }}> <CountUp end={this.state.filteredColumn.length} /></b>
            columns
            </span> */}
          </Box>
          <Box fontWeight='fontWeightLight' mb={2}>
            {this.props.subtitle}
          </Box>
        </Typography>

        <Fragment>
          <Paper>
            <Card elevation={0} className="card-box mb-0 d-flex flex-row flex-wrap justify-content-center">
              {
                this.state.toolButtons.map((button, buttonIndex) => {
                  return (
                    <div className={clsx(classes.toolButton, 'py-4 px-5 d-flex align-items-center')} onClick={() => this.handleFilterPopoverOpen(buttonIndex)} style={buttonIndex === this.state.filterPopoverOpen ? { color: '#2E84CF' } : null}>
                      <Icon className={clsx(classes.iconHover, 'd-30 opacity-5 mr-3', button.icon)} />
                      <div>
                        <span className="d-block opacity-7"> {button.label} </span>
                      </div>
                    </div>
                  )
                })
              }
            </Card>

            <Collapse in={this.state.filterPopoverOpen === 0}>
              <Card elevation={0} className="card-box mb-0 d-flex flex-row flex-wrap justify-content-center">
                <VirtualTableFilter
                  variableList={this.state.filteredColumn}
                  tableFilter={this.state.tableFilter}
                  UpdateFilter={this.handleUpdateFilter}
                // onClickClose={this.handleFilterPopoverClose}
                />
              </Card>
            </Collapse>

            <Collapse in={this.state.filterPopoverOpen === 1}>
              <Card elevation={0} className="card-box mb-0 d-flex flex-row flex-wrap justify-content-center">
                <HideColumn
                  columnHide={this.state.columnHide}
                  onHideColumn={this.handleHideColumn}
                />
              </Card>
            </Collapse>

            <Collapse in={this.state.filterPopoverOpen === 2}>
              <Card elevation={0} className="card-box mb-0 d-flex flex-row flex-wrap justify-content-center">
                <Plots
                  variableList={this.state.columnHide}
                  dataRows={this.state.filteredData}
                />
              </Card>
            </Collapse>
          </Paper>
        </Fragment>

        <Toolbar className={classes.toolbar}>

          <div style={{ position: 'absolute', right: '1em' }}>
            <b style={{ fontSize: '1.3em', color: '#2196f3' }}><CountUp end={this.state.filteredData.length} /></b>
            &nbsp;rows and&nbsp;
            <b style={{ fontSize: '1.3em', color: '#2196f3' }}><CountUp end={this.state.filteredColumn.length} /></b>
            &nbsp;columns selected
          </div>

        </Toolbar>
        <Paper elevation={5} className={classes.paper}>

          <div className={classes.tableframe}>
            {
              this.state.tableReady ? (
                <AutoSizer>
                  {({ height, width }) => (
                    <StickyGrid
                      height={height}
                      width={width}
                      columnCount={this.state.filteredColumn.length}
                      rowCount={this.state.filteredData.length}
                      rowHeight={this.getRowHeight}
                      columnWidth={this.getColumnWidth}
                      stickyHeight={50}
                      stickyWidth={0}
                      onScroll={handleScroll}

                      myrows={this.state.filteredData}
                      mycolumns={this.state.filteredColumn}

                      toggleItemActive={this.toggleItemActive}

                      currentRow={this.state.currentRow}
                      currentColumn={this.state.currentColumn}
                      columnValue={this.state.filteredColumnWidth}


                      order={this.state.order}
                      orderBy={this.state.orderBy}
                      onRequestSort={this.handleRequestSort}

                      onRecalculateWidth={this.handleRecalculateWidth}
                    >
                      {GridColumn}
                    </StickyGrid>
                  )}
                </AutoSizer>
              ) : (
                  <Container>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      minHeight="50vh"
                    >
                      <Typography variant="h4" gutterBottom style={{ color: 'grey' }}>
                        Sorry, not even one record exist or passed your filter criteria...
                        </Typography>
                    </Box>

                  </Container>
                )
            }

          </div>
        </Paper>
        <Toolbar className={classes.toolbar}>
          <div style={{ position: 'absolute', left: '1em' }}>
            <b style={{ fontSize: '1.3em', color: '#2196f3' }}><CountUp end={this.state.filteredData.length} /></b>
            &nbsp;rows and&nbsp;
            <b style={{ fontSize: '1.3em', color: '#2196f3' }}><CountUp end={this.state.filteredColumn.length} /></b>
            &nbsp;columns selected
          </div>
        </Toolbar>
      </div>
    );
  }
}

VirtualGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    marginTop: theme.spacing(5),
  },
  tableframe: {
    margin: '10',
    height: '70vh',
    width: '100%',
    overflow: 'hidden',
    'scroll-behavior': 'smooth'
  },
  toolbar: {
    backgroundColor: '#eeeee',
    opacity: 1,
    flexGrow: 1,
    // border: '1px solid red'
  },
  paper: {
    overflowX: 'auto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    // fontSize: 15,
    '&:hover': {
      cursor: 'pointer',
      color: '#2E84CF'
    }
  },
  iconHover: {
    fontSize: '1.8em',
    margin: theme.spacing(0),
  },
  toolButton: {
    '&:hover': {
      cursor: 'pointer',
      color: '#2E84CF'
    }
  },
  collapsePaper: {
    // margin: theme.spacing(1),
  },
});


export default withStyles(styles)(VirtualGrid)