import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import addTreemapModule from 'highcharts/modules/treemap';
import addHeatmapModule from 'highcharts/modules/heatmap';

import { Modal } from 'antd';

import cityOverview from '../../api/cityOverview/load';

import { createSelector } from 'reselect';

addTreemapModule(Highcharts);
addHeatmapModule(Highcharts);

const FILTER_BLOCK_HEIGHT = 32;
const APP_Y_PADDING = 50;

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityOverview: {}
    };
  }

  static propTypes = {
    treemap: PropTypes.array.isRequired
  };

  toggleCityOverviewModal() {
    const {cityOverview} = this.state;

    Modal.info({
      title: cityOverview.id,
      content: (
        <div>
          <div>
            Заказы: {cityOverview.orders_volume}
          </div>
          <div>
            Сгоревшие: {cityOverview.burned}
          </div>
        </div>
      ),
      onOk() {},
    });
  }

  render() {
    const self = this;
    const {treemap} = this.props;

    const citiesSelector = state => state;

    const treemapCitiesSelector = createSelector(
      citiesSelector,
      items => items.map((item, index) => {
        return {
          id: item.city,
          name: item.city,
          value: item.present,
          past: item.past,
          colorValue: index + 1,
        }
      })
    );

    const options = {
      chart: {
        height: `${window.innerHeight - FILTER_BLOCK_HEIGHT - APP_Y_PADDING} px` // eslint-disable-line
      },
      title: {
        text: 'My chart'
      },
      colorAxis: {
        minColor: '#fff',
        maxColor: Highcharts.getOptions().colors[7]
      },
      legend: {
        enabled: false,
      },
      series: [{
        type: 'treemap',
        layoutAlgorithm: 'squarified',
        levels: [{
          level: 1,
          dataLabels: {
            enabled: true,
            align: 'left',
            verticalAlign: 'top',
            style: {
              fontSize: '15px',
              fontWeight: 'bold'
            }
          }
        }],
        events: {
          click: function (event) {
            cityOverview(event.point.id)
              .then(data => {
                self.setState({cityOverview: data.data,});
              })
              .then(() => self.toggleCityOverviewModal())
              .catch(err => {
                console.log(err); // eslint-disable-line
                return null;
              });
          }
        },
        data: treemapCitiesSelector(treemap)
      }],
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            useHTML: true,
            color: 'black',
            formatter: function () {
              return (
                `<div>
                  <div>
                    ${this.point.name}
                  </div>
                  <div>
                    ${this.point.value}
                  </div>
                  <div>
                    ${this.point.past}
                  </div>
                </div>`
              );
            }
          }
        }
      },
    };

    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    treemap: state.treemap.list.data,
  }
}

export default connect(mapStateToProps)(Chart)