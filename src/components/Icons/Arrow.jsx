import * as React from 'react';
import { motion } from 'framer-motion';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../tailwind.config';

const { theme } = resolveConfig(tailwindConfig);

const Arrow = ({ fillColor = theme.colors.white, ...props }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 101 57"
    {...props}
  >
    <path
      d="M33 34H0V24h81.429L66 7.884 73.548 0l19.877 20.763.027-.029L101 28.618 73.829 57l-7.548-7.884L80.753 34H33z"
      fill={fillColor}
      fillRule="evenodd"
      className="dark:fill-white fill-black"
    ></path>
  </motion.svg>
);

export default Arrow;
