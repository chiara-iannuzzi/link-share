import { ComponentProps } from "react";

import dynamic from "next/dynamic";

interface LazySvgProps extends ComponentProps<"svg"> {
  name: string;
}

const LazySvg = ({ name, ...props }: LazySvgProps) => {
  const Svg = dynamic(() => import(`@/assets/${name}.svg`));
  return <Svg {...props} />;
};

export default LazySvg