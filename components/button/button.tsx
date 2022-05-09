import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export const Button = ({ onPress, label, testID }: { onPress: () => void, label: string, testID?: string }) => {
  return (
    <TouchableOpacity testID={testID} onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  address: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: "#5A45FF",
    color: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    margin: 10,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: 'center',
  },
});