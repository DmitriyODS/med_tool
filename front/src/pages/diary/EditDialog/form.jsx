import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import CTextField from '../../../components/cTextField/CTextField';
import CInputSelect from '../../../components/cInputSelect/CInputSelect';

export function FormDiary(props) {
  return (
    <Grid container spacing={4} mt={1} mb={1}>
      <Grid xs={6}>
        <CInputSelect
          name={'typeDay'}
          label={'Время суток'}
          fullWidth
          control={props.control}
          required
          items={[
            { value: 0, label: 'Утро' },
            { value: 1, label: 'День' },
            { value: 2, label: 'Вечер' },
          ]}
          disabled={props.isViewMode}
        />
      </Grid>
      <Grid xs={6}>
        <CTextField
          name={'weight'}
          label={'Вес'}
          fullWidth
          control={props.control}
          required
          typeField={'number'}
          disabled={props.isViewMode}
        />
      </Grid>
      <Grid xs={6}>
        <CTextField
          name={'pressure'}
          label={'Давление'}
          fullWidth
          control={props.control}
          required
          typeField={'number'}
          disabled={props.isViewMode}
        />
      </Grid>
      <Grid xs={6}>
        <CTextField
          name={'pulse'}
          label={'Пульс'}
          fullWidth
          control={props.control}
          required
          typeField={'number'}
          disabled={props.isViewMode}
        />
      </Grid>
      <Grid xs={6}>
        <CTextField
          name={'bodyTemperature'}
          label={'Температура'}
          fullWidth
          control={props.control}
          required
          typeField={'number'}
          disabled={props.isViewMode}
        />
      </Grid>
      <Grid xs={6}>
        <CTextField
          name={'sugar'}
          label={'Сахар'}
          fullWidth
          control={props.control}
          required
          typeField={'number'}
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
          disabled={props.isViewMode}
        />
      </Grid>
    </Grid>
  );
}
