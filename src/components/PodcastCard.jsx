import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";

const PodcastCard = ({ data }) => {
  return (
    <Grid item xs={1}>
      <Box sx={{ position: "relative", paddingTop: "25%" }}>
        <Link to={`/podcast/${data.id}`}>
          <Card sx={{ maxWidth: 345, paddingTop: "25%" }} elevation={2}>
            <CardContent>
              <Avatar
                src={data.image}
                sx={{
                  width: 125,
                  height: 125,
                  margin: "auto",
                  position: "absolute",
                  top: "0",
                  left: "50%",
                  transform: "translate(-50%, 5%)",
                }}
              />
              <Typography component="div" textAlign="center">
                {data.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                Author: {data.artist}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Box>
    </Grid>
  );
};

export default PodcastCard;
