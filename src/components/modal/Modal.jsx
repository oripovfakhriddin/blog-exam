import { yupResolver } from "@hookform/resolvers/yup";
import "./modal.scss";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import newPostSchema from "../../schema/newpostSchema";

const Modal = ({ toggleModal, modal, categoryData }) => {
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(newPostSchema) });

  const getFormData = (data) => {
    console.log(data);
  };


  return (
    <>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2 className="modal__title">Add Post</h2>
            <div className="modal__body">
              <form onSubmit={handleSubmit(getFormData)}>
                <div>
                  <label>Title</label>
                  <input
                    className="info"
                    placeholder="First name"
                    {...register("title")}
                  />
                  {errors.title ? (
                    <p className="text-danger">{errors.title.message}</p>
                  ) : null}
                </div>
                <div>
                  <label>Description</label>
                  <input
                    className="info"
                    placeholder="Description"
                    {...register("description")}
                  />
                  {errors.description ? (
                    <p className="text-danger">{errors.description.message}</p>
                  ) : null}
                </div>
                <div>
                  <label> Select Category </label>
                  <select {...register("category")} name="category" id="category">
                    {categoryData?.map((data, i) => (
                      <option key={i} value={data?._id}>{data?.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <input {...register("photo")} className="image" type="file" />
                </div>
                <button>Add posts</button>
              </form>
            </div>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  modal: PropTypes.bool,
  toggleModal: PropTypes.func,
  categoryData: PropTypes.object,
};

export default Modal;
