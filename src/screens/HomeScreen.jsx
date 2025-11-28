import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useGroups } from "../context/GroupContext";

export default function HomeScreen({ navigation }) {
  const { groups } = useGroups();

  const activeGroups = groups.filter((g) => g.totalExpenses > 0).slice(0, 3);
  const totalBalance = groups.reduce((sum, g) => sum + g.totalExpenses, 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Welcome back!</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{groups.length}</Text>
          <Text style={styles.statLabel}>Total Groups</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>${totalBalance.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Total Expenses</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {groups.length > 0 && (
            <TouchableOpacity onPress={() => navigation.navigate("GroupsTab")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          )}
        </View>

        {activeGroups.length > 0 ? (
          activeGroups.map((group) => (
            <TouchableOpacity
              key={group.id}
              style={styles.activityCard}
              onPress={() =>
                navigation.navigate("GroupsTab", {
                  screen: "GroupDetails",
                  params: { groupId: group.id },
                })
              }
            >
              <View style={styles.activityInfo}>
                <Text style={styles.activityName}>{group.name}</Text>
                <Text style={styles.activityMembers}>
                  {group.members?.length || 0} members
                </Text>
              </View>
              <Text style={styles.activityAmount}>
                ${group.totalExpenses.toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyActivity}>
            <Text style={styles.emptyIcon}>📊</Text>
            <Text style={styles.emptyText}>No activity yet</Text>
            <Text style={styles.emptySubtext}>
              Create a group and add expenses to see activity
            </Text>
          </View>
        )}
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigation.navigate("GroupsTab", {
              screen: "CreateGroup",
            })
          }
        >
          <Text style={styles.actionIcon}>➕</Text>
          <Text style={styles.actionText}>Create New Group</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("GroupsTab")}
        >
          <Text style={styles.actionIcon}>👥</Text>
          <Text style={styles.actionText}>View All Groups</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007AFF",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
  activityCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  activityMembers: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  activityAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  emptyActivity: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 40,
    alignItems: "center",
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
  },
  quickActions: {
    padding: 16,
    paddingBottom: 32,
  },
  actionButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  actionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
