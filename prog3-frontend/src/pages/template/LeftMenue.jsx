import React from 'react';

import { Link } from 'react-router-dom';
import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import CalculateIcon from '@mui/icons-material/Calculate';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PetsIcon from '@mui/icons-material/Pets';
import TaskIcon from '@mui/icons-material/Task';

const MenuItem = ({ title, path, icon }) => (
  <ListItem button component={Link} to={path}>
    <ListItemIcon>{React.createElement(icon)}</ListItemIcon>
    <ListItemText primary={title} />
  </ListItem>
);

const LeftMenue = ({ open, drawerWidth, mdTheme, toggleDrawer }) => {
  return (
    <List>
      <div>
        <MenuItem title='Inicio' path='/' icon={HomeIcon} />
        <MenuItem title='Sumador' path='/sumador' icon={CalculateIcon} />
        <MenuItem
          title='Sumador Redux'
          path='/sumador-redux'
          icon={CalculateOutlinedIcon}
        />
        <MenuItem title='Productos' path='/productos' icon={ShoppingCartIcon} />
        <MenuItem
          title='Productos Redux'
          path='/productos-redux'
          icon={ShoppingCartOutlinedIcon}
        />
        <MenuItem title='Tareas' path='/tareas' icon={TaskIcon} />
        <MenuItem title='Mascotas' path='/mascotas' icon={PetsIcon} />
      </div>
    </List>
  );
};

export default LeftMenue;
