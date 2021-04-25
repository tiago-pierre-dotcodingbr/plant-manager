import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert,
} from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Button } from "../components/Button";

export function UserIdentification() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>("");

  const navigation = useNavigation();

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setName(value);
  }

  async function handleSubmit() {
    if (!name) {
      Alert.alert(
        "Como podemos chamar você 😥?",
        "Informe o seu primeiro nome para continuar."
      );
    } else {
      try {
        await AsyncStorage.setItem("@plantmanager:user", name);
        navigation.navigate("Confirmation", {
          title: "Protinho!",
          subtitle:
            "Agora vamos começar a cuidar das suas platinhas com muito cuidado.",
          buttonTitle: "Começar",
          icon: "smile",
          nextScreen: "PlantSelect",
        });
      } catch {
        Alert.alert(
          "Algo deu errado! 😥",
          "Não foi possível salvar o seu nome."
        );
      }
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <View style={styles.form}>
            <>
              <Text style={styles.emoji}>{isFilled ? "😄" : "😃"}</Text>
              <Text style={styles.title}>Como podemos {"\n"} chamar você?</Text>
              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green },
                ]}
                placeholder="Digite seu nome"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChangeText={handleInputChange}
              />
            </>
            <View style={styles.footer}>
              <Button onPress={handleSubmit} title="Confirmar" />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: StatusBar.currentHeight,
  },
  content: {
    flex: 1,
    width: "100%",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 54,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20,
  },
  emoji: {
    fontSize: 44,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: "100%",
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: "center",
  },
  footer: {
    marginTop: 40,
    width: "100%",
    paddingHorizontal: 20,
  },
});
