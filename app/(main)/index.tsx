import { posts } from "@/assets/data/data";
import { Colors } from "@/constants/Colors";
import { StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PostCard from "@/components/PostCard";
import EmptyState from "@/components/EmptyState";
import HeaderComponent from "@/components/home/HeaderComponent";

export default function HomeScreen() {
  return (
    <SafeAreaView style={[styles.container]}>
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
  },
});
