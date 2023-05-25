import React from 'react';
import styles from './Disease.module.css';
import { Button, Paper } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export function DiseaseToolBar(props) {
  return (
    <Paper className={styles.toolbar}>
      <Button
        className={`${styles.toolbarBtn} ${styles.viewBtn}`}
        startIcon={<AddOutlinedIcon />}
        color={'warning'}
        disableElevation
        variant={'contained'}
        onClick={props.onAdd}
      >
        Добавить
      </Button>
      <div className={styles.actionArea}>
        <Button
          className={styles.toolbarBtn}
          startIcon={<LaunchOutlinedIcon />}
          color={'secondary'}
          disableElevation
          variant={'outlined'}
          disabled={!props.curItem}
          onClick={props.onView}
        >
          Просмотреть
        </Button>
        <Button
          className={styles.toolbarBtn}
          startIcon={<EditOutlinedIcon />}
          color={'secondary'}
          disableElevation
          variant={'outlined'}
          disabled={!props.curItem}
          onClick={props.onEdit}
        >
          Изменить
        </Button>
        <Button
          className={styles.toolbarBtn}
          startIcon={<DeleteOutlineOutlinedIcon />}
          color={'error'}
          disableElevation
          variant={'outlined'}
          disabled={!props.curItem}
          onClick={props.onDelete}
        >
          Удалить
        </Button>
      </div>
    </Paper>
  );
}
