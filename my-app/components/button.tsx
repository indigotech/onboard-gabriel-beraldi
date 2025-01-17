import React from "react";
import styled from "styled-components";
import { ActivityIndicator, Pressable, Text } from "react-native";

interface TextProps {
  size?: "large" | "normal";
  weight?: `${number | "bold" | "normal"}`;
  color?: string;
}

const ButtonText = styled(Text)<TextProps>`
  font-size: ${({ size }) => (size === "large" ? 24 : 16)}px;
  font-weight: ${({ weight }) => weight ?? "normal"};
  color: ${({ color }) => color ?? "black"};
  text-align: center;
`;

interface BackgroundProps {
  color?: string;
  height?: number;
}

const ButtonBackground = styled(Pressable)<BackgroundProps>`
  background-color: ${({ color }) => color ?? "#C0C0FF"};
  min-height: ${({ height }) => height ?? 44}px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

interface ButtonProps {
  label: string;
  onClick: () => void;
  loading?: boolean;
  textProps?: TextProps;
  backgroundProps?: BackgroundProps;
}

export function Button(props: ButtonProps) {
  return (
    <ButtonBackground onPress={props.onClick} {...props.backgroundProps}>
      {props.loading ? (
        <ActivityIndicator />
      ) : (
        <ButtonText {...props.textProps}>{props.label}</ButtonText>
      )}
    </ButtonBackground>
  );
}
