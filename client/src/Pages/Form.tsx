import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { Divider, TextField } from "@mui/material";
import { styles } from "../Styles/styles";
import { getData, updateData } from "../Actions/form.action";
import { timestampToString } from "../Utils/service";
import { IUpdateRecord } from "../Interfaces/updateRecord.interface";
import { IUpdateHistory } from "../Interfaces/updateHistory.interface";
import { SnackbarComponent } from "../Components/Snackbar";

const Form = () => {
    const [name, setName] = useState("");
    const [jurisdiction, setJurisdiction] = useState("");
    const [description, setDescription] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [createdOn, setCreatedOn] = useState("");
    const [updateHistory, setUpdateHistory] = useState<IUpdateHistory[]>([]);
    const [latitudeError, setLatitudeError] = useState("");
    const [longitudeError, setLongitudeError] = useState("");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("");

    useEffect(() => {
        const getFormData = async () => {
            const response = await getData();

            if (response && response.success && response.data) {
                setName(response.data.auditRecord.name ? response.data.auditRecord.name : "");
                setJurisdiction(response.data.auditRecord.jurisdiction ? response.data.auditRecord.jurisdiction : "");
                setDescription(response.data.auditRecord.description ? response.data.auditRecord.description : "");
                setLatitude(response.data.auditRecord.latitude ? response.data.auditRecord.latitude : "");
                setLongitude(response.data.auditRecord.longitude ? response.data.auditRecord.longitude : "");
                setCreatedBy(response.data.auditRecord.createdBy ? response.data.auditRecord.createdBy : "");
                setCreatedOn(response.data.auditRecord.createdOn ? response.data.auditRecord.createdOn : "");
                setUpdateHistory(response.data.updateHistory ? response.data.updateHistory : []);
            }
        };

        getFormData();
    }, []);

    const renderUpdatedBy = () => {
        return updateHistory.map((element: IUpdateRecord, index) => {
            return (
                <div key={index} style={styles.singleRecordContainer}>
                    Updated by {element.updatedBy} on {timestampToString(element.updatedOn)}
                </div>
            );
        });
    };

    const onValueChange = (e: any) => {
        if (e.target.name === "name") {
            setName(e.target.value);
        } else if (e.target.name === "jurisdiction") {
            setJurisdiction(e.target.value);
        } else if (e.target.name === "description") {
            setDescription(e.target.value);
        } else if (e.target.name === "latitude") {
            setLatitudeError("");
            setLatitude(e.target.value);
        } else if (e.target.name === "longitude") {
            setLongitudeError("");
            setLongitude(e.target.value);
        }
    };

    const onSubmit = () => {
        setLatitudeError("");
        setLongitudeError("");

        const submitFormData = async () => {
            const data = {
                name: name,
                jurisdiction: jurisdiction,
                description: description,
                latitude: latitude,
                longitude: longitude,
            };

            const response = await updateData(data);

            if (response) {
                if (response.success) {
                    setSnackbarMessage("Data successfully updated");
                    setSnackbarSeverity("success");
                    setSnackbarOpen(true);

                    const newUpdateHistory: IUpdateHistory[] = [...updateHistory];

                    if (response.data.addedRecord) {
                        if (response.data.addedRecord.createdBy) {
                            setCreatedBy(response.data.addedRecord.createdBy);
                            setCreatedOn(response.data.addedRecord.createdOn);
                        } else {
                            newUpdateHistory.push(response.data.addedRecord);
                            setUpdateHistory(newUpdateHistory);
                        }
                    }
                } else {
                    if (response.message.latitude) {
                        setLatitudeError(response.message.latitude);
                    }

                    if (response.message.longitude) {
                        setLongitudeError(response.message.longitude);
                    }

                    if (response.message.error || response.message.formError) {
                        setSnackbarMessage(response.message.error || response.message.formError);
                        setSnackbarSeverity("error");
                        setSnackbarOpen(true);
                    }
                }
            } else {
                setSnackbarMessage("Could not connect to the server");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        };

        submitFormData();
    };

    const onCancel = () => {
        setName("");
        setJurisdiction("");
        setDescription("");
        setLatitude("");
        setLongitude("");
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <React.Fragment>
            <div style={styles.container}>
                <div style={styles.buttonsContainer}>
                    <div style={styles.buttonSaveContainer}>
                        <Button
                            startIcon={<SaveIcon />}
                            variant="outlined"
                            style={styles.buttonSave}
                            onClick={() => onSubmit()}
                        >
                            SAVE
                        </Button>
                    </div>
                    <div style={styles.buttonCancelContainer}>
                        <Button
                            startIcon={<ClearIcon />}
                            variant="outlined"
                            style={styles.buttonCancel}
                            onClick={() => onCancel()}
                        >
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
                            name="name"
                            label="Name"
                            variant="outlined"
                            style={styles.textFieldFullWidth}
                            value={name}
                            onChange={(e) => onValueChange(e)}
                        />
                    </div>
                    <div style={styles.textFieldContainer}>
                        <TextField
                            id="outlined-basic"
                            label="Jurisdiction/City/Region"
                            name="jurisdiction"
                            variant="outlined"
                            style={styles.textFieldFullWidth}
                            value={jurisdiction}
                            onChange={(e) => onValueChange(e)}
                        />
                    </div>
                    <div style={styles.textFieldContainer}>
                        <TextField
                            id="outlined-basic"
                            label="Site Description"
                            name="description"
                            variant="outlined"
                            style={styles.textFieldFullWidth}
                            value={description}
                            onChange={(e) => onValueChange(e)}
                        />
                    </div>
                    <div style={styles.textFieldContainer}>
                        <div style={styles.textFieldInlineLeft}>
                            <TextField
                                id="outlined-basic"
                                name="latitude"
                                label="Latitude"
                                variant="outlined"
                                value={latitude}
                                onChange={(e) => onValueChange(e)}
                                error={latitudeError ? true : false}
                                helperText={latitudeError}
                            />
                        </div>
                        <div style={styles.textFieldInlineRight}>
                            <TextField
                                id="outlined-basic"
                                label="Longitude"
                                name="longitude"
                                variant="outlined"
                                value={longitude}
                                onChange={(e) => onValueChange(e)}
                                error={longitudeError ? true : false}
                                helperText={longitudeError}
                            />
                        </div>
                    </div>
                </div>
                <div style={styles.audiLogContainer}>
                    <div style={styles.audiLogTitle}>Audit Log:</div>
                    <Divider />
                    <div style={styles.recordContainer}>
                        {createdBy ? (
                            <div style={styles.singleRecordContainer}>
                                Created by {createdBy} on {timestampToString(createdOn)}
                            </div>
                        ) : (
                            ""
                        )}
                        {updateHistory && updateHistory.length ? renderUpdatedBy() : ""}
                    </div>
                </div>
                <div>
                    <SnackbarComponent
                        severity={snackbarSeverity === "success" ? "success" : "error"}
                        snackbarOpen={snackbarOpen}
                        handleSnackbarClose={handleSnackbarClose}
                        snackbarMessage={snackbarMessage}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Form;
