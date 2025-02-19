import { Avatar, Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useMeQuery } from '../services/api';
import { useGetJoinRequestsQuery } from '../services/group-api';
import { useAppSelector } from '../store/store';
import GroupRequestCard from './GroupRequestCard';

const UserProfile = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useMeQuery(undefined, { skip: !isAuthenticated });
  const { data: joinRequestsData } = useGetJoinRequestsQuery();

  if (isLoading) {
    return (
      <Box
        width='100vw'
        height='100vh'
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return (
      <Box
        width='100vw'
        height='100vh'
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Typography textAlign='center'>Profile not found!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Box display='flex' alignItems='center' justifyContent='center' gap={2} sx={{ marginBottom: 4 }}>
        <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
          {data.data.name[0]}
        </Avatar>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='h5' fontWeight='bold'>
              {data.data.name}
            </Typography>
            <Typography variant='h5' fontSize={18} fontStyle='italic'> :  {data.data.role}</Typography>
          </Box>
          <Typography variant='body1' color='gray'>
            {data.data.email}
          </Typography>
        </Box>
      </Box>

      {joinRequestsData?.data && (
        <Box sx={{ marginTop: 5 }}>
          <Typography variant='h6' fontWeight='bold' sx={{ marginBottom: 2 }}>
            Approvals Pending
          </Typography>
          <Grid container spacing={3}>
            {joinRequestsData?.data.map((request, index) => (
              <GroupRequestCard request={request} index={index} key={index} />
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default UserProfile;
