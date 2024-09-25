import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useGetProfileById, useUpdateProfile } from "@/api/profile";
import Loading from "@/components/Loading";
import Svg, { Path } from "react-native-svg";
import RemotaImage from "@/components/RemotaImage";
import useImageUpload from "@/hooks/useImageUpload";

export default function ScreenEditProfile() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("@");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState("");

  const { id } = useLocalSearchParams();

  const { data: updatingProfile } = useGetProfileById(id.toString());

  const {
    pickAvatar,
    pickBanner,
    uploadAvatar,
    uploadBanner,
    setAvatar,
    setBanner,
  } = useImageUpload();

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
      setAvatar(updatingProfile.avatar_url);
      setBanner(updatingProfile.banner);
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
    setAvatar(null);
    setBanner(null);
  };

  const validateInput = () => {
    setErrors("");

    if (!fullname) {
      setErrors("* El nombre es requerido");
      return false;
    }

    return true;
  };

  const handleOnSubmit = async () => {
    if (!validateInput()) {
      return;
    }

    const avatarPath = await uploadAvatar();
    const bannerPath = await uploadBanner();

    updateProfile(
      {
        full_name: fullname,
        username,
        location,
        bio,
        id: id.toString(),
        avatar_url: avatarPath!,
        banner: bannerPath!,
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
        {updatingProfile?.banner ? (
          <RemotaImage
            path={updatingProfile.banner}
            style={styles.headerDefault}
            downloadStorage="banners"
          />
        ) : (
          <View style={styles.headerDefault} />
        )}
        <Feather
          onPress={pickBanner}
          name="edit"
          size={18}
          color={Colors.text}
          style={styles.iconEditPortada}
        />
        <Pressable onPress={pickAvatar} style={styles.containerIconAvatar}>
          {updatingProfile?.avatar_url ? (
            <View style={styles.containerAvatar}>
              <RemotaImage
                path={updatingProfile.avatar_url}
                style={styles.avatar}
                downloadStorage="avatars"
              />
            </View>
          ) : (
            <View style={styles.containerAvatar}>
              <Svg style={styles.avatar} viewBox="0 0 54 54" fill="none">
                <Path
                  d="M27 0.00146484C12.0899 0.00146484 0 12.089 0 27.0003C0 41.9116 12.0887 53.9991 27 53.9991C41.9125 53.9991 54 41.9116 54 27.0003C54 12.089 41.9125 0.00146484 27 0.00146484ZM27 8.07443C31.9337 8.07443 35.9316 12.0735 35.9316 17.0048C35.9316 21.9373 31.9337 25.9353 27 25.9353C22.0687 25.9353 18.0708 21.9373 18.0708 17.0048C18.0708 12.0735 22.0687 8.07443 27 8.07443ZM26.9941 46.9401C22.0734 46.9401 17.5667 45.1481 14.0906 42.182C13.2438 41.4597 12.7552 40.4007 12.7552 39.2894C12.7552 34.2881 16.803 30.2854 21.8054 30.2854H32.197C37.2006 30.2854 41.2329 34.2881 41.2329 39.2894C41.2329 40.4018 40.7467 41.4586 39.8987 42.1808C36.4238 45.1481 31.9159 46.9401 26.9941 46.9401Z"
                  fill="#ccc"
                />
              </Svg>
            </View>
          )}
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
  containerAvatar: {
    backgroundColor: Colors.background,
    borderWidth: 4,
    borderColor: "#e3ece1",
    borderRadius: 80 / 2,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 72 / 2,
  },
  headerDefault: {
    width: "auto",
    height: 150,
    borderRadius: 16,
    backgroundColor: "#e3ece1",
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
