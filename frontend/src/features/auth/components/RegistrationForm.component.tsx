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
import { validateNameLength, validatePasswordLength } from '../../../shared/utils/validation/length';
import { validateEmail } from '../../../shared/utils/validation/email';
import useInput from '../../../hooks/input/use-input';
import { NewUser } from '../models/NewUser';
import { useAppDispatch, useAppSelector } from '../../../hooks/input/redux/hooks';
import { register, reset } from '../authSlice';


const RegistrationFormComponent: FC = () => {
    const {
        text: name,
        shouldDisplayError: nameHasError,
        inputChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        inputClearHandler: nameClearHandler,
    } = useInput(validateNameLength)

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

    const {
        text: confirmPassword,
        shouldDisplayError: confirmPasswordHasError,
        inputChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
        inputClearHandler: confirmPasswordClearHandler,
    } = useInput(validatePasswordLength)

    const clearForm = () => {
        nameClearHandler();
        emailClearHandler();
        passwordClearHandler();
        confirmPasswordClearHandler();
    }

    const dispatch = useAppDispatch();

    const {isLoading, isSuccess} = useAppSelector((state) => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            dispatch(reset())
            clearForm();
            navigate('/signin')
            console.log('NEW USER:');
        }
    }, [isSuccess])

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password  !== confirmPassword) return;

        if (
            nameHasError || 
            emailHasError || 
            passwordHasError || 
            confirmPasswordHasError
            ) return;

        if (
            name.length === 0 || 
            email.length === 0 || 
            password.length === 0 || 
            confirmPassword.length === 0
            ) return;

            const newUser: NewUser = {
                name, email, password,
            }

        
        dispatch(register(newUser))
        console.log("NewUser:", newUser)
    }

    if (isLoading) return <CircularProgress sx={{marginTop: '64px'}} color='primary'/>
    
  return (
    <Box sx={{
        border: 1, 
        padding: 2, 
        borderColor: '#cccccc', 
        width: '350px',
        marginTop: 2}}>
            <form onSubmit={onSubmitHandler}>
                <Grid container direction='column' justifyContent='flex-start'>
                    <Typography variant='h4' component='h1'>
                        Create account
                    </Typography>
                    <InputLabel sx={{
                        fontWeight: 500, 
                        marginTop: 1, 
                        color: '#000000'}} htmlFor='name'>
                            Your name
                    </InputLabel>
                    <TextField 
                        value={name}
                        onChange={nameChangeHandler}
                        onBlur={nameBlurHandler}
                        error={nameHasError}
                        helperText={nameHasError ? 'Enter your name' : ''}
                        type='name' 
                        name='name' 
                        id='name' 
                        variant='outlined' 
                        size='small'/>
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
                    <InputLabel sx={{
                        fontWeight: 500, 
                        marginTop: 1, 
                        color: '#000000'}} htmlFor='confirmPassword'>
                            Re-enter password
                    </InputLabel>
                    <TextField
                        value={confirmPassword}
                        onChange={confirmPasswordChangeHandler}
                        onBlur={confirmPasswordBlurHandler}
                        error={confirmPassword.length > 0 && password !== confirmPassword}
                        helperText={confirmPasswordHasError ? 'Password must match' : ''} 
                        type='password' 
                        name='confirmPassword' 
                        id='confirmPassword' 
                        variant='outlined' 
                        size='small'/>
                    <Button 
                        id='register-btn'
                        variant='contained' 
                        type='submit'
                        style={{
                            marginTop: '16px', 
                            height: '31px', 
                            backgroundColor: '#38a32a', 
                            color: 'black', 
                            borderColor: '#2e963d #4c9141 #499b4a', 
                            textTransform: 'none'}}>
                        Register
                    </Button>
                </Grid>
            </form>
            <Divider sx={{marginTop: '36px', marginBottom: '36px'}}/>
            <div style={{marginTop: '30px'}}>
                <small>
                    Aready have an account?{' '}
                    <Link 
                        to='/signin' 
                        style={{
                            textDecoration: 'none', 
                            color: '#0000ee'}}>
                        Sign-in
                    </Link>
                </small>
            </div>
    </Box>
  )
}

export default RegistrationFormComponent