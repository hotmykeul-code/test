import path from 'path';
import fs from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';

export type TestFn = () => void | Promise<void>;
export type HookFn = () => void | Promise<void>;

interface TestCase {
  name: string;
  fn: TestFn;
}

interface TestSuite {
  name: string;
  tests: TestCase[];
  beforeAllHooks: HookFn[];
  afterAllHooks: HookFn[];
  beforeEachHooks: HookFn[];
  afterEachHooks: HookFn[];
}

interface TestResult {
  suiteName: string;
  testName: string;
  passed: boolean;
  error?: Error;
  durationMs: number;
}

class TestRegistry {
  public suites: TestSuite[] = [];
  public currentSuite: TestSuite | null = null;
  public totalAssertions = 0;

  public describe(name: string, fn: () => void) {
    const suite: TestSuite = {
      name,
      tests: [],
      beforeAllHooks: [],
      afterAllHooks: [],
      beforeEachHooks: [],
      afterEachHooks: [],
    };
    this.suites.push(suite);
    const previousSuite = this.currentSuite;
    this.currentSuite = suite;
    fn();
    this.currentSuite = previousSuite;
  }

  public it(name: string, fn: TestFn) {
    if (!this.currentSuite) {
      this.describe('Root Suite', () => {
        this.currentSuite!.tests.push({ name, fn });
      });
    } else {
      this.currentSuite.tests.push({ name, fn });
    }
  }

  public beforeAll(fn: HookFn) {
    if (this.currentSuite) this.currentSuite.beforeAllHooks.push(fn);
  }

  public afterAll(fn: HookFn) {
    if (this.currentSuite) this.currentSuite.afterAllHooks.push(fn);
  }

  public beforeEach(fn: HookFn) {
    if (this.currentSuite) this.currentSuite.beforeEachHooks.push(fn);
  }

  public afterEach(fn: HookFn) {
    if (this.currentSuite) this.currentSuite.afterEachHooks.push(fn);
  }
}

export const registry = new TestRegistry();

export const describe = registry.describe.bind(registry);
export const it = registry.it.bind(registry);
export const test = registry.it.bind(registry);
export const beforeAll = registry.beforeAll.bind(registry);
export const afterAll = registry.afterAll.bind(registry);
export const beforeEach = registry.beforeEach.bind(registry);
export const afterEach = registry.afterEach.bind(registry);

export class Expectation {
  private isNot: boolean;

  constructor(private actual: any, isNot = false) {
    this.isNot = isNot;
  }

  get not() {
    return new Expectation(this.actual, !this.isNot);
  }

  private assert(condition: boolean, message: string) {
    registry.totalAssertions++;
    const passes = this.isNot ? !condition : condition;
    if (!passes) {
      throw new Error(message);
    }
  }

  public toBe(expected: any) {
    this.assert(
      Object.is(this.actual, expected),
      'Expected ' + JSON.stringify(this.actual) + (this.isNot ? ' not to be ' : ' to be ') + JSON.stringify(expected)
    );
  }

  public toEqual(expected: any) {
    const deepEqual = (a: any, b: any): boolean => {
      if (Object.is(a, b)) return true;
      if (typeof a !== typeof b) return false;
      if (a === null || b === null) return a === b;
      if (typeof a !== 'object') return a === b;
      if (Array.isArray(a) !== Array.isArray(b)) return false;
      if (Array.isArray(a)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
          if (!deepEqual(a[i], b[i])) return false;
        }
        return true;
      }
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;
      for (const k of keysA) {
        if (!Object.prototype.hasOwnProperty.call(b, k) || !deepEqual(a[k], b[k])) {
          return false;
        }
      }
      return true;
    };

    this.assert(
      deepEqual(this.actual, expected),
      'Expected ' + JSON.stringify(this.actual) + (this.isNot ? ' not to equal ' : ' to equal ') + JSON.stringify(expected)
    );
  }

  public toBeDefined() {
    this.assert(
      this.actual !== undefined,
      'Expected value ' + (this.isNot ? 'not to be defined' : 'to be defined') + ', but got undefined'
    );
  }

  public toBeUndefined() {
    this.assert(
      this.actual === undefined,
      'Expected value ' + (this.isNot ? 'not to be undefined' : 'to be undefined') + ', but got ' + JSON.stringify(this.actual)
    );
  }

  public toBeNull() {
    this.assert(
      this.actual === null,
      'Expected value ' + (this.isNot ? 'not to be null' : 'to be null') + ', but got ' + JSON.stringify(this.actual)
    );
  }

  public toBeTruthy() {
    this.assert(
      Boolean(this.actual),
      'Expected ' + JSON.stringify(this.actual) + (this.isNot ? ' not to be truthy' : ' to be truthy')
    );
  }

  public toBeFalsy() {
    this.assert(
      !this.actual,
      'Expected ' + JSON.stringify(this.actual) + (this.isNot ? ' not to be falsy' : ' to be falsy')
    );
  }

  public toBeGreaterThan(expected: number) {
    this.assert(
      typeof this.actual === 'number' && this.actual > expected,
      'Expected ' + this.actual + (this.isNot ? ' not to be > ' : ' to be > ') + expected
    );
  }

  public toBeGreaterThanOrEqual(expected: number) {
    this.assert(
      typeof this.actual === 'number' && this.actual >= expected,
      'Expected ' + this.actual + (this.isNot ? ' not to be >= ' : ' to be >= ') + expected
    );
  }

  public toBeLessThan(expected: number) {
    this.assert(
      typeof this.actual === 'number' && this.actual < expected,
      'Expected ' + this.actual + (this.isNot ? ' not to be < ' : ' to be < ') + expected
    );
  }

  public toBeLessThanOrEqual(expected: number) {
    this.assert(
      typeof this.actual === 'number' && this.actual <= expected,
      'Expected ' + this.actual + (this.isNot ? ' not to be <= ' : ' to be <= ') + expected
    );
  }

  public toBeCloseTo(expected: number, delta = 0.01) {
    const diff = Math.abs(this.actual - expected);
    this.assert(
      diff <= delta,
      'Expected ' + this.actual + (this.isNot ? ' not to be close to ' : ' to be close to ') + expected + ' (delta: ' + delta + ')'
    );
  }

  public toContain(item: any) {
    let contains = false;
    if (typeof this.actual === 'string' && typeof item === 'string') {
      contains = this.actual.includes(item);
    } else if (Array.isArray(this.actual)) {
      contains = this.actual.some((el) => {
        try {
          return Object.is(el, item) || JSON.stringify(el) === JSON.stringify(item);
        } catch {
          return false;
        }
      });
    } else if (this.actual && typeof this.actual === 'object') {
      contains = Object.prototype.hasOwnProperty.call(this.actual, item);
    }
    this.assert(
      contains,
      'Expected ' + JSON.stringify(this.actual) + (this.isNot ? ' not to contain ' : ' to contain ') + JSON.stringify(item)
    );
  }

  public toMatch(pattern: RegExp | string) {
    const matches = typeof pattern === 'string'
      ? String(this.actual).includes(pattern)
      : pattern.test(String(this.actual));
    this.assert(
      matches,
      'Expected ' + JSON.stringify(this.actual) + (this.isNot ? ' not to match ' : ' to match ') + pattern
    );
  }

  public toHaveLength(expected: number) {
    const len = this.actual ? this.actual.length : undefined;
    this.assert(
      len === expected,
      'Expected length ' + (this.isNot ? 'not to be ' : 'to be ') + expected + ', but got ' + len
    );
  }

  public toThrow(expectedError?: string | RegExp) {
    if (typeof this.actual !== 'function') {
      throw new Error('Expected function for toThrow assertion, but got ' + typeof this.actual);
    }
    let threw = false;
    let errMessage = '';
    try {
      this.actual();
    } catch (e: any) {
      threw = true;
      errMessage = e?.message || String(e);
    }

    if (expectedError && threw) {
      const matches = typeof expectedError === 'string'
        ? errMessage.includes(expectedError)
        : expectedError.test(errMessage);
      this.assert(
        matches,
        'Expected error matching ' + expectedError + ', but got ' + JSON.stringify(errMessage)
      );
    } else {
      this.assert(
        threw,
        'Expected function ' + (this.isNot ? 'not to throw' : 'to throw')
      );
    }
  }

  public async toThrowAsync(expectedError?: string | RegExp) {
    if (typeof this.actual !== 'function') {
      throw new Error('Expected async function for toThrowAsync, but got ' + typeof this.actual);
    }
    let threw = false;
    let errMessage = '';
    try {
      await this.actual();
    } catch (e: any) {
      threw = true;
      errMessage = e?.message || String(e);
    }

    if (expectedError && threw) {
      const matches = typeof expectedError === 'string'
        ? errMessage.includes(expectedError)
        : expectedError.test(errMessage);
      this.assert(
        matches,
        'Expected async error matching ' + expectedError + ', but got ' + JSON.stringify(errMessage)
      );
    } else {
      this.assert(
        threw,
        'Expected async function ' + (this.isNot ? 'not to throw' : 'to throw')
      );
    }
  }
}

export function expect(actual: any) {
  return new Expectation(actual);
}

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

export async function runAllTests(): Promise<{ passed: boolean; results: TestResult[]; totalAssertions: number }> {
  console.log('\n' + colors.bold + colors.cyan + '========================================================================' + colors.reset);
  console.log(colors.bold + colors.cyan + '         🚀 SOCIALCLONE AI — MASTER AUTOMATED TEST RUNNER              ' + colors.reset);
  console.log(colors.bold + colors.cyan + '========================================================================' + colors.reset + '\n');

  const startTime = Date.now();
  const results: TestResult[] = [];
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  for (const suite of registry.suites) {
    console.log('\n' + colors.bold + colors.yellow + '📦 Suite: ' + suite.name + colors.reset);

    for (const hook of suite.beforeAllHooks) {
      try {
        await hook();
      } catch (err: any) {
        console.error(colors.red + '  ✖ beforeAll hook failed: ' + err.message + colors.reset);
      }
    }

    for (const t of suite.tests) {
      totalTests++;
      const tStart = Date.now();
      let testPassed = true;
      let testError: Error | undefined = undefined;

      for (const hook of suite.beforeEachHooks) {
        try {
          await hook();
        } catch (err: any) {
          testPassed = false;
          testError = err;
          break;
        }
      }

      if (testPassed) {
        try {
          await t.fn();
        } catch (err: any) {
          testPassed = false;
          testError = err;
        }
      }

      for (const hook of suite.afterEachHooks) {
        try {
          await hook();
        } catch (err: any) {
          if (testPassed) {
            testPassed = false;
            testError = err;
          }
        }
      }

      const durationMs = Date.now() - tStart;
      results.push({
        suiteName: suite.name,
        testName: t.name,
        passed: testPassed,
        error: testError,
        durationMs,
      });

      if (testPassed) {
        passedTests++;
        console.log('  ' + colors.green + '✔ PASS' + colors.reset + ' ' + t.name + ' ' + colors.dim + '(' + durationMs + 'ms)' + colors.reset);
      } else {
        failedTests++;
        console.log('  ' + colors.red + '✖ FAIL' + colors.reset + ' ' + t.name + ' ' + colors.dim + '(' + durationMs + 'ms)' + colors.reset);
        if (testError) {
          console.log('    ' + colors.red + testError.message + colors.reset);
          if (testError.stack) {
            const stackLines = testError.stack.split('\n').slice(1, 4).join('\n');
            console.log('    ' + colors.gray + stackLines + colors.reset);
          }
        }
      }
    }

    for (const hook of suite.afterAllHooks) {
      try {
        await hook();
      } catch (err: any) {
        console.error(colors.red + '  ✖ afterAll hook failed: ' + err.message + colors.reset);
      }
    }
  }

  const totalDuration = ((Date.now() - startTime) / 1000).toFixed(3);

  console.log('\n' + colors.bold + colors.cyan + '------------------------------------------------------------------------' + colors.reset);
  console.log(colors.bold + 'Test Suites:' + colors.reset + ' ' + registry.suites.length + ' passed, ' + registry.suites.length + ' total');
  console.log(colors.bold + 'Tests:      ' + colors.reset + ' ' + (failedTests > 0 ? colors.red : colors.green) + passedTests + ' passed' + colors.reset + ', ' + failedTests + ' failed, ' + totalTests + ' total');
  console.log(colors.bold + 'Assertions: ' + colors.reset + ' ' + colors.cyan + registry.totalAssertions + colors.reset + ' verified assertions');
  console.log(colors.bold + 'Time:       ' + colors.reset + ' ' + totalDuration + 's');
  console.log(colors.bold + colors.cyan + '========================================================================' + colors.reset + '\n');

  return {
    passed: failedTests === 0,
    results,
    totalAssertions: registry.totalAssertions,
  };
}

async function main() {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const e2eDir = path.join(currentDir, 'e2e');
  if (fs.existsSync(e2eDir)) {
    const files = fs.readdirSync(e2eDir)
      .filter(f => f.endsWith('.test.ts') || f.endsWith('.test.js'))
      .sort();
    for (const file of files) {
      const fullPath = path.join(e2eDir, file);
      const url = pathToFileURL(fullPath).href;
      await import(url);
    }
  }

  const summary = await runAllTests();
  if (!summary.passed) {
    process.exit(1);
  }
}

const currentFileUrl = import.meta.url;
const executedFileUrl = pathToFileURL(process.argv[1] || '').href;

if (currentFileUrl === executedFileUrl || process.argv[1]?.includes('testRunner')) {
  main().catch((err) => {
    console.error('Fatal test runner error:', err);
    process.exit(1);
  });
}
