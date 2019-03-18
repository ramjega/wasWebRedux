import React from 'react'
import Header from '../base/components/Header'
import {Router, browserHistory} from 'react-router'
import styled from '@emotion/styled'
import routes from "../routes.js";

const Container = styled.div`
  text-align: center;
`;

function Routes() {
  return (
    <Router  history={browserHistory} routes={routes}>
      <Container>
        <Header/>
      </Container>
    </Router>
  )
}

export default Routes
