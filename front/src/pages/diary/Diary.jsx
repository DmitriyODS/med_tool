import React from 'react';
import styles from './Diary.module.css';
import { Button, Paper, Tab, Tabs } from '@mui/material';
import { connect } from 'react-redux';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { selectFilterDay, setFilterDay } from '../../store/diarySlice';

class Diary extends React.Component {
  constructor(props) {
    super(props);
  }

  onChangeFilterDataHandler = (event, newValue) => {
    this.props.dispatch(setFilterDay(newValue));
  };

  render() {
    return <div className={styles.root}>
      <div className={styles.header}>
        <h1>Дневник</h1>
        <div className={styles.filters}>
          <Tabs value={this.props.filterDay} onChange={this.onChangeFilterDataHandler} textColor={'secondary'}
                indicatorColor={'secondary'}>
            <Tab label={'Все'} />
            <Tab label={'Утро'} />
            <Tab label={'День'} />
            <Tab label={'Вечер'} />
          </Tabs>
        </div>
      </div>
      <Paper className={styles.toolbar}>
        <Button className={`${styles.toolbarBtn} ${styles.viewBtn}`} startIcon={<AddOutlinedIcon />} color={'warning'}
                disableElevation
                variant={'contained'}>Добавить</Button>
        <div className={styles.actionArea}>
          <Button className={styles.toolbarBtn} startIcon={<LaunchOutlinedIcon />} color={'secondary'} disableElevation
                  variant={'outlined'}>Просмотреть</Button>
          <Button className={styles.toolbarBtn} startIcon={<EditOutlinedIcon />} color={'secondary'} disableElevation
                  variant={'outlined'}>Изменить</Button>
          <Button className={styles.toolbarBtn} startIcon={<DeleteOutlineOutlinedIcon />} color={'error'}
                  disableElevation
                  variant={'outlined'}>Удалить</Button>
        </div>
      </Paper>
      <div className={styles.content}></div>
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    filterDay: selectFilterDay(state),
  };
}

export default connect(mapStateToProps)(Diary);
