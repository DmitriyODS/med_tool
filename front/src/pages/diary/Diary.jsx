import React from 'react';
import styles from './Diary.module.css';
import { Tab, Tabs } from '@mui/material';
import { connect } from 'react-redux';
import {
  closeEditDialog, openAddDialog, openEditDialog, openViewDialog,
  selectCurItem,
  selectFilterDay,
  selectOpenEditDialog,
  selectViewMode,
  setFilterDay, setOldData,
} from '../../store/diarySlice';
import { DiaryTable } from './table';
import { DiaryToolBar } from './toolbar';
import EditDialog from './EditDialog/EditDialog';
import { CreateDiary, DeleteDiary, EditDiary } from '../../api/diary';
import { enqueueSnackbar } from 'notistack';
import { EditModes } from '../../globals/consts';

class Diary extends React.Component {
  constructor(props) {
    super(props);
  }

  onChangeFilterDataHandler = (event, newValue) => {
    this.props.dispatch(setFilterDay(newValue));
  };

  componentDidMount() {
    document.title = 'MedTool | Дневник';
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  onCloseEditDialogHandler = () => {
    this.props.dispatch(closeEditDialog());
  };

  onSaveEditDialogHandler = (data) => {
    if (this.props.editMode === EditModes.Create) {
      const result = CreateDiary(data);
      result.then((res) => {
        enqueueSnackbar('Запись успешно добавлена', { variant: 'success' });
        this.props.dispatch(closeEditDialog());
        this.props.dispatch(setOldData(true));
      }).catch((err) => {
        enqueueSnackbar(err, { variant: 'error' });
      });
      return;
    }

    const result = EditDiary(data);
    result.then((res) => {
      enqueueSnackbar('Запись успешно изменена', { variant: 'success' });
      this.props.dispatch(closeEditDialog());
      this.props.dispatch(setOldData(true));
    }).catch((err) => {
      enqueueSnackbar(err, { variant: 'error' });
    });
  };

  onOpenAddDialogHandler = () => {
    this.props.dispatch(openAddDialog());
  };

  onDeleteHandler = () => {
    const result = DeleteDiary(this.props.curItem?.id);
    result.then((res) => {
      enqueueSnackbar('Запись успешно удалена', { variant: 'success' });
      this.props.dispatch(setOldData(true));
    }).catch((err) => {
      enqueueSnackbar(err, { variant: 'error' });
    });
  };

  onOpenViewDialogHandler = () => {
    this.props.dispatch(openViewDialog());
  };

  onOpenEditDialogHandler = () => {
    this.props.dispatch(openEditDialog());
  };

  render() {
    return (
      <div className={styles.root}>
        {this.props.isOpenEditDialog && (
          <EditDialog
            onClose={this.onCloseEditDialogHandler}
            onSave={this.onSaveEditDialogHandler}
            isOpen={this.props.isOpenEditDialog}
            editMode={this.props.editMode}
            selectID={this.props.curItem?.id}
          />
        )}
        <div className={styles.header}>
          <h1>Дневник</h1>
          <div className={styles.filters}>
            <Tabs
              value={this.props.filterDay}
              onChange={this.onChangeFilterDataHandler}
              textColor={'secondary'}
              indicatorColor={'secondary'}
              disabled={true}
            >
              <Tab label={'Все'} />
              <Tab label={'Утро'} />
              <Tab label={'День'} />
              <Tab label={'Вечер'} />
            </Tabs>
          </div>
        </div>
        <DiaryToolBar
          curItem={this.props.curItem}
          onAdd={this.onOpenAddDialogHandler}
          onDelete={this.onDeleteHandler}
          onEdit={this.onOpenEditDialogHandler}
          onView={this.onOpenViewDialogHandler}
        />
        <DiaryTable className={styles.content} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filterDay: selectFilterDay(state),
    curItem: selectCurItem(state),
    isOpenEditDialog: selectOpenEditDialog(state),
    editMode: selectViewMode(state),
  };
}

export default connect(mapStateToProps)(Diary);
