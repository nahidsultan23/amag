import { Alert, Snackbar } from "@mui/material";
import { ISnackbar } from "../Interfaces/snackbar.interface";

export const SnackbarComponent = (props: ISnackbar) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={props.snackbarOpen}
            onClose={props.handleSnackbarClose}
            autoHideDuration={4000}
        >
            <Alert onClose={props.handleSnackbarClose} severity={props.severity} sx={{ width: "100%" }}>
                {props.snackbarMessage}
            </Alert>
        </Snackbar>
    );
};
