import React from 'react';
import styles from './Disease.module.css';
import { Tab, Tabs } from '@mui/material';
import { connect } from 'react-redux';
import { selectCurItem, selectFilterTypeDisease, setFilterTypeDisease } from '../../store/diseaseSlice';
import { DiseaseToolBar } from './toolbar';
import { DiseaseTable } from './table';

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
                indicatorColor={'secondary'} disabled={true}>
            <Tab label={'Все'} />
            <Tab label={'Текущие'} />
            <Tab label={'Вылеченные'} />
            <Tab label={'Хронические'} />
          </Tabs>
        </div>
      </div>
      <DiseaseToolBar curItem={this.props.curItem} />
      <DiseaseTable className={styles.content} />
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    filterTypeDisease: selectFilterTypeDisease(state),
    curItem: selectCurItem(state),
  };
}

export default connect(mapStateToProps)(Disease);
