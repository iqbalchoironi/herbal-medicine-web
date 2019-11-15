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
      <div className="pick-list">
        <input
          onChange={props.filterList}
          style={{
            margin: '10px 10px 5px auto',
            width: '240px',
            borderRadius: '5px',
            display: 'block'
          }}
        ></input>
        <div
          onChange={props.filterList}
          style={{
            margin: '10px auto 5px 10px',
            width: '240px',
            borderRadius: '5px',
            display: 'block'
          }}
        ></div>
      </div>
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
