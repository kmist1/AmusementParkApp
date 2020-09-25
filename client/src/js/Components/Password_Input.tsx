import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from '@material-ui/core/FormHelperText';


interface IPasswordProps {
    values: any,
    setValues: any
}

export default function  Password_Input(props: IPasswordProps) {

    const {values, setValues} = props;


    console.log(values.password);

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword });
    };


    const handlePasswordChange = (event: any) => {
        return setValues({...values, password: event.target.value})

    };


    return (
        <div>
            <FormControl  variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                    id="filled-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    style = {{width: '380px'}}
                    onChange={handlePasswordChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                <FormHelperText>{values.passwordHelperText}</FormHelperText>
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </div>

    );
}