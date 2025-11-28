import { View, Text, Button, StyleSheet } from "react-native";

export default function GroupDetailsScreen({ navigation, route }) {
  const { groupId } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Group Details</Text>

      <Button
        title="Add Expense"
        onPress={() => navigation.navigate("AddExpense", { groupId })}
      />

      <Button
        title="Settlement Summary"
        onPress={() => navigation.navigate("Settlement")}
      />

      <Button
        title="Activity Log"
        onPress={() => navigation.navigate("ActivityLog")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 }
});
