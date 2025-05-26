// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../App';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../redux/features/authSlice';
// import { useDispatch } from 'react-redux';

// function Login() {
//   const { setAuth } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [form, setForm] = useState({ username: '', password: '' });
//   const [error, setError] = useState('');

//   const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
// const dispatch = useDispatch();
//   const onSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:4000/api/auth/login', form);
//       dispatch(login({ user: res.data.user, token: res.data.token }));
//       setAuth({ token: res.data.token, user: res.data.user });
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <form onSubmit={onSubmit} style={{ maxWidth: 300, margin: '20px auto' }}>
//       <h2>Login</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <input name="username" placeholder="Username" onChange={onChange} required />
//       <input name="password" type="password" placeholder="Password" onChange={onChange} required />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default Login;
