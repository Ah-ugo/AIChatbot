import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Response from "@/components/response";
import Message from "@/components/message";
// import { Center, VStack } from "@gluestack-ui/themed";
import LottieView from "lottie-react-native";
import { VStack } from "@/components/ui/vstack";
import { Center } from "@/components/ui/center";

export default function AppMain() {
  const [inputText, setInputText] = useState<string>(""); // inputText is a string
  const [listData, setListData] = useState<string[]>([]); // listData is an array of strings

  const SearchInput = () => {
    setListData((prevList) => [...prevList, inputText]); // Add inputText to the list
    setInputText(""); // Clear the inputText after adding
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/Icons/robot.png")}
          style={styles.icon}
        />
        <Text style={{ fontSize: 24, fontWeight: "800", color: "#323232" }}>
          Johnson
        </Text>
      </View>

      {/* Content */}
      {listData.length > 0 ? (
        <FlatList
          style={{ paddingHorizontal: 16, marginBottom: 80 }}
          data={listData}
          renderItem={({ item }) => (
            <View>
              <Message message={item} />
              <Response prompt={item} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <VStack>
          <Center className="justify-center items-center">
            <LottieView
              autoPlay
              // ref={animation}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#eee",
              }}
              // Find more Lottie files at https://lottiefiles.com/featured
              source={require("@/assets/Animation - 1728394971772.json")}
            />
          </Center>
        </VStack>
      )}

      {/* Search-Bar */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Ask Johnson"
          style={styles.input}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          selectionColor={"#323232"}
        ></TextInput>
        <TouchableOpacity onPress={SearchInput}>
          <Image
            source={require("@/assets/Icons/right-arrow.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    paddingTop: 36,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    margin: 8,
    gap: 8,
  },
  icon: {
    width: 32,
    height: 32,
  },
  searchBar: {
    backgroundColor: "#ffffff",
    width: "100%",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    gap: 8,
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 32,
    borderWidth: 0.1,
  },
});
