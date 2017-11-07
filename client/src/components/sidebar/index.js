import Preact, { h, Component } from 'preact';
import './sidebar.scss';

const Sidebar = ({ children }) => 
  <sidebar>
    {children}
  </sidebar>

export default Sidebar;