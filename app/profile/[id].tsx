import { StyleSheet, FlatList } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSharedValue } from "react-native-reanimated";
import PostCard from "@/components/PostCard";
import HeaderComponent from "@/components/profile/HeaderComponent";
import { useGetProfileById } from "@/api/profile";
import { useGetAllPostsByUser } from "@/api/post";
import HeaderAnimated from "@/components/profile/HeaderAnimated";
import Loading from "@/components/Loading";

export default function ProfileScreen() {
  const { id } = useLocalSearchParams();
  const scrollY = useSharedValue(0);

  const idString = Array.isArray(id) ? id[0] : id;

  const { data: user } = useGetProfileById(idString);

  const { data: posts, isLoading: isLoadingPost } =
    useGetAllPostsByUser(idString);

  if (isLoadingPost) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <HeaderAnimated scrollY={scrollY} id={idString} />
      <FlatList
        data={posts}
        keyExtractor={(_, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          scrollY.value = e.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
        ListHeaderComponent={() => <HeaderComponent user={user!} />}
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
});
