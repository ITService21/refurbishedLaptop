// App.js
import React from 'react';
import  { FilterCollapse } from '../Components/common/Elements';

const filterItems = [
  {
    key: 'brand',
    header: 'Brand',
    options: ['Dell', 'HP', 'Lenovo', 'Macbook'],
  },
  {
    key: 'processor',
    header: 'Processor',
    options: ['i3', 'i5', 'i7'],
  },
  {
    key: 'ram',
    header: 'RAM Size',
    options: ['8 GB', '16 GB', '32 GB'],
  },
  {
    key: 'storage',
    header: 'Storage Capacity',
    options: ['128 GB', '256 GB', '500 GB', '512 GB', '1 TB'],
  },
  {
    key: 'availability',
    header: 'Availability',
    options: ['In Stock', 'New Arrival'],
  },
];

const App = () => (
    <div className="h-screen" style={{ width: 300, padding: 20, overflowY: 'auto' }}>
    <h2 className="text-[28px] my-2 text-start">Filters</h2>
    <FilterCollapse items={filterItems} defaultActiveKey={['brand', 'processor','ram' ]} />
  </div>
);

export default App;
