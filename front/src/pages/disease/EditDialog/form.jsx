import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import CTextField from '../../../components/cTextField/CTextField';
import CInputSelect from '../../../components/cInputSelect/CInputSelect';
import CDatePicker from '../../../components/cDatePicker/CDatePicker';
import { DiseaseStatuses } from '../../../globals/consts';

export function FormDisease(props) {
  return (
    <Grid container spacing={4} mt={1} mb={1}>
      <Grid xs={12}>
        <CTextField
          name={'name'}
          label={'Название'}
          fullWidth
          control={props.control}
          required
          disabled={props.isViewMode}
        />
      </Grid>
      <Grid xs={12}>
        <CInputSelect
          name={'status'}
          label={'Статус'}
          fullWidth
          control={props.control}
          required
          items={[
            { value: DiseaseStatuses.Sick, label: 'Болен' },
            { value: DiseaseStatuses.Cured, label: 'Вылечился' },
            { value: DiseaseStatuses.Chronic, label: 'Хроническая' },
          ]}
          disabled={props.isViewMode}
        />
      </Grid>
      <Grid xs={6}>
        <CDatePicker
          name={'dateStart'}
          label={'Дата начала'}
          control={props.control}
          required
          disabled={props.isViewMode}
        />
      </Grid>
      <Grid xs={6}>
        <CDatePicker
          name={'dateEnd'}
          label={'Дата завершения'}
          control={props.control}
          disabled={props.isViewMode}
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
