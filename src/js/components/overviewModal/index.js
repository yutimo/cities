import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import 'antd/dist/antd.css';

export default class OverviewModal extends Component {
  render() {
    const {isOverviewModalVisible, toggleCityOverviewModal, cityOverview} = this.props;

    return (
      <Modal
        title={cityOverview.id}
        visible={isOverviewModalVisible}
        footer={null}
        onCancel={toggleCityOverviewModal}
      >
        <div>
          Заказы: {cityOverview.orders_volume}
        </div>
        <div>
          Сгоревшие: {cityOverview.burned}
        </div>
      </Modal>
    )
  }
}

OverviewModal.propTypes = {
  isOverviewModalVisible: PropTypes.bool,
  toggleCityOverviewModal: PropTypes.func,
  cityOverview: PropTypes.object,
};