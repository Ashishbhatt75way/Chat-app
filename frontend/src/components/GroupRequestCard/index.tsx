import { Check, Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import {
  useApproveRequestMutation,
  useDeclineRequestMutation,
} from '../../services/group-api';
import { toast } from 'react-toastify';

export default function GroupRequestCard({ request, index }: any) {
  const [approveRequest] = useApproveRequestMutation();
  const [declineRequest] = useDeclineRequestMutation();
  const approveRequestHandler = async () => {
    try {
      const response = await approveRequest({
        groupId: request.groupId.toString(),
        userId: request._id,
      }).unwrap();
      if (response?.data) {
        toast.success(response?.data.message);
      }
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0].msg;
      toast.error(
        validationError ?? error?.data?.message ?? 'Something went wrong!'
      );
    }
  };
  const denyRequestHandler = async () => {
    try {
      const response = await declineRequest({
        groupId: request.groupId.toString(),
        userId: request._id,
      }).unwrap();
      if (response?.data) {
        toast.success(response?.data.message);
      }
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0].msg;
      toast.error(
        validationError ?? error?.data?.message ?? 'Something went wrong!'
      );
    }
  };

  return (
    <Grid item xs={12} sm={6} md={3} key={index}>
      <Card
        sx={{
          p: 2,
          borderRadius: 4,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CardContent>
          <Typography variant='h6'>{request.name}</Typography>
          <Typography variant='body2' color='text.secondary'>
            wants to join {request.groupName}
          </Typography>
        </CardContent>
        <Box display='flex' gap={2}>
          <Button
            onClick={approveRequestHandler}
            variant='contained'
            color='success'
            startIcon={<Check />}
          >
            Approve
          </Button>
          <Button
            onClick={denyRequestHandler}
            variant='contained'
            color='error'
            startIcon={<Close />}
          >
            Deny
          </Button>
        </Box>
      </Card>
    </Grid>
  );
}
