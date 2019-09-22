import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

const styles = muiBaseTheme => ({
  card: {
    width: 280,
    minHeight: 320,
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
    fontWeight: "bold",
    height: "35px"
  },
  subheading: {
    // lineHeight: 1.8,
    height: "50px"
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -muiBaseTheme.spacing.unit
    }
  },
  efficacy: {
    height: "60px"
  }
});

const List = ({ item, modalCrude, id }) => {
  if (item.sname !== "") {
    return <li onClick={modalCrude.bind(this, item.idcrude)}>{item.sname}</li>;
  }

  return null;
};

function CardHerbMed(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        {/* <CardMedia
          className={classes.media}
          image={props.image}
        /> */}
        <CardContent className={classes.content}>
          {/* <Typography
            style={{
              color:"grey",
              fontWeight: "bold"
            }}
            variant={"overline"}
            gutterBottom
          >
            March 20 2019
          </Typography> */}
          {/* <Typography
            style={{
              fontWeight: "900",
              lineHeight: "1.3"
            }}
            variant={"h6"}
            gutterBottom
          >
            What happened in Thailand?
          </Typography> */}
          <h1 className="header-card">{props.name}</h1>
          <h6
            style={{
              margin: "0",
              color: "grey"
            }}
          >
            Company :
          </h6>
          <label className="company-card">{props.company}</label>
          <h6
            style={{
              margin: "0",
              color: "grey",
              marginTop: "9px"
            }}
          >
            Efficacy :
          </h6>
          <p
            style={{
              color: "grey",
              margin: 0,
              marginLeft: "10px",
              marginTop: "4px",
              marginBottom: "10px"
            }}
            className="block-with-text"
          >
            {props.efficacy}
          </p>
          <h6
            style={{
              margin: "0",
              color: "grey"
            }}
          >
            Crude drugs :
          </h6>
          <ul className="reff">
            {props.reff.map(item => (
              <List item={item} modalCrude={props.modalCrude} />
            ))}
          </ul>
        </CardContent>
        <CardActions>
          <Button href={`/herbsmed/${props.id}`}>
            Read More <Icon>chevron_right_rounded</Icon>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default withStyles(styles)(CardHerbMed);
