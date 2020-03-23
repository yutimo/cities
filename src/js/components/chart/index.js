import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from "axios";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import addTreemapModule from 'highcharts/modules/treemap';
import addHeatmapModule from 'highcharts/modules/heatmap';

import OverviewModal from '../overviewModal';

addTreemapModule(Highcharts);
addHeatmapModule(Highcharts);

const FILTER_BLOCK_HEIGHT = 32;
const APP_Y_PADDING = 50;

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityOverview: {},
      isOverviewModalVisible: false
    };

    this.toggleCityOverviewModal = this.toggleCityOverviewModal.bind(this);
  }

  static propTypes = {
    treemap: PropTypes.array.isRequired
  };

  toggleCityOverviewModal() {
    const {isOverviewModalVisible} = this.state;

    this.setState({isOverviewModalVisible: !isOverviewModalVisible})
  }

  render() {
    const self = this;

    const cities = this.props.treemap.map((item, index) => {
      return {
        id: item.city,
        name: item.city,
        value: item.present,
        past: item.past,
        colorValue: index + 1,
      }
    });

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
            axios
              .get(`/cities/${event.point.id}/overview`)
              .then(data => {
                self.setState({cityOverview: data.data,});
              })
              .catch(err => {
                console.log(err); // eslint-disable-line
                return null;
              });

            self.toggleCityOverviewModal();
          }
        },
        data: cities
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
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
        <OverviewModal
          isOverviewModalVisible={this.state.isOverviewModalVisible}
          toggleCityOverviewModal={this.toggleCityOverviewModal}
          cityOverview={this.state.cityOverview}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    treemap: state.treemap.list.data,
  }
}

export default connect(mapStateToProps)(Chart)