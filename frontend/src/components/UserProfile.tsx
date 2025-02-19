import { Chat, Group, Message, People } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { useMeQuery } from '../services/api';
import { useGetJoinRequestsQuery } from '../services/group-api';
import { useGetAnalyticsQuery } from '../services/api';
import { useAppSelector } from '../store/store';
import GroupRequestCard from './GroupRequestCard';

interface AnalyticsData {
  totalGroups: number;
  groupUsers: number;
  totalUsers: number;
  totalMessages: number;
}

const UserProfile = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useMeQuery(undefined, { skip: !isAuthenticated });
  const { data: joinRequestsData } = useGetJoinRequestsQuery();
  const { data: analyticsData } = useGetAnalyticsQuery();

  console.log('analytics', analyticsData);

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

  const analytics: AnalyticsData = {
    totalGroups: 12,
    groupUsers: 145,
    totalUsers: 500,
    totalMessages: 2342,
  };

  const analyticsItems = [
    {
      label: 'Total Groups',
      value: analytics.totalGroups,
      icon: <Group fontSize='large' color='primary' />,
    },
    {
      label: 'Group Users',
      value: analytics.groupUsers,
      icon: <People fontSize='large' color='secondary' />,
    },
    {
      label: 'Total Users',
      value: analytics.totalUsers,
      icon: <Chat fontSize='large' color='success' />,
    },
    {
      label: 'Total Messages',
      value: analytics.totalMessages,
      icon: <Message fontSize='large' color='error' />,
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Box display='flex' alignItems='center' gap={2} sx={{ marginBottom: 4 }}>
        <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
          {data.data.name[0]}
        </Avatar>
        <Box>
          <Typography variant='h5' fontWeight='bold'>
            {data.data.name}
          </Typography>
          <Typography variant='body1' color='gray'>
            {data.data.email}
          </Typography>
        </Box>
      </Box>

      {joinRequestsData?.data.length !== 0 && (
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

      <Box sx={{ marginTop: 5 }}>
        <Typography variant='h6' fontWeight='bold' sx={{ marginBottom: 2 }}>
          User Analytics
        </Typography>
        <Grid container spacing={3}>
          {analyticsItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  textAlign: 'center',
                  padding: 2,
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  {item.icon}
                  <Typography
                    variant='h6'
                    fontWeight='bold'
                    sx={{ marginTop: 1 }}
                  >
                    {item.value}
                  </Typography>
                  <Typography variant='body2' color='gray'>
                    {item.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default UserProfile;
