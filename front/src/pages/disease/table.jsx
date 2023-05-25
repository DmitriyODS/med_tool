import React, { useCallback, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../../theme/tableTheme.css';
import { setCurItem } from '../../store/diseaseSlice';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { GetDisease } from '../../api/disease';

const tableColumns = [
  { width: 100, minWidth: 140, headerName: 'Статус', field: 'status' },
  { width: 140, minWidth: 140, headerName: 'Название', field: 'name' },
  { width: 160, minWidth: 140, headerName: 'Состояние', field: 'info' },
  { width: 140, minWidth: 140, headerName: 'Дата начала', field: 'dateStart' },
  { width: 100, minWidth: 100, headerName: 'Дата окончания', field: 'dateEnd' },
];

const configColumn = {
  editable: true,
  sortable: false,
  resizable: true,
};

export function DiseaseTable(props) {
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
        const result = GetDisease(params.startRow, params.endRow);
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
