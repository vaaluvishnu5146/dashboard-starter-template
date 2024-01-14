import { Formik } from "formik";
import { DiscountType, DiscountUnits } from "../../Contants";
import Select from "../../Elements/Select";
import TextInput from "../../Elements/TextInput";
import { showToast } from "../../Assets/toasts";

const initialState = {
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  type: "",
  value: 0,
  unit: "",
  image: "",
  isActive: false,
};

export default function Discounts() {
  return (
    <div className="container">
      <div className="container-fluid">
        <Formik
          initialValues={initialState}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Required";
            } else if (!values.image) {
              errors.image = "Required";
            } else if (!values.type) {
              errors.type = "Required";
            } else if (!values.value) {
              errors.value = "Required";
            } else if (!values.unit) {
              errors.unit = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            if (values) {
              fetch("http://localhost:5000/api/offers/create", {
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
            errors = {},
            handleChange = () => {},
            handleBlur = () => {},
            touched = {},
            handleSubmit = () => {},
            resetForm = () => {},
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-6">
                  <TextInput
                    label="Offer Name"
                    id="name"
                    name="name"
                    type="text"
                    value={values["name"]}
                    placeholder="Enter Offer name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Offer Description"
                    id="description"
                    name="description"
                    type="text"
                    value={values["description"]}
                    placeholder="Enter Offer Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Offer Image"
                    id="image"
                    name="image"
                    type="text"
                    value={values["image"]}
                    placeholder="Enter Offer Image"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <div className="row">
                    <div className="col-6">
                      <TextInput
                        error={errors["startDate"]}
                        touched={touched["startDate"]}
                        label="Offer Start Date"
                        id="startDate"
                        name="startDate"
                        placeholder="Select Offer Start Date"
                        type="date"
                        value={values["startDate"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-6">
                      <TextInput
                        error={errors["endDate"]}
                        touched={touched["endDate"]}
                        label="Offer End Date"
                        id="endDate"
                        name="endDate"
                        placeholder="Enter Offer End Date"
                        type="date"
                        value={values["endDate"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <Select
                        label="Select Offer Type"
                        id="type"
                        name="type"
                        value={values?.type}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        options={DiscountType}
                      />
                    </div>
                    <div className="col-4">
                      <Select
                        label="Select Offer Unit"
                        id="unit"
                        name="unit"
                        value={values?.unit}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        options={DiscountUnits}
                      />
                    </div>
                    <div className="col-4">
                      <TextInput
                        label="Offer Value"
                        id="offer"
                        name="value"
                        type="number"
                        value={values?.value}
                        placeholder="Enter Offer Value"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={values["isActive"]}
                      id="isActive"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="isActive">
                      Offer Active
                    </label>
                  </div>
                  <button type="submit" className="btn btn-sm btn-primary mr-2">
                    Create Offer
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
