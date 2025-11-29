import { View, Text, StyleSheet, ScrollView } from "react-native";
import { theme } from "../styles/theme";
import { CrumpledCard } from "../components/ui/CrumpledCard";
import { Receipt, PencilSimple, Trash } from "phosphor-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useRoute } from "@react-navigation/native";
import { useGroups } from "../context/GroupContext";

export default function ActivityLogScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const { groupId } = route.params || {};
  const { getGroup } = useGroups();
  const group = getGroup(groupId);

  const formatRelativeTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 172800) return "Yesterday";
    return date.toLocaleDateString();
  };

  const generateActivities = () => {
    if (!group) return [];
    const activities = [];

    // 1. Group Created
    activities.push({
      id: `create-${group.id}`,
      type: "create",
      text: `Group '${group.name}' created`,
      time: group.createdAt,
      timestamp: new Date(group.createdAt).getTime(),
    });

    // 2. Members Added
    if (group.members) {
      group.members.forEach((member) => {
        if (member.addedAt) {
          activities.push({
            id: `member-${member.id}`,
            type: "member",
            text: `${member.name} joined the chaos`,
            time: member.addedAt,
            timestamp: new Date(member.addedAt).getTime(),
          });
        }
      });
    }

    // Helper to get member name
    const getMemberName = (id) => {
      const member = group.members.find((m) => m.id === id);
      return member ? member.name : "A Mystery Guest"; // Creative fallback
    };

    // 3. Expenses & Payments
    if (group.expenses) {
      group.expenses.forEach((expense) => {
        const payerName = getMemberName(expense.payer);
        const receiverName = expense.sharedMembers && expense.sharedMembers.length > 0
          ? getMemberName(expense.sharedMembers[0])
          : "Everyone";

        activities.push({
          id: `expense-${expense.id}`,
          type: expense.isPayment ? "payment" : "add",
          text: expense.isPayment
            ? `${payerName} paid ${receiverName}`
            : `${payerName} added '${expense.title}'`,
          amount: `₹${parseFloat(expense.amount).toFixed(0)}`,
          time: expense.createdAt,
          timestamp: new Date(expense.createdAt).getTime(),
        });

        // If updated (we'd need history for this, skipping for now as context doesn't track history deeply)
      });
    }

    // 4. Group Settled
    if (group.isSettled && group.settledAt) {
      activities.push({
        id: `settle-${group.id}`,
        type: "settle",
        text: "Trip settled & archived",
        time: group.settledAt,
        timestamp: new Date(group.settledAt).getTime(),
      });
    }

    return activities.sort((a, b) => b.timestamp - a.timestamp);
  };

  const activities = generateActivities();

  const getIcon = (type) => {
    switch (type) {
      case "add":
        return <Receipt size={24} color="#2196F3" weight="fill" />; // Blue
      case "payment":
        return <Receipt size={24} color="#4CAF50" weight="fill" />; // Green
      case "member":
        return <PencilSimple size={24} color="#FF9800" weight="fill" />; // Orange (using Pencil for now as member icon)
      case "create":
        return <PencilSimple size={24} color="#9C27B0" weight="fill" />; // Purple
      case "settle":
        return <Trash size={24} color="#4CAF50" weight="fill" />; // Green check/trash
      case "edit":
        return <PencilSimple size={24} color="#2196F3" weight="fill" />; // Blue
      case "delete":
        return <Trash size={24} color="#757575" weight="fill" />; // Gray
      default:
        return <Receipt size={24} color={theme.colors.burntInk} />;
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Recent Chaos</Text>
        <Text style={styles.subtitle}>Who did what?</Text>

        <View style={styles.list}>
          {activities.map((activity) => (
            <CrumpledCard key={activity.id} style={styles.card}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor:
                      activity.type === "add"
                        ? "#E3F2FD"
                        : activity.type === "payment"
                          ? "#E8F5E9"
                          : activity.type === "member"
                            ? "#FFF3E0"
                            : activity.type === "create"
                              ? "#F3E5F5"
                              : "#FFEBEE",
                  },
                ]}
              >
                {getIcon(activity.type)}
              </View>
              <View style={styles.content}>
                <Text style={styles.activityText}>{activity.text}</Text>
                <Text style={styles.timeText}>{formatRelativeTime(activity.time)}</Text>
              </View>
              {activity.amount && (
                <Text style={styles.amountText}>{activity.amount}</Text>
              )}
            </CrumpledCard>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.oldReceipt,
  },
  scrollContent: {
    padding: theme.spacing.homePadding,
    paddingBottom: 40,
  },
  title: {
    ...theme.typography.display,
    color: theme.colors.burntInk,
    marginBottom: 4,
    marginTop: 12,
    fontSize: 32,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.warmAsh,
    marginBottom: 32,
    fontSize: 16,
  },
  list: {
    gap: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: theme.colors.white,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 0, // Clean look
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  activityText: {
    ...theme.typography.body,
    color: theme.colors.burntInk,
    fontSize: 16,
    fontFamily: "Syne_600SemiBold",
    marginBottom: 4,
  },
  timeText: {
    ...theme.typography.caption,
    color: theme.colors.warmAsh,
    fontSize: 13,
  },
  amountText: {
    ...theme.typography.title2,
    fontSize: 18,
    color: theme.colors.burntInk,
    fontFamily: "Syne_700Bold",
  },
});
