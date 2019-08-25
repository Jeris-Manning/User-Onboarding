import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function LoginForm({ errors, touched, values, users, setUsers }) {
  
   
  
  useEffect(() => {
    
      setUsers([...users, users]);
    
  },[users]);

  
  return (
    <Form>
      <div>
        {errors.firstName && touched.firstName && <p>{errors.firstName}</p>}
        <Field type='text' name='firstName' placeholder='First Name' />
      </div>
      <div>
        {errors.lastName && touched.lastName && <p>{errors.lastName}</p>}
        <Field type='text' name='lastName' placeholder='Last Name' />
      </div>
      <div>
        {errors.email && touched.email && <p>{errors.email}</p>}
        <Field type='email' name='email' placeholder='Email' />
      </div>
      <div>
        {errors.password && touched.password && <p>{errors.password}</p>}
        <Field type='password' name='password' placeholder='Password' />
      </div>
      <label>
        <Field type='checkbox' name='fightready' checked={values.fightready} />
        I'm Ready to Fight!
      </label>
      <button>Submit!</button>
    </Form>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ firstName, lastName, email, password, fightready }) {
    return {
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
      password: password || '',
      fightready: fightready || false
    };
  },

  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .lowercase('Small letters please.')
      .required('Your head as empty as that string, cowboy?'),

    lastName: Yup.string()
      .lowercase('Small letters please.')
      .required('Your head as empty as that string, cowboy?'),

    email: Yup.string()
      .email("That ain't no heckin' e-mail, dude!")
      .required('Too lazy to type an e-mail address?'),

    password: Yup.string()
      .min(6, 'Magic 8-ball could guess that garbage.')
      .required("I can't let you get hacked by a neckbeard. Password please.")
  }),

  handleSubmit(values, { setStatus, resetForm, setSubmitting } ) {
    // console.log(values);

    axios
      .post('https://reqres.in/api/users', values)
      .then((res) => {
        
        // Data was created successfully and logs to console
        // addUser(res.data);
        // console.log(users)
        setStatus(res.data);
        
        resetForm();
        setSubmitting(false);
      })
      .catch((err) => {
        console.log(err); // There was an error creating the data and logs to console
        setSubmitting(false);
      });

    //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
  }
})(LoginForm);

export default FormikLoginForm;
