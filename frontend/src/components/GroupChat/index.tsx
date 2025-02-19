import { Send } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from '../../services/message-api';
import { useMeQuery } from '../../services/api';
import { useAppSelector } from '../../store/store';
import { toast } from 'react-toastify';

interface User {
  _id: string;
  name: string;
}

interface ResponseMessage {
  _id: string;
  sender: User;
  groupId: string;
  content: string;
  timestamp: string;
}

interface GroupChatProps {
  groupId: string;
  user: User;
}

const GroupChat: React.FC<GroupChatProps> = ({ groupId, user }) => {
  const [messageInput, setMessageInput] = useState<string>('');
  const { data, isSuccess, isLoading } = useGetMessagesQuery(groupId);

  const [sendMessage] = useSendMessageMutation();

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;

    try {
      const message = {
        sender: user._id,
        groupId,
        content: messageInput,
      };
      await sendMessage(message).unwrap();
      toast.success('Message sent successfully!');
      setMessageInput('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message.');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box
        sx={{
          backgroundColor: '#9f9f9f',
          padding: '10px',
          height: '60px',
          gap: '10px',
          paddingX: '20px',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <Avatar sx={{ width: 36, height: 36 }}>G</Avatar>
        <Typography variant='h6'>{`${groupId}`}</Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {isLoading && <Typography>Loading messages...</Typography>}
        {isSuccess &&
          data?.data?.map((message: ResponseMessage) => (
            <Box
              key={message._id}
              sx={{
                display: 'flex',
                justifyContent:
                  message.sender._id === user._id ? 'flex-end' : 'flex-start',
                marginBottom: '10px',
              }}
            >
              <Paper
                sx={{
                  maxWidth: '60%',
                  padding: '10px',
                  borderRadius: '10px',
                  backgroundColor:
                    message.sender._id === user._id ? '#010101' : '#f0f0f0',
                  color: message.sender._id === user._id ? 'white' : 'black',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {message.sender._id !== user._id && (
                  <Avatar sx={{ width: 24, height: 24, marginRight: '10px' }}>
                    {message.sender.name.charAt(0).toUpperCase()}
                  </Avatar>
                )}
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>{message.sender.name}</Typography>
                  <Typography variant='body2' sx={{color: 'gray'}}>{message.content}</Typography>
                  <Typography
                    variant='caption'
                    sx={{ textAlign: 'right', color: 'gray' }}
                  >
                    {dayjs(message.timestamp).format('h:mm A')}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          ))}
      </Box>

      <Box
        sx={{
          display: 'flex',
          padding: '10px',
          alignItems: 'center',
          position: 'sticky',
          bottom: 0,
          borderTop: '1px solid #ddd',
          backgroundColor: '#fff',
        }}
      >
        <TextField
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          variant='outlined'
          fullWidth
          placeholder='Type your message...'
          sx={{ marginRight: '10px' }}
        />
        <Button
          color='primary'
          onClick={handleSendMessage}
          sx={{
            padding: '20px',
            backgroundColor: '#1ed0da',
            color: 'white',
            '&:hover': {
              color: 'black',
              backgroundColor: '#dadada',
            },
          }}
        >
          <Send fontSize='small' />
        </Button>
      </Box>
    </Box>
  );
};

const App: React.FC = () => {
  const groupId = useLocation().pathname.split('/')[2];
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data } = useMeQuery(undefined, { skip: !isAuthenticated });

  if (!data?.data) return <Typography>Loading...</Typography>;

  return <GroupChat groupId={groupId} user={data.data} />;
};

export default App;
