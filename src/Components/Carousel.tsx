import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

interface CarouselProps {
  imagesRoutes: string[];
  autoScroll?: boolean;
  scrollInterval?: number;
  buttonControllerEnabled?: boolean;
}

const { width } = Dimensions.get('window');

function Carousel({ imagesRoutes, autoScroll = false, scrollInterval = 3000, buttonControllerEnabled = true }: CarouselProps) {
  const scrollRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fade-in animacion
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
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

  const handleAutomaticScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    if(currentIndex == index)
      setCurrentIndex(index);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    let newIndex = currentIndex;

    if (direction === "left" && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (direction === "left" && currentIndex == 0) {
      newIndex = imagesRoutes.length - 1;
    } else if (direction === "right" && currentIndex < imagesRoutes.length - 1) {
      newIndex = currentIndex + 1;
    } else if (direction === "right" && currentIndex == imagesRoutes.length - 1) {
      newIndex = 0;
    }

    scrollRef.current?.scrollTo({ x: newIndex * width, animated: true });
    if(newIndex!=currentIndex)
      setCurrentIndex(newIndex);
  };

  return (
    
    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', marginBottom: 10 }}>
      <View style={styles.container}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={{ justifyContent: 'center' }}>
            {buttonControllerEnabled &&
              <>
                <TouchableOpacity
                  style={[styles.buttonController, { left: 0 }]}
                  activeOpacity={0.5}
                  onPress={() => handleScroll('left')}>
                  <Text style={{ color: '#fff', textAlign: 'center' }}>{`<`}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.buttonController, { right: 0 }]}
                  activeOpacity={0.5}
                  onPress={() => handleScroll('right')}>
                  <Text style={{ color: '#fff', textAlign: 'center' }}>{`>`}</Text>
                </TouchableOpacity>
              </>
            }
            <ScrollView
              ref={scrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleAutomaticScroll}
              scrollEnabled={false}
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
          </View>
        </Animated.View>
      </View>
      {/* Dots */}
      <View style={styles.dotsContainer}>
        {imagesRoutes.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

export default Carousel;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: 200
  },
  image: {
    width,
    height: 200,
    resizeMode: 'cover',
  },
  dotsContainer: {
    flexDirection: 'row',
    width: '100%',
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
  buttonController: {
    backgroundColor: '#1e1e1e89',
    width: 30,
    height: 150,
    position: 'absolute',
    zIndex: 3,
    justifyContent: 'center',
  },
});
