import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

function Login() {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "API 주소 넣는곳 ><", 
        { userId, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("로그인 응답 데이터:", response.headers.authorization);

      
      const token = response.headers.authorization;
      await AsyncStorage.setItem("jwt", token); 
      const storedToken = await AsyncStorage.getItem("jwt");

      if (storedToken) {
        Alert.alert("로그인 성공!");
        navigation.navigate("ThirdPage"); 
      } else {
        Alert.alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("로그인 실패 상태 코드:", error.response?.status);
      console.error("에러 메시지:", error.response?.data || error.message);
      Alert.alert(
        error.response?.data?.errorMessage ||
          "아이디 또는 비밀번호가 잘못되었습니다."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={userId}
        onChangeText={(text) => setUserId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="패스워드"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true} // 비밀번호 숨김
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc8e3a6",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "white",
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
