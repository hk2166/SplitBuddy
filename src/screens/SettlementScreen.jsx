import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useGroups } from "../context/GroupContext";
import { useTheme } from "../context/ThemeContext";
import {
  calculateBalances,
  calculateSettlements,
  getMemberSummary,
} from "../utils/settlementCalculations";

export default function SettlementScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { getGroup, settleGroup, addPayment, removePayment } = useGroups();
  const { groupId } = route.params || {};
  const group = getGroup(groupId);

  if (!group) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>
          Group not found
        </Text>
      </View>
    );
  }

  const { members, expenses, isSettled, payments = [] } = group;

  const balances = calculateBalances(expenses, members, payments);
  const settlements = calculateSettlements(balances, members);

  const getMemberName = (memberId) => {
    const member = members.find((m) => m.id === memberId);
    return member ? member.name : "Unknown";
  };

  const handleMarkPaid = (settlement) => {
    Alert.alert(
      "Mark as Paid",
      `Confirm that ${getMemberName(
        settlement.from
      )} paid ₹${settlement.amount.toFixed(2)} to ${getMemberName(
        settlement.to
      )}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Mark Paid",
          onPress: () => {
            addPayment(groupId, {
              from: settlement.from,
              to: settlement.to,
              amount: settlement.amount,
            });
            Alert.alert("Success", "Payment marked as complete!");
          },
        },
      ]
    );
  };

  const handleSettleTrip = () => {
    Alert.alert(
      "Settle Trip",
      "This will mark all suggested payments as paid and archive the trip.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Settle",
          style: "destructive",
          onPress: () => {
            settlements.forEach((settlement) => {
              addPayment(groupId, {
                from: settlement.from,
                to: settlement.to,
                amount: settlement.amount,
              });
            });

            settleGroup(groupId);
            Alert.alert("Success", "Trip settled successfully!", [
              {
                text: "OK",
                onPress: () => navigation.goBack(),
              },
            ]);
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        Settlement Summary
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        for {group.name}
      </Text>

      {isSettled && (
        <View
          style={[styles.settledBadge, { backgroundColor: colors.success }]}
        >
          <Text style={styles.settledText}>✓ Trip Settled</Text>
        </View>
      )}

      {/* Member Balances */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Member Balances
        </Text>

        {members.map((member) => {
          const summary = getMemberSummary(expenses, member.id, payments);
          const balance = balances[member.id] || 0;

          return (
            <View
              key={member.id}
              style={[
                styles.memberCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View style={styles.memberHeader}>
                <Text style={[styles.memberName, { color: colors.text }]}>
                  {member.name}
                </Text>
                <Text
                  style={[
                    styles.netBalance,
                    {
                      color:
                        balance > 0.01
                          ? colors.success
                          : balance < -0.01
                          ? colors.error
                          : colors.textSecondary,
                    },
                  ]}
                >
                  {balance > 0.01
                    ? `+₹${balance.toFixed(2)}`
                    : balance < -0.01
                    ? `-₹${Math.abs(balance).toFixed(2)}`
                    : "₹0.00"}
                </Text>
              </View>

              <View style={styles.memberDetails}>
                <View style={styles.detailRow}>
                  <Text
                    style={[
                      styles.detailLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Total Paid:
                  </Text>
                  <Text style={[styles.detailValue, { color: colors.text }]}>
                    ₹{summary.totalPaid.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text
                    style={[
                      styles.detailLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Total Owed:
                  </Text>
                  <Text style={[styles.detailValue, { color: colors.text }]}>
                    ₹{summary.totalOwed.toFixed(2)}
                  </Text>
                </View>
              </View>

              {balance > 0.01 && (
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: colors.success + "20" },
                  ]}
                >
                  <Text style={[styles.statusText, { color: colors.success }]}>
                    Should Receive ₹{balance.toFixed(2)}
                  </Text>
                </View>
              )}
              {balance < -0.01 && (
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: colors.error + "20" },
                  ]}
                >
                  <Text style={[styles.statusText, { color: colors.error }]}>
                    Owes ₹{Math.abs(balance).toFixed(2)}
                  </Text>
                </View>
              )}
              {Math.abs(balance) <= 0.01 && (
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: colors.borderLight },
                  ]}
                >
                  <Text
                    style={[styles.statusText, { color: colors.textSecondary }]}
                  >
                    All Settled
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Settlement Suggestions */}
      {settlements.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Suggested Payments
          </Text>
          <Text
            style={[styles.sectionSubtitle, { color: colors.textSecondary }]}
          >
            Minimal transfers to settle all balances
          </Text>

          {settlements.map((settlement, index) => (
            <View
              key={index}
              style={[
                styles.settlementCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View style={styles.settlementContent}>
                <View style={styles.settlementRow}>
                  <Text style={[styles.fromText, { color: colors.text }]}>
                    {getMemberName(settlement.from)}
                  </Text>
                  <Text style={[styles.arrow, { color: colors.textTertiary }]}>
                    →
                  </Text>
                  <Text style={[styles.toText, { color: colors.text }]}>
                    {getMemberName(settlement.to)}
                  </Text>
                </View>
                <Text style={[styles.amountText, { color: colors.primary }]}>
                  ₹{settlement.amount.toFixed(2)}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.markPaidButton,
                    { backgroundColor: colors.success },
                  ]}
                  onPress={() => handleMarkPaid(settlement)}
                >
                  <Text style={styles.markPaidText}>✓ Mark as Paid</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <View
            style={[
              styles.infoBox,
              { backgroundColor: colors.info + "20", borderColor: colors.info },
            ]}
          >
            <Text style={[styles.infoText, { color: colors.info }]}>
              💡 Only {settlements.length} payment
              {settlements.length > 1 ? "s" : ""} needed to settle everything!
            </Text>
          </View>
        </View>
      )}

      {settlements.length === 0 && expenses.length > 0 && (
        <View
          style={[
            styles.infoBox,
            {
              backgroundColor: colors.success + "20",
              borderColor: colors.success,
            },
          ]}
        >
          <Text style={[styles.infoText, { color: colors.success }]}>
            ✓ All balances are settled!
          </Text>
        </View>
      )}

      {expenses.length === 0 && (
        <View style={[styles.emptyState, { backgroundColor: colors.card }]}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No expenses added yet
          </Text>
        </View>
      )}

      {!isSettled && expenses.length > 0 && (
        <TouchableOpacity
          style={[styles.settleButton, { backgroundColor: colors.primary }]}
          onPress={handleSettleTrip}
        >
          <Text style={[styles.settleButtonText, { color: colors.buttonText }]}>
            Settle Trip & Archive
          </Text>
        </TouchableOpacity>
      )}

      {isSettled && (
        <View
          style={[
            styles.settledInfo,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text
            style={[styles.settledInfoText, { color: colors.textSecondary }]}
          >
            This trip has been settled and archived.
          </Text>
          <Text
            style={[styles.settledInfoText, { color: colors.textSecondary }]}
          >
            Settled on: {new Date(group.settledAt).toLocaleDateString()}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  settledBadge: {
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  settledText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  memberCard: {
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 2,
  },
  memberHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  memberName: {
    fontSize: 18,
    fontWeight: "700",
  },
  netBalance: {
    fontSize: 20,
    fontWeight: "800",
  },
  memberDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  statusBadge: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "700",
  },
  settlementCard: {
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 2,
  },
  settlementContent: {
    gap: 12,
  },
  settlementRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fromText: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  arrow: {
    fontSize: 20,
    marginHorizontal: 12,
  },
  toText: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
  },
  amountText: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
  },
  markPaidButton: {
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  markPaidText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  infoBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginTop: 12,
  },
  infoText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  emptyState: {
    padding: 40,
    borderRadius: 14,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
  },
  settleButton: {
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  settleButtonText: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  settledInfo: {
    padding: 20,
    borderRadius: 14,
    borderWidth: 2,
    marginTop: 16,
    alignItems: "center",
  },
  settledInfoText: {
    fontSize: 14,
    marginBottom: 4,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
});
