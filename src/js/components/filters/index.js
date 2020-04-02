import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
  ;
import styled from 'styled-components';
import { Row, Col, Form, Select, Button } from 'antd';

import loadTreemap from '../../api/treemap/load';

class Filters extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCitiesChange = this.handleCitiesChange.bind(this);
    this.handleMetricChange = this.handleMetricChange.bind(this);
    this.getOptGroups = this.getOptGroups.bind(this);
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    selectedCities: PropTypes.array,
    selectedMetric: PropTypes.string,
    cities: PropTypes.array,
    metrics: PropTypes.array
  };

  componentDidMount() {
    this.getCities();
    this.getMetrics();
  }

  getCities() {
    const {dispatch} = this.props;

    dispatch({type: 'RESOURCES/CITIES/GET/PENDING'});
  }

  getMetrics() {
    const {dispatch} = this.props;

    dispatch({type: 'RESOURCES/METRICS/GET/PENDING'});
  }

  handleSubmit() {
    const {dispatch} = this.props;

    dispatch({type: 'TREEMAP/CHART/GET/PENDING'});
  }

  handleCitiesChange(value) {
    const {dispatch} = this.props;

    dispatch({type: 'TREEMAP/UI/FILTERS/PATCH', payload: {field: 'selectedCities', value}});
  }

  handleMetricChange(value) {
    const {dispatch} = this.props;

    dispatch({type: 'TREEMAP/UI/FILTERS/PATCH', payload: {field: 'selectedMetric', value}});
  }

  getOptGroups() {
    const { metrics } = this.props;
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
    const { cities } = this.props;

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
    selectedCities: state.pages.treemap.ui.filters.selectedCities,
    selectedMetric: state.pages.treemap.ui.filters.selectedMetric,
    cities: state.resources.cities.list.data,
    metrics: state.resources.metrics.list.data
  }
}

export default connect(mapStateToProps)(Filters)

const FiltersBlock = styled.div`
  padding: 0 10px;
`;