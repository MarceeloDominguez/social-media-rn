import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

export default function ImageDefault() {
  return (
    <Svg style={styles.imagePost} viewBox="0 0 20 20" fill="none">
      <Circle
        cx="13.3334"
        cy="6.66667"
        r="1.66667"
        stroke="#ccc"
        stroke-width="1.5"
      />
      <Path
        d="M1.66675 9.99984C1.66675 6.07147 1.66675 4.10728 2.88714 2.88689C4.10752 1.6665 6.07171 1.6665 10.0001 1.6665C13.9285 1.6665 15.8926 1.6665 17.113 2.88689C18.3334 4.10728 18.3334 6.07147 18.3334 9.99984C18.3334 13.9282 18.3334 15.8924 17.113 17.1128C15.8926 18.3332 13.9285 18.3332 10.0001 18.3332C6.07171 18.3332 4.10752 18.3332 2.88714 17.1128C1.66675 15.8924 1.66675 13.9282 1.66675 9.99984Z"
        stroke="#ccc"
        stroke-width="1.5"
      />
      <Path
        d="M1.66675 10.4169L3.1264 9.13976C3.8858 8.47529 5.03031 8.5134 5.74382 9.22691L9.31859 12.8017C9.89128 13.3744 10.7928 13.4525 11.4554 12.9868L11.7039 12.8121C12.6574 12.142 13.9475 12.2196 14.8138 12.9993L17.5001 15.4169"
        stroke="#ccc"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  imagePost: {
    width: "100%",
    aspectRatio: 1.5,
  },
});
