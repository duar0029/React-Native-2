import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  RefreshControl,
  View,
  StyleSheet,
  Text,
  FlatList,
  Platform,
} from "react-native";
import { FAB } from "@rneui/themed";
import UserAvatar from "react-native-user-avatar";


const UserItem = ({ user }) => {
  return (
    <View style={styles.itemContainer}>
      <UserAvatar
        size={50}
        name={`${user.first_name} ${user.last_name}`}
        src={user.avatar}
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text style={styles.fName}>{user.first_name}</Text>
        <Text style={styles.lName}>{user.last_name}</Text>
      </View>
    </View>
  );
};

export default function App() {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onPressAdd = () => {
    fetchUsers();
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://random-data-api.com/api/users/random_user?size=10"
      );
      const data = await response.json();
      setUsers(data);
      console.log("Fetched data:", data);
    } catch (err) {
      console.log("Error fetching the users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers().finally(() => setRefreshing(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to the User List!</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UserItem user={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <FAB
        placement="right"
        size="large"
        color="black"
        icon={{ name: "add", color: "white" }}
        onPress={onPressAdd}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    paddingTop: 62,
  },

  heading: {
    padding: Platform.OS === "ios" ? 20 : 10,
    textAlign: "center",
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },

  itemContainer: {
    flexDirection: "row",
    justifyContent: Platform.OS === "ios" ? "flex-start" : "flex-end", 
    alignItems: "center", 
    backgroundColor: "pink",
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },

  textContainer: {
    flex: 1,
    marginHorizontal: 15,
    flexDirection: "column",
  },

  fName: {
    fontSize: 14,
  },

  lName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  avatar: {
    marginRight: 12,
  },
});
