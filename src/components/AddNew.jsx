import { Fab, Tooltip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const AddNew = () => {
  return (
    <Tooltip
      title="Add New Blog"
      sx={{ position: 'fixed', bottom: 40, right: { xs: 'calc(50% - 25px)', sm: 40 } }}
    >
      <Fab color="primary">
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};
export default AddNew;
