import { Group, Person } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMeQuery } from '../../services/api';
import {
  useJoinMutation,
  useRequestToJoinMutation,
} from '../../services/group-api';
import { useAppSelector } from '../../store/store';

const GroupCard = ({
  group,
}: {
  group: {
    _id: string;
    name: string;
    admin: string;
    privacy: string;
    members: string[];
    isPublic: boolean;
  };
}) => {
  const [join, { isLoading }] = useJoinMutation();
  const { isAuthenticated } = useAppSelector(
    (state: { auth: any }) => state.auth
  );
  const { data } = useMeQuery(undefined, { skip: !isAuthenticated });
  const navigate = useNavigate();
  const [requestToJoin, { isLoading: isRequestToJoinLoading }] =
    useRequestToJoinMutation();

  const joinGroupHandler = async () => {
    try {
      if (data?.data._id) {
        const response = await join({
          groupId: group._id,
          userId: data.data._id,
        });

        if (response.data) {
          toast.success('Group joined successfully!');
          navigate(`/chat/${group._id}`);
        }

        if (response.error) {
          toast.error(response.error?.data.message);
          console.log(response.error?.data.message);
        }
      }
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  const requestToJoinHandler = async () => {
    try {
      const response = await requestToJoin(group._id);

      if (response.error) {
        toast.error(response?.error?.data.message);
        console.log(response?.error?.data.message);
      }

      if (response.data) {
        toast.success('Request sent to admin!');
        console.log(response?.data);
      }
    } catch (error) {
      console.error('Error requesting to join group:', error);
    }
  };

  return (
    <Card sx={{ maxWidth: 350, p: 2, borderRadius: 3, boxShadow: 3 }}>
      <div style={{ marginLeft: '15px' }} className='flex items-center'>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 , size: 20 }} />
        <Typography sx={{ p: 0, mb: 0.5, fontSize: 16 }}>
          {group.name}
        </Typography>
      </div>
      <CardContent>
        <Typography
          variant='body2'
          color='textSecondary'
          display='flex'
          alignItems='center'
        >
          <Person fontSize='small' sx={{ mr: 1 }} />
          Admin: {group.admin}
        </Typography>
        <Typography
          variant='body2'
          color='textSecondary'
          display='flex'
          alignItems='center'
          sx={{ mt: 1 }}
        >
          <Group fontSize='small' sx={{ mr: 1 }} />
          Members: {group.members.length}
        </Typography>
        {group.privacy === 'PUBLIC' ? (
          <Button
            fullWidth
            variant='contained'
            color='success'
            sx={{ mt: 2, textTransform: 'none', borderRadius: 2 }}
            onClick={joinGroupHandler}
            disabled={isLoading}
          >
            Join Group
          </Button>
        ) : (
          <Button
            fullWidth
            variant='contained'
            color='warning'
            sx={{ mt: 2, textTransform: 'none', borderRadius: 2 }}
            onClick={requestToJoinHandler}
            disabled={isRequestToJoinLoading}
          >
            Request to Join
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default GroupCard;
