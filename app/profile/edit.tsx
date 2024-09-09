import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";

export default function ScreenEditProfile() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Stack.Screen
        options={{
          headerTitle: "Editar mi perfil",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.background },
          headerShadowVisible: false,
        }}
      />
      <View>
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2023/09/04/17/48/flamingos-8233303_1280.jpg",
          }}
          style={styles.imageHeader}
        />
        <Feather
          onPress={() => console.log("Editar imagen de portada...")}
          name="edit"
          size={18}
          color={Colors.text}
          style={styles.iconEditPortada}
        />
        <Pressable
          onPress={() => console.log("Editar avatar...")}
          style={styles.containerIconAvatar}
        >
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2023/09/04/17/48/flamingos-8233303_1280.jpg",
            }}
            style={styles.avatar}
          />
          <Feather
            name="edit"
            size={18}
            color={Colors.text}
            style={styles.iconEditAvatar}
          />
        </Pressable>
      </View>
      <View style={[styles.containerInput, { marginTop: 50 }]}>
        <Text style={styles.label}>Mi nombre</Text>
        <TextInput placeholder="Juan Peréz" style={styles.input} />
      </View>
      <View style={styles.containerInput}>
        <Text style={styles.label}>Mi subnombre</Text>
        <TextInput placeholder="@juanperéz" style={styles.input} />
      </View>
      <View style={styles.containerInput}>
        <Text style={styles.label}>Mi ubicación</Text>
        <TextInput
          placeholder="Por ej. : Buenos Aires, Argentina"
          style={styles.input}
        />
      </View>
      <View style={styles.containerInput}>
        <Text style={styles.label}>Mi bio</Text>
        <TextInput
          placeholder="Mi bio..."
          numberOfLines={6}
          multiline={true}
          style={[
            styles.input,
            { height: 120, textAlignVertical: "top", paddingVertical: 10 },
          ]}
        />
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.button}>
        <Text style={styles.textButton}>Editar mi perfil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    paddingVertical: 12,
    paddingHorizontal: 22,
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
    marginTop: 30,
  },
  textButton: {
    fontFamily: "RobotoBold",
    color: "#fff",
    fontSize: 13,
  },
  errors: {
    marginTop: 6,
    fontSize: 13,
    fontStyle: "italic",
    color: Colors.text,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    borderWidth: 4,
    borderColor: "#e3ece1",
  },
  imageHeader: {
    width: "auto",
    height: 150,
    borderRadius: 16,
  },
  containerIconAvatar: {
    position: "absolute",
    bottom: 0,
    transform: [{ translateY: 42 }],
    alignSelf: "center",
    borderRadius: 80 / 2,
  },
  iconEditAvatar: {
    position: "absolute",
    bottom: -5,
    right: -5,
    backgroundColor: "#e3ece1",
    borderRadius: 15,
    height: 30,
    width: 30,
    textAlign: "center",
    textAlignVertical: "center",
  },
  iconEditPortada: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "#e3ece1",
    borderRadius: 15,
    height: 30,
    width: 30,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
