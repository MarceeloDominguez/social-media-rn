import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default function ProfileScreen() {
  const { id } = useLocalSearchParams();
  const scrollY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollY.value,
      [0, 100],
      ["transparent", "#F5F5F5"]
    );

    return { backgroundColor };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <Animated.View style={[animatedStyle, styles.wrapperIconBack]}>
          <Pressable onPress={() => router.back()} style={styles.containerIcon}>
            <Ionicons name="arrow-back" size={22} color={Colors.text} />
          </Pressable>
        </Animated.View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        onScroll={(e) => {
          scrollY.value = e.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
      >
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2023/09/04/17/48/flamingos-8233303_1280.jpg",
          }}
          style={{ width: "auto", aspectRatio: 1.5 }}
        />
      </ScrollView>
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
    height: 80,
    paddingHorizontal: 12,
    justifyContent: "center",
    position: "absolute",
    right: 0,
    left: 0,
    zIndex: 1,
    bottom: 0,
    top: 0,
  },
  containerIcon: {
    backgroundColor: "rgba(245, 245, 245, 0.6)",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40 / 2,
  },
});
