import React, { useCallback, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../../theme/tableTheme.css';
import { setCurItem } from '../../store/diarySlice';
import { useDispatch } from 'react-redux';

const tableColumns = [
  { width: 300, minWidth: 170, headerName: 'ФИО', field: 'fio' },
  { width: 140, minWidth: 140, headerName: 'Дата', field: 'dateCreate' },
  { width: 160, minWidth: 140, headerName: 'Время суток', field: 'timeOfDay' },
  { width: 140, minWidth: 140, headerName: 'Давление', field: 'pressure' },
  { width: 100, minWidth: 100, headerName: 'Пульс', field: 'pulse' },
  { width: 220, minWidth: 140, headerName: 'Температура тела', field: 'bodyTemperature' },
  { width: 100, minWidth: 100, headerName: 'Вес', field: 'weight' },
  { width: 100, minWidth: 100, headerName: 'Сахар', field: 'sugar' },
];

const tableData = [
  {
    id: 1,
    fio: 'Иванов Иван Иванович',
    dateCreate: '01.01.2021',
    timeOfDay: 'Утро',
    pressure: '120/80',
    pulse: '80',
    bodyTemperature: '36.6',
    weight: '80',
    sugar: '5.5',
  },
  {
    id: 2,
    fio: 'Иванов Иван Иванович',
    dateCreate: '01.01.2021',
    timeOfDay: 'Утро',
    pressure: '120/80',
    pulse: '80',
    bodyTemperature: '36.6',
    weight: '80',
    sugar: '5.5',
  },
  {
    id: 3,
    fio: 'Иванов Иван Иванович',
    dateCreate: '01.01.2021',
    timeOfDay: 'Утро',
    pressure: '120/80',
    pulse: '80',
    bodyTemperature: '36.6',
    weight: '80',
    sugar: '5.5',
  },
  {
    id: 4,
    fio: 'Иванов Иван Иванович',
    dateCreate: '01.01.2021',
    timeOfDay: 'Утро',
    pressure: '120/80',
    pulse: '80',
    bodyTemperature: '36.6',
    weight: '80',
    sugar: '5.5',
  },
  {
    id: 5,
    fio: 'Иванов Иван Иванович',
    dateCreate: '01.01.2021',
    timeOfDay: 'Утро',
    pressure: '120/80',
    pulse: '80',
    bodyTemperature: '36.6',
    weight: '80',
    sugar: '5.5',
  },
];

const configColumn = {
  editable: true,
  sortable: true,
  resizable: true,
};

export function DiaryTable(props) {
  const gridRef = useRef();
  const dispatch = useDispatch();

  const onFirstDataRenderedHandler = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  const getRowId = useMemo(() => {
    return (params) => params.data.id;
  }, []);

  const onSelectionChangedHandler = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    dispatch(setCurItem(selectedRows[0]));
  }, []);

  return (
    <div className={`${props.className} ag-theme-alpine-dark`}>
      <AgGridReact
        ref={gridRef}
        getRowId={getRowId}
        onFirstDataRendered={onFirstDataRenderedHandler}
        columnDefs={tableColumns} rowData={tableData}
        defaultColDef={configColumn}
        rowSelection={'single'}
        onSelectionChanged={onSelectionChangedHandler}
      ></AgGridReact>
    </div>
  );
}
