import React from 'react';
import styles from './AboutDialog.module.css';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function AboutDialog(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle>
        MedTool - дневник здоровья
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Приложение MedTool - это дневник здоровья, который поможет вам вести учет ваших показателей здоровья.
          С помощью приложения вы сможете вести учет ваших показателей здоровья, а также просматривать их в виде
          графиков.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default AboutDialog;
