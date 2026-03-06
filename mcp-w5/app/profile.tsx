import { Link, useLocalSearchParams } from "expo-router";
import { Button, Text, View } from "react-native";

export default function home() {
    const { userName } = useLocalSearchParams<{ userName: string }>();
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>{userName}&apos; s profile</Text>
            <Link href="/home" push asChild>
                <Button
                    title="Go to home screen"
                />
            </Link>
        </View>
    )
}