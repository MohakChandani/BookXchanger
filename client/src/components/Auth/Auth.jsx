import React,{useState} from 'react'
import {Container,Paper,Grid,Typography,Button,TextField,Avatar} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';
import {LockOutlined} from '@material-ui/icons';
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input'
import useStyles from './styles'
import GoogleIcon from './GoogleIcon'
import FacebookIcon from './FacebookIcon'
import {useDispatch} from 'react-redux'
import {GoogleLogin} from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {signUp,signIn} from '../../actions/auth'
import Navbar from '../Navbar/Navbar'
import {AUTH} from '../../constants/actions'

const initialState = {firstName:'',lastName:'',college:'',location:'',email:'',password:'',confirmPassword:''}
const Auth = () => {
    const classes = useStyles()
    const [isSignup,setIsSignup] = useState(true)
    const [showPassword,setShowPassword] = useState(false)
    const [formData,setFormData] = useState(initialState)
    const [err,setErr] = useState(false) 
    const authData = useSelector(state=>state.authData)
    const history = useHistory()
    const dispatch = useDispatch()

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(isSignup){
            console.log(formData)
            dispatch(signUp(formData,history))
        }else{
            dispatch(signIn(formData,history))
        }
        setErr(true)
    }
    
    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const switchMode = ()=>{
        setIsSignup(previsSignUp=>!previsSignUp)
        setShowPassword(false)
    }

    const handleShowPassword = ()=>{
        setShowPassword(prevshowPassword=>!prevshowPassword)
    }

    const googleSuccess = async(res)=>{
        console.log(res)
        const profile = {
            profile:res?.profileObj,
            token:res?.tokenId
        }
        try {
            dispatch({type:AUTH,payload:profile})
            history.push('/')
        } catch (err) {
            console.log("Something went wrong")
        }
    }

    const googleError=()=>{
        alert('Google Sign In was unsuccessful. Try again later');
    }

    const componentClicked = ()=>{
        console.log("clicked")
    }

    const responseFacebook = (res)=>{
        console.log(res)
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
                {
                    err?(
                        <Alert severity="error">
                            <strong>{authData?.msg}</strong>
                        </Alert>
                    ):null
                }
                <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    { isSignup && (
                    <>
                    <Input name="firstName" label="First Name" handleChange={handleChange}  autoFocus half />
                    <Input name="lastName" label="Last Name" handleChange={handleChange}   half />
                    <Input name="college" label="College Name" handleChange={handleChange}/>
                    <Input name="location" label="Your current Place" handleChange={handleChange}/>

                    </>
                    )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" type={showPassword ? 'text' : 'password'} handleChange={handleChange}  handleShowPassword={handleShowPassword} />
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    { isSignup ? 'Sign Up' : 'Sign In' }
                </Button>
                <GoogleLogin
                    clientId="716279671550-uhbhnkiocr43jt3don07qtr9inmi4hk7.apps.googleusercontent.com"
                    render={(renderProps) => (
                    <Button color="info" fullWidth className={classes.customLogin} onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<GoogleIcon/>} variant="contained">
                        Sign Up with Google
                    </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleError}
                    cookiePolicy="single_host_origin"
                />

                <FacebookLogin
                    appId="428527365067089"
                    render={(renderProps)=>(
                        <Button color="info" fullWidth className={classes.customLogin} onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<FacebookIcon />} variant="contained">
                            Continue with Facebook
                        </Button>
                    )}
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={componentClicked}
                    callback={responseFacebook}
                    icon="fa-facebook" 
                />

                <Grid container justify="flex-end">
                    <Grid item>
                    <Button onClick={switchMode}>
                        { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                    </Button>
                    </Grid>
                </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
