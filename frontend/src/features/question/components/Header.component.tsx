import { useAppDispatch, useAppSelector } from '../../../hooks/input/redux/hooks';
import { logout, selectedUser } from '../../auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar } from '@mui/material'


const HeaderComponent = () => {
    
  
    const { user } = useAppSelector(selectedUser);
    
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
  
    const logoutHandler= () => {
      dispatch(logout())
    }

  return (
    <Box sx={{flexGrow: 1}}>
        <AppBar position='static' sx={{backgroundColor: '#131921', color: 'white', padding: '4px'}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box 
                    style={{
                        width: '100px', 
                        height: '100px', 
                        paddingTop: '10px'
                        }} >

                </Box>
                <Box style={{justifySelf: 'center'}}>
                    <img 
                        onClick={() => navigate('/')} 
                        style={{
                            width: '100px', 
                            height: '100px', 
                            paddingTop: '10px', 
                            cursor: 'pointer'}} 
                        src='/owl_logo_white.png' 
                        alt='owl logo'/>
                </Box>
                <Box sx={{display: 'flex', justifySelf: 'end'}}>
                    <div>
                        <div>Hello, {user?.name}</div>
                        <Button 
                            onClick={logoutHandler} 
                            sx={{
                                padding: 0, 
                                marginRight: '16px'}}
                            color='inherit'
                        >
                            Sign out
                        </Button>
                    </div>
                </Box>
            </Toolbar>
        </AppBar>
    </Box>
  )
}

export default HeaderComponent



    