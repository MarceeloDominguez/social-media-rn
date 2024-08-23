import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function UserLikesCard() {
  const userMock = [...Array(3)].slice(0, 3);

  return (
    <View style={styles.container}>
      {userMock.map((item, index) => (
        <View key={index} style={styles.contentAvatars}>
          <View
            style={[{ zIndex: 4 - index, left: index * 15 }, styles.avatar]}
          />
          {index === userMock.length - 1 && (
            <Text
              style={[
                { left: index === 0 ? 30 : index === 1 ? 45 : 60 },
                styles.name,
              ]}
            >
              User name y ...ver más
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentAvatars: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 20,
    height: 20,
    backgroundColor: "red",
    borderWidth: 1,
    borderRadius: 20 / 2,
    position: "absolute",
  },
  name: {
    fontSize: 13,
  },
});
