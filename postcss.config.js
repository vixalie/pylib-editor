// eslint-disable-next-line no-undef
export default {
  syntax: "postcss-scss",
  plugins: {
    "postcss-import": {},
    "postcss-custom-properties": {},
    "postcss-color-mod-function": {},
    "postcss-utilities": {
      centerMethod: "flexbox",
    },
    lost: {},
    precss: { stage: 2 },
    cssnano: {},
  },
};
