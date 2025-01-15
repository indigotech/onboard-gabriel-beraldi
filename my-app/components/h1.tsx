import { Text } from "react-native";
import styled from "styled-components";

interface TitleProps {
  size?: "large" | "normal";
  weight?: `${number}px` | "bold" | "normal";
  color?: string;
  topMargin?: number;
  bottomMargin?: number;
}

export const H1 = styled(Text)<TitleProps>`
  font-size: ${({ size }) => (size === "normal" ? "16px" : "24px")};
  font-weight: ${({ weight }) => weight ?? "bold"};
  color: ${({ color }) => color ?? "black"};
  margin: ${({ topMargin, bottomMargin }) =>
    `${topMargin ?? 20}px 0px ${bottomMargin ?? 20}px 0px`};
`;
