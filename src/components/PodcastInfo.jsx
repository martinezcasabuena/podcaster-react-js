import React, { useContext } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Box, Divider, Skeleton } from "@mui/material";

const PodcastInfo = ({ podcast }) => {
  const { loading } = useContext(AppContext);

  return (
    <Link
      to={`/podcast/${podcast.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box sx={{ my: 3 }}>
        {loading ? (
          <Skeleton
            variant="rectangular"
            width={"75%"}
            height={200}
            sx={{ margin: "0 auto" }}
          />
        ) : (
          <img src={podcast.image} />
        )}
      </Box>

      <Divider sx={{ mx: 1 }} />
      <Box sx={{ my: 3, mx: 2.5 }} className="podcast-name" textAlign={"left"}>
        {loading ? (
          <>
            <Skeleton variant="text" sx={{ height: 12, my: 1 }} width="80%" />
            <Skeleton variant="text" sx={{ height: 12, my: 1 }} width="50%" />
          </>
        ) : (
          <Box>
            <strong>{podcast.title}</strong>
            <Typography
              variant="body2"
              color="text.secondary"
              fontStyle={"italic"}
            >
              by {podcast.artist}
            </Typography>
          </Box>
        )}
      </Box>
      <Divider sx={{ mx: 1 }} />
      <Box sx={{ my: 3, mx: 1.5 }} className="podcast-description">
        {loading ? (
          <>
            <Skeleton variant="text" sx={{ height: 12, my: 1 }} width="50%" />
            <Skeleton variant="text" sx={{ height: 12, my: 1 }} width="90%" />
            <Skeleton variant="text" sx={{ height: 12, my: 1 }} width="90%" />
          </>
        ) : (
          podcast.description && (
            <Box>
              <Typography
                sx={{ mb: 1 }}
                variant="text"
                color="text.secondary"
                fontWeight={"500"}
              >
                Description:
              </Typography>
              <Typography
                sx={{ my: 1 }}
                variant="body2"
                color="text.secondary"
                dangerouslySetInnerHTML={{
                  __html: podcast.description,
                }}
              />
            </Box>
          )
        )}
      </Box>
    </Link>
  );
};

export default PodcastInfo;
