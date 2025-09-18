import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

interface TourStep {
  title: string;
  description: string;
  targetRef: React.RefObject<any>;
}

interface OnboardingTourProps {
  steps: TourStep[];
  onFinish?: () => void;
}

const { width, height } = Dimensions.get('window');

export default function OnboardingTour({ steps, onFinish }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetLayout, setTargetLayout] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  if (isFinished) return;

  useEffect(() => {
    const ref = steps[currentStep].targetRef;
    if (ref?.current) {
      ref.current.measureInWindow((x, y, width, height) => {
        setTargetLayout({ x, y, width, height });
      });
    }
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // setIsFinished(true);
      onFinish?.();
    }
  };

  const skipTour = () => {
    // setIsFinished(true);
    onFinish?.();
  };

  if (!targetLayout) return null;

  return (
    <View style={styles.overlay}>
      {/* Highlighted area */}
      <View
        style={[
          styles.highlight,
          {
            top: targetLayout.y - 10,
            left: targetLayout.x - 10,
            width: targetLayout.width + 20,
            height: targetLayout.height + 20,
          },
        ]}
      />

      {/* Tooltip */}
      <View style={styles.tooltip}>
        <Text style={styles.title}>{steps[currentStep].title}</Text>
        <Text style={styles.description}>{steps[currentStep].description}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={skipTour}>
            <Text style={styles.button}>Saltar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={nextStep}>
            <Text style={styles.button}>{currentStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 999,
  },
  highlight: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 8,
  },
  tooltip: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor:'#e7e7e7ff',
    padding:4,
    paddingInline:8,
    color: '#007bff',
    fontWeight: '600',
    borderRadius:10,
  },
});
