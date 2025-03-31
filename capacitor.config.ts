import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.story.musicip',
  appName: 'MusicIP',
  webDir: "out", // ✅ Correct for Next.js
  // Change 'public' to 'build'
};

export default config;
