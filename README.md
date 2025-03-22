# use-barcode-scanner-hooks

This project has moved to [@react-barcode-scanner/hooks](https://github.
com/react-barcode-scanner/hooks)

A set of React hooks for using a webcam as a barcode scanner.

Created as part of a project for making a UPC reader for board games, the
scanner is not 100% reliable with modern smartphones.  The presence of multiple
cameras and the inability to easily choose the correct camera forces several
compromises.

## Barcode Detection

The built-in `BarcodeDetector` API is used when available.  When it is not
available, the `@undecaf/barcode-detector-polyfill` is used instead.

## Usage

Reference the Storybook stories for an example of implementation, as well as the
companion package `use-barcode-scanner-components`.

## API

The primary hook `useBarcodeScanner` should have a relatively self-documenting
API, but here are the available options:

- `zoom`: an integer providing the amount of zoom to apply, defaults to `1`
- `onDevices`: a callback function to execute when the list of devices is
available.  This can be useful if you want to allow the user to select a device
- `onScan`: a callback function to execute when the scanner detects a barcode.
Will contain the logic to interface with your code.
- `shouldPlay`: determines whether or not the video element will automatically
begin playing after permission to use the camera is granted.  When set to false
you will need to manually start the scanner's video element playing.  Defaults
to `true`.

There are many lower level hooks used by the primary hook which can also
be explored separately.
