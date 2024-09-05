import {
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import Svg, { Path } from "react-native-svg";
import {
  useCreatePost,
  useDeletePost,
  useGetPost,
  useUpdatePost,
} from "@/api/post";
import { useAuth } from "@/provider/AuthProvider";
import { router, Stack, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { decode } from "base64-arraybuffer";
import { supabase } from "@/lib/supabase";
import * as FileSystem from "expo-file-system";
import { randomUUID } from "expo-crypto";
import { AntDesign } from "@expo/vector-icons";
import Loading from "@/components/Loading";
import RemotaImage from "@/components/RemotaImage";

export default function CreatePostScreen() {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>("");
  const [errors, setErrors] = useState("");

  const { profile } = useAuth();

  const { id: idString } = useLocalSearchParams();

  const id = parseFloat(
    typeof idString === "string" ? idString : idString?.[0]
  );

  const { mutate: createPost, isPending: isPendingCreatingPost } =
    useCreatePost();
  const { mutate: deletePost, isPending: isPendingDeletePost } =
    useDeletePost();
  const { mutate: updatePost, isPending: isPendingUpdatedPost } =
    useUpdatePost();
  const { data: updatingPost } = useGetPost(id);

  const isUpdating = !!idString;

  useEffect(() => {
    if (updatingPost) {
      setImage(updatingPost.image);
      setDescription(updatingPost.description);
    }
  }, [updatingPost]);

  if (isPendingDeletePost || isPendingCreatingPost || isPendingUpdatedPost) {
    return <Loading />;
  }

  const resetFields = () => {
    setDescription("");
    setImage("");
  };

  const validateInput = () => {
    setErrors("");

    if (!image) {
      setErrors("* La imagen es requerida para realizar la publicación");
      return false;
    }

    if (!description) {
      setErrors("* La descripción es requerida para realizar la publicación");
      return false;
    }

    return true;
  };

  const handleOnSubmit = () => {
    if (isUpdating) {
      onUpdatePost();
    } else {
      onCreatePost();
    }
  };

  const onCreatePost = async () => {
    if (!validateInput()) {
      return;
    }

    const imagePath = await uploadImage();

    //create and save in the db
    createPost(
      { description, image: imagePath, user_id: profile?.id },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const onUpdatePost = async () => {
    if (!validateInput()) {
      return;
    }

    const imagePath = await uploadImage();

    //update and save in the db
    updatePost(
      { id, description, image: imagePath! },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";

    const { data, error } = await supabase.storage
      .from("posts-images")
      .upload(filePath, decode(base64), { contentType });

    //console.log("Error al subir la imagen", error);

    if (data) {
      return data.path;
    }
  };

  const onDelete = () => {
    deletePost(id, {
      onSuccess: () => {
        resetFields();
        router.replace("/");
      },
    });
  };

  const confirmDelete = () => {
    Alert.alert(
      "Confirmar",
      "¿Estás seguro de que deseas eliminar esta publicación?",
      [
        { text: "Cancelar" },
        { text: "Eliminar", style: "destructive", onPress: onDelete },
      ]
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Stack.Screen
        options={{
          title: isUpdating ? "Editar la publicación" : "Crear una publicación",
          headerRight: () =>
            isUpdating && (
              <AntDesign
                name="delete"
                size={22}
                color={Colors.text}
                onPress={confirmDelete}
              />
            ),
        }}
      />
      <Text style={styles.label}>Subir imagén</Text>
      <Pressable onPress={pickImage} style={styles.containerImage}>
        {image ? (
          <RemotaImage path={image!} style={styles.imageSvg} fallback={image} />
        ) : (
          <Svg viewBox="0 0 24 24" fill="none" style={styles.imageSvg}>
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.5 1.25C18.9142 1.25 19.25 1.58579 19.25 2V4.75H22C22.4142 4.75 22.75 5.08579 22.75 5.5C22.75 5.91421 22.4142 6.25 22 6.25H19.25V9C19.25 9.41421 18.9142 9.75 18.5 9.75C18.0858 9.75 17.75 9.41421 17.75 9V6.25H15C14.5858 6.25 14.25 5.91421 14.25 5.5C14.25 5.08579 14.5858 4.75 15 4.75H17.75V2C17.75 1.58579 18.0858 1.25 18.5 1.25Z"
              fill="#34A853"
            />
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 1.25L11.9426 1.25C9.63424 1.24999 7.8252 1.24998 6.41372 1.43975C4.96898 1.63399 3.82896 2.03933 2.93415 2.93414C2.03934 3.82895 1.634 4.96897 1.43976 6.41371C1.24999 7.82519 1.25 9.63423 1.25001 11.9426V12.0574C1.25 14.3658 1.24999 16.1748 1.43976 17.5863C1.634 19.031 2.03934 20.1711 2.93415 21.0659C3.82896 21.9607 4.96898 22.366 6.41372 22.5603C7.8252 22.75 9.63424 22.75 11.9426 22.75H12.0574C14.3658 22.75 16.1748 22.75 17.5863 22.5603C19.031 22.366 20.1711 21.9607 21.0659 21.0659C21.9607 20.1711 22.366 19.031 22.5603 17.5863C22.75 16.1748 22.75 14.3658 22.75 12.0574V12C22.75 11.5858 22.4142 11.25 22 11.25C21.5858 11.25 21.25 11.5858 21.25 12C21.25 14.3782 21.2484 16.0864 21.0736 17.3864C21.0667 17.4377 21.0596 17.4882 21.0522 17.5378L18.2782 15.0412C16.9788 13.8718 15.0437 13.7553 13.6134 14.7605L13.3152 14.9701C12.8182 15.3193 12.1421 15.2608 11.7126 14.8313L7.42283 10.5415C6.28742 9.40612 4.46614 9.34547 3.25772 10.4028L2.75099 10.8462C2.75553 9.05395 2.78125 7.69302 2.92638 6.61358C3.09826 5.33517 3.42515 4.56445 3.99481 3.9948C4.56446 3.42514 5.33518 3.09825 6.61359 2.92637C7.91357 2.75159 9.62178 2.75 12 2.75C12.4142 2.75 12.75 2.41421 12.75 2C12.75 1.58579 12.4142 1.25 12 1.25ZM2.92638 17.3864C3.09826 18.6648 3.42515 19.4355 3.99481 20.0052C4.56446 20.5749 5.33518 20.9018 6.61359 21.0736C7.91357 21.2484 9.62178 21.25 12 21.25C14.3782 21.25 16.0865 21.2484 17.3864 21.0736C18.6648 20.9018 19.4356 20.5749 20.0052 20.0052C20.2487 19.7617 20.4479 19.4814 20.6096 19.1404C20.5707 19.1166 20.5334 19.089 20.4983 19.0574L17.2748 16.1562C16.4951 15.4545 15.334 15.3846 14.4759 15.9877L14.1777 16.1973C13.0843 16.9657 11.5968 16.8369 10.6519 15.8919L6.36216 11.6022C5.78515 11.0252 4.85959 10.9944 4.24547 11.5317L2.75039 12.8399C2.75297 14.7884 2.7729 16.2448 2.92638 17.3864Z"
              fill="#34A853"
            />
          </Svg>
        )}
      </Pressable>
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        numberOfLines={6}
        multiline={true}
        placeholder="Agrega una descripción a tu publicación..."
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      {errors && <Text style={styles.errors}>{errors}</Text>}
      <TouchableOpacity
        activeOpacity={1}
        style={styles.button}
        onPress={handleOnSubmit}
        disabled={isPendingCreatingPost}
      >
        <Text style={styles.textButton}>
          {isUpdating ? "Editar" : "Agregar"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flexGrow: 1,
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  containerImage: {
    backgroundColor: "#e3ece1",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 6,
    marginBottom: 20,
  },
  imageSvg: {
    width: 120,
    aspectRatio: 1,
    borderRadius: 6,
  },
  label: {
    fontSize: 13,
    fontFamily: "RobotoBold",
    color: Colors.text,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#e3ece1",
    borderRadius: 6,
    padding: 10,
    height: 120,
    textAlignVertical: "top",
    fontFamily: "RobotoMedium",
  },
  button: {
    backgroundColor: Colors.tint,
    height: 45,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 80,
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
});
