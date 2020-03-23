import React, {Component} from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import { Select, Button } from 'antd';
import 'antd/dist/antd.css';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metrics: [],
      cities: [],
      selectedMetric: '',
      selectedCities: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCitiesChange = this.handleCitiesChange.bind(this);
    this.handleMetricChange = this.handleMetricChange.bind(this);
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    treemap: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.getCities();
    this.getMetrics();
  }

  getCities() {
    axios
      .get('/classifiers/cities')
      .then(data => this.setState({cities: data.data}))
      .catch(err => {
        console.log(err); // eslint-disable-line
        return null;
      });
  }

  getMetrics() {
    axios
      .get('/classifiers/metrics')
      .then(data => this.setState({metrics: data.data}))
      .catch(err => {
        console.log(err); // eslint-disable-line
        return null;
      });
  }

  handleSubmit(event) {
    const {dispatch} = this.props;
    const {selectedMetric, selectedCities} = this.state;

    axios
      .get('/chart/treemap', {
        params: {
          cities: selectedCities,
          metric: selectedMetric
        }
      })
      .then(response => {
        dispatch({type: 'CHART/TREEMAP/GET/SUCCESS', payload: response.data});
      })
      .catch(error => {
        dispatch({type: 'CHART/TREEMAP/GET/ERROR', payload: error.message});
      });

    event.preventDefault();
  }

  handleCitiesChange(value) {
    this.setState({
      selectedCities: value
    });
  }

  handleMetricChange(value) {
    this.setState({
      selectedMetric: value
    });
  }

  render() {
    const {cities, metrics} = this.state;
    const Option = Select.Option;

    return (
      <FiltersBlock>
        <form onSubmit={this.handleSubmit}>
          <Select
            mode="multiple"
            style={{ width: '30%' }}
            placeholder="Города"
            onChange={this.handleCitiesChange}
          >
            {
              cities.map(item => {
                return <Option key={item.id} value={item.ru}>{item.ru}</Option>
              })
            }
          </Select>
          <Select
            style={{ width: '30%' }}
            placeholder="Метрики"
            onChange={this.handleMetricChange}
          >
            {
              metrics.map(item => {
                return <Option key={item.id} value={item.ru}>{item.ru}</Option>
              })
            }
          </Select>
          <Button type='primary' htmlType='submit'>
            Обновить
          </Button>
        </form>
      </FiltersBlock>
    )
  }
}

function mapStateToProps(state) {
  return {
    treemap: state.treemap.list.data,
  }
}

export default connect(mapStateToProps)(Filters)

const FiltersBlock = styled.div`
  padding: 0 10px;
`;