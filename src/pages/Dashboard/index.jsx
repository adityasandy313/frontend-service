import React from 'react';
import {CollectionType} from '../../components';
import './Dashboard.css';

const Dashboard = () => {
  
  return (
    <div className='dashboard'>
      <div className='collection-container'><CollectionType /></div>
      {/* <div className='contentbuilder-container' ><ContentBuilder /></div> */}
    </div>
  );
};

export default Dashboard;