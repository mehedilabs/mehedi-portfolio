import assert from "node:assert/strict";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { hashPassword } from "../models/User.js";
import {
  loginSchema,
  changePasswordSchema,
  changeEmailSchema,
  messageSchema,
  initialSetupSchema,
} from "../validation/schemas.js";

async function runTests() {
  console.log("=== Running Mehedi Portfolio Backend & Security Test Suite ===\n");
  let passed = 0;
  let failed = 0;

  async function test(name: string, fn: () => Promise<void> | void) {
    try {
      await fn();
      console.log(`  ✓ ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ ${name}`);
      console.error(err);
      failed++;
    }
  }

  // 1. Password Hashing & Bcrypt Verification
  await test("Password hashing generates valid bcrypt hash with correct comparison", async () => {
    const plain = "SuperSecretPassword123!";
    const hash = await hashPassword(plain);

    assert.ok(hash.startsWith("$2"), "Hash must be a valid bcrypt signature");
    assert.notEqual(hash, plain, "Hash must never equal plain text");

    const matches = await bcrypt.compare(plain, hash);
    assert.equal(matches, true, "Bcrypt compare must succeed for correct password");

    const wrongMatches = await bcrypt.compare("WrongPassword123!", hash);
    assert.equal(wrongMatches, false, "Bcrypt compare must fail for incorrect password");
  });

  // 2. JWT Generation & Verification
  await test("JWT token signs and verifies with user claims and tokenVersion", () => {
    const testSecret = "test_jwt_secret_with_sufficient_length_32_bytes_min";
    const payload = {
      id: "user-12345",
      email: "admin@mehedi.dev",
      role: "owner" as const,
      tokenVersion: 1,
    };

    const token = jwt.sign(payload, testSecret, { expiresIn: "1h" });
    assert.ok(token && typeof token === "string");

    const decoded = jwt.verify(token, testSecret) as typeof payload;
    assert.equal(decoded.id, payload.id);
    assert.equal(decoded.email, payload.email);
    assert.equal(decoded.role, payload.role);
    assert.equal(decoded.tokenVersion, 1);
  });

  // 3. Token Invalidation via TokenVersion
  await test("Session invalidation detects tokenVersion mismatch", () => {
    const testSecret = "test_jwt_secret_with_sufficient_length_32_bytes_min";
    const oldPayload = {
      id: "user-12345",
      email: "admin@mehedi.dev",
      role: "owner" as const,
      tokenVersion: 1, // Stored in old token
    };

    const token = jwt.sign(oldPayload, testSecret, { expiresIn: "1h" });
    const decoded = jwt.verify(token, testSecret) as typeof oldPayload;

    const userCurrentTokenVersion = 2; // Incremented after password/security change
    const isTokenValid = decoded.tokenVersion === userCurrentTokenVersion;
    assert.equal(isTokenValid, false, "Old token must be flagged as invalid when user tokenVersion advances");
  });

  // 4. Schema Validation: Login
  await test("Login schema accepts valid credentials and rejects malformed inputs", async () => {
    const valid = await loginSchema.safeParseAsync({
      email: "admin@mehedi.dev",
      password: "somePassword123",
    });
    assert.equal(valid.success, true);

    const invalidEmail = await loginSchema.safeParseAsync({
      email: "not-an-email",
      password: "somePassword123",
    });
    assert.equal(invalidEmail.success, false);

    const emptyPassword = await loginSchema.safeParseAsync({
      email: "admin@mehedi.dev",
      password: "",
    });
    assert.equal(emptyPassword.success, false);
  });

  // 5. Schema Validation: Password Change
  await test("Change password schema enforces minimum 8 characters and complexity", async () => {
    const strong = await changePasswordSchema.safeParseAsync({
      currentPassword: "OldPassword1!",
      newPassword: "NewStrongPassword2026!",
    });
    assert.equal(strong.success, true);

    const tooShort = await changePasswordSchema.safeParseAsync({
      currentPassword: "OldPassword1!",
      newPassword: "short1!",
    });
    assert.equal(tooShort.success, false);

    const noSymbolOrNumber = await changePasswordSchema.safeParseAsync({
      currentPassword: "OldPassword1!",
      newPassword: "AllLettersOnlyNoDigits",
    });
    assert.equal(noSymbolOrNumber.success, false);
  });

  // 6. Schema Validation: Email Change
  await test("Change email schema verifies email format and requires password reauth", async () => {
    const valid = await changeEmailSchema.safeParseAsync({
      password: "VerifyPassword123!",
      newEmail: "mehedi.new@example.com",
    });
    assert.equal(valid.success, true);

    const invalidEmail = await changeEmailSchema.safeParseAsync({
      password: "VerifyPassword123!",
      newEmail: "not_a_valid_email",
    });
    assert.equal(invalidEmail.success, false);
  });

  // 7. Schema Validation: Initial Owner Setup
  await test("Initial setup schema validates owner name, email, and password complexity", async () => {
    const valid = await initialSetupSchema.safeParseAsync({
      name: "Mehedi Hasan",
      email: "admin@mehedi.dev",
      password: "InitialPassword2026!",
    });
    assert.equal(valid.success, true);

    const shortName = await initialSetupSchema.safeParseAsync({
      name: "M",
      email: "admin@mehedi.dev",
      password: "InitialPassword2026!",
    });
    assert.equal(shortName.success, false);
  });

  // 8. Schema Validation: Contact Inquiry Message
  await test("Contact message schema validates inquiry fields and length constraints", async () => {
    const valid = await messageSchema.safeParseAsync({
      name: "Alex Client",
      email: "alex@company.com",
      subject: "Architecture Consultation",
      inquiryType: "consulting",
      message: "We need an experienced full-stack architect for our upcoming distributed web platform.",
    });
    assert.equal(valid.success, true);

    const messageTooShort = await messageSchema.safeParseAsync({
      name: "Alex Client",
      email: "alex@company.com",
      subject: "Hi",
      inquiryType: "consulting",
      message: "Short",
    });
    assert.equal(messageTooShort.success, false);
  });

  console.log(`\nTest Results: ${passed} passed, ${failed} failed.\n`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test runner encountered fatal error:", err);
  process.exit(1);
});
