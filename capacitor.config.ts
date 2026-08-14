import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.Amaar.admin',
  appName: 'Amaar',
  webDir: 'dist',

  server: {
    androidScheme: 'http',
    cleartext: true
  },

  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      launchFadeOutDuration: 300,
      backgroundColor: '#ffffff',
      showSpinner: false
    }
  }
};

export default config;