import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Work } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ACTIVE_TAB, uiDrawerActiveTabState } from '../../redux/ui/drawerReducer';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  whiteLogo: { color: 'white', paddingLeft: '4px' },
  whiteFont: { color: 'white' },
  activeTab: {
    backgroundColor: 'rgb(0,0,0,.3)'
  }
}));


export const ListItems = () =>
{
  const classes = useStyles();
  const activeTab = useSelector(uiDrawerActiveTabState);
  const dispatch = useDispatch();

  function handleTabClick(tab)
  {
    dispatch(SET_ACTIVE_TAB({ tab: tab }));
  }

  return <div>
    <ListItem button component={Link} to='/projectManager'
      className={clsx({ [classes.activeTab]: activeTab === 'projectManager' })}
      onClick={() => handleTabClick('projectManager')}
    >
      <ListItemIcon className={classes.whiteLogo}>
        <Work />
      </ListItemIcon>
      <ListItemText primary="Projects" className={classes.whiteFont} />
    </ListItem>

    <ListItem button component={Link} to='/board'
      className={clsx({ [classes.activeTab]: activeTab === 'board' })}
      onClick={() => handleTabClick('board')}
    >
      <ListItemIcon className={classes.whiteLogo}>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" className={classes.whiteFont} />
    </ListItem>
  </div>
};
