import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { WebView } from 'react-native-webview';

export default function Menu() {

  function LoadingIndicatorView() {
    return <ActivityIndicator color='#009b88' size='large' />
  }
  return (
     <WebView style={styles.imgBackground} originWhitelist={['*']} source={{ uri: 'http://docs.google.com/gview?embedded=true&url=https://cmps.unizar.es/sites/cmps.unizar.es/files/users/armartin/junio_21_al_27.pdf' }} 
     renderLoading={LoadingIndicatorView}
     startInLoadingState={true}/>
  );
}

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1 ,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

