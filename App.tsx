import React, { useEffect } from "react";
import AppLoading from "expo-app-loading";

import * as Notification from "expo-notifications";

import Routes from "./src/routes";

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import { PlantProps } from "./src/libs/storage";

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  useEffect(() => {
    //    const subscription = Notification.addNotificationReceivedListener(
    //    async (notification) => {
    //    const data = notification.request.content.data.plant as PlantProps;
    //  console.log(data);
    //}
    //);
    // return () => subscription.remove();
    /* async function notifactions() {
      await Notification.cancelAllScheduledNotificationsAsync();
      const data = await Notification.getAllScheduledNotificationsAsync();
      console.log(data);
    }
    notifactions();*/
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <Routes />;
}
