/* import axios from 'axios';
 * // import { Customer } from "../hooks/useSquareCustomer";
 * import { Formik, Form, Field, ErrorMessage } from "formik";
 * import * as Yup from "yup";
 * import { sendRequest } from '../utils/request';
 * 
 * interface CustomerProps {
 *     firstName: string;
 *     lastName: string;
 *     email: string;
 *     submitCustomer: (params: AxiosInterface) => Promise<void>;
 * }
 * 
 * const SquareCustomer = (props: CustomerProps) => (
 *   <Formik
 *     initialValues={{ firstName: props.firstName, lastName: props.lastName, email: props.email }}
 *     validationSchema={Yup.object({
 *       firstName: Yup.string()
 *         .max(30, "Must be 30 characters or less")
 *         .required("Required"),
 *       lastName: Yup.string()
 *         .max(30, "Must be 30 characters or less")
 *         .required("Required"),
 *       email: Yup.string().email("Invalid email address").required("Required"),
 *     })}
 *     onSubmit={async (values, { setSubmitting }) => {
 *         await props.submitCustomer({url: '/customers', method: 'POST', payload: { given_name: values.firstName, family_name: values.lastName, email_address: values.email}});
 *       setSubmitting(false);
 *     }}
 *   >
 *     <Form>
 *       <label htmlFor="firstName">First Name</label>
 *       <Field type="text" name="firstName" />
 *       <ErrorMessage name="firstName" />
 *       <label htmlFor="lastName">Last Name</label>
 *       <Field type="text" name="lastName" />
 *       <ErrorMessage name="lastName" />
 *       <label htmlFor="email">Email</label>
 *       <Field type="email" name="email" />
 *       <ErrorMessage name="email" />
 *       <button type="submit">Save</button>
 *     </Form>
 *   </Formik>
 * );
 * 
 * SquareCustomer.defaultProps = {
 *     firstName: '',
 *     lastName: '',
 *     email: '',
 *     submitCustomer: () => console.log('Not implemented!')
 * }
 * 
 */

const SquareCustomer = () => {
    return <div>temporary</div>
}
   export default SquareCustomer;
