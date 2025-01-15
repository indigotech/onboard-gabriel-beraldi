import styled from "styled-components";
import { Text } from "react-native";

interface LabelProps {
  size?: "small" | "normal";
  weight?: `${number}` | "bold" | "normal";
  color?: string;
  bottomMargin?: number;
}

export const Label = styled(Text)<LabelProps>`
  font-size: ${({ size }) => (size === "normal" ? "16px" : "12px")};
  font-weight: ${({ weight }) => weight ?? "normal"};
  color: ${({ color }) => color ?? "#777777"};
  margin-bottom: ${({ bottomMargin }) => bottomMargin ?? 12}px;
`;
