import React from 'react';
import './index.css'
const BasisList = ({item, onClick}) => (
    <li className="item-list" data-value={item} onClick={onClick}>
        {item}
    </li>
)

const TargetList = ({item, onClick}) => (
    <li className="item-list" data-value={item} onClick={onClick}>
        {item}
    </li>
)

const PickList = (props) => {
    return (
            <div className="pick-list">
                <ul className="basis-list">
                    {props.basis.map( series => (
                        <BasisList item = { series } onClick={props.coba}/>
                    ))}
                </ul>
                <ul className="target-list">
                    {props.target.map( series => (
                        <TargetList item = { series } onClick={props.coba1}/>
                    ))}
                </ul>
            </div>
    )
}

export default PickList;


