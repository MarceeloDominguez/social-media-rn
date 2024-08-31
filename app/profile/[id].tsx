import {
  View,
  StyleSheet,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Post, User } from "@/assets/data/data";
import PostCard from "@/components/PostCard";
import HeaderComponent from "@/components/profile/HeaderComponent";
import Feather from "@expo/vector-icons/Feather";
import { supabase } from "@/lib/supabase";

export default function ProfileScreen() {
  const { id } = useLocalSearchParams();
  const scrollY = useSharedValue(0);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>([]);

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollY.value,
      [0, 100],
      ["transparent", "#F5F5F5"]
    );

    return { backgroundColor };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 100], [0, 1]);

    return { opacity };
  });

  useEffect(() => {
    const fetchAllPost = async () => {
      const { data, error } = await supabase.from("post").select("*");

      if (error) {
        throw new Error(error.message);
      }

      setPosts(data);
    };

    fetchAllPost();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      setUser(data);
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <ActivityIndicator size={25} color="orange" />;
  }

  const myPosts = posts?.filter((post) => post.user_id === id);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <Animated.View style={[animatedHeaderStyle, styles.wrapperIconBack]}>
          <Pressable onPress={() => router.back()} style={styles.containerIcon}>
            <Ionicons name="arrow-back" size={22} color={Colors.text} />
          </Pressable>
          <Animated.Text style={[animatedTextStyle, styles.username]}>
            {user?.username}
          </Animated.Text>
          <Pressable style={styles.containerIcon}>
            <Feather name="edit" size={22} color={Colors.text} />
          </Pressable>
        </Animated.View>
      </View>
      <FlatList
        data={myPosts}
        keyExtractor={(_, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          scrollY.value = e.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
        ListHeaderComponent={() => <HeaderComponent user={user} />}
        renderItem={({ item }) => <PostCard post={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  wrapperIconBack: {
    height: 70,
    paddingHorizontal: 12,
    position: "absolute",
    right: 0,
    left: 0,
    zIndex: 1,
    bottom: 0,
    top: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerIcon: {
    backgroundColor: "rgba(245, 245, 245, 0.6)",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40 / 2,
  },
  username: {
    fontFamily: "RobotoBlack",
    fontSize: 15,
  },
});
