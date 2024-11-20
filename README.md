This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

1. **Keep Metro Bundler running** in a terminal.
2. **Open a new terminal** in your project's root directory.

### Android:

```bash
npm run android   # Or: yarn android
```

### iOS

```bash
npm run ios       # Or: yarn ios
```

Ensure your emulator or simulator is set up correctly. The app will launch shortly if everything is configured properly.

## Alternative:

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Running Tests

To run the tests, follow these steps:

### 1. **Run Jest Tests**

To execute the **unit tests**, you can use the following command:

```bash
npm run test   # Or: yarn test
```

### 2. **Run Jest with a Specific Test File**

If you want to run tests for a **specific file**, use the following command:

```bash
npm run test <test_file_name>   # Or: yarn test <test_file_name>
```

For example, to run the tests for App.test.tsx:

```bash
npm run test App.test   # Or: yarn test App.test
```
