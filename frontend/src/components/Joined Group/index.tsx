import { Group } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetJoinedGroupsQuery } from "../../services/group-api";

const JoinedGroups: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetJoinedGroupsQuery();

  const handleEnterChat = (groupId: string) => {
    navigate(`/chat/${groupId}`);
  };

  return (
    <Box
      sx={{
        padding: 3,
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ece9e6, #ffffff)",
      }}
    >
      <div style={{ padding: "40px 80px", textAlign: "center" }}>
        <h2 className="text-5xl font-black">Joined Groups</h2>
      </div>

      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      ) : data?.data.length === 0 ? (
        <Typography variant="body1" textAlign="center">
          No joined groups yet.
        </Typography>
      ) : (
        <Box maxWidth={"lg"} mx={"auto"} mt={4}>
          <Grid container spacing={3}>
            {data?.data.map((group) => (
              <Grid item xs={12} sm={6} md={4} key={group._id}>
                <Card
                  sx={{
                    maxWidth: 450,
                    p: 2,
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  <Box display="flex" alignItems="center" ml={2}>
                    <Avatar sx={{ bgcolor: "primary.main", mr: 2 }} />
                    <CardHeader
                      title={group.name}
                      titleTypographyProps={{
                        fontSize: "1.2rem",
                        fontWeight: 500,
                      }}
                    />
                  </Box>
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      display="flex"
                      alignItems="center"
                      sx={{ mt: 1 }}
                    >
                      <Group fontSize="small" sx={{ mr: 1 }} />
                      Members: {group.members.length}
                    </Typography>
                    <Button
                      onClick={() => handleEnterChat(group._id)}
                      fullWidth
                      variant="contained"
                      sx={{ mt: 2, textTransform: "none", borderRadius: 2 }}
                    >
                      Open Chat
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default JoinedGroups;
