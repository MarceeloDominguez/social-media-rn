import { View, StyleSheet, Pressable, FlatList } from "react-native";
import React from "react";
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
import { posts, users } from "@/assets/data/data";
import PostCard from "@/components/PostCard";
import HeaderComponent from "@/components/profile/HeaderComponent";
import Feather from "@expo/vector-icons/Feather";

export default function ProfileScreen() {
  const { id } = useLocalSearchParams();
  const scrollY = useSharedValue(0);

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

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <Animated.View style={[animatedHeaderStyle, styles.wrapperIconBack]}>
          <Pressable onPress={() => router.back()} style={styles.containerIcon}>
            <Ionicons name="arrow-back" size={22} color={Colors.text} />
          </Pressable>
          <Animated.Text style={[animatedTextStyle, styles.username]}>
            {users[0].username}
          </Animated.Text>
          <Pressable style={styles.containerIcon}>
            <Feather name="edit" size={22} color={Colors.text} />
          </Pressable>
        </Animated.View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(_, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          scrollY.value = e.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
        ListHeaderComponent={() => <HeaderComponent />}
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
