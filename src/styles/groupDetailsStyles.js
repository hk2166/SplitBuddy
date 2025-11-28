import { StyleSheet } from "react-native";
import { colors, spacing, fontSize } from "./commonStyles";

export const groupDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.white,
    padding: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tripName: {
    fontSize: fontSize.xxl,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  tripDescription: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  tripTotal: {
    fontSize: fontSize.xl,
    fontWeight: "600",
    color: colors.primary,
  },
  section: {
    backgroundColor: colors.white,
    padding: spacing.xl,
    marginTop: spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.text,
  },
  addMemberButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  addMemberButtonText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: "600",
  },
  membersList: {
    gap: spacing.md,
  },
  memberCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    padding: spacing.md,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  memberInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  memberInitial: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: "bold",
  },
  memberDetails: {
    flex: 1,
  },
  memberName: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: "500",
    marginBottom: 4,
  },
  balanceInfo: {
    marginTop: 2,
  },
  balanceLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  balanceValue: {
    fontWeight: "600",
    color: colors.text,
  },
  balancePositive: {
    fontSize: 13,
    color: "#10B981",
    fontWeight: "600",
  },
  balanceNegative: {
    fontSize: 13,
    color: "#EF4444",
    fontWeight: "600",
  },
  balanceSettled: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  memberActions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  editButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editButtonText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: "500",
  },
  deleteButton: {
    backgroundColor: colors.danger,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textLight,
    textAlign: "center",
    paddingVertical: spacing.xl,
  },
  expensesList: {
    gap: spacing.md,
  },
  expenseCard: {
    backgroundColor: colors.cardBackground,
    padding: spacing.md,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  expenseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  expenseTitle: {
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.text,
    flex: 1,
  },
  expenseAmount: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.primary,
  },
  expensePayer: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  expenseShared: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  actionButton: {
    backgroundColor: colors.cardBackground,
    padding: spacing.lg,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonText: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: "500",
  },
  errorText: {
    fontSize: fontSize.lg,
    color: colors.danger,
    textAlign: "center",
    marginTop: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.xxl,
    width: "85%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: fontSize.xl,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 10,
    padding: spacing.md,
    fontSize: fontSize.md,
    marginBottom: spacing.xl,
    backgroundColor: colors.cardBackground,
  },
  modalButtons: {
    flexDirection: "row",
    gap: spacing.md,
  },
  modalButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    fontWeight: "600",
  },
  confirmButton: {
    backgroundColor: colors.primary,
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: "600",
  },
});
