import { getClassNames } from "@/utils";

interface ILoadingStateProps {
  animation?: keyof typeof config.animation;
  className?: string;
  height?: string | number;
  style?: React.CSSProperties;
  variant?: keyof typeof config.variant;
  width?: string | number;
}

const config = {
  animation: {
    pulse: "loading-state--pulse",
    wave: "loading-state--wave",
  },
  variant: {
    text: "loading-state--text",
    rect: "loading-state--rect",
    circle: "loading-state--circle",
  },
};

const formatCSSValue = (value: string | number) =>
  typeof value === "number" ? `${value}px` : value;

export const LoadingState: React.FC<ILoadingStateProps> = ({
  animation = "pulse",
  className,
  height = ".75rem",
  style,
  variant = "text",
  width = "100%",
}) => {
  const styles = {
    height: formatCSSValue(height),
    width: formatCSSValue(width),
    ...style,
  };

  const classNames = getClassNames([
    "loading-state",
    config.variant[variant],
    config.animation[animation],
    className,
  ]);

  return <div className={classNames} style={styles}></div>;
};
