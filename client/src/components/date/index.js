import Preact, { h, Component } from 'preact';

const FormattedDate = ({ dateString }) => 
  <div>{`${new Date(dateString)}`}</div>
  

export default FormattedDate;