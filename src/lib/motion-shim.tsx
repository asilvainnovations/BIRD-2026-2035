import React from 'react';

/**
 * Lightweight drop-in replacement for the subset of `framer-motion`
 * used in this project. It renders plain DOM/React elements and strips
 * out animation-only props so the app builds without the framer-motion
 * dependency while preserving all layout, styling and event handlers.
 */

// Props that framer-motion understands but plain DOM elements do not.
const MOTION_PROPS = new Set([
  'initial',
  'animate',
  'exit',
  'transition',
  'variants',
  'whileHover',
  'whileTap',
  'whileFocus',
  'whileInView',
  'whileDrag',
  'drag',
  'dragConstraints',
  'dragElastic',
  'layout',
  'layoutId',
  'viewport',
  'onAnimationStart',
  'onAnimationComplete',
  'custom',
]);

function stripMotionProps(props: Record<string, any>) {
  const clean: Record<string, any> = {};
  for (const key in props) {
    if (!MOTION_PROPS.has(key)) {
      clean[key] = props[key];
    }
  }
  return clean;
}

type AnyProps = Record<string, any> & { children?: React.ReactNode };

const cache = new Map<string, React.ForwardRefExoticComponent<any>>();

function createMotionComponent(tag: string) {
  if (cache.has(tag)) return cache.get(tag)!;
  const Comp = React.forwardRef<any, AnyProps>((props, ref) => {
    const clean = stripMotionProps(props);
    return React.createElement(tag, { ...clean, ref });
  });
  Comp.displayName = `motion.${tag}`;
  cache.set(tag, Comp);
  return Comp;
}

export const motion: any = new Proxy(
  {},
  {
    get: (_target, prop: string | symbol) => {
      if (typeof prop !== 'string') return undefined;
      return createMotionComponent(prop);
    },
  }
);

export const AnimatePresence: React.FC<{ children?: React.ReactNode; mode?: string }> = ({
  children,
}) => <>{children}</>;

export default motion;
