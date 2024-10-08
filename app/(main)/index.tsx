import { Colors } from "@/constants/Colors";
import { StyleSheet, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PostCard from "@/components/PostCard";
import EmptyState from "@/components/EmptyState";
import HeaderComponent from "@/components/home/HeaderComponent";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useGetAllPosts } from "@/api/post";
import Loading from "@/components/Loading";

export default function HomeScreen() {
  const { data: posts, isLoading } = useGetAllPosts();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <Link href={"/create" as `${string}:${string}`} asChild>
        <Pressable style={styles.containerIconAdd}>
          <Ionicons name="add-outline" size={28} color="#fff" />
        </Pressable>
      </Link>
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={posts}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item }) => <PostCard post={item} />}
        ListEmptyComponent={() => <EmptyState />}
        ListHeaderComponent={() => <HeaderComponent />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainerStyle: {
    gap: 10,
    paddingBottom: 50,
  },
  containerIconAdd: {
    backgroundColor: Colors.text,
    width: 50,
    height: 50,
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 2,
    borderRadius: 50 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
