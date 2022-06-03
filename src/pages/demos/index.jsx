import emailjs from 'emailjs-com';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const { name, email, message, artist_name, country } = data;

    try {
      const templateParams = {
        name,
        email,
        message,
        artist_name,
        country,
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_DEMO,
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
    <>
      <div>
        <div className=" is-flex  mb-4 mr-2 ">
          <div className="field title-header">
            <span>SUBMIT YOUR DEMO</span>
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
                <label>Artist Name</label>
              </div>
              <input
                type="text"
                {...register(`artist_name`, {
                  required: {
                    value: true,
                    message: 'Please enter your artist name',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Please use 30 characters or less',
                  },
                })}
                className="input"
              />
              {errors.artist_name && (
                <span className="help is-danger">
                  {errors.artist_name.message}
                </span>
              )}
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="mb-2">
                <label>Soundcloud Demo (Private Link)</label>
              </div>
              <input
                type="text"
                {...register(`country`, {
                  required: {
                    value: true,
                    message: 'Please enter your artist name',
                  },
                  maxLength: {
                    value: 500,
                    message: 'Please use 500 characters or less',
                  },
                })}
                className="input"
              />
              {errors.country && (
                <span className="help is-danger">{errors.country.message}</span>
              )}
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="mb-2">
                <label>Release of your project</label>
              </div>
              <textarea
                rows={5}
                {...register(`message`, {
                  required: true,
                })}
                className="textarea"
              />
              {errors.message && (
                <span className="help is-danger">
                  Please enter a release of your project
                </span>
              )}
            </div>
          </div>

          <button className="button button-green" type="submit">
            Send
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" />
    </>
  );
}
