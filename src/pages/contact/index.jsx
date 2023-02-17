import emailjs from 'emailjs-com';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/components/Layout';

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const toastifySuccess = () => {
    toast.success(`Email sent!`, {
      position: `top-right`,
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: `submit-feedback success`,
      toastId: `notifyToast`,
    });
  };

  const toastifyError = () => {
    toast.error(`An error has occurred, please try again`, {
      position: `top-right`,
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: `submit-feedback success`,
      toastId: `notifyToast`,
    });
  };

  const onSubmit = async (data) => {
    const { name, email, subject, message } = data;

    try {
      const templateParams = {
        name,
        email,
        subject,
        message,
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE,
        templateParams,
        process.env.NEXT_PUBLIC_EMAIL_USER,
      );

      toastifySuccess();

      reset();
    } catch (e) {
      toastifyError();
    }
  };
  return (
    <Layout>
      <div>
        <div className=" is-flex  mb-4 mr-2 ">
          <div className="field title-header">
            <span>CONTACT</span>
          </div>
        </div>
        <form id="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="columns">
            <div className="column">
              <div className="mb-2">
                <label>Email</label>
              </div>
              <input
                type="email"
                {...register(`email`, {
                  required: true,
                  pattern:
                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                })}
                className="input "
              />
              {errors.email && (
                <span className="help is-danger">
                  Please enter a valid email address
                </span>
              )}
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="mb-2">
                <label>Name</label>
              </div>
              <input
                type="text"
                {...register(`name`, {
                  required: {
                    value: true,
                    message: 'Please enter your name',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Please use 30 characters or less',
                  },
                })}
                className="input"
              />
              {errors.name && (
                <span className="help is-danger">{errors.name.message}</span>
              )}
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="mb-2">
                <label>Subject</label>
              </div>
              <input
                type="text"
                {...register(`subject`, {
                  required: {
                    value: true,
                    message: 'Please enter a subject',
                  },
                  maxLength: {
                    value: 75,
                    message: 'Please use 75 characters or less',
                  },
                })}
                className="input "
              />
              {errors.subject && (
                <span className="help is-danger">{errors.subject.message}</span>
              )}
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="mb-2">
                <label>Message</label>
              </div>
              <textarea
                rows={5}
                {...register(`message`, {
                  required: true,
                })}
                className="textarea"
              />
              {errors.message && (
                <span className="help is-danger">Please enter a message</span>
              )}
            </div>
          </div>

          <button className="button button-green mb-6" type="submit">
            Send
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" />
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
