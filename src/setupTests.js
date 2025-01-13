// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Importa e assegna `cross-fetch` come polyfill per `fetch`
import fetch from "cross-fetch";
globalThis.fetch = fetch;

// Configura dotenv per caricare le variabili di ambiente
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });