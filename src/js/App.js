import React from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.css';

import Filters from '../js/components/filters';
import Chart from '../js/components/chart';

const App = () => {
  return (
    <AppContainer>
      <Filters/>
      <Chart/>
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  padding: 25px 0 0 0;
`;

