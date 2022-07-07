import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Fab, Tooltip, Popover, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import DialogWrap from './DialogWrap';
import NewBlogForm from './NewBlogForm';

const AddNew = () => {
  const [open, setOpen] = useState(null);
  const loggedUser = useSelector((state) => state.login);

  const handleClick = (e) => {
    setOpen(e.currentTarget);
  };
  return (
    <>
      <Tooltip
        title="Add New Blog"
        onClick={handleClick}
        sx={{ position: 'fixed', bottom: 40, right: { xs: 'calc(50% - 25px)', sm: 40 } }}
      >
        <Fab color="primary">
          <AddIcon />
        </Fab>
      </Tooltip>
      {!loggedUser ? (
        <Popover
          open={Boolean(open)}
          anchorEl={open}
          onClose={() => setOpen(null)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Typography sx={{ p: 2 }}>Log In to add new blogs!</Typography>
        </Popover>
      ) : (
        <DialogWrap title="Add New Blog" open={open} setOpen={setOpen}>
          <NewBlogForm />
        </DialogWrap>
      )}
    </>
  );
};
export default AddNew;
