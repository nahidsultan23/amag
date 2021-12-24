import React from "react";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { Divider, TextField } from "@mui/material";
import { styles } from "../Styles/styles";

const Form = () => {
    return (
        <React.Fragment>
            <div style={styles.container}>
                <div style={styles.buttonsContainer}>
                    <div style={styles.buttonSaveContainer}>
                        <Button startIcon={<SaveIcon />} variant="outlined" style={styles.buttonSave}>
                            SAVE
                        </Button>
                    </div>
                    <div style={styles.buttonCancelContainer}>
                        <Button startIcon={<ClearIcon />} variant="outlined" style={styles.buttonCancel}>
                            CANCEL
                        </Button>
                    </div>
                </div>
                <Divider />
                <div style={styles.formContainer}>
                    <div style={styles.siteIdContainer}>Site Id: 1</div>
                    <div style={styles.textFieldContainer}>
                        <TextField
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            style={styles.textFieldFullWidth}
                        />
                    </div>
                    <div style={styles.textFieldContainer}>
                        <TextField
                            id="outlined-basic"
                            label="Jurisdiction/City/Region"
                            variant="outlined"
                            style={styles.textFieldFullWidth}
                        />
                    </div>
                    <div style={styles.textFieldContainer}>
                        <TextField
                            id="outlined-basic"
                            label="Site Description"
                            variant="outlined"
                            style={styles.textFieldFullWidth}
                        />
                    </div>
                    <div style={styles.textFieldContainer}>
                        <div style={styles.textFieldInlineLeft}>
                            <TextField id="outlined-basic" label="Latitude" variant="outlined" />
                        </div>
                        <div style={styles.textFieldInlineRight}>
                            <TextField id="outlined-basic" label="Longitude" variant="outlined" />
                        </div>
                    </div>
                </div>
                <div style={styles.audiLogContainer}>
                    <div style={styles.audiLogTitle}>Audit Log:</div>
                    <Divider />
                    <div style={styles.recordContainer}>
                        <div style={styles.singleRecordContainer}>Created by</div>
                        <div style={styles.singleRecordContainer}>Updated by</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Form;
