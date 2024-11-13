import React from 'react';
import { WebView } from 'react-native-webview';

const TawkChat = () => {
  const TawkToScript = `
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/671222462480f5b4f58f703c/1iafdbp55';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
    })();
  `;

  return (
    <WebView
      originWhitelist={['*']}
      javaScriptEnabled={true}
      injectedJavaScript={TawkToScript}
      style={{ flex: 1 }}
      source={{ uri: 'https://tawk.to' }}  // Replace with a valid webpage URL
    />
  );
};

export default TawkChat;
