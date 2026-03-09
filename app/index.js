// import { View, StyleSheet, StatusBar } from "react-native";
// import { WebView } from "react-native-webview";
// import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

// function AppContent() {
//   const insets = useSafeAreaInsets();

//   return (
//     <View
//       style={[
//         styles.container,
//         {
//           paddingTop: insets.top,
//           paddingBottom: insets.bottom,
//           backgroundColor: "#FFFFFF",
//         },
//       ]}
//     >
//       <StatusBar 
//       barStyle="dark-content"
//       backgroundColor="#FFFFFF"
//       />

//       <WebView
//         source={{ uri: "https://foodtrace.se/" }}
//         pullToRefreshEnabled={true} 
//         startInLoadingState={false}
//         renderLoading={() => null}
//         style={{ flex: 1, backgroundColor: "#FFFFFF" }}
//       />
//     </View>
//   );
// }

// export default function App() {
//   return (
//     <SafeAreaProvider>
//       <AppContent />
//     </SafeAreaProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   },
// });



// import * as NavigationBar from "expo-navigation-bar";
// import React, { useRef, useState, useEffect } from "react";
// import {
//   View,
//   StyleSheet,
//   StatusBar,
//   ScrollView,
//   RefreshControl,
// } from "react-native";
// import { WebView } from "react-native-webview";
// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from "react-native-safe-area-context";


// function AppContent() {
//   const insets = useSafeAreaInsets();
//   const webViewRef = useRef(null);
//   const [refreshing, setRefreshing] = useState(false);

//   const onRefresh = () => {
//     setRefreshing(true);
//     webViewRef.current?.reload();
//     setTimeout(() => setRefreshing(false), 1000);
//   };

//   useEffect(() => {
//   // Hide Android navigation bar
//   NavigationBar.setVisibilityAsync("hidden");

//   // Optional but recommended: allow swipe to show temporarily
//   NavigationBar.setBehaviorAsync("overlay-swipe");
// }, []);

//   return (
//     <View style={{ flex: 1 }}>
//       {/* TOP SAFE AREA (STATUS BAR) */}
//       <View
//         style={{
//           height: insets.top,
//           backgroundColor: "#FFFFFF",
//         }}
//       />

//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

//       {/* MAIN CONTENT */}
//       <View style={{ flex: 1, backgroundColor: "#E8EDF2" }}>
//         <ScrollView
//           contentContainerStyle={{ flex: 1 }}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//         >
//           <WebView
//             ref={webViewRef}
//             source={{ uri: "https://foodtrace.se/" }}
//             style={{ flex: 1, backgroundColor: "#E8EDF2" }}
//           />
//         </ScrollView>
//       </View>

//       {/* BOTTOM SAFE AREA */}
//       <View
//         style={{
//           height: insets.bottom,
//           backgroundColor: "#E8EDF2",
//         }}
//       />
//     </View>
//   );
// }

// export default function App() {
//   return (
//     <SafeAreaProvider>
//       <AppContent />
//     </SafeAreaProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   },
// });











// import * as NavigationBar from "expo-navigation-bar";
// import React, { useRef, useState, useEffect } from "react";
// import {
//   View,
//   StyleSheet,
//   StatusBar,
//   ScrollView,
//   RefreshControl,
// } from "react-native";
// import { WebView } from "react-native-webview";
// import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

// function AppContent() {
//   const insets = useSafeAreaInsets();
//   const webViewRef = useRef(null);
//   const [refreshing, setRefreshing] = useState(false);

//   const onRefresh = () => {
//     setRefreshing(true);
//     webViewRef.current?.reload();
//     setTimeout(() => setRefreshing(false), 1000); // optional delay for UX
//   };

//   useEffect(() => {
//     // Hide Android navigation bar
//     NavigationBar.setVisibilityAsync("hidden");
//     // Optional: allow swipe to show temporarily
//     NavigationBar.setBehaviorAsync("overlay-swipe");
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* TOP SAFE AREA (STATUS BAR) */}
//       <View style={{ height: insets.top, backgroundColor: "#FFFFFF" }} />
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

//       {/* MAIN CONTENT */}
//       <View style={{ flex: 1, backgroundColor: "#E8EDF2" }}>
//         <ScrollView
//           contentContainerStyle={{ flex: 1 }}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//         >
//           <WebView
//             ref={webViewRef}
//             source={{ uri: "https://foodtrace.se/" }}
//             style={{ flex: 1, backgroundColor: "#E8EDF2" }}
//           />
//         </ScrollView>
//       </View>

//       {/* BOTTOM SAFE AREA */}
//       <View style={{ height: insets.bottom, backgroundColor: "#E8EDF2" }} />
//     </View>
//   );
// }

// export default function App() {
//   return (
//     <SafeAreaProvider>
//       <AppContent />
//     </SafeAreaProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   },
// });










import * as NavigationBar from "expo-navigation-bar";
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  RefreshControl,
  Dimensions,
  PanResponder,
  AppState
} from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

const SCREEN_HEIGHT = Dimensions.get("window").height;

function AppContent() {
  const insets = useSafeAreaInsets();
  const webViewRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false);

  // Trigger refresh
  const onRefresh = () => {
    setRefreshing(true);
    webViewRef.current?.reload();
    setTimeout(() => setRefreshing(false), 1000); // optional delay
  };

  // PanResponder to detect touch start
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        // Only allow refresh if starting in top 50% of screen
        if (evt.nativeEvent.pageY <= SCREEN_HEIGHT * 0.3) {
          setCanRefresh(true);
        } else {
          setCanRefresh(false);
        }
        return false; // we don't block scroll
      },
    })
  ).current;

  // useEffect(() => {
  //   NavigationBar.setVisibilityAsync("hidden");
  //   NavigationBar.setBehaviorAsync("overlay-swipe");
  //   NavigationBar.setBackgroundColorAsync("#E8EDF2");
  // }, []);

   // ✅ FIX: re-hide navigation bar reliably
  useEffect(() => {
    const hideNavBar = async () => {
      await NavigationBar.setVisibilityAsync("hidden");
      await NavigationBar.setBackgroundColorAsync("#E8EDF2");
    };

    hideNavBar();

    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        hideNavBar();
      }
    });

    return () => sub.remove();
  }, []);

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={{ height: insets.top, backgroundColor: "#FFFFFF" }} />
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            enabled={canRefresh} // ✅ only enable if started from top
          />
        }
      >
        <WebView
          ref={webViewRef}
          source={{ uri: "https://foodtrace.se/" }}
          style={{ flex: 1, backgroundColor: "#E8EDF2" }}
        />
      </ScrollView>

      <View style={{ height: insets.bottom, backgroundColor: "#E8EDF2" }} />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
