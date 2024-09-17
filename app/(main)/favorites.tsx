import { FlatList, StyleSheet, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/provider/AuthProvider";
import { useGetAllPostsLikedByUser } from "@/api/post";
import Loading from "@/components/Loading";
import PostCard from "@/components/PostCard";
import { Colors } from "@/constants/Colors";

export default function FavoritesScreen() {
  const { profile } = useAuth();

  if (!profile?.id) {
    return <Loading />;
  }

  const { data: postsLiked } = useGetAllPostsLikedByUser(profile?.id);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mis Posts Favoritos</Text>
      <FlatList
        data={postsLiked}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <PostCard post={item.post} showUser={true} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 22 }}
        ListEmptyComponent={() => (
          <Text style={styles.textEmptyComponent}>
            Aún no tienes ningun Post como Favorito.
          </Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  textEmptyComponent: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "RobotoBold",
    color: Colors.text,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "RobotoBold",
    color: Colors.text,
    paddingVertical: 18,
  },
});
