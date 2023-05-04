import React, { useState } from 'react'
import styles from './Signup.module.css'
import InputControl from '../input/InputControl'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { collection, addDoc } from "firebase/firestore"; 

const Signup = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name: '',
    email: '',
    pass: ''
  })

  const [errMsg, setErrMsg] = useState('')
  const [submitDisabled, setSubmitDisabled] = useState(false)

  const getErr = (word)=>{
    word = word.split('/')
    return word[1].slice(0,-2)
  }

  const handleSubmission = () => {
    if (!values.email || !values.email || !values.pass) {
      setErrMsg('Fill all fields')
      return
    }
    setErrMsg('')

    setSubmitDisabled(true)
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitDisabled(false)
        const user = res.user
        await updateProfile(user, {
          displayName: values.name
        })
        navigate('/')
        console.log(res);
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
          <h1 className={styles.heading}>Signup</h1>
          <InputControl
            label='Name'
            type='text'
            placeholder='Enter name'
            onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
          />

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
            <button disabled={submitDisabled} onClick={handleSubmission}>Signup</button>
            <p>
              Already have an account? {' '}
              <span>
                <Link to={'/login'}>
                  Login
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>

    </>
  )
}

export default Signup