import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import { supabase } from "@/lib/supabase";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const createAccount = async () => {
    setLoading(true);
    const { error, data } = await supabase.auth.signUp({ email, password });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    if (user) {
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: user.id, full_name: name });

      if (error) {
        Alert.alert(error.message);
      }
    }

    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.containerInput}>
          <Text style={styles.label}>Ingrese un nombre</Text>
          <TextInput
            placeholder="Juan Peréz"
            style={styles.input}
            keyboardType="default"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.label}>Ingrese un email</Text>
          <TextInput
            placeholder="email@gmail.com"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.label}>Ingrese una contraseña</Text>
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
            onPress={createAccount}
            disabled={loading}
          >
            <Text style={styles.textButton}>
              {loading ? (
                <ActivityIndicator size={20} color="#fff" />
              ) : (
                "Crear cuenta"
              )}
            </Text>
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
