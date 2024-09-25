import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "@/lib/supabase";
import { randomUUID } from "expo-crypto";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";

const useImageUpload = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  const pickImage = async (type: "avatar" | "banner") => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === "avatar") {
        setAvatar(result.assets[0].uri);
      } else {
        setBanner(result.assets[0].uri);
      }
    }
  };

  const uploadImage = async (type: "avatar" | "banner") => {
    const image = type === "avatar" ? avatar : banner;

    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });

    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";
    const storagePath = type === "avatar" ? "avatars" : "banners";

    const { data, error } = await supabase.storage
      .from(storagePath)
      .upload(filePath, decode(base64), { contentType });

    if (error) {
      console.log(`Error al subir el ${type}...`, error);
    }

    return data ? data.path : null;
  };

  return {
    pickAvatar: () => pickImage("avatar"),
    pickBanner: () => pickImage("banner"),
    uploadAvatar: () => uploadImage("avatar"),
    uploadBanner: () => uploadImage("banner"),
    setAvatar,
    setBanner,
  };
};

export default useImageUpload;
