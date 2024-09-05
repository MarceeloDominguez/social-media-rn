import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import React, { ComponentProps, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Colors } from "@/constants/Colors";

type RemotaImageProps = {
  path: string;
  fallback?: string;
} & Omit<ComponentProps<typeof Image>, "source">;

export default function RemotaImage({
  path,
  fallback,
  ...imageProps
}: RemotaImageProps) {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!path) return;

    const getImageUrl = async () => {
      setLoading(true);
      setImage("");

      const { data, error } = await supabase.storage
        .from("posts-images")
        .download(path);

      if (error) {
        console.log(error.message, "error al descargar la imagen");
      }

      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      }

      setLoading(false);
    };

    getImageUrl();

    if (!image) {
      getImageUrl();
    }
  }, [path]);

  return loading ? (
    <View style={styles.containerLoading}>
      <ActivityIndicator size={22} color={Colors.tint} />
    </View>
  ) : (
    <Image source={{ uri: image || fallback }} {...imageProps} />
  );
}

const styles = StyleSheet.create({
  containerLoading: {
    width: "100%",
    aspectRatio: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
});
