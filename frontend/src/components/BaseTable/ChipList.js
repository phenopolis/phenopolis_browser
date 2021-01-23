import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TypeChip from '../Chip/TypeChip';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({}));

const ChipList = (props) => {
  const classes = useStyles();

  useEffect(() => {
    // console.log(props)
  }, [props]);

  return (
    <span>
      {typeof props.chips === 'object' ? (
        props.chips.map((chip, index) => {
          return (
            <TypeChip
              key={index}
              label={chip.display}
              type={props.colName.base_href.replace(/[^a-zA-Z0-9_-]/g, '')}
              size="small"
              action="forward"
              popover={true}
              to={
                chip.end_href
                  ? (props.colName.base_href + '/' + chip.end_href).replace(/\/\//g, '/')
                  : (props.colName.base_href + '/' + chip.display).replace(/\/\//g, '/')
              }
            />

            // <Chip
            //   key={index}
            //   label={chip.display}
            //   // onClick={handleClick}
            //   // onDelete={handleDelete}
            //   // deleteIcon={<DoneIcon />}
            //   variant="outlined"
            //   style={{ margin: '2px' }}
            // />
          );
        })
      ) : (
        // This is not good, some columns like Rsid was labelled "links", but actually it's just a string (not object) in this attribute.
        <>{props.chips}</>
      )}
    </span>
  );
};

export default ChipList;