export interface ISnackbar {
    severity: "success" | "error";
    snackbarOpen: boolean;
    handleSnackbarClose: any;
    snackbarMessage: string;
}
