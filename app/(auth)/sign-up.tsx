import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function SignUp() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.containerInput}>
          <Text style={styles.label}>Ingrese un nombre</Text>
          <TextInput
            placeholder="Juan Peréz"
            style={styles.input}
            keyboardType="default"
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.label}>Ingrese un email</Text>
          <TextInput
            placeholder="email@gmail.com"
            style={styles.input}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.label}>Ingrese una contraseña</Text>
          <TextInput
            placeholder="************"
            style={styles.input}
            secureTextEntry
          />
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.8} style={styles.button}>
            <Text style={styles.textButton}>Crear cuenta</Text>
          </TouchableOpacity>
          <Text style={styles.textLink}>
            ¿Ya tienes una cuenta?
            <Link href={"/(auth)/sign-in"} style={styles.link}>
              {" "}
              Iniciar sesión
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    padding: 12,
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: 13,
    fontFamily: "RobotoBold",
    color: Colors.text,
  },
  containerInput: {
    marginTop: 15,
  },
  input: {
    backgroundColor: "#e3ece1",
    height: 45,
    borderRadius: 6,
    paddingHorizontal: 10,
    color: Colors.text,
    fontFamily: "RobotoMedium",
    marginVertical: 6,
  },
  button: {
    backgroundColor: Colors.tint,
    height: 45,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 40,
  },
  textButton: {
    fontFamily: "RobotoBold",
    color: "#fff",
    fontSize: 13,
  },
  textLink: {
    textAlign: "center",
    fontFamily: "RobotoMedium",
    fontSize: 13,
    color: Colors.text,
  },
  link: {
    fontFamily: "RobotoBold",
    color: Colors.tint,
  },
});
