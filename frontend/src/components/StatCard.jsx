/* eslint-disable react/prop-types */
import { Stack, Typography } from "@mui/material";

const StatCard = ({ label, count }) => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"} padding={"5px 50px 20px 50px"}>
      <Typography fontSize={100} fontWeight={"bold"}>
        {count || 0}
      </Typography>
      <Typography fontSize={20}>{label}</Typography>
    </Stack>
  );
};

export default StatCard;
