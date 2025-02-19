import { CircularProgress, Grid } from '@mui/material';
import { useGetGroupsQuery } from '../../services/group-api';
import GroupCard from '../GroupCard';

const GroupsList = () => {
  const { isError, data, isLoading } = useGetGroupsQuery();

  if (isLoading)
    return (
      <div className='flex justify-center items-center h-screen'>
        <CircularProgress />
      </div>
    );

  if (isError)
    return (
      <div className='text-center text-red-500 text-lg'>
        Something went wrong. Please try again.
      </div>
    );

  return (
    <div className='h-screen flex flex-col items-center'>
      <div className='w-4/5'>
        <div
          style={{
            padding: '40px 80px',
          }}
        >
          <h2 className='text-center text-5xl font-black'>Discover Groups</h2>
        </div>

        <div>
          {data?.data.length !== 0 ? (
            <Grid container spacing={3} className='w-[80%] mx-auto'>
              {data?.data.map((group: any) => (
                <Grid item xs={12} sm={6} md={4} key={group._id}>
                  <GroupCard group={group} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <div className='text-center text-red-500 text-2xl'>
              No groups found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupsList;
