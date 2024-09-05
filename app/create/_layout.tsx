import React from "react";
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function CreateStack() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: "RobotoBold", fontSize: 18 },
          headerStyle: { backgroundColor: Colors.background },
        }}
      />
    </Stack>
  );
}
