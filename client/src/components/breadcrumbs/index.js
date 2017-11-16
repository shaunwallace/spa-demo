import Preact, { h, Component } from 'preact';
import './breadcrumbs.scss';

const Breadcrumbs = ({ crumbs, onClick }) => 
  <div>
    {
      crumbs.map((crumb, i) =>
        <span onClick={() => onClick(crumb)}>
          {`${crumb} ${i !== crumbs.length - 1 ? '> ' : ''}`}
        </span>
      )
    }
  </div>

export default Breadcrumbs;