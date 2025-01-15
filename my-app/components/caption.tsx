import styled from "styled-components";
import { Text } from "react-native";

interface CaptionProps {
  size?: "small" | "normal";
  weight?: `${number}` | "bold" | "normal";
  color?: string;
  topMargin?: number;
}

export const Caption = styled(Text)<CaptionProps>`
  font-size: ${({ size }) => (size === "normal" ? "16px" : "12px")};
  font-weight: ${({ weight }) => weight ?? "normal"};
  color: ${({ color }) => color ?? "#FF8080"};
  margin-top: ${({ topMargin }) => topMargin ?? 8}px;
`;
