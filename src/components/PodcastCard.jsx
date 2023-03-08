import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";

const PodcastCard = ({ data }) => {
  return (
    <Grid item xs={1}>
      <Link to={`/podcast/${data.id}`}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Avatar
              src={data.image}
              sx={{ width: 100, height: 100, margin: "auto" }}
              textAlign="center"
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
    </Grid>
  );
};

export default PodcastCard;
