import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ColorTokens } from '../../styles/colors/colorTokens';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle
}) => {
  const getGradientColors = () => {
    if (disabled) {
      return [ColorTokens.neutral.gray[300], ColorTokens.neutral.gray[400]];
    }

    switch (variant) {
      case 'primary':
        return [ColorTokens.vibrant.primary.light, ColorTokens.vibrant.primary.dark];
      case 'secondary':
        return [ColorTokens.vibrant.secondary.light, ColorTokens.vibrant.secondary.dark];
      case 'accent':
        return [ColorTokens.vibrant.accent.orange.light, ColorTokens.vibrant.accent.orange.dark];
      default:
        return [ColorTokens.vibrant.primary.light, ColorTokens.vibrant.primary.dark];
    }
  };

  const getButtonSize = (): ViewStyle => {
    switch (size) {
      case 'small':
        return {
          height: 32,
          paddingHorizontal: 16
        };
      case 'large':
        return {
          height: 56,
          paddingHorizontal: 32
        };
      default:
        return {
          height: 44,
          paddingHorizontal: 24
        };
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, getButtonSize(), style]}
    >
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, getButtonSize()]}
      >
        <Text style={[styles.text, textStyle]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    overflow: 'hidden'
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: ColorTokens.neutral.white,
    fontSize: 16,
    fontWeight: '600'
  }
}); 