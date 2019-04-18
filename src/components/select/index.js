import React from 'react';

import './index.css'
const Options = ({ item }) => (
    <option value={item.value}> 
        {item.label}
    </option>
)

const Select = (props) => {
    return(
        <div>
            <input list="item" name={props.nameState} onChange={props.handleChange}/>
            <datalist id="item">
                {props.options.map( item => (
                    <Options item = { item } />
                ))} 
            </datalist> 
        </div >
    )
}

export default Select;