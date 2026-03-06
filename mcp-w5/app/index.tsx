import { View, ScrollView } from "react-native";
import { Link, Stack } from "expo-router";

export default function App() {
  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Link href="/home">Go to Home</Link>
      </View>
    </>
  );
}