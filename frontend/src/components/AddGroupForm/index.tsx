import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Select,
  MenuItem,
  useTheme,
  Theme,
  InputLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useCreateGroupMutation } from "../../services/group-api";
import { createStyles } from "@mui/styles";
import { useMeQuery } from "../../services/api";

const useStyle = (theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
      height: 400,
      padding: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      flex: 1,
      mx: "auto",
    },
    input: {
      mt: 2,
    },
    button: {
      my: 2,
    },
    link: {
      color: theme.palette.primary.main,
    },
  });

const validation = yup.object({
  name: yup.string().required("Name is required"),
  privacy: yup
    .string()
    .oneOf(["PUBLIC", "PRIVATE"])
    .required("Privacy is required"),
});

type FormData = yup.InferType<typeof validation>;

export default function AddGroupForm() {
  const theme = useTheme();
  const style = useStyle(theme);
  const [createGroup] = useCreateGroupMutation();
  const navigate = useNavigate();
  const { data } = useMeQuery();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      privacy: "PUBLIC",
    },
    resolver: yupResolver(validation),
    mode: "onChange",
  });

  console.log(data);
  const onSubmit = async (formData: FormData) => {
    try {
      const form = {
        ...formData,
        adminId: data?.data._id,
      };
      await createGroup(form).unwrap();
      toast.success("Group created successfully!");
      navigate("/groups");
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0]?.msg;
      toast.error(
        validationError ?? error?.data?.message ?? "Something went wrong!"
      );
    }
  };

  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card variant="outlined" sx={style.root}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography
              variant="h4"
              align="center"
              fontWeight={500}
              component="h1"
            >
              <b>Create Group</b>
            </Typography>

            <TextField
              sx={style.input}
              fullWidth
              label="Name"
              {...register("name")}
              error={Boolean(errors.name?.message)}
              helperText={errors.name?.message}
            />

            <InputLabel sx={style.input} id="select-label">
              Privacy
            </InputLabel>
            <Controller
              name="privacy"
              control={control}
              render={({ field }) => (
                <Select
                  labelId="select-label"
                  fullWidth
                  {...field}
                  sx={style.input}
                >
                  <MenuItem value="PUBLIC">PUBLIC</MenuItem>
                  <MenuItem value="PRIVATE">PRIVATE</MenuItem>
                </Select>
              )}
            />
            {errors.privacy && (
              <Typography color="error">{errors.privacy.message}</Typography>
            )}

            <Button
              type="submit"
              sx={style.button}
              variant="contained"
              fullWidth
              disabled={!isValid}
            >
              Create Group
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
