import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import { Categories, SubCategories } from "../../Contants";
import Select from "../../Elements/Select";
import TextInput from "../../Elements/TextInput";
import useOffers from "../../Hooks/useOffersApi/useOffersApi";

const initialState = {
  name: "",
  description: "",
  normalPrice: "",
  actualPrice: "",
  category: "",
  subCategory: "",
  images: [""],
  offerId: null,
  isActive: false,
  availableQuantity: 0,
};

export default function Products() {
  const [offers, error] = useOffers();
  return (
    <div className="container">
      <div className="container-fluid">
        <Formik
          initialValues={initialState}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Required";
            } else if (!values.images) {
              errors.image = "Required";
            } else if (!values.normalPrice) {
              errors.normalCost = "Required";
            } else if (!values.actualPrice) {
              errors.actualCost = "Required";
            } else if (!values.category) {
              errors.category = "Required";
            } else if (!values.subCategory) {
              errors.subCategory = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            if (values) {
              fetch("http://localhost:5000/api/products/create", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => {
                  setSubmitting(false);
                  resetForm();
                  return response.json();
                })
                .then((result) => console.log(result))
                .catch((error) => console.log(error));
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
                  <div className="mb-3">
                    <FieldArray name="images">
                      {({ remove, push }) => (
                        <div>
                          {values.images.length > 0 &&
                            values.images.map((image, index) => (
                              <div
                                className="row mb-2 d-flex align-items-center"
                                key={index}
                              >
                                <div className="col">
                                  <label htmlFor={`images.${index}`}>
                                    Image {index + 1}
                                  </label>
                                  <Field
                                    name={`images.${index}`}
                                    placeholder="Enter Image Url"
                                    type="text"
                                    className="form-control"
                                  />
                                  <ErrorMessage
                                    name={`images.${index}`}
                                    component="div"
                                    className="field-error"
                                  />
                                </div>
                                <div className="col">
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-primary"
                                    onClick={() => remove(index)}
                                  >
                                    <i className="fas fa-fw fa-trash"></i>
                                  </button>
                                </div>
                              </div>
                            ))}
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => push("")}
                          >
                            + Add Image
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                  <TextInput
                    label="Product Name"
                    id="name"
                    name="name"
                    type="text"
                    value={values["name"]}
                    placeholder="Enter Product name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Product Description"
                    id="description"
                    name="description"
                    type="text"
                    value={values["description"]}
                    placeholder="Enter Product Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <div className="row">
                    <div className="col-6">
                      <TextInput
                        label="Product Normal Price"
                        id="normalPrice"
                        name="normalPrice"
                        type="number"
                        value={values["normalPrice"]}
                        placeholder="Enter Normal Price"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-6">
                      <TextInput
                        label="Product Actual Price"
                        id="actualPrice"
                        name="actualPrice"
                        type="number"
                        value={values["actualPrice"]}
                        placeholder="Enter Actual Price"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <Select
                        label="Select Category"
                        id="category"
                        name="category"
                        value={values["category"]}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        options={Categories}
                      />
                    </div>
                    <div className="col-6">
                      <Select
                        label="Select Sub Category"
                        id="subCategory"
                        name="subCategory"
                        value={values["subCategory"]}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        options={SubCategories}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <Select
                      label="Select Offer"
                      id="offerId"
                      name="offerId"
                      value={values["offerId"]}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      options={offers?.map((d) => {
                        return { id: d._id, label: d.name };
                      })}
                    />
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
                      Product Active
                    </label>
                  </div>
                  <TextInput
                    label="Available Quantity"
                    id="availableQuantity"
                    name="availableQuantity"
                    type="number"
                    value={values["availableQuantity"]}
                    placeholder="Enter Available Quantity"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <button type="submit" className="btn btn-sm btn-primary mr-2">
                    Create Product
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
