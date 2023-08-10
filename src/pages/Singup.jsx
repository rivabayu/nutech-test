// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
// import { setDoc, doc } from 'firebase/firestore';

// import { auth } from '../firebase.config'
// import { storage } from '../firebase.config';
// import { db } from '../firebase.config';

// import { toast } from 'react-toastify'


// function Singup() {
//   const [username, setUsername] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [loading, setLoading] = useState(false)


//   const navigate = useNavigate()

//   const singup = async (e) => {
//     e.preventDefault()
//     setLoading(true);

//     try {
//       const userCedential = await createUserWithEmailAndPassword(auth, email, password)

//       const user = userCedential.user
//       // console.log(user)

//       const storageref = ref(storage, `iamge/${Date.now() + username}`)
//       const uploadTask = uploadBytesResumable(storageref)
//       uploadTask.on(
//         (err) => {
//           console.log(err.message)
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//             await updateProfile(user, {
//               displayName: username,
//               photoURL: downloadURL
//             })
//             await setDoc(doc(db, 'users', user.uid), {
//               uid: user.uid,
//               displayName: username,
//               email,
//             })
//             console.log(user.displayName)
//           })
//         }
//       );
//       setLoading(false)
//       toast.success('Created account success')
//       navigate('/login')
//     } catch (erorr) {
//       toast.error("someting wrong")
//     }
//   }
//   return (
//     <>
//       <section className='mt-20 mb-[4.2rem]'>
//         <div className='mt-20 flex justify-center' >
//           {
//             loading ? (
//               <div className='text-xl font-bold'>
//                 Loading.....
//                 <progress className="progress w-56"></progress></div>
//             ) : (
//               <form className='bg-headingText w-1/2 lg:w-1/4 rounded-xl' onSubmit={singup}>
//                 <div className='mx-10 my-10' >
//                   <input required
//                     value={username} onChange={e => setUsername(e.target.value)}
//                     type="text" placeholder="Username" className="input input-bordered w-full my-2 " />
//                   <input required
//                     id='email' autoComplete="email" name="email"
//                     value={email} onChange={e => setEmail(e.target.value)}
//                     type="email" placeholder="Your Email" className="input input-bordered w-full my-2 " />
//                   <input required
//                     value={password} onChange={e => setPassword(e.target.value)}
//                     type="password" placeholder="Your Password" className="input input-bordered w-full my-2 " />
//                   <div className='flex justify-center mt-10'>
//                     <button type='submit' className="btn  mt-2 flex bg-white text-headingText hover:bg-headingText hover:text-white ">Create an Account</button>
//                   </div>
//                   <div className='mt-10 flex justify-between'>
//                     <p className='text-white '>Already have an account?</p>
//                     <Link to='/login'>
//                       <div className='text-white hover:underline'>Login</div>
//                     </Link>
//                   </div>
//                 </div>
//               </form>
//             )
//           }
//         </div>
//       </section>
//     </>
//   )
// }

// export default Singup