import React from 'react';
import styles from './Disease.module.css';
import { Tab, Tabs } from '@mui/material';
import { connect } from 'react-redux';
import {
  selectCurItem,
  selectFilterTypeDisease,
  setFilterTypeDisease,
} from '../../store/diseaseSlice';
import { DiseaseToolBar } from './toolbar';
import { DiseaseTable } from './table';
import EditDialog from '../disease/EditDialog/EditDialog';
import { selectOpenEditDialog, selectViewMode } from '../../store/diseaseSlice';
import { setOpenEditDialog } from '../../store/diseaseSlice';

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
    this.props.dispatch(setOpenEditDialog(false));
  };

  onSaveEditDialogHandler = () => {};

  onOpenAddDialogHandler = () => {
    this.props.dispatch(setOpenEditDialog(true));
  };

  onOpenViewDialogHandler = () => {
    this.props.dispatch(setOpenEditDialog(true));
  };

  onOpenEditDialogHandler = () => {
    this.props.dispatch(setOpenEditDialog(true));
  };

  onDeleteHandler = () => {};

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
