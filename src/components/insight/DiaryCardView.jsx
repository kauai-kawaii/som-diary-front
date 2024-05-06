import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function DiaryEntryCard({ entry, userId }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {entry.diaryTitle}
        </Typography>
        <Typography variant="h5" component="div">
          {entry.diaryDate}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Feeling: {entry.diaryFeeling}
        </Typography>
        <Link
          to={`/user/${userId}/${entry.diaryDate}`}
          style={{ textDecoration: "none" }}
        >
          <Typography sx={{ mt: 1 }} color="primary.main">
            View Details
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
}

export default DiaryEntryCard;
