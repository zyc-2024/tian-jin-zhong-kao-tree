// Illustration of importing and using the external base64.min.js library
// This file demonstrates how to load and utilize the Base64 library in your project

// Assuming base64.min.js is loaded via script tag in HTML: <script src="js/utils/base64.min.js"></script>
// Or in a module environment, you can import it if configured

// Example 1: Basic encoding and decoding
function demonstrateBasicUsage() {
    const originalText = "Hello, World!";
    console.log("Original text:", originalText);

    // Encode to Base64
    const encoded = Base64.encode(originalText);
    console.log("Encoded Base64:", encoded);

    // Decode back to text
    const decoded = Base64.decode(encoded);
    console.log("Decoded text:", decoded);

    // Verify they match
    console.log("Round-trip successful:", originalText === decoded);
}

// Example 2: Encoding UTF-8 strings
function demonstrateUTF8Usage() {
    const unicodeText = "你好，世界！🌍";
    console.log("Unicode text:", unicodeText);

    const encoded = Base64.encode(unicodeText);
    console.log("Encoded Base64:", encoded);

    const decoded = Base64.decode(encoded);
    console.log("Decoded text:", decoded);

    console.log("UTF-8 round-trip successful:", unicodeText === decoded);
}

// Example 3: Validating Base64 strings
function demonstrateValidation() {
    const validBase64 = "SGVsbG8sIFdvcmxkIQ=="; // "Hello, World!"
    const invalidBase64 = "Not valid base64!";

    console.log("Valid Base64 check:", Base64.isValid(validBase64));
    console.log("Invalid Base64 check:", Base64.isValid(invalidBase64));
}

// Example 4: Using with game save data (common use case in incremental games)
function demonstrateSaveDataUsage() {
    // Simulate a simple game save object
    const gameSave = {
        playerName: "TestPlayer",
        score: 12345,
        level: 10
    };

    // Convert to JSON string
    const jsonString = JSON.stringify(gameSave);
    console.log("Game save JSON:", jsonString);

    // Encode to Base64 for storage
    const encodedSave = Base64.encode(jsonString);
    console.log("Encoded save:", encodedSave);

    // Decode back when loading
    const decodedJson = Base64.decode(encodedSave);
    const loadedSave = JSON.parse(decodedJson);
    console.log("Loaded save:", loadedSave);

    console.log("Save data integrity:", JSON.stringify(gameSave) === JSON.stringify(loadedSave));
}

// Example 5: URL-safe encoding (useful for URLs or filenames)
function demonstrateURLSafeUsage() {
    const data = "Data with spaces and special chars: !@#$%^&*()";
    console.log("Original data:", data);

    // Standard Base64
    const standard = Base64.encode(data);
    console.log("Standard Base64:", standard);

    // URL-safe Base64 (replaces + with - and / with _)
    const urlSafe = Base64.encodeURI(data);
    console.log("URL-safe Base64:", urlSafe);

    // Decode URL-safe
    const decodedURL = Base64.decode(urlSafe);
    console.log("Decoded URL-safe:", decodedURL);
}

// Example 6: Working with binary data (Uint8Array)
function demonstrateBinaryUsage() {
    // Create a Uint8Array with some binary data
    const binaryData = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" in ASCII
    console.log("Binary data:", binaryData);

    // Encode to Base64
    const encoded = binaryData.toBase64();
    console.log("Encoded Base64:", encoded);

    // Decode back to Uint8Array
    const decoded = Base64.toUint8Array(encoded);
    console.log("Decoded binary:", decoded);

    // Convert back to string for verification
    const text = new TextDecoder().decode(decoded);
    console.log("As text:", text);
}

// Run all demonstrations
console.log("=== Base64 Library Usage Illustrations ===");
demonstrateBasicUsage();
console.log("");
demonstrateUTF8Usage();
console.log("");
demonstrateValidation();
console.log("");
demonstrateSaveDataUsage();
console.log("");
demonstrateURLSafeUsage();
console.log("");
demonstrateBinaryUsage();

// Note: To use this in your game, ensure base64.min.js is loaded before this script
// In HTML: <script src="js/utils/base64.min.js"></script>
// In your game code, you can then use Base64.encode(), Base64.decode(), etc.

// For Node.js environments (if needed):
// const Base64 = require('./base64.min.js');
// Or if using ES modules:
// import Base64 from './base64.min.js';