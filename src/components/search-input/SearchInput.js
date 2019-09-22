import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import Icon from '@material-ui/core/Icon';

const SearchInput = props => (
  <div>
    <InputBase
      className={'SearchInput-root'}
      placeholder={'Search...'}
      name={props.nameInput}
      value={props.inputValue}
      onChange={props.inputChange}
    />
    <Icon onClick={props.clickButton}>search</Icon>
  </div>
);

SearchInput.metadata = {
  name: 'Search Input', // mandatory
  description: 'Trust me! you will need it somewhere' // optional
};
SearchInput.getTheme = muiBaseTheme => {
  // ATTENTION!
  // you can customize some important variables here!!
  const backgroundColor = muiBaseTheme.palette.grey[100];
  const space = muiBaseTheme.spacing.unit; // default = 8;
  const borderRadius = 0;
  const iconColor = muiBaseTheme.palette.grey[500];
  // end of variables
  return {
    MuiInputBase: {
      root: {
        '&.SearchInput-root': {
          backgroundColor,
          borderRadius,
          padding: `${space}px ${space * 2}px`,
          '& .material-icons': {
            fontSize: 20,
            color: iconColor,
            '&:first-child': {
              marginRight: space
            }
          }
        }
      }
    }
  };
};

export default SearchInput;
