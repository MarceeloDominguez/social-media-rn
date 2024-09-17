import { View, Pressable, StyleSheet } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Link, router } from "expo-router";
import { useGetProfileById } from "@/api/profile";
import { useAuth } from "@/provider/AuthProvider";

type HeaderAnimatedProps = {
  scrollY: SharedValue<number>;
  id: string;
};

export default function HeaderAnimated({ scrollY, id }: HeaderAnimatedProps) {
  const { data: user } = useGetProfileById(id);
  const { profile } = useAuth();

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
    <View>
      <Animated.View style={[animatedHeaderStyle, styles.wrapperIconBack]}>
        <Pressable onPress={() => router.back()} style={styles.containerIcon}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </Pressable>
        <Animated.Text style={[animatedTextStyle, styles.username]}>
          {user?.username}
        </Animated.Text>
        {profile?.id === user?.id ? (
          <Link
            href={`/profile/edit?id=${user?.id}` as `${string}:${string}`}
            asChild
          >
            <Pressable style={styles.containerIcon}>
              <Feather name="edit" size={22} color={Colors.text} />
            </Pressable>
          </Link>
        ) : (
          <View style={{ width: 40, height: 40 }} />
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
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
