import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CaretLeft } from "phosphor-react-native";
import { theme } from "../../styles/theme";
import ThemeToggleButton from "../ThemeToggleButton";

export const LucaHeader = ({ navigation, route, options, back }) => {
    const insets = useSafeAreaInsets();
    const title = options.title || route.name;

    return (
        <View
            style={[
                styles.container,
                { paddingTop: insets.top + 10, height: 60 + insets.top },
            ]}
        >
            <View style={styles.leftContainer}>
                {back && (
                    <Pressable onPress={navigation.goBack} style={styles.backButton}>
                        <CaretLeft size={24} color={theme.colors.burntInk} />
                    </Pressable>
                )}
            </View>

            <View style={styles.centerContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.rightContainer}>
                <ThemeToggleButton />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: theme.colors.oldReceipt,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.05)",
        paddingHorizontal: 16,
        paddingBottom: 10,
    },
    leftContainer: {
        flex: 1,
        alignItems: "flex-start",
    },
    centerContainer: {
        flex: 2,
        alignItems: "center",
    },
    rightContainer: {
        flex: 1,
        alignItems: "flex-end",
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    title: {
        ...theme.typography.title2,
        color: theme.colors.burntInk,
        textAlign: "center",
    },
});
