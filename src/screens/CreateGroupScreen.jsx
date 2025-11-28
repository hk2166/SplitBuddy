import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { useGroups } from "../context/GroupContext";
import { createGroupStyles as styles } from "../styles/createGroupStyles";

export default function CreateGroupScreen({ navigation }) {
  const { addGroup } = useGroups();
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([]);
  const [memberName, setMemberName] = useState("");

  const handleAddMember = () => {
    if (memberName.trim()) {
      const newMember = {
        id: Date.now().toString(),
        name: memberName.trim(),
      };
      setMembers([...members, newMember]);
      setMemberName("");
    }
  };

  const handleRemoveMember = (memberId) => {
    setMembers(members.filter((member) => member.id !== memberId));
  };

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      Alert.alert("Error", "Please enter a group name");
      return;
    }

    if (members.length === 0) {
      Alert.alert("Error", "Please add at least one member");
      return;
    }

    const newGroup = addGroup({
      name: groupName.trim(),
      description: description.trim(),
      members: members,
    });

    Alert.alert("Success", "Group created successfully!", [
      {
        text: "OK",
        onPress: () => {
          navigation.navigate("GroupDetails", { groupId: newGroup.id });
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Create New Trip</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Trip Name *</Text>
          <TextInput
            placeholder="e.g., Beach Weekend, Europe Trip"
            style={styles.input}
            value={groupName}
            onChangeText={setGroupName}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description (Optional)</Text>
          <TextInput
            placeholder="Add a description for your trip"
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Members *</Text>
          <View style={styles.addMemberContainer}>
            <TextInput
              placeholder="Enter member name"
              style={styles.memberInput}
              value={memberName}
              onChangeText={setMemberName}
              onSubmitEditing={handleAddMember}
              returnKeyType="done"
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddMember}
            >
              <Text style={styles.addButtonText}>+ Add</Text>
            </TouchableOpacity>
          </View>

          {members.length > 0 && (
            <View style={styles.membersList}>
              {members.map((member) => (
                <View key={member.id} style={styles.memberCard}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveMember(member.id)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.createButton,
            (!groupName.trim() || members.length === 0) &&
              styles.createButtonDisabled,
          ]}
          onPress={handleCreateGroup}
          disabled={!groupName.trim() || members.length === 0}
        >
          <Text style={styles.createButtonText}>Create Trip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
