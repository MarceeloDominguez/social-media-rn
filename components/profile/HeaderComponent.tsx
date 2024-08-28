import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { users } from "@/assets/data/data";

export default function HeaderComponent() {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2023/09/04/17/48/flamingos-8233303_1280.jpg",
          }}
          style={styles.imageHeader}
        />
        <Image source={{ uri: users[0].avatar }} style={styles.avatar} />
      </View>
      <View style={styles.contentInfo}>
        <Text style={styles.name}>Juan Pérez</Text>
        <Text style={styles.location}>Buenos Aires, Argentina</Text>
        <View style={styles.contentStatistics}>
          <View style={styles.containerFollowers}>
            <Text style={styles.textFollowers}>1000 Seguidores</Text>
          </View>
          <View style={styles.lineDivision} />
          <View style={styles.containerFollowers}>
            <Text style={styles.textFollowers}>2000 Siguiendo</Text>
          </View>
        </View>
        <Text style={styles.bio}>
          Aliquip adipisicing excepteur esse ad id ad sint. Ullamco veniam dolor
          ad consequat velit laborum mollit irure est excepteur id officia
          culpa.
        </Text>
        <Text style={styles.titleMyPosts}>Mis Posts (2)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 70,
  },
  imageHeader: {
    width: "auto",
    aspectRatio: 1.7,
  },
  avatar: {
    width: 110,
    height: 110,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    borderRadius: 110 / 2,
    transform: [{ translateY: 57 }],
    borderWidth: 4,
    borderColor: Colors.background,
  },
  name: {
    fontSize: 20,
    fontFamily: "RobotoBold",
    color: Colors.text,
  },
  location: {
    fontFamily: "RobotoMedium",
    color: Colors.icon,
    fontSize: 13,
  },
  contentInfo: {
    top: 60,
    alignItems: "center",
    gap: 4,
  },
  contentStatistics: {
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 20,
  },
  containerFollowers: {
    backgroundColor: "#e1ebe1",
    height: 40,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  textFollowers: {
    fontSize: 13,
    fontFamily: "RobotoBold",
    letterSpacing: 0.3,
  },
  lineDivision: {
    height: 40,
    width: 1,
    backgroundColor: "#ccc",
  },
  bio: {
    paddingHorizontal: 12,
    marginTop: 14,
    fontFamily: "RobotoMedium",
    color: Colors.text,
    fontSize: 13,
    width: "100%",
  },
  titleMyPosts: {
    width: "100%",
    paddingHorizontal: 12,
    marginTop: 14,
    fontFamily: "RobotoBold",
    fontSize: 15,
  },
});
