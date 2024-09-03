import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { users } from "@/assets/data/data";
import { Colors } from "@/constants/Colors";

export default function UserLikesCard() {
  const userMock = [...Array(3)].slice(0, 3);
  let username = "Juan Pérez";

  return (
    <View style={styles.container}>
      {userMock.map((item, index) => (
        <Pressable key={index} style={styles.contentAvatars}>
          <Image
            style={[{ zIndex: 4 - index, left: index * 15 }, styles.avatar]}
            source={{ uri: users[0].avatar }}
          />
          {index === userMock.length - 1 && (
            <Text
              style={[
                { left: index === 0 ? 30 : index === 1 ? 45 : 60 },
                styles.name,
              ]}
              numberOfLines={1}
            >
              {username.slice(0, 20)} y ...ver más
            </Text>
          )}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  contentAvatars: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 20 / 2,
    position: "absolute",
    borderColor: Colors.tint,
  },
  name: {
    fontSize: 13,
    fontFamily: "RobotoMedium",
    color: Colors.text,
  },
});
