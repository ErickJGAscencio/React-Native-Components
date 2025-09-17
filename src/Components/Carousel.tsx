import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Image,
} from 'react-native';

interface CarouselProps {
  imagesRoutes: string[];
  autoScroll?: boolean;
  scrollInterval?: number;
}

const { width } = Dimensions.get('window');

function Carousel({ imagesRoutes, autoScroll = false, scrollInterval = 3000 }: CarouselProps) {
  const scrollRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fade-in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (!autoScroll || imagesRoutes.length <= 1) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % imagesRoutes.length;
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setCurrentIndex(nextIndex);
    }, scrollInterval);

    return () => clearInterval(interval);
  }, [currentIndex, autoScroll]);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {imagesRoutes.map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              style={styles.image}
            />
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

export default Carousel;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor:'#1e1d',
    height:200
  },
  image: {
    width,
    height: 200,
    resizeMode: 'cover',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#333',
  },
});
