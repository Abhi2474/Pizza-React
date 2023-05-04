import React, { useContext, useState } from 'react'
import styles from './Login.module.css'
import InputControl from '../input/InputControl'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { FirebaseContext } from '../../context/FirebaseContext'

const Login = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    email: '',
    pass: ''
  })

  const [errMsg, setErrMsg] = useState('')
  const [submitDisabled, setSubmitDisabled] = useState(false)

  const { authenticated, setAuthenticated } = useContext(FirebaseContext)

  const getErr = (word)=>{
    word = word.split('/')
    return word[1].slice(0,-2)
  }

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrMsg('Fill all fields')
      return
    }
    setErrMsg('')

    setSubmitDisabled(true)
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitDisabled(false)
        setAuthenticated(true)
        navigate('/')
        console.log(res.user.refreshToken);
        res.user?.getIdToken().then(res=>{
          localStorage.setItem('accessToken', res)
          setAuthenticated(true)})
      }).catch(err => {
        setSubmitDisabled(false)
        setErrMsg(getErr(err.message))
        console.log(err)
      })

  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.innerBox}>
          <h1 className={styles.heading}>Login</h1>

          <InputControl
            label='Email'
            type='email'
            placeholder='Enter email address'
            onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
          />

          <InputControl
            label='Password'
            type='password'
            placeholder='Enter password'
            onChange={(event) => setValues((prev) => ({ ...prev, pass: event.target.value }))}
          />

          <div className={styles.footer}>
            <b className={styles.error}>{errMsg}</b>
            <button disabled={submitDisabled} onClick={handleSubmission}>Login</button>
            <p>
              New User? {' '}
              <span>
                <Link to={'/signup'}>
                  Signup
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login