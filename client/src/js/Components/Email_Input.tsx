import React from 'react';
import TextField from '@material-ui/core/TextField';

interface IEmailProps {
    values: any,
    setValues: any,
}

export default function  Email_Input(props: IEmailProps) {

    const {values, setValues} = props;

    const handleEmailChange = (event: any) => {
        return setValues({...values, email: event.target.value})
    };


    return (
        <TextField
            required
            id="filled-required"
            onChange={handleEmailChange}
            value={values.email}
            label="Email"
            defaultValue="Enter Email"
            helperText={values.emailHelperText}
            variant="filled"
        />
    );
}