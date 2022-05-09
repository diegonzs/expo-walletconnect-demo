import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { ethers } from "ethers";
import Toast from "react-native-root-toast";
import { Button } from "../button";

export const WalletConnectExperience = () => {
  const connector = useWalletConnect();
  
  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  const signMessage = React.useCallback(async () => {
    try {
      const rawMessage = "Hello World";
      const rawMessageLength = new Blob([rawMessage]).size
      const message = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(`\x19Ethereum Signed Message:\n${rawMessageLength}${rawMessage}`))
      const signature = await connector.signMessage([connector.accounts[0], message])
      const verified = ethers.utils.verifyMessage(rawMessage, signature)
      const toastMessage = verified.toLowerCase() === connector.accounts[0] ? 'Sucess signing the message' : 'Failed signing the message'
      Toast.show(toastMessage, {
        duration: Toast.durations.LONG,
      });
    } catch (error) {
      console.log(error)
      Toast.show((error as Error).message, {
        duration: Toast.durations.LONG,
      });
    }
  }, [connector])

  return (
    <>
      {!connector.connected ? (
        <Button onPress={connectWallet} testID="connect-button" label="Connect a wallet" />
      ) : (
        <View style={styles.container}>
          <Text testID="address" style={styles.address}>
            {connector.accounts[0]}
          </Text>
          <Button
            testID="sign-button"
            onPress={signMessage}
            label="Sign random string"
          />
          <Button
            onPress={killSession}
            testID="log-out-button"
            label="Log out"
          />
        </View>
      )}
    </>
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
});