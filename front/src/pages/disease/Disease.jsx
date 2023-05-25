import React from 'react';
import styles from './Disease.module.css';
import { Button, Paper, Tab, Tabs } from '@mui/material';
import { connect } from 'react-redux';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { selectFilterTypeDisease, setFilterTypeDisease } from '../../store/diseaseSlice';

class Disease extends React.Component {
  constructor(props) {
    super(props);
  }

  onChangeFilterDataHandler = (event, newValue) => {
    this.props.dispatch(setFilterTypeDisease(newValue));
  };

  componentDidMount() {
    document.title = 'MedTool | Болезни';
  }

  render() {
    return <div className={styles.root}>
      <div className={styles.header}>
        <h1>Болезни</h1>
        <div className={styles.filters}>
          <Tabs value={this.props.filterTypeDisease} onChange={this.onChangeFilterDataHandler} textColor={'secondary'}
                indicatorColor={'secondary'}>
            <Tab label={'Все'} />
            <Tab label={'Текущие'} />
            <Tab label={'Вылеченные'} />
            <Tab label={'Хронические'} />
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
    filterTypeDisease: selectFilterTypeDisease(state),
  };
}

export default connect(mapStateToProps)(Disease);
