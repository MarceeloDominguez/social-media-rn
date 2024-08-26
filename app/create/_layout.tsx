import React from "react";
import { Stack } from "expo-router";

export default function CreateStack() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Crear post",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: "RobotoBold" },
        }}
      />
    </Stack>
  );
}
