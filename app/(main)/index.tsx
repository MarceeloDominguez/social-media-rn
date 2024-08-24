import { posts } from "@/assets/data/data";
import { Colors } from "@/constants/Colors";
import { StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PostCard from "@/components/PostCard";
import EmptyState from "@/components/EmptyState";

export default function HomeScreen() {
  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList
        data={posts}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item }) => <PostCard post={item} />}
        ListEmptyComponent={() => <EmptyState />}
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
    padding: 12,
    gap: 20,
  },
});
