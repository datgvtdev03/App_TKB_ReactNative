import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import React, { Component } from "react";
import styles from './css/style';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,  //red
      countBlue: 0,  //blue
      time: 120, // Thời gian ban đầu 120 giây (2 phút)
    };
  }


  componentDidMount() {
    // Kết nối đến server WebSocket
    this.socket = new WebSocket("ws://10.10.66.95:3000");
  
    // Nhận thông tin về biến count từ server
    this.socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.team === "RED") {
        // Nếu dữ liệu là từ đội RED, cập nhật trạng thái count của đội RED
        this.setState({ count: data.count });
      } else if (data.team === "BLUE") {
        // Nếu dữ liệu là từ đội BLUE, cập nhật trạng thái count của đội BLUE
        this.setState({ countBlue: data.countBlue });
      }
    };

     // Cập nhật thời gian mỗi giây và gửi lên server
    this.interval = setInterval(() => {
      if (this.state.time > 0) {
        const newTime = this.state.time - 1;
        this.setState({ time: newTime });
        this.socket.send(JSON.stringify({ time: newTime }));
      }
    }, 1000);

    // Nhận thời gian từ server và cập nhật nó
    this.socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.time !== undefined) {
        this.setState({ time: data.time });
      }
    };
  }
  
  componentWillUnmount() {
    // Dừng interval khi component bị unmount
    clearInterval(this.interval);
  }
  

 

  incrementCount() {
    // Tăng biến count và gửi lại lên server
    const newCount = this.state.count + 1;
    this.setState({ count: newCount });
    this.socket.send(JSON.stringify({ count: newCount,  team: "RED" }));
  }


  incrementTwoCount() {
    // Tăng biến count và gửi lại lên server
    const newCount = this.state.count + 2;
    this.setState({ count: newCount });
    this.socket.send(JSON.stringify({ count: newCount, team: "RED" }));
  }
  incrementThreeCount() {
    // Tăng biến count và gửi lại lên server
    const newCount = this.state.count + 3;
    this.setState({ count: newCount });
    this.socket.send(JSON.stringify({ count: newCount, team: "RED" }));
  }
  deIncrementCount() {
    // Giam biến count và gửi lại lên server
    const newCount = this.state.count - 1;
    this.setState({ count: newCount });
    this.socket.send(JSON.stringify({ count: newCount, team: "RED" }));
  }

  resetScore() {
    // Gửi thông điệp "reset" riêng cho đội RED và đội BLUE
    this.socket.send(JSON.stringify({ team: "RED", reset: true, count: 0 }));
    this.socket.send(JSON.stringify({ team: "BLUE", reset: true, countBlue: 0}));
    this.setState({ count: 0, countBlue: 0 });
  }
  

  incrementBlueCount() {
    // Tăng biến count và gửi lại lên server
    const newCount = this.state.countBlue + 1;
    this.setState({ countBlue: newCount });
    this.socket.send(JSON.stringify({ countBlue: newCount, team: "BLUE" }));
  }

  incrementBlueTwoCount() {
    // Tăng biến count và gửi lại lên server
    const newCount = this.state.countBlue + 2;
    this.setState({ countBlue: newCount });
    this.socket.send(JSON.stringify({ countBlue: newCount, team: "BLUE" }));
  }
  incrementBlueThreeCount() {
    // Tăng biến count và gửi lại lên server
    const newCount = this.state.countBlue + 3;
    this.setState({ countBlue: newCount });
    this.socket.send(JSON.stringify({ countBlue: newCount, team: "BLUE" }));
  }
  deIncrementBlueCount() {
    // Giam biến count và gửi lại lên server
    const newCount = this.state.countBlue - 1;
    this.setState({ countBlue: newCount });
    this.socket.send(JSON.stringify({ countBlue: newCount, team: "BLUE"}));
  }



  render() {
    return (
      <View style={styles.container}>
        
        <View style={styles.viewRed}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 22 }}>
          RED
        </Text>

        <TouchableOpacity style={styles.btn} onPress={() => this.incrementCount()}>
          <Text>1 Point</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => this.incrementTwoCount()}>
          <Text>2 Point</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => this.incrementThreeCount()}>
          <Text>3 Point</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => this.deIncrementCount()}>
          <Text>Foul</Text>
        </TouchableOpacity>

        <Text style={{color: 'white'}}>Score RED: {this.state.count}</Text>
      </View>

      <View style={styles.centerView}>
        <Text style={styles.tvTime}>TIME</Text>
        <Text>{this.state.time}</Text>

        <View style={{flexDirection: 'row', width: '100%', alignItems:'center', justifyContent: 'center'}}>

          <TouchableOpacity style={styles.btn} onPress={() => this.incrementCount()}>
            <Text>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => this.incrementTwoCount()}>
            <Text>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => this.incrementThreeCount()}>
            <Text>Reset</Text>
          </TouchableOpacity>

        </View>
       
        <TouchableOpacity style={{padding: 5, backgroundColor: 'white', borderRadius: 5, borderWidth: 1, width: '81%', alignItems: 'center'}} onPress={() => this.resetScore()}>
          <Text>Reset Score</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.viewBlue}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 22 }}>
          BLUE
        </Text>

        <TouchableOpacity style={styles.btn} onPress={() => this.incrementBlueCount()}>
          <Text>1 Point</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => this.incrementBlueTwoCount()}>
          <Text>2 Point</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => this.incrementBlueThreeCount()}>
          <Text>3 Point</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => this.deIncrementBlueCount()}>
          <Text>Foul</Text>
        </TouchableOpacity>

        <Text style={{color: 'white'}}>Score Blue: {this.state.countBlue}</Text>
        
      </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}


