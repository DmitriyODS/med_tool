import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import CTextField from '../../../components/cTextField/CTextField';
import CInputSelect from '../../../components/cInputSelect/CInputSelect';
import CDatePicker from '../../../components/cDatePicker/CDatePicker';

export function FormDisease(props) {
  return (
    <Grid container spacing={4} mt={1} mb={1}>
      <Grid xs={12}>
        <CTextField name={'name'} label={'Название'} fullWidth control={props.control} required />
      </Grid>
      <Grid xs={12}>
        <CInputSelect
          name={'status'}
          label={'Статус'}
          fullWidth
          control={props.control}
          required
          items={[
            { value: 0, label: 'Болен' },
            { value: 1, label: 'Вылечился' },
            { value: 2, label: 'Хроническая' },
          ]}
        />
      </Grid>
      <Grid xs={6}>
        <CDatePicker
          name={'dateStart'}
          label={'Дата начала'}
          disabled={props.isViewMode || props.isEditMode}
          control={props.control}
          required
        />
      </Grid>
      <Grid xs={6}>
        <CDatePicker
          name={'dateEnd'}
          label={'Дата завершения'}
          disabled={props.isViewMode || props.isEditMode}
          control={props.control}
        />
      </Grid>
      <Grid xs={12}>
        <CTextField
          name={'info'}
          control={props.control}
          label={'Описание'}
          fullWidth
          multiline
          maxRows={2}
          required
          disabled={props.isViewMode}
        />
      </Grid>
    </Grid>
  );
}
