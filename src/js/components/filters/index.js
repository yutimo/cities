import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
  ;
import styled from 'styled-components';
import { Row, Col, Form, Select, Button } from 'antd';

import loadCities from '../../api/cities/load';
import loadMetrics from '../../api/metrics/load';
import loadTreemap from '../../api/treemap/load';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metrics: [],
      cities: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCitiesChange = this.handleCitiesChange.bind(this);
    this.handleMetricChange = this.handleMetricChange.bind(this);
    this.getOptGroups = this.getOptGroups.bind(this);
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    treemap: PropTypes.array.isRequired,
    selectedCities: PropTypes.array,
    selectedMetric: PropTypes.string
  };

  componentDidMount() {
    this.getCities();
    this.getMetrics();
  }

  getCities() {
    loadCities()
      .then(data => this.setState({cities: data.data}))
      .catch(err => {
        console.log(err); // eslint-disable-line
        return null;
      });
  }

  getMetrics() {
    loadMetrics()
      .then(data => this.setState({metrics: data.data}))
      .catch(err => {
        console.log(err); // eslint-disable-line
        return null;
      });
  }

  handleSubmit() {
    const {dispatch, selectedCities, selectedMetric} = this.props;

    loadTreemap(selectedCities, selectedMetric)
      .then(response => {
        dispatch({type: 'CHART/TREEMAP/GET/SUCCESS', payload: response.data});
      })
      .catch(error => {
        dispatch({type: 'CHART/TREEMAP/GET/ERROR', payload: error.message});
      });
  }

  handleCitiesChange(value) {
    const {dispatch} = this.props;

    dispatch({type: 'SELECTEDCITIES/GET/SUCCESS', payload: value});
  }

  handleMetricChange(value) {
    const {dispatch} = this.props;

    dispatch({type: 'SELECTEDMETRIC/GET/SUCCESS', payload: value});
  }

  getOptGroups() {
    const { metrics } = this.state;
    const { Option, OptGroup } = Select;
    let optGroups = new Set(); // eslint-disable-line

    metrics.forEach(item => {
      optGroups.add(item.optgroup);
    });

    return Array.from(optGroups).map(optGroup => {
      const options = metrics.filter(item => item.optgroup === optGroup);

      return (
        <OptGroup
          label={optGroup}
          key={optGroup}
        >
          {
            options.map(item => {
              return (
                <Option key={item.id}>
                  {item.ru}
                </Option>
              )
            })
          }
        </OptGroup>
      )
    })
  }

  render() {
    const { cities } = this.state;

    const { Option } = Select;

    return (
      <FiltersBlock>
        <Form
          onFinish={this.handleSubmit}
          layout='inline'
        >
          <Row style={{ width: '100%' }}>
            <Col span={8}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Выбери город',
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Города"
                  onChange={this.handleCitiesChange}
                >
                  {
                    cities.map(item => {
                      return <Option key={item.id} value={item.ru}>{item.ru}</Option>
                    })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Выбери метрику',
                  },
                ]}
              >
                <Select
                  placeholder="Метрики"
                  onChange={this.handleMetricChange}
                >
                  {this.getOptGroups()}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Обновить
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </FiltersBlock>
    )
  }
}

function mapStateToProps(state) {
  return {
    treemap: state.treemap.list.data,
    selectedCities: state.selectedCities.list.data,
    selectedMetric: state.selectedMetric.list.data
  }
}

export default connect(mapStateToProps)(Filters)

const FiltersBlock = styled.div`
  padding: 0 10px;
`;