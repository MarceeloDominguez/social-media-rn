import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

export default function SignIn() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.containerInput}>
          <Text style={styles.label}>Ingrese el email</Text>
          <TextInput
            placeholder="email@gmail.com"
            style={styles.input}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.label}>Ingrese la contraseña</Text>
          <TextInput
            placeholder="************"
            style={styles.input}
            secureTextEntry
          />
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.8} style={styles.button}>
            <Text style={styles.textButton}>Iniciar sesión</Text>
          </TouchableOpacity>
          <Text style={styles.textLink}>
            ¿No tienes una cuenta?
            <Link href={"/(auth)/sign-up"} style={styles.link}>
              {" "}
              Crear una cuenta
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
