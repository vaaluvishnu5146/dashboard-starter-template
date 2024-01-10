import { Formik } from "formik";
import TextInput from "../../Elements/TextInput/TextInput";
import Select from "../../Elements/Select/Select";
import { categories, subCategories } from "../../configs/products";
import Ratings from "../../Elements/Ratings/Ratings";

// https://assets.ajio.com/medias/sys_master/root/20230906/dpEC/64f882dbafa4cf41f5c12884/-473Wx593H-461191248-yellow-MODEL.jpg
const initialState = {
  id: 20,
  name: "",
  ratings: 0,
  normalCost: 0,
  actualCost: 0,
  category: "",
  subCategory: "",
  image: "",
};

export default function Products() {
  return (
    <Formik
      initialValues={initialState}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Required";
        } else if (!values.image) {
          errors.image = "Required";
        } else if (values.ratings < 1) {
          errors.ratings = "Ratings should be 1 to 5";
        } else if (!values.normalCost) {
          errors.normalCost = "Required";
        } else if (!values.actualCost) {
          errors.actualCost = "Required";
        } else if (!values.category) {
          errors.category = "Required";
        } else if (!values.subCategory) {
          errors.subCategory = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
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
      }) => (
        <form onSubmit={handleSubmit}>
          <TextInput
            error={errors["image"]}
            touched={touched["image"]}
            label="Product Image"
            id="image"
            name="image"
            placeholder="Enter Product Image"
            type="text"
            value={values.image}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextInput
            error={errors["name"]}
            touched={touched["name"]}
            label="Product Name"
            id="name"
            name="name"
            placeholder="Enter Product name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Ratings
            label="Product Ratings"
            id="ratings"
            name="ratings"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.ratings}
            error={errors["ratings"]}
            touched={touched["ratings"]}
          />
          <TextInput
            label="Product Normal Cost"
            id="normalCost"
            name="normalCost"
            placeholder="Enter Product normal cost"
            type="number"
            value={values.normalCost}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors["normalCost"]}
            touched={touched["normalCost"]}
          />
          <TextInput
            error={errors["actualCost"]}
            touched={touched["actualCost"]}
            label="Product Actual Cost"
            id="actualCost"
            name="actualCost"
            placeholder="Enter Product Actual cost"
            type="number"
            value={values.actualCost}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Select
            id="category"
            name="category"
            label="Product category"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.category}
            options={categories}
            error={errors["category"]}
            touched={touched["category"]}
          />
          <Select
            id="subCategory"
            name="subCategory"
            label="Product Sub category"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.subCategory}
            options={subCategories}
            error={errors["subCategory"]}
            touched={touched["subCategory"]}
          />
          <button className="btn btn-md btn-primary" type="submit">
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
}
