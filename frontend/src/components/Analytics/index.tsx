import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { useGetAnalyticsQuery } from '../../services/api';
import { Message, Chat, Group, People } from '@mui/icons-material';

const Analytics = () => {
  const { data, isLoading } = useGetAnalyticsQuery();
  const analyticsItems = [
    {
      label: 'Total Groups',
      value: data?.data.totalGroups,
      icon: <Group fontSize='large' color='primary' />,
    },
    {
      label: 'Group Users',
      value: data?.data.totalGroupUsers,
      icon: <People fontSize='large' color='secondary' />,
    },
    {
      label: 'Total Users',
      value: data?.data.totalUsers,
      icon: <Chat fontSize='large' color='success' />,
    },
    {
      label: 'Total Messages',
      value: data?.data.totalMessages,
      icon: <Message fontSize='large' color='error' />,
    },
  ];

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

  return (
    <Box sx={{ marginTop: 5 }}>
      <Typography variant='h2' align="center" fontWeight='bold' sx={{ marginBottom: 2 }}>
        User Analytics
      </Typography>
      <Grid container paddingX={10} marginTop={5} spacing={3}>
        {analyticsItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                textAlign: 'center',
                padding: 2,
                borderRadius: 3,
                boxShadow: 3,
                height: "180px"
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
  );
};

export default Analytics;
