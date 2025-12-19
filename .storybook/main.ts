import type {StorybookConfig} from '@storybook/react-native-web-vite'
import {mergeConfig} from 'vite'
import babel from 'vite-plugin-babel'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', 'storybook/viewport'],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },

  viteFinal: async config => {
    return mergeConfig(config, {
      plugins: [
        babel({
          filter: /\.[jt]sx?$/,
          babelConfig: {
            babelrc: false,
            configFile: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: 'defaults',
                  modules: false,
                },
              ],
              ['@babel/preset-react', {runtime: 'automatic'}],
              '@babel/preset-typescript',
            ],
            plugins: [
              [
                'react-native-unistyles/plugin',
                {
                  root: 'src',
                },
              ],
            ],
          },
        }),
      ],
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          'react-native': 'react-native-web',
        },
        extensions: [
          '.web.tsx',
          '.web.ts',
          '.web.jsx',
          '.web.js',
          '.tsx',
          '.ts',
          '.jsx',
          '.js',
          '.json',
        ],
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        include: [
          ...(config.optimizeDeps?.include ?? []),
          'react-native-unistyles',
          'react-native-web',
        ],
        exclude: [
          ...(config.optimizeDeps?.exclude ?? []),
          'expo-modules-core',
          'expo-font',
          'expo-asset',
          'expo',
        ],
        esbuildOptions: {
          ...config.optimizeDeps?.esbuildOptions,
          resolveExtensions: [
            '.web.js',
            '.web.ts',
            '.web.tsx',
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.json',
          ],
        },
      },
      server: {
        ...config.server,
        fs: {
          ...config.server?.fs,
          strict: false,
        },
      },
    })
  },
}

export default config
