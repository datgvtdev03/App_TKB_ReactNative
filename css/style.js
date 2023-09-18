import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  btn: {
    width: 100,
    padding: 5,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
  },
  viewRed: {
    flex: 2,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  viewBlue: {
    flex: 2,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  centerView: {
    flex: 1.5, 
    backgroundColor: 'burlywood',
    alignItems: "center",
    justifyContent: "center",
  },
  
  tvTime: {
    fontSize: 20,
    fontWeight: "bold",
  }
});

export default styles;