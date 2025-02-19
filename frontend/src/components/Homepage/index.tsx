import { Chat, GroupAdd } from '@mui/icons-material';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import { useMeQuery } from '../../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state: { auth: any }) => state.auth);
  const { data: userData } = useMeQuery();
  const handleCreateGroup = () => {
    navigate('/create-group');
  };

  const handleJoinGroup = () => {
    navigate('/groups');
  };

  return (
    <Box sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh', py: 4 }}>
      <Container maxWidth='lg' sx={{ textAlign: 'center', mb: 8 }}>
        <div>
          <Typography
            variant='h3'
            component='h1'
            color='primary'
            sx={{ fontWeight: 'bold', mb: 2 }}
          >
            Welcome, {userData?.data.role}!
          </Typography>
          <Typography variant='h5' color='textSecondary' sx={{ mb: 4 }}>
            Let’s get you back into your groups and start chatting!
          </Typography>
        </div>
      </Container>

      <Container maxWidth='lg' sx={{ mb: 8 }}>
        <Grid container spacing={4} justifyContent='center'>
          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
              <GroupAdd fontSize='large' color='primary' sx={{ mb: 2 }} />
              <Typography variant='h6' color='textPrimary'>
                Create a New Group
              </Typography>
              <Typography variant='body2' color='textSecondary' sx={{ mb: 2 }}>
                Start a new conversation by creating your own group.
              </Typography>
              <Button
                variant='contained'
                color='primary'
                onClick={handleCreateGroup}
              >
                Create Group
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
              <Chat fontSize='large' color='primary' sx={{ mb: 2 }} />
              <Typography variant='h6' color='textPrimary'>
                Join a Group
              </Typography>
              <Typography variant='body2' color='textSecondary' sx={{ mb: 2 }}>
                Join existing groups and chat with your friends.
              </Typography>
              <Button
                variant='contained'
                color='secondary'
                onClick={handleJoinGroup}
              >
                Join Groups
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', py: 4, backgroundColor: '#f4f6f8' }}>
        <Typography variant='body2' color='textSecondary'>
          © 2025 GroupChat. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
