import React from 'react';
import styles from './NavBar.module.css';
import { Avatar, Button, Menu, MenuItem, Paper } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { NavLink } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { selectUserLogin } from '../../store/rootSlice';

function NavItem(props) {
  return (
    <NavLink to={props.path}>
      {({ isActive, isPending }) => (
        <Button
          disableElevation
          className={styles.menuItem}
          variant={isActive ? 'contained' : 'outlined'}
        >
          {isPending ? (
            <CircularProgress />
          ) : (
            <>
              {props.icon}
              <p>{props.name}</p>
            </>
          )}
        </Button>
      )}
    </NavLink>
  );
}

function NavBar(props) {
  const [userMenuAnchorEl, setUserMenuAnchorEl] = React.useState(null);
  const open = Boolean(userMenuAnchorEl);

  let userLogin = useSelector(selectUserLogin);
  if (!userLogin) {
    userLogin = 'Гость';
  }

  const onOpenUserMenuCardHandler = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const onCloseUserMenuHandler = () => {
    setUserMenuAnchorEl(null);
  };

  const onOpenUserCardHandler = (event) => {
    onCloseUserMenuHandler();
  };

  const onLogoutUserHandler = () => {
    onCloseUserMenuHandler();
    props.logoutHandler();
  };

  return (
    <Paper className={styles.root}>
      <Button
        className={styles.userCard}
        variant={'outlined'}
        color={'secondary'}
        disableElevation
        onClick={onOpenUserMenuCardHandler}
      >
        <Avatar className={styles.avatar}>{userLogin[0]}</Avatar>
        <p>{userLogin}</p>
      </Button>
      <Menu
        id="user-menu"
        anchorEl={userMenuAnchorEl}
        open={open}
        onClose={onCloseUserMenuHandler}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={onLogoutUserHandler}>Выйти</MenuItem>
      </Menu>
      <nav className={styles.menuItems}>
        {props.menuItems &&
          props.menuItems.map((item, index) => {
            return <NavItem key={index} name={item.name} icon={item.icon} path={item.path} />;
          })}
      </nav>
      <Button
        className={styles.appInfo}
        color={'secondary'}
        variant={'outlined'}
        disableElevation
        onClick={props.onAboutHandler}
      >
        <InfoOutlinedIcon />
        <p>MEDTOOL</p>
      </Button>
    </Paper>
  );
}

export default NavBar;
