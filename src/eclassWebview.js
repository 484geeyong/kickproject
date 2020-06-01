import * as React from 'react';
import { WebView } from 'react-native-webview';

export default class App extends React.Component {
  render() {
    return <WebView source={{ uri: 'http://eclass2.hufs.ac.kr:8181/ilos/m/main/login_form.acl' }} style={{ marginTop: 0 }} />;
   

  }
}