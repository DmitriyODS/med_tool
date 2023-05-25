import React from 'react';
import styles from './Diary.module.css';
import { Tab, Tabs } from '@mui/material';
import { connect } from 'react-redux';
import {
  selectCurItem,
  selectFilterDay,
  selectOpenEditDialog,
  selectViewMode,
  setFilterDay,
  setOpenEditDialog,
} from '../../store/diarySlice';
import { DiaryTable } from './table';
import { DiaryToolBar } from './toolbar';
import EditDialog from './EditDialog/EditDialog';

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

  onCloseEditDialogHandler = () => {
    this.props.dispatch(setOpenEditDialog(false));
  };

  onSaveEditDialogHandler = () => {};

  onOpenAddDialogHandler = () => {
    this.props.dispatch(setOpenEditDialog(true));
  };

  onDeleteHandler = () => {};

  onOpenViewDialogHandler = () => {
    this.props.dispatch(setOpenEditDialog(true));
  };

  onOpenEditDialogHandler = () => {
    this.props.dispatch(setOpenEditDialog(true));
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
            selectID={this.props.curItem.id}
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
