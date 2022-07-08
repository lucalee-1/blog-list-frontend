import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Fab, Tooltip, Popover, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import DialogWrap from './DialogWrap';
import NewBlogForm from './NewBlogForm';

const AddNew = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const loggedUser = useSelector((state) => state.login);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };
  return (
    <>
      <Tooltip
        title="Add New Blog"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 50,
          right: { xs: 'calc(50% - 28px)', sm: 30, md: 50, lg: 70, xl: 200 },
        }}
      >
        <Fab color="secondary" id="addNew">
          <AddIcon />
        </Fab>
      </Tooltip>
      {!loggedUser ? (
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={() => setOpen(false)}
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
