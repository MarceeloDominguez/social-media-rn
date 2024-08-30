import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }

    setEmail("");
    setPassword("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.containerInput}>
          <Text style={styles.label}>Ingrese el email</Text>
          <TextInput
            placeholder="email@gmail.com"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.label}>Ingrese la contraseña</Text>
          <TextInput
            placeholder="************"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.button}
            onPress={login}
            disabled={loading}
          >
            <Text style={styles.textButton}>
              {loading ? (
                <ActivityIndicator size={20} color="#fff" />
              ) : (
                "Iniciar sesión"
              )}
            </Text>
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
    paddingVertical: 12,
    paddingHorizontal: 22,
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
