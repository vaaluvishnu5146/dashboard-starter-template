import { Formik } from "formik";
import TextInput from "../../Elements/TextInput";
import { showToast } from "../../Assets/toasts";

const initialState = {
  name: "",
  description: "",
  price: 0,
  isAvailable: false,
};

export default function CreateFood() {
  return (
    <div className="container">
      <div className="container-fluid">
        <Formik
          initialValues={initialState}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Required";
            } else if (!values.description) {
              errors.description = "Required";
            } else if (!values.price) {
              errors.price = "Required";
            } else if (!values.brand) {
              errors.brand = "Required";
            } 
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            if (values) {
              fetch("http://localhost:3000/products/create/", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                  "Content-Type": "application/json",
                  token: sessionStorage.getItem("_tk"),
                },
              })
                .then((response) => {
                  setSubmitting(false);
                  resetForm();
                  return response.json();
                })
                .then((result) => {
                  if (result.success) {
                    showToast(result.message);
                  }
                })
                .catch((error) => {
                  showToast(error, "error");
                });
            }
          }}
        >
          {({
            values = {},
            handleChange = () => {},
            handleBlur = () => {},
            handleSubmit = () => {},
            resetForm = () => {},
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-6">
                  <TextInput
                    label="Food Name"
                    id="name"
                    name="name"
                    type="text"
                    value={values["name"]}
                    placeholder="Enter Food name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Food Description"
                    id="description"
                    name="description"
                    type="text"
                    value={values["description"]}
                    placeholder="Enter Food Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Food Price"
                    id="price"
                    name="price"
                    type="number"
                    value={values["price"]}
                    placeholder="Enter Food Price"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={values["isAvailable"]}
                      id="isAvailable"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="isAvailable">
                      Food Available
                    </label>
                  </div>
                  <TextInput
                    label="Brand Name"
                    id="brand"
                    name="brand"
                    type="text"
                    value={values["brand"]}
                    placeholder="Enter Brand Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <button type="submit" className="btn btn-sm btn-primary mr-2">
                    Create Food
                  </button>
                  <button
                    onClick={resetForm}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Reset Form
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
