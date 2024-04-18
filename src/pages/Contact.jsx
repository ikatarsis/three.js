import React, {Suspense, useRef, useState} from 'react'
import emailjs from '@emailjs/browser'
import { logo } from '../assets/images/index.js'
import { Canvas } from '@react-three/fiber'
import { Fox } from '../models/index.jsx'
import { Loader, Alert } from '../components/index.jsx'
import useAlert from '../hooks/useAlert.js'

const Contact = () => {
  const [ form, setForm ] = useState({ name: '', email: '', message: '' })
  const [ isLoading, setIsLoading ] = useState(false)
  const [ currentAnimation, setCurrentAnimation ] = useState('idle')


  const formRef = useRef(null)
  const { alert, showAlert, hideAlert } = useAlert()

  const handleChange = ({ target: { name, value } }) => {
    setIsLoading({ ...form, [name]: value })
  }
  const handleFocus = () => setCurrentAnimation('walk')
  const handleBlur = () => setCurrentAnimation('idle')

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsLoading(true)
    setCurrentAnimation('hit')

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name:form.name,
          to_name: 'Kate',
          from_email: form.email,
          to_email: 'schevchenlo.katusha@gmail.com',
          message: form.message
        },
        import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY

    )
      .then(
      () => {
        setIsLoading(false)
        showAlert({
          show: true,
          text: "Thank you for your message 😃",
          type: "success",
        })

        setTimeout(() => {
          hideAlert(false)
          setCurrentAnimation("idle")
          setForm({
            name: "",
            email: "",
            message: "",
          })
        }, [3000])
      },
      (error) => {
        setIsLoading(false)
        console.error(error)
        setCurrentAnimation("idle")

        showAlert({
          show: true,
          text: "I didn't receive your message 😢",
          type: "danger",
        })
      }
    )
  }

  return (
    <section className='relative flex lg:flex-row flex-col max-container h-[100vh]'>
      {alert.show && <Alert {...alert} />}

      <div className='flex-1 min-w-[50%] flex flex-col mt-10'>
        <h1 className='sm:text-5xl text-3xl font-semibold sm:leading-snug font-poppins'>Get It Touch</h1>

        <form
          className='w-full flex flex-col gap-7 mt-14'
          onSubmit={handleSubmit}
        >
          <label className='text-black-500 font-semibold'>
            Name
            <input
              type='text'
              name='name'
              className='bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2.5 font-normal shadow-card'
              placeholder='John'
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className='text-black-500 font-semibold'>
            Email
            <input
              type='email'
              name='email'
              className='bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2.5 font-normal shadow-card'
              placeholder='John@gmail.com'
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className='text-black-500 font-semibold'>
            Message
            <textarea
              name='message'
              rows={4}
              className='block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 mt-2.5 font-normal shadow-card'
              placeholder='Let me know how i can help you?'
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button
            type='submit'
            className='btn'
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Send Message'}
          </button>
        </form>
      </div>

      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000
          }}
        >
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={<Loader />}>
            <Fox
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.45, 0]}
              scale={[0.5, 0.5, 0.5]}
              currentAnimation={currentAnimation}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Contact
