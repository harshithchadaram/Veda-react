import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "../../common/components/store/AuthContext";
import { useForm } from "../../common/components/Form/useForm";
import Typography from "@material-ui/core/Typography";
import Controls from "../../common/components/Form/controls/Controls";
import "./ContactUs.scss";
import axios from "../../api/axios";
import { Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import MuiPhoneNumber from "material-ui-phone-number";
import * as _ from "lodash";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const AuthContext = React.createContext({});
export const AuthProvider = AuthContext.Provider;
export default function ContactUs(props) {
  const initialFValues = {
    firstName: "",
    lastName: "",
    businessEmail: "",
    businessNumber: "",
    type: "user",
    query: "",
  };
  const classes = useStyles();
  const appContext = useContext(AppContext);

  const itemTypes = [
    { id: "merchant", title: "Merchant" },
    { id: "user", title: "User" },
  ];

  const { values, setValues, resetForm, handleInputChange } = useForm(
    initialFValues,
    true
  );
  // const alertInfo = {
  //   success: false,
  //   severity: "",
  //   message: ""
  // }
  const [open, setOpen] = React.useState(false);
  const [alertInfo, setAlertInfo] = React.useState({});
  const history = useHistory();
  const submitQuery = (event) => {
    debugger;
    event.preventDefault();
    window.scrollTo({ behavior: "smooth", top: 0 });
    const queryObj = {
      userName: values.firstName + " " + values.lastName,
      email: values.businessEmail,
      mobile: values.businessNumber,
      query: values.query,
      type: values.type,
    };
    console.log(queryObj);
    axios
      .post(`/query/create`, queryObj)
      .then((res) => {
        const data = res.data;
        window.scrollTo({ behavior: "smooth", top: 0 });
        if (data.success) {
          console.log(data);
          setOpen(true);
          setAlertInfo({ severity: "success", msg: data.message });
          resetForm();
        } else {
          setOpen(true);
          setAlertInfo({ severity: "error", msg: "Something went wrong" });
        }
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      })
      .catch((error) => {
        setOpen(true);
        setAlertInfo({ severity: "error", msg: "Something went wrong" });
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      });
  };
  return (
    <AppContext.Consumer>
      {() => (
        <Container component="main" maxWidth="xl" className="bg-image p-0">
          <Grid container className="grid-overlay">
            <Grid item sm className="m-3">
              <div className="contact-form">
                <Typography
                  component="h4"
                  className="align-self-start"
                  variant="h4"
                >
                  Contact sales
                </Typography>
                <Typography
                  variant="body2"
                  className="align-self-start mt-1 text-secondary"
                  display="block"
                  gutterBottom
                >
                  Please fill out this form to discuss your needs with our sales
                  team. For technical support, visit the Support Hub.
                </Typography>
                <Collapse in={open} className="pt-3">
                  <Alert severity={alertInfo.severity}>{alertInfo.msg}</Alert>
                </Collapse>
                <form
                  className={classes.form}
                  onSubmit={submitQuery}
                  noValidate
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="text"
                    id="firstName"
                    value={values.firstName}
                    label="First Name"
                    name="firstName"
                    onChange={handleInputChange}
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="text"
                    id="lastName"
                    value={values.lastName}
                    label="Last Name"
                    name="lastName"
                    onChange={handleInputChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="text"
                    id="bemail"
                    value={values.businessEmail}
                    label="Business Email"
                    name="businessEmail"
                    onChange={handleInputChange}
                  />
                  <MuiPhoneNumber
                    defaultCountry="us"
                    onlyCountries={["in", "us"]}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="businessNumber"
                    value={values.businessNumber}
                    label="Business Phone Number"
                    name="businessNumber"
                    autoComplete="mobile"
                    countryCodeEditable={false}
                    onChange={(event) =>
                      handleInputChange({
                        target: { name: "businessNumber", value: event },
                      })
                    }
                  />
                  {/* <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="number"
                    id="businessNumber"
                    value={values.businessNumber}
                    label="Business Phone Number"
                    name="businessNumber"
                    onChange={handleInputChange}
                  /> */}
                  <Controls.RadioGroup
                    name="type"
                    value={values.type}
                    onChange={handleInputChange}
                    items={itemTypes}
                  />
                  <Controls.TextArea
                    label="Write your query"
                    name="query"
                    value={values.query}
                    onChange={handleInputChange}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={_.values(values).some((v) => v === "")}
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </Grid>
            <Grid item sm className="d-flex">
              <Typography
                variant="h5"
                className="align-self-center mt-1 text-light p-4 bold"
                gutterBottom
              >
                Call Us
                <br />
                Give our Vuacifood sales team a call 
                <br />
                <strong> at: +1 877-407-2465 </strong>
                <br /> Monday—Friday, 10 AM—6 PM IT
              </Typography>
            </Grid>
          </Grid>
          <CssBaseline />
        </Container>
      )}
    </AppContext.Consumer>
  );
}
