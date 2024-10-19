// components/UserForm.jsx

import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { addUser } from "../services/userService";

export default function UserForm({ onUserAdded }) {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const newUser = { name, mail };
      await addUser(newUser); // Llama al servicio para agregar el usuario
      setMessage("Usuario agregado con éxito");
      setName("");
      setMail("");
      onUserAdded(); // Recarga la lista de usuarios
    } catch (error) {
      setMessage("Error al agregar usuario");
      console.error(error);
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Agregar Usuario</Text>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={mail}
        onChangeText={setMail}
        style={styles.input}
      />
      <Button title="Enviar" onPress={handleSubmit} />
      {message ? <Text>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
});
