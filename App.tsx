import "./global";
// import "@ethersproject/shims"

import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { RootSiblingParent } from 'react-native-root-siblings';
import { StyleSheet, View, Platform } from "react-native";
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { WalletConnectExperience } from "./components/wallet-connect-experience";

const SCHEME_FROM_APP_JSON = "crypto-interview";

export default function App() {
  return (
    <RootSiblingParent>
      <WalletConnectProvider
        redirectUrl={
          Platform.OS === "web"
            ? ''
            : `${SCHEME_FROM_APP_JSON}://`
        }
        storageOptions={{
          //@ts-ignore
          asyncStorage: AsyncStorage,
        }}
      >
        <View style={styles.container}>
          <WalletConnectExperience />
          <StatusBar style="auto" />
        </View>
      </WalletConnectProvider>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});