import React, { useCallback, useEffect, useState } from 'react';
import styles from './EditDialog.module.css';
import BaseDialog from '../../../components/baseDialog/BaseDialog';
import { EditModes } from '../../../globals/consts';
import { GetDiaryDataFromFields, GetInitStateFieldsData } from './data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GetDiaryByID } from '../../../api/diary';
import { enqueueSnackbar } from 'notistack';
import CircularProgress from '@mui/material/CircularProgress';
import { FormDiary } from './form';
import { Button, DialogActions } from '@mui/material';
import IconClose from '@mui/icons-material/Close';
import IconSave from '@mui/icons-material/Save';
import { GetDiaryValidation } from './validation';

function EditDialog(props) {
  const isViewMode = props.editMode === EditModes.View;
  const isEditMode = props.editMode === EditModes.Edit;
  const isCreateMode = props.editMode === EditModes.Create;

  const [dataField, setDataField] = useState(GetInitStateFieldsData());
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, setValue } = useForm({
    resolver: yupResolver(GetDiaryValidation(isCreateMode)),
    values: dataField,
  });

  useEffect(() => {
    if (isCreateMode || props.selectID === 0) {
      return;
    }

    setLoading(true);
    const result = GetDiaryByID(props.selectID);
    result.then(
      (data) => {
        setDataField(GetInitStateFieldsData(data));
      },
      (error) => {
        enqueueSnackbar(error, { variant: 'error' });
      },
    );
    result.finally(() => setLoading(false));
  }, []);

  const onSubmit = useCallback((data) => {
    if (props.onSave !== undefined) {
      return props.onSave(GetDiaryDataFromFields(data));
    }
  }, []);


  return (
    <BaseDialog
      onClose={props.onClose}
      isOpen={props.isOpen}
      title={'Дневник'}
      className={styles.root}
      disableEscapeKeyDown
      maxWidth={'md'}
    >
      {loading || props.isLoading ? (
        <div className={styles.loading}>
          <CircularProgress color='inherit' />
          <p>Загрузка</p>
        </div>
      ) : (
        <FormDiary
          control={control}
          isEditMode={isEditMode}
          isCreateMode={isCreateMode}
          isViewMode={isViewMode}
          onSubmit={props.onSave}
          setValue={setValue}
        />
      )}
      {!loading && (
        <DialogActions className={styles.spacing}>
          <Button
            variant={'contained'}
            color={'secondary'}
            disableElevation
            startIcon={<IconClose />}
            onClick={props.onClose}
          >
            Закрыть
          </Button>
          {!isViewMode && (
            <Button
              variant={'contained'}
              color={'primary'}
              disableElevation
              startIcon={<IconSave />}
              onClick={handleSubmit(onSubmit)}
            >
              Сохранить
            </Button>
          )}
        </DialogActions>
      )}
    </BaseDialog>
  );
}

export default EditDialog;
