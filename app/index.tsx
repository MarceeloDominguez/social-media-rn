import { View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAuthenticated(false);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "orange",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator color="red" size={30} />
      </View>
    );
  }

  //Redirige según el estado de autenticación
  return isAuthenticated ? (
    <Redirect href="/(main)" />
  ) : (
    <Redirect href="/(auth)/sign-in" />
  );
}
