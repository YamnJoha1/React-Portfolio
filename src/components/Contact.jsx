import { useState, useRef } from "react"
import { motion } from "framer-motion"

import emailjs from '@emailjs/browser'

import { styles } from "../styles"
import { EarthCanvas } from "./canvas"
import { SectionWarpper } from "../hoc"
import { slideIn } from "../utils/motion"
import { cons } from "../constans"



const ContactCard = ({icon, description, source_code_link}) => {
  return (
     <div onClick={() => window.open
      (source_code_link, "_blank")}
      className={`bg-black-100 py-4 px-3 rounded-2xl sm:w-[280px] w-full ${source_code_link ? "cursor-pointer" : ""}`}>
          <div className="flex items-center lg:ml-0 lg:justify-center xs:gap-6 xs:justify-normal xs:ml-4">
            <img src={icon} width={40} height={40} />
            <p>{description}</p>
          </div>
    </div>
  )
}




const Contact = () => {
  const formRef = useRef();
  const[form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, seetLoading] = useState(false);

  const handelChange = (e) => {
    const { name, value } = (e.target);

    setForm({ ...form, [name]: value })
  }

  const handelSubmit = (e) => {
    e.preventDefault();
    seetLoading(true);

    emailjs.send(
      'service_13apssn',
      'template_x286b3k',
      {
        form_name: form.name,
        tp_name: 'Yamn',
        from_email: form.email,
        to_email: 'yamn.joha.work@gmail.com',
        message: form.message,
      },
      'EdGC0nDCdYTJ0O_nX'
      )
      .then(() => {
        seetLoading(false);
        alert('Thank you, I will get back to you as soon as possible.');

        setForm({
          name: '',
          email: '',
          message: ''
        })
      }, (error) => {
        seetLoading(false)

        console.log(error);

        alert('Sory, Somthing went wrong.')
      })
  }
  return (
   <div>
     <div className="xl:mt-20 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div variants={slideIn('left', 'tween', 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact</h3>

        <form
          ref={formRef}
          onSubmit={handelSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input 
              type="text" name="name" 
              value={form.name} 
              onChange={handelChange} 
              placeholder="What's your name?" 
              className="bg-tertiary py-4 px-6 placeholder:text-secondary
                text-white rounded-lg outline-none border-none font-medium"  
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input 
              type="email" name="email" 
              value={form.email} 
              onChange={handelChange} 
              placeholder="What's your email?" 
              className="bg-tertiary py-4 px-6 placeholder:text-secondary
                text-white rounded-lg outline-none border-none font-medium"  
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows="7" 
              name="message" 
              value={form.message} 
              onChange={handelChange} 
              placeholder="What do you want to say?" 
              className="bg-tertiary py-4 px-6 placeholder:text-secondary
                text-white rounded-lg outline-none border-none font-medium resize-none"  
            />
          </label>

          <button type="submit"
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
          >
            {loading ? 'Sending...' : 'Send' }
          </button>
        </form>
      </motion.div>

      <motion.div variants={slideIn('right', 'tween', 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>

    <div className="mt-20 flex flex-wrap gap-2">
      {cons.map((item,index) => (
        <ContactCard 
          key={index}
          {...item}
        />
      ))}
    </div>


   </div>
  )
}

export default SectionWarpper(Contact, "contact")