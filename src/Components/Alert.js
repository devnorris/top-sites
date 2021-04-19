import React from 'react';
import styled from 'styled-components';

const AlertBox = styled.div`
  border: 1px solid #fa8072;
  background-color: #ffa07a;
  color: #e10303;
  margin: 20px 10px;
  padding: 20px;
  text-align: center;
`;

const Alert = ({ alert }) => {
  return alert ? (
    <AlertBox>
      <p>{alert}</p>
    </AlertBox>
  ) : null;
};

export default Alert;
