import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import * as Yup from "yup";
import { useMutation } from '@tanstack/react-query';
import { registerUser } from "../(services)/api/api";



const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email().label("Email"),
    password: Yup.string().required('Password is required').min(4).label("password"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  });

const register = () => {
  const mutation =useMutation({
    mutationFn: registerUser,
    mutationKey:['login']
  });
  console.log("mutation",mutation)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      {/* Formik */}
      <Formik
      initialValues={{email:"",password:"",password:""}}
      
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const data = {
          email: values.email,
          password: values.password,
        };
        mutation
          .mutateAsync(data)
          .then(() => {
            mutation.mutateAsync(values)
              .then((data) => {
                console.log("data", data);
                // dispatch(loginAction(data));
              })
              .catch((err) => {
                // console.log(err);
              });
          })
          .catch((error) => {
            // console.log(error);
          });
      }}
      >
        {({
             handleChange,
             handleBlur,
             handleSubmit,
             values,
             errors,
             touched,
        })=>(
            
            <View style={styles.form}>


                {/* input 1 */}
                 <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {/* errors */}
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) }

            {/* input 2 */}
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) }

             {/* input 3  */}
             <TextInput
              style={styles.input}
              placeholder="confirmPassword"
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              secureTextEntry
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            ) }
            {/* login button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            </View>

            
        )}
      </Formik>
    </View>
  )
}

export default register

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      backgroundColor: "#f5f5f5",
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 24,
    },
    form: {
      width: "100%",
    },
    input: {
      height: 50,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 16,
      marginBottom: 16,
      backgroundColor: "#fff",
    },
    errorText: {
      color: "red",
      marginBottom: 16,
    },
    button: {
      height: 50,
      backgroundColor: "#6200ea",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      marginTop: 16,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
  });