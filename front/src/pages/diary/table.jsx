import React, { useCallback, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../../theme/tableTheme.css';
import { setCurItem } from '../../store/diarySlice';
import { useDispatch } from 'react-redux';
import { GetDiary } from '../../api/diary';
import { enqueueSnackbar } from 'notistack';

const tableColumns = [
  { width: 300, minWidth: 170, headerName: 'ФИО', field: 'fio' },
  { width: 140, minWidth: 140, headerName: 'Дата', field: 'dateCreated' },
  { width: 160, minWidth: 140, headerName: 'Время суток', field: 'typeDay' },
  { width: 140, minWidth: 140, headerName: 'Давление', field: 'pressure' },
  { width: 100, minWidth: 100, headerName: 'Пульс', field: 'pulse' },
  { width: 220, minWidth: 140, headerName: 'Температура тела', field: 'bodyTemperature' },
  { width: 100, minWidth: 100, headerName: 'Вес', field: 'weight' },
  { width: 100, minWidth: 100, headerName: 'Сахар', field: 'sugar' },
  { width: 100, minWidth: 100, headerName: 'Пол', field: 'gender' },
  { width: 100, minWidth: 100, headerName: 'Дата рождения', field: 'birthday' },
];

const configColumn = {
  editable: true,
  sortable: false,
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

  const onGridReady = useCallback((params) => {
    const dataSource = {
      rowCount: undefined,
      getRows: (params) => {
        const result = GetDiary(params.startRow, params.endRow);
        result
          .then((data) => {
            let lastRow = -1;
            if (data.length < params.endRow - params.startRow) {
              lastRow = params.startRow + data.length;
            }
            params.successCallback(data, lastRow);
          })
          .catch((error) => {
            enqueueSnackbar(error.message, { variant: 'error' });
            params.failCallback();
          });
      },
    };

    params.api.setDatasource(dataSource);
  }, []);

  return (
    <div className={`${props.className} ag-theme-alpine-dark`}>
      <AgGridReact
        ref={gridRef}
        getRowId={getRowId}
        onFirstDataRendered={onFirstDataRenderedHandler}
        columnDefs={tableColumns}
        defaultColDef={configColumn}
        rowSelection={'single'}
        onSelectionChanged={onSelectionChangedHandler}
        rowModelType={'infinite'}
        cacheBlockSize={30}
        maxBlocksInCache={10}
        cacheOverflowSize={2}
        maxConcurrentDatasourceRequests={1}
        infiniteInitialRowCount={100}
        onGridReady={onGridReady}
        rowBuffer={0}
      ></AgGridReact>
    </div>
  );
}
