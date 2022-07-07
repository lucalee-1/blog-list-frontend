import { useState } from 'react';
import { Fab, Tooltip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import DialogWrap from './DialogWrap';
import NewBlogForm from './NewBlogForm';

const AddNew = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Tooltip
        title="Add New Blog"
        onClick={() => setOpenDialog(true)}
        sx={{ position: 'fixed', bottom: 40, right: { xs: 'calc(50% - 25px)', sm: 40 } }}
      >
        <Fab color="primary">
          <AddIcon />
        </Fab>
      </Tooltip>
      <DialogWrap title="Add New" open={openDialog} setOpen={setOpenDialog}>
        <NewBlogForm />
      </DialogWrap>
    </>
  );
};
export default AddNew;
