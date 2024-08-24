import {
  Text,
  Animated,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextLayoutEventData,
  StyleSheet,
} from "react-native";
import React, { useRef, useState } from "react";
import { Colors } from "@/constants/Colors";

export default function PostDescription() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [totalLines, setTotalLines] = useState(0);

  const LINE_HEIGHT = 20;

  const animation = useRef(new Animated.Value(0)).current;

  const handleToggleExpand = () => {
    Animated.timing(animation, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsExpanded(!isExpanded);
  };

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2 * LINE_HEIGHT, totalLines * LINE_HEIGHT], // Ajusta la altura según el número de líneas
  });

  const handleTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    const lines = e.nativeEvent.lines.length;
    setTotalLines(lines);
    setShowMoreButton(lines > 2);
  };

  return (
    <>
      <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
        <Text
          numberOfLines={isExpanded ? undefined : 2}
          onTextLayout={handleTextLayout}
          style={styles.text}
        >
          Esse veniam id proident ea sit do.Pariatur esse aute minim eiusmod ea
          velit non id nulla culpa in labore ex pariatur. nulla culpa in labore
          ex pariatur.
        </Text>
      </Animated.View>
      {showMoreButton && (
        <TouchableOpacity onPress={handleToggleExpand} activeOpacity={1}>
          <Text style={styles.buttonShowMore}>
            {isExpanded ? "Ver menos" : "Ver más"}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.text,
  },
  buttonShowMore: {
    color: Colors.tint,
    marginTop: 5,
    fontFamily: "RobotoBold",
    fontSize: 12,
  },
});
