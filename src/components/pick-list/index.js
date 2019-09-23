import React from 'react';
import './index.css';
const BasisList = ({ item, onClick }) => (
  <li className="item-list-basis" data-value={item} onClick={onClick}>
    {item}
  </li>
);

const TargetList = ({ item, onClick }) => (
  <li className="item-list-basis" data-value={item} onClick={onClick}>
    {item}
  </li>
);

const PickList = props => {
  return (
    <div>
      <input
        onChange={props.filterList}
        style={{
          margin: '10px 10px 5px 40px',
          width: '240px',
          borderRadius: '5px'
        }}
      ></input>
      <div className="pick-list">
        <ul className="basis-list">
          {props.basis.map(series => (
            <BasisList item={series} onClick={props.toTarget} />
          ))}
        </ul>
        <ul className="target-list">
          {props.target.map(series => (
            <TargetList item={series} onClick={props.toBasis} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PickList;
