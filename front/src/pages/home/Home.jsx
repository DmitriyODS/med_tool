import React from 'react';
import styles from './Home.module.css';
import { Outlet } from 'react-router-dom';
import NavBar from '../../components/navbar/NavBar';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { connect } from 'react-redux';
import { selectCurUser } from '../../store/rootSlice';
import { UrlPages } from '../../globals/consts';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  onLogoutHandler = () => {

  };

  render() {
    return (
      <div className={styles.root}>
        <NavBar user={this.props.curUser} logoutHandler={this.onLogoutHandler} menuItems={[
          { name: 'Дневник', icon: <EditNoteOutlinedIcon />, path: UrlPages.Diary },
          { name: 'Статистика', icon: <TimelineOutlinedIcon />, path: UrlPages.Statistics },
          { name: 'Болезни', icon: <MedicalServicesOutlinedIcon />, path: UrlPages.Disease },
        ]} />
        <Outlet />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    curUser: selectCurUser(state),
  };
}

export default connect(mapStateToProps)(Home);
