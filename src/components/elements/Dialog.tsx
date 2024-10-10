import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export const CusutomDialog = ({ isOpen, onClose, title, children }: Props) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        style: {
          width: window.innerWidth >= 768 ? '380px' : 'auto',
        },
      }}
    >
      <DialogTitle className="text-center text-3xl">{title}</DialogTitle>
      <DialogContent className="rounded-lg bg-white">{children}</DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};
