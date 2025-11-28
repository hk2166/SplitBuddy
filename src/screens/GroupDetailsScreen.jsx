import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { useGroups } from "../context/GroupContext";
import { groupDetailsStyles as styles } from "../styles/groupDetailsStyles";

export default function GroupDetailsScreen({ navigation, route }) {
  const { groupId } = route.params || {};
  const { getGroup, addMember, updateMember, deleteMember } = useGroups();
  const [group, setGroup] = useState(null);

  // Modal states
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [editingMember, setEditingMember] = useState(null);
  const [editMemberName, setEditMemberName] = useState("");

  useEffect(() => {
    if (groupId) {
      const foundGroup = getGroup(groupId);
      setGroup(foundGroup);
    }
  }, [groupId, getGroup]);

  // Refresh group data when modal closes
  const refreshGroup = () => {
    if (groupId) {
      const updatedGroup = getGroup(groupId);
      setGroup(updatedGroup);
    }
  };

  const handleAddMember = () => {
    if (!newMemberName.trim()) {
      Alert.alert("Oops!", "Please enter a member name");
      return;
    }

    const member = addMember(groupId, newMemberName);
    if (member) {
      setNewMemberName("");
      setAddModalVisible(false);
      refreshGroup();
      Alert.alert("Success!", `${member.name} has been added to the trip`);
    }
  };

  const handleEditMember = () => {
    if (!editMemberName.trim()) {
      Alert.alert("Oops!", "Please enter a valid name");
      return;
    }

    const success = updateMember(groupId, editingMember.id, editMemberName);
    if (success) {
      setEditModalVisible(false);
      setEditingMember(null);
      setEditMemberName("");
      refreshGroup();
      Alert.alert("Updated!", "Member name has been updated");
    }
  };

  const handleDeleteMember = (member) => {
    Alert.alert(
      "Remove Member",
      `Are you sure you want to remove ${member.name} from this trip?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            deleteMember(groupId, member.id);
            refreshGroup();
            Alert.alert("Removed", `${member.name} has been removed`);
          },
        },
      ]
    );
  };

  const openEditModal = (member) => {
    setEditingMember(member);
    setEditMemberName(member.name);
    setEditModalVisible(true);
  };

  if (!group) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Trip not found</Text>
      </View>
    );
  }

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
