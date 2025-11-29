import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { CaretLeft } from "phosphor-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LucaHeader({ navigation, route, options, back }) {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const title = options.title || route.name;

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: insets.top,
                    backgroundColor: colors.white, // Clean white header
                    height: 60 + insets.top,
                },
            ]}
        >
            <View style={styles.content}>
                {back ? (
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        style={styles.backButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <CaretLeft size={24} color={colors.burntInk} weight="bold" />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.placeholder} />
                )}

                <Text style={[styles.title, { color: colors.burntInk }]}>
                    {title}
                </Text>

                {/* Empty view to balance the back button for center alignment */}
                <View style={styles.placeholder} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0", // Subtle separator
        justifyContent: "center",
    },
    content: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    title: {
        fontFamily: "Syne_700Bold",
        fontSize: 20,
        textAlign: "center",
        flex: 1,
    },
    placeholder: {
        width: 40,
    },
});
