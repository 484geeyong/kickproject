import * as React from 'react';
import { WebView } from 'react-native-webview';

export default class App extends React.Component {
  render() {
    return <WebView source={{ uri: 'https://lib.hufs.ac.kr/global/#/smuf/seat/status?bg=2' }} style={{ marginTop: 1 }} />;
   
    //https://lib.hufs.ac.kr/global/#/smuf/seat/status?bg=2
  }
}