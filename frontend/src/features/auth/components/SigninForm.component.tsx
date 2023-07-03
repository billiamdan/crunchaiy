import { FC, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    Box, 
    Grid, 
    TextField, 
    InputLabel, 
    Typography, 
    Button, 
    Divider,
    CircularProgress
} from '@mui/material';
import { validateEmail } from '../../../shared/utils/validation/email';
import { validatePasswordLength } from '../../../shared/utils/validation/length';
import useInput from '../../../hooks/input/use-input';
import { useAppDispatch, useAppSelector } from '../../../hooks/input/redux/hooks';
import { login, reset } from '../authSlice';
import { LoginUser } from '../models/LoginUser.interface';


const SigninFormComponent: FC = () => {
    const {
        text: email,
        shouldDisplayError: emailHasError,
        inputChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        inputClearHandler: emailClearHandler,
    } = useInput(validateEmail)

    const {
        text: password,
        shouldDisplayError: passwordHasError,
        inputChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        inputClearHandler: passwordClearHandler,
    } = useInput(validatePasswordLength)


    const clearForm = () => {
        emailClearHandler();
        passwordClearHandler();
    }

    const dispatch = useAppDispatch();

    const {isLoading, isSuccess, isAuthenticated} = useAppSelector((state) => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            dispatch(reset())
            clearForm();
        }
    }, [isSuccess, dispatch]);

    useEffect(() => {
        if (!isAuthenticated) return;
            navigate('/')
    }, [isAuthenticated]);
    

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        

        if (
            emailHasError || 
            passwordHasError 
            ) return;

        if (
            email.length === 0 || 
            password.length === 0
            ) return;
        
            const loginUser: LoginUser = {email, password}
        
        dispatch(login(loginUser))
    }

    if (isLoading) return <CircularProgress sx={{marginTop: '64px'}} color='primary'/>

  return (
    <>
    <Box sx={{
        border: 1, 
        padding: 2, 
        borderColor: '#cccccc', 
        width: '350px',
        marginTop: 2}}>
            <form onSubmit={onSubmitHandler}>
                <Grid container direction='column' justifyContent='flex-start'>
                    <Typography variant='h4' component='h1'>
                        Sign-In
                    </Typography>
                    <InputLabel sx={{
                        fontWeight: 500, 
                        marginTop: 1, 
                        color: '#000000'}} htmlFor='email'>
                            Email
                    </InputLabel>
                    <TextField
                        value={email}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        error={emailHasError}
                        helperText={emailHasError ? 'Enter your email' : ''} 
                        type='email' 
                        name='email' 
                        id='email' 
                        variant='outlined' 
                        size='small'/>
                    <InputLabel sx={{
                        fontWeight: 500, 
                        marginTop: 1, 
                        color: '#000000'}} htmlFor='password'>
                            Password
                    </InputLabel>
                    <TextField 
                        value={password}
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                        error={passwordHasError}
                        helperText={passwordHasError ? 'Minimum 6 characters' : ''} 
                        type='password' 
                        name='password' 
                        id='password' 
                        variant='outlined' 
                        size='small'
                        placeholder='Minimum 6 characters required'/>
                    <Button 
                        disabled={
                            !validatePasswordLength(password) || 
                            !validateEmail(email)}
                        variant='contained' 
                        type='submit'
                        style={{
                            marginTop: '16px', 
                            height: '31px', 
                            backgroundColor: '#foc14b', 
                            color: 'black', 
                            borderColor: '#a88734 #9c7e31 #846a29', 
                            textTransform: 'none'}}>
                        Sign-In
                    </Button>
                </Grid>
            </form>
            <div style={{ marginTop: '16px' }}>
                <Divider>
                    <small style={{color: '#767676'}}>New?</small>
                </Divider>
                <Link
                    id='register-link'
                    to='/register'
                    style={{textDecoration: 'none', color: '#0000ee'}}>
                    <Button 
                        id='signin-btn'
                        variant='contained' 
                        style={{
                            width: '100%',
                            marginTop: '12px', 
                            height: '31px', 
                            backgroundColor: '#f1f1f1', 
                            color: 'black', 
                            textTransform: 'none'}}>
                        Register
                    </Button>
                </Link>
            </div>
    </Box>
    </>
  )
}

export default SigninFormComponent


