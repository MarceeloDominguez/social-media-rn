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
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useGetProfileById, useUpdateProfile } from "@/api/profile";
import Loading from "@/components/Loading";

export default function ScreenEditProfile() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("@");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<string | null>("");
  const [banner, setBanner] = useState<string | null>("");
  const [errors, setErrors] = useState("");

  const { id } = useLocalSearchParams();

  const { data: updatingProfile } = useGetProfileById(id.toString());

  const {
    mutate: updateProfile,
    isPending: isPendingUpdatedProfile,
    error,
  } = useUpdateProfile();

  useEffect(() => {
    if (updatingProfile) {
      setFullname(updatingProfile.full_name);
      setUsername(updatingProfile.username);
      setLocation(updatingProfile.location);
      setBio(updatingProfile.bio);
    }
  }, [updatingProfile]);

  if (isPendingUpdatedProfile) {
    return <Loading />;
  }

  const resetFields = () => {
    setFullname("");
    setUsername("@");
    setLocation("");
    setBio("");
  };

  const validateInput = () => {
    setErrors("");

    if (!fullname) {
      setErrors("* El nombre es requerido");
      return false;
    }

    return true;
  };

  const handleOnSubmit = () => {
    if (!validateInput()) {
      return;
    }

    updateProfile(
      {
        full_name: fullname,
        username,
        location,
        bio,
        id: id.toString(),
        avatar: null,
        banner: null,
      },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const handleUsernameChange = (text: string) => {
    // Mantener siempre el @ al inicio y evitar múltiples @
    if (!text.startsWith("@")) {
      setUsername(`@${text.replace(/@/g, "")}`);
    } else {
      // Solo permitir un @ al principio y eliminar cualquier otro @
      const cleanedText = `@${text.slice(1).replace(/@/g, "")}`;
      setUsername(cleanedText);
    }
  };

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
        <TextInput
          placeholder="Juan Peréz"
          style={styles.input}
          value={fullname}
          onChangeText={setFullname}
        />
      </View>
      <View style={styles.containerInput}>
        <Text style={styles.label}>Mi username</Text>
        <TextInput
          placeholder="@juanperéz"
          style={styles.input}
          value={username}
          onChangeText={handleUsernameChange}
        />
        {error && (
          <Text style={styles.errors}>El username ya existe. Elegí otro!</Text>
        )}
      </View>
      <View style={styles.containerInput}>
        <Text style={styles.label}>Mi ubicación</Text>
        <TextInput
          placeholder="Por ej. : Buenos Aires, Argentina"
          style={styles.input}
          value={location}
          onChangeText={setLocation}
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
          value={bio}
          onChangeText={setBio}
        />
      </View>
      {errors && <Text style={styles.errors}>{errors}</Text>}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={handleOnSubmit}
        disabled={isPendingUpdatedProfile}
      >
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
