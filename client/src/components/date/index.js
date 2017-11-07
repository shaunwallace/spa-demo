import Preact, { h, Component } from 'preact';

const FormattedDate = ({ date, locale, options = {hour: 'numeric', minute: 'numeric', second: 'numeric'} }) => 
  <span>{new Date(date).toLocaleDateString(locale, options)}</span>

export default FormattedDate;