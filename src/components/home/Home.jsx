import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import { FirebaseContext } from '../../context/FirebaseContext'
import InputControl from '../input/InputControl'
import { collection, addDoc } from "firebase/firestore"; 
import { auth, db } from '../../firebase'

const Home = (props) => {

	const { authenticated, setAuthenticated } = useContext(FirebaseContext)

	const [values, setValues] = useState({
		name: '',
		profession: '',
		salary: ''
	})

	const handleLogout = () => {
		auth.signOut()
		setAuthenticated(false)
	}

	const handleSubmission = async () => {
		console.log(values);

		try {
			const docRef = await addDoc(collection(db, "engineers"), values);
			console.log("Document written with ID: ", docRef.id);
			
		  } catch (e) {
			console.error("Error adding document: ", e);
		  }
		  setValues({
			name:'',
			profession:'',
			salary:''
		})
	}

	return (
		<div>
			<ul className={styles.ul}>
				<li><Link to={'/'} className={styles.li}>Home</Link></li>
				<li><Link to={'/login'} className={styles.li}>Login</Link></li>
				<li><Link to={'/signup'} className={styles.li}>Signup</Link></li>
				<li><Link to={'/login'} className={styles.li} onClick={handleLogout}>Logout</Link></li>
			</ul>

			<h1 className={styles.name}>{props.name ? `Signed in as ${props.name}` : 'login please'} </h1>
			{
				authenticated ?
					<>
						<InputControl
							label='name'
							type='text'
							placeholder='Enter the name'
							onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
						/>
						<InputControl
							label='profession'
							type='text'
							placeholder='Enter the profession'
							onChange={(event) => setValues((prev) => ({ ...prev, profession: event.target.value }))}
						/>
						<InputControl
							label='salary'
							type='number'
							placeholder='Enter salary'
							onChange={(event) => setValues((prev) => ({ ...prev, salary: event.target.value }))}
						/>
						<button onClick={handleSubmission}>Add</button>
					</>
					: ''
			}
		</div>
	)
}

export default Home