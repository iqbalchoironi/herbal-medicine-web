import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import Icon from "@material-ui/core/Icon";

const styles = muiBaseTheme => ({
  card: {
    width: 280,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    paddingTop: "56.25%"
  },
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing.unit * 3
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`
  },
  heading: {
    fontWeight: "bold"
  },
  subheading: {
    lineHeight: 1.8
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -muiBaseTheme.spacing.unit
    }
  }
});

const List = ({ item }) => {
  if (item !== null) {
    return <li>{item.sname}</li>;
  }

  return null;
};

function CardPlant(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={props.image} />
        <CardContent className={classes.content}>
          <h1 className="header-card">{props.name}</h1>
          <h6
            style={{
              margin: "0",
              color: "grey"
            }}
          >
            Crude drugs :
          </h6>
          <ul className="reff">
            {props.reff.map(item => {
              return <List item={item} />;
            })}
          </ul>
        </CardContent>
        <CardActions>
          <Button href={`/detail/compound/${props.id}`}>
            Read More <Icon>chevron_right_rounded</Icon>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default withStyles(styles)(CardPlant);
