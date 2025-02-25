import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

const VIDEO_URL_1 =
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const VIDEO_URL_2 =
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';

export default function VideoTest() {
  const firstPlayer = useVideoPlayer(VIDEO_URL_1);
  const secondPlayer = useVideoPlayer(VIDEO_URL_2);
  const [showFirst, setShowFirst] = useState(true);

  const switchVideo = () => {
    setShowFirst(p => {
      if (p) {
        firstPlayer.pause();
        secondPlayer.play();
      } else {
        secondPlayer.pause();
        firstPlayer.play();
      }
      return !p;
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={[
            styles.videoBox1,
            showFirst ? { opacity: 1 } : { opacity: 0 },
          ]}>
          <VideoView
            style={styles.video}
            player={firstPlayer}
            nativeControls={false}
          />
        </View>
        <View
          style={[
            styles.videoBox2,
            showFirst ? { opacity: 0 } : { opacity: 1 },
          ]}>
          <VideoView
            style={styles.video}
            player={secondPlayer}
            nativeControls={false}
          />
        </View>
      </View>
      <Button title="Switch" onPress={switchVideo} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    height: 300,
  },
  videoBox1: {
    position: 'absolute',
    left: 0,
    width: '60%',
    height: '100%',
    backgroundColor: 'green',
  },
  videoBox2: {
    position: 'absolute',
    right: 0,
    width: '60%',
    height: '100%',
    backgroundColor: 'blue',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
