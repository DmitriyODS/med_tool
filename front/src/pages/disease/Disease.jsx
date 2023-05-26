import React from 'react';
import styles from './Disease.module.css';
import { Tab, Tabs } from '@mui/material';
import { connect } from 'react-redux';
import {
  closeEditDialog, openAddDialog, openEditDialog, openViewDialog,
  selectCurItem,
  selectFilterTypeDisease,
  setFilterTypeDisease, setOldData,
} from '../../store/diseaseSlice';
import { DiseaseToolBar } from './toolbar';
import { DiseaseTable } from './table';
import EditDialog from '../disease/EditDialog/EditDialog';
import { selectOpenEditDialog, selectViewMode } from '../../store/diseaseSlice';
import { EditModes } from '../../globals/consts';
import { enqueueSnackbar } from 'notistack';
import { CreateDisease, DeleteDisease, EditDisease } from '../../api/disease';

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

  onCloseEditDialogHandler = () => {
    this.props.dispatch(closeEditDialog());
  };

  onSaveEditDialogHandler = (data) => {
    if (this.props.editMode === EditModes.Create) {
      const result = CreateDisease(data);
      result.then((res) => {
        enqueueSnackbar('Запись успешно добавлена', { variant: 'success' });
        this.props.dispatch(closeEditDialog());
        this.props.dispatch(setOldData(true));
      }).catch((err) => {
        enqueueSnackbar(err, { variant: 'error' });
      });
      return;
    }

    const result = EditDisease(data);
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

  onOpenViewDialogHandler = () => {
    this.props.dispatch(openViewDialog());
  };

  onOpenEditDialogHandler = () => {
    this.props.dispatch(openEditDialog());
  };

  onDeleteHandler = () => {
    const result = DeleteDisease(this.props.curItem?.id);
    result.then((res) => {
      enqueueSnackbar('Запись успешно удалена', { variant: 'success' });
      this.props.dispatch(setOldData(true));
    }).catch((err) => {
      enqueueSnackbar(err, { variant: 'error' });
    });
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
          <h1>Болезни</h1>
          <div className={styles.filters}>
            <Tabs
              value={this.props.filterTypeDisease}
              onChange={this.onChangeFilterDataHandler}
              textColor={'secondary'}
              indicatorColor={'secondary'}
              disabled={true}
            >
              <Tab label={'Все'} />
              <Tab label={'Текущие'} />
              <Tab label={'Вылеченные'} />
              <Tab label={'Хронические'} />
            </Tabs>
          </div>
        </div>
        <DiseaseToolBar
          curItem={this.props.curItem}
          onAdd={this.onOpenAddDialogHandler}
          onEdit={this.onOpenEditDialogHandler}
          onView={this.onOpenViewDialogHandler}
          onDelete={this.onDeleteHandler}
        />
        <DiseaseTable className={styles.content} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filterTypeDisease: selectFilterTypeDisease(state),
    curItem: selectCurItem(state),
    isOpenEditDialog: selectOpenEditDialog(state),
    editMode: selectViewMode(state),
  };
}

export default connect(mapStateToProps)(Disease);
