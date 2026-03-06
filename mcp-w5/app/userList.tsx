import React, { useMemo, useState } from "react";
import { View, ScrollView } from "react-native";
import styles from "./AppStyles";
import userData from "./data.json";

import {
  Appbar,
  Avatar,
  Card,
  Dialog,
  FAB,
  Portal,
  Searchbar,
  Text,
  Button,
} from "react-native-paper";

type User = {
  name: string;
  email: string;
  photo_url: string;
};
export default function userList() {
   const [users, setUsers] = useState<User[]>(userData as User[]);
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [users, query]);

  const openDetail = (u: User) => {
    setSelectedUser(u);
    setDialogVisible(true);
  };

  const closeDetail = () => {
    setDialogVisible(false);
    setSelectedUser(null);
  };

  const handleAddDummy = () => {
    const newUser: User = {
      name: `New User ${users.length + 1}`,
      email: `new${users.length + 1}@example.com`,
      photo_url: "https://randomuser.me/api/portraits/lego/1.jpg",
    };
    setUsers([newUser, ...users]);
  };

  return (
    <View style={styles.screen}>
      <Appbar.Header>
        <Appbar.Content title="User List" />
      </Appbar.Header>

      <Searchbar
        style={styles.search}
        placeholder="Search name/email..."
        value={query}
        onChangeText={setQuery}
      />

      <FAB
        icon="plus"
        style={{ position: "absolute", right: 16, bottom: 16 }}
        onPress={handleAddDummy}
      />

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={closeDetail}>
          <Dialog.Title>User Detail</Dialog.Title>
          <Dialog.Content>
            {selectedUser ? (
              <>
                <View style={{ alignItems: "center", marginBottom: 12 }}>
                  <Avatar.Image size={80} source={{ uri: selectedUser.photo_url }} />
                </View>
                <Text variant="titleMedium">{selectedUser.name}</Text>
                <Text variant="bodyMedium">{selectedUser.email}</Text>
              </>
            ) : null}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDetail}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};