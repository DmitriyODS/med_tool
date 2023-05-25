import React from 'react';
import styles from './Diary.module.css';
import { Button, Paper } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export function DiaryToolBar(props) {
  return (
    <Paper className={styles.toolbar}>
      <Button className={`${styles.toolbarBtn} ${styles.viewBtn}`} startIcon={<AddOutlinedIcon />} color={'warning'}
              disableElevation
              variant={'contained'}>Добавить</Button>
      <div className={styles.actionArea}>
        <Button
          className={styles.toolbarBtn}
          startIcon={<LaunchOutlinedIcon />}
          color={'secondary'}
          disableElevation
          variant={'outlined'}
          disabled={!props.curItem}
        >Просмотреть</Button>
        <Button
          className={styles.toolbarBtn}
          startIcon={<EditOutlinedIcon />}
          color={'secondary'}
          disableElevation
          variant={'outlined'}
          disabled={!props.curItem}
        >Изменить</Button>
        <Button
          className={styles.toolbarBtn}
          startIcon={<DeleteOutlineOutlinedIcon />}
          color={'error'}
          disableElevation
          variant={'outlined'}
          disabled={!props.curItem}
        >Удалить</Button>
      </div>
    </Paper>
  );
}
