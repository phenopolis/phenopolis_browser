import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';

import { prepareBoxplotData } from 'echarts/extension/dataTool';
import ecStat from 'echarts-stat';
import ReactEcharts from 'echarts-for-react';

import { Card, CardContent, Grid, Button } from '@material-ui/core';

import BoxplotOption from '../../assets/echartJS/BoxplotOption';
import ScatterOption from '../../assets/echartJS/ScatterOption';
import StackBarOption from '../../assets/echartJS/StackBarOption';
import HistogramOption from '../../assets/echartJS/HistogramOption';
import BarplotOption from '../../assets/echartJS/BarplotOption';
import ReactSelect from './ReactSelect';

class Plots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xAxis: null,
      yAxis: null,
      msg: 'Neither of two axises are selected',
      option: [],
      plotReady: false,
      EventsDict: null,
      warningMessage: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.getSeriesData(this.state.xAxis, this.state.yAxis);
  }

  onScatterClick = (param) => {
    this.props.highlighRow(param.dataIndex);
  };

  onBarClick = (param) => {
    // window.alert('Bar Click: ' + param.dataIndex);
  };

  ReactSelectXAxis = (selectedOption) => {
    this.setState({ xAxis: selectedOption }, () => {
      this.getSeriesData(this.state.xAxis, this.state.yAxis);
    });
  };

  ReactSelectYAxis = (selectedOption) => {
    this.setState({ yAxis: selectedOption }, () => {
      this.getSeriesData(this.state.xAxis, this.state.yAxis);
    });
  };

  getSeriesData = (xAxis, yAxis) => {
    if ((xAxis === null) & (yAxis === null)) {
      this.setState({ msg: 'Neither of two axises is selected.', plotReady: false });
    } else if ((xAxis !== null) & (yAxis !== null)) {
      if ((xAxis.type === 'number') & (yAxis.type === 'number')) {
        this.CreateScatterPlot(xAxis, yAxis);
      } else if ((xAxis.type !== 'number') & (yAxis.type === 'number')) {
        this.CreateBoxplot(xAxis, yAxis, false);
      } else if ((xAxis.type === 'number') & (yAxis.type !== 'number')) {
        this.CreateBoxplot(yAxis, xAxis, true);
      } else {
        this.CreateStackBarPlot(xAxis, yAxis);
      }
    } else if ((xAxis !== null) & (yAxis === null)) {
      if (xAxis.type === 'number') {
        this.CreateHistogram(xAxis);
      } else if ((xAxis.type === 'string') | (xAxis.type === 'object')) {
        this.CreateBarplot(xAxis);
      }
    } else if ((xAxis === null) & (yAxis !== null)) {
      if (yAxis.type === 'number') {
        this.CreateHistogram(yAxis);
      } else if ((yAxis.type === 'string') | (yAxis.type === 'object')) {
        this.CreateBarplot(yAxis);
      }
    }
  };

  CreateBarplot = (Axis) => {
    let tmpValue = '';
    if (Axis.type === 'string') {
      tmpValue = this.props.dataRows.map((x) => x[Axis.key]);
    } else {
      // if (typeof this.props.dataRows[0][Axis.key] === 'object') {
      //   tmpValue = this.props.dataRows.map((x) => x[Axis.key].map((y) => y.display)).flat();
      // } else {
      //   tmpValue = this.props.dataRows.map((x) => x[Axis.key].map((y) => y)).flat();
      // }
      tmpValue = this.props.dataRows
        .map((x) => {
          if (typeof x[Axis.key] === 'string') {
            return x[Axis.key];
          } else {
            return x[Axis.key].map((y) => {
              if (typeof y === 'object') {
                if (y !== null) {
                  return y.display;
                } else {
                  return 'null';
                }
              } else {
                return y;
              }
            });
          }
          //  x[Axis.key].map((y) => y)
        })
        .flat();
    }

    var _ = require('underscore');
    tmpValue = _.countBy(tmpValue);

    const newBarplotOption = JSON.parse(JSON.stringify(BarplotOption));
    newBarplotOption.xAxis.data = Object.keys(tmpValue);
    newBarplotOption.series[0].data = Object.values(tmpValue);
    newBarplotOption.series[0].name = Axis.name;
    newBarplotOption.title.text = 'Barplot of ' + Axis.name;

    let tmpMsg = 'Now you have chose one categorical axis, barplot will be plotted one the left.';

    this.setState({ option: newBarplotOption, EventsDict: {}, msg: tmpMsg, plotReady: true });
  };

  CreateHistogram = (Axis) => {
    let tmpValue = this.props.dataRows.map((x) => Number(x[Axis.key]));
    var bins = ecStat.histogram(tmpValue);

    const newHistogramOption = JSON.parse(JSON.stringify(HistogramOption));
    newHistogramOption.title.text = 'Histogram of ' + Axis.name;
    newHistogramOption.series[0].data = bins.data;

    let tmpMsg = 'Now you have chose one number axis, histogram will be plotted one the left.';

    this.setState({ option: newHistogramOption, EventsDict: {}, msg: tmpMsg, plotReady: true });
  };

  CreateScatterPlot = (xAxis, yAxis) => {
    let tmpData = this.props.dataRows.map((row) => {
      return [row[xAxis.key], row[yAxis.key]];
    });

    const newScatterOption = JSON.parse(JSON.stringify(ScatterOption));

    newScatterOption.series[0].name = yAxis.name;
    newScatterOption.series[0].data = tmpData;
    newScatterOption.title.text = 'Scatter Plot between ' + xAxis.name + ' and ' + yAxis.name;

    let tmpMsg =
      'Now you have chose two axis, scatter plot has been drawed on the left. \n\n' +
      'The dashline box represents the max values for two dimensions.\n\n' +
      'The top and bottom balloons represents the max and min value for Y axis.\n\n' +
      'If you use row filter and column filter, the plot will change promptly';

    this.setState({
      option: newScatterOption,
      EventsDict: { click: this.onScatterClick },
      msg: tmpMsg,
      plotReady: true,
    });
  };

  CreateBoxplot = (xAxis, yAxis, rotate) => {
    var flattenData = [];
    if (xAxis.type === 'object') {
      // this.props.dataRows.forEach((item) => {
      //   item[xAxis.key].forEach((chip) => {
      //     flattenData.push({ keyX: chip.display, keyY: item[yAxis.key] });
      //   });
      // });

      // tmpValue = this.props.dataRows.map((x) => {
      //   if (typeof x[Axis.key] === 'string') {
      //     return x[Axis.key]
      //   } else {
      //     return x[Axis.key].map((y) => {
      //       if (typeof y === 'object') {
      //         return y.display
      //       } else {
      //         return y
      //       }
      //     })
      //   }
      //   //  x[Axis.key].map((y) => y)
      // }).flat();

      this.props.dataRows.forEach((item) => {
        if (typeof item[xAxis.key] === 'string') {
          flattenData.push({ keyX: item[xAxis.key], keyY: item[yAxis.key] });
        } else {
          item[xAxis.key].forEach((chip) => {
            flattenData.push({
              keyX: chip !== null ? chip.display : 'null',
              keyY: item[yAxis.key],
            });
          });
        }
      });
    } else {
      this.props.dataRows.forEach((item) => {
        flattenData.push({ keyX: item[xAxis.key], keyY: item[yAxis.key] });
      });
    }

    let groupedByxAxis = flattenData.reduce((acc, item) => {
      acc[item['keyX']] = [...(acc[item['keyX']] || []), item['keyY']];
      return acc;
    }, {});

    let labels = Object.keys(groupedByxAxis);

    let tmpData = null;
    if (rotate) {
      tmpData = prepareBoxplotData(Object.values(groupedByxAxis), { layout: 'vertical' });
    } else {
      tmpData = prepareBoxplotData(Object.values(groupedByxAxis));
    }

    const newBoxplotOption = JSON.parse(JSON.stringify(BoxplotOption));

    newBoxplotOption.xAxis.data = labels;
    newBoxplotOption.series[0].data = tmpData.boxData;
    newBoxplotOption.series[1].data = tmpData.outliers;

    if (rotate) {
      let tmpSwap = newBoxplotOption.xAxis;
      newBoxplotOption.xAxis = newBoxplotOption.yAxis;
      newBoxplotOption.yAxis = tmpSwap;
    }

    let tmpMsg =
      'Now you have chose two axis, boxplot plot has been drawed on the left. \n\n' +
      'Dots represents outlier for each box.\n\n' +
      'If you use row filter and column filter, the plot will change promptly';

    let plotReady = true;
    let warningMessage = '';
    if (labels.length >= 20) {
      plotReady = false;
      warningMessage =
        'More than 20 boxes would be plotted. Too many boxes in one plot may be less informative to observe, and even slow your browser. However, you can still hover over boxplots to get detailed information.';
    }

    this.setState({
      option: newBoxplotOption,
      EventsDict: {},
      msg: tmpMsg,
      plotReady: plotReady,
      warningMessage: warningMessage,
    });
  };

  CreateStackBarPlot = (xAxis, yAxis) => {
    var flattenData = [];

    this.props.dataRows.forEach((item) => {
      if (typeof item[xAxis.key] === 'string') {
        if (typeof item[yAxis.key] === 'string') {
          flattenData.push({ keyX: item[xAxis.key], keyY: item[yAxis.key] });
        } else {
          item[yAxis.key].forEach((chip) => {
            flattenData.push({ keyX: item[xAxis.key], keyY: chip.display });
          });
        }
      } else {
        item[xAxis.key].forEach((chipX) => {
          if (typeof item[yAxis.key] === 'string') {
            flattenData.push({
              keyX: chipX !== null ? chipX.display : 'null',
              keyY: item[yAxis.key],
            });
          } else {
            item[yAxis.key].forEach((chipY) => {
              flattenData.push({
                keyX: chipX !== null ? chipX.display : 'null',
                keyY: chipY !== null ? chipY.display : 'null',
              });
            });
          }
        });
      }
    });

    const tmpMap = flattenData.reduce((tally, item) => {
      tally[item['keyX'] + '-' + item['keyY']] =
        (tally[item[['keyX']] + '-' + item['keyY']] || 0) + 1;
      return tally;
    }, {});

    var JoinCount = Object.keys(tmpMap).map((a) => {
      var obj = {
        x: a.split('-')[0],
        y: a.split('-')[1],
        tally: tmpMap[a],
      };
      return obj;
    });

    var xOptions = Array.from(new Set(JoinCount.map((item) => item.x)));
    var yOptions = Array.from(new Set(JoinCount.map((item) => item.y)));

    var newSeries = [];
    yOptions.forEach((y) => {
      let tmp = [];
      xOptions.forEach((x) => {
        if (tmpMap[x + '-' + y] !== undefined) {
          tmp.push(tmpMap[x + '-' + y]);
        } else {
          tmp.push(0);
        }
      });

      newSeries.push({
        name: y,
        type: 'bar',
        stack: 'count',
        label: {
          show: true,
          position: 'insideRight',
        },
        data: tmp,
      });
    });

    const newStackBarOption = JSON.parse(JSON.stringify(StackBarOption));
    newStackBarOption.series = newSeries;
    newStackBarOption.legend.data = yOptions;
    newStackBarOption.xAxis.data = xOptions;

    let tmpMsg = 'This is stacked bar plot.';

    let plotReady = true;
    let warningMessage = '';
    if ((xOptions.length >= 20) | (yOptions.length >= 20)) {
      plotReady = false;
      warningMessage =
        'More than 20 bars/stacks would be plotted. Too many elements in one plot may be less informative to observe, and even slow your browser. However, you can still hover over stackbars to get detailed information.';
    }

    this.setState({
      option: newStackBarOption,
      EventsDict: {},
      msg: tmpMsg,
      plotReady: plotReady,
      warningMessage: warningMessage,
    });
  };

  confirmPlot = () => {
    this.setState({ warningMessage: '', plotReady: true });
  };

  cancelPlot = () => {
    this.setState({
      xAxis: null,
      yAxis: null,
      msg: 'Neither of two axises are selected',
      option: [],
      plotReady: false,
      EventsDict: null,
      warningMessage: '',
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Card elevation={0} className={classes.root}>
        <CardContent>
          <Grid container justify="center" spacing={5} style={{ marginBottom: '2em' }}>
            <Grid item xs={3}>
              <ReactSelect
                currentValue={this.state.yAxis}
                placeholder="Select Y Axis"
                optionList={this.props.variableList.filter(
                  (x) =>
                    ((x.type === 'number') | (x.type === 'string') | (x.type === 'object')) & x.show
                )}
                onSelectChange={this.ReactSelectYAxis}
              />
            </Grid>

            <Grid item xs={3}>
              <ReactSelect
                currentValue={this.state.xAxis}
                placeholder="Select X Axis"
                optionList={this.props.variableList.filter(
                  (x) =>
                    ((x.type === 'number') | (x.type === 'string') | (x.type === 'object')) & x.show
                )}
                onSelectChange={this.ReactSelectXAxis}
              />
            </Grid>
          </Grid>

          <Grid container justify="center" spacing={0}>
            <Grid item xs={2}></Grid>
            <Grid item xs={6}>
              {this.state.warningMessage !== '' ? (
                <div className="text-center p-2">
                  <div className="font-weight-bold font-size-lg mt-1">
                    Do you want to continue to plot?
                  </div>
                  <p className="mb-0 mt-2 text-grey font-size-md">{this.state.warningMessage}</p>
                  <div className="pt-4">
                    <Button
                      onClick={this.cancelPlot}
                      variant="outlined"
                      color="primary"
                      className="mx-1">
                      <span className="btn-wrapper--label">Cancel</span>
                    </Button>
                    <Button
                      onClick={this.confirmPlot}
                      variant="outlined"
                      color="primary"
                      className="mx-1">
                      <span className="btn-wrapper--label">Yes, do it</span>
                    </Button>
                  </div>
                </div>
              ) : null}

              {this.state.plotReady ? (
                <ReactEcharts
                  option={this.state.option}
                  notMerge={true}
                  lazyUpdate={true}
                  onEvents={this.state.EventsDict}
                  style={{ height: '40em' }}
                />
              ) : this.state.warningMessage === '' ? (
                <div style={{ paddingTop: '2em', color: 'darkgrey', textAlign: 'center' }}>
                  Please Select variables for X axis and Y axis to draw Scatter Plot.
                  <div style={{ marginTop: '1em', whiteSpace: 'pre-wrap' }}>{this.state.msg}</div>
                </div>
              ) : null}
            </Grid>
            <Grid item xs={2} style={{ paddingTop: '5em', color: 'darkgrey' }}>
              {this.state.plotReady ? (
                <div style={{ paddingTop: '2em', color: 'darkgrey' }}>
                  <div style={{ marginTop: '1em', whiteSpace: 'pre-wrap' }}>{this.state.msg}</div>
                </div>
              ) : null}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

Plots.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
  root: {
    width: '100%',
    maxHeight: 800,
    overflowY: 'auto',
  },
  rotateSelect: {
    position: 'relative',
    top: '40%',
  },
});

export default compose(withStyles(styles))(Plots);
