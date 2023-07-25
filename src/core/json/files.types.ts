// Copyright © 2022 Dpm Land. All Rights Reserved.

/**
 * DpmFileInterface.
 * @description The main interface for the types in the reader!
 */
export interface DpmFileInterface {
  $schema: string;
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  main: string;
  scripts: Record<string, unknown>;
  dependencies: Record<string, string>;
}

/**
 * ImportMapInterface.
 * @description The import map dependencies for the basic usage
 */
export interface ImportMapInterface {
  imports: Record<string, string>;
}

/**
 * DenoConfigurationInterface.
 * @description A JSON representation of a Deno configuration file.
 */
export interface DenoConfigurationFileSchema {
  /**
   * Instructs the TypeScript compiler how to compile .ts files.
   */
  compilerOptions?: {
    /**
     * Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files.
     */
    allowJs?: boolean;
    /**
     * Disable error reporting for unreachable code.
     */
    allowUnreachableCode?: boolean;
    /**
     * Disable error reporting for unused labels.
     */
    allowUnusedLabels?: boolean;
    /**
     * Enable error reporting in type-checked JavaScript files.
     */
    checkJs?: boolean;
    /**
     * Differentiate between undefined and not present when type checking
     */
    exactOptionalPropertyTypes?: boolean;
    /**
     * Enable experimental support for TC39 stage 2 draft decorators.
     */
    experimentalDecorators?: boolean;
    /**
     * Specify what JSX code is generated.
     */
    jsx?: 'preserve' | 'react' | 'react-jsx' | 'react-jsxdev' | 'react-native';
    /**
     * Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'
     */
    jsxFactory?: string;
    /**
     * Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'.
     */
    jsxFragmentFactory?: string;
    /**
     * Specify module specifier used to import the JSX factory functions when using jsx: 'react-jsx*'.
     */
    jsxImportSource?: string;
    /**
     * Make keyof only return strings instead of string, numbers or symbols. Legacy option.
     */
    keyofStringsOnly?: boolean;
    /**
     * Specify a set of bundled library declaration files that describe the target runtime environment.
     */
    lib?: string[];
    /**
     * Do not truncate error messages.
     */
    noErrorTruncation?: boolean;
    /**
     * Enable error reporting for fallthrough cases in switch statements.
     */
    noFallthroughCasesInSwitch?: boolean;
    /**
     * Enable error reporting for expressions and declarations with an implied `any` type..
     */
    noImplicitAny?: boolean;
    /**
     * Ensure overriding members in derived classes are marked with an override modifier.
     */
    noImplicitOverride?: boolean;
    /**
     * Enable error reporting for codepaths that do not explicitly return in a function.
     */
    noImplicitReturns?: boolean;
    /**
     * Enable error reporting when `this` is given the type `any`.
     */
    noImplicitThis?: boolean;
    /**
     * Disable adding 'use strict' directives in emitted JavaScript files.
     */
    noImplicitUseStrict?: boolean;
    /**
     * Disable strict checking of generic signatures in function types.
     */
    noStrictGenericChecks?: boolean;
    /**
     * Enable error reporting when a local variables aren't read.
     */
    noUnusedLocals?: boolean;
    /**
     * Raise an error when a function parameter isn't read
     */
    noUnusedParameters?: boolean;
    /**
     * Add `undefined` to a type when accessed using an index.
     */
    noUncheckedIndexedAccess?: boolean;
    /**
     * Enable all strict type checking options.
     */
    strict?: boolean;
    /**
     * Check that the arguments for `bind`, `call`, and `apply` methods match the original function.
     */
    strictBindCallApply?: boolean;
    /**
     * When assigning functions, check to ensure parameters and the return values are subtype-compatible.
     */
    strictFunctionTypes?: boolean;
    /**
     * Check for class properties that are declared but not set in the constructor.
     */
    strictPropertyInitialization?: boolean;
    /**
     * When type checking, take into account `null` and `undefined`.
     */
    strictNullChecks?: boolean;
    /**
     * Disable reporting of excess property errors during the creation of object literals.
     */
    suppressExcessPropertyErrors?: boolean;
    /**
     * Suppress `noImplicitAny` errors when indexing objects that lack index signatures.
     */
    suppressImplicitAnyIndexErrors?: boolean;
    [k: string]: unknown;
  };
  /**
   * The location of an import map to be used when resolving modules. If an import map is specified as an `--importmap` flag or using "imports" and "scopes" properties, they will override this value.
   */
  importMap?: string;
  /**
   * A map of specifiers to their remapped specifiers.
   */
  imports?: {
    /**
     * The key is the specifier or partial specifier to match, with a value that represents the target specifier.
     */
    [k: string]: string;
  };
  /**
   * Define a scope which remaps a specifier in only a specified scope
   */
  scopes?: {
    /**
     * A definition of a scoped remapping.
     */
    [k: string]: {
      /**
       * The key is the specifier or partial specifier to match within the referring scope, with a value that represents the target specifier.
       */
      [k: string]: string;
    };
  };
  /**
   * List of files, directories or globs that will be ignored by all other configurations. Requires Deno 1.34 or later.
   */
  exclude?: string[];
  /**
   * Configuration for linter
   */
  lint?: {
    /**
     * List of files, directories or globs that will be linted.
     */
    include?: string[];
    /**
     * List of files, directories or globs that will not be linted.
     */
    exclude?: string[];
    files?: {
      /**
       * List of files, directories or globs that will be linted.
       */
      include?: string[];
      /**
       * List of files, directories or globs that will not be linted.
       */
      exclude?: string[];
      [k: string]: unknown;
    };
    rules?: {
      /**
       * List of tag names that will be run. Empty list disables all tags and will only use rules from `include`.
       */
      tags?: string[];
      /**
       * List of rule names that will be excluded from configured tag sets. If the same rule is in `include` it will be run.
       */
      exclude?: string[];
      /**
       * List of rule names that will be run. Even if the same rule is in `exclude` it will be run.
       */
      include?: string[];
      [k: string]: unknown;
    };
    /**
     * The default report format to use when linting
     */
    report?: 'pretty' | 'json' | 'compact';
    [k: string]: unknown;
  };
  /**
   * Configuration for formatter
   */
  fmt?: {
    /**
     * List of files, directories or globs that will be formatted.
     */
    include?: string[];
    /**
     * List of files, directories or globs that will not be formatted.
     */
    exclude?: string[];
    files?: {
      /**
       * List of files, directories or globs that will be formatted.
       */
      include?: string[];
      /**
       * List of files, directories or globs that will not be formatted.
       */
      exclude?: string[];
      [k: string]: unknown;
    };
    /**
     * Whether to use tabs (true) or spaces (false) for indentation.
     */
    useTabs?: boolean;
    /**
     * The width of a line the printer will try to stay under. Note that the printer may exceed this width in certain cases.
     */
    lineWidth?: number;
    /**
     * The number of characters for an indent.
     */
    indentWidth?: number;
    /**
     * Whether to use single quote (true) or double quote (false) for quotation.
     */
    singleQuote?: boolean;
    /**
     * Define how prose should be wrapped in Markdown files.
     */
    proseWrap?: 'always' | 'never' | 'preserve';
    /**
     * Whether to prefer using semicolons.
     */
    semiColons?: boolean;
    options?: {
      /**
       * Whether to use tabs (true) or spaces (false) for indentation.
       */
      useTabs?: boolean;
      /**
       * The width of a line the printer will try to stay under. Note that the printer may exceed this width in certain cases.
       */
      lineWidth?: number;
      /**
       * The number of characters for an indent.
       */
      indentWidth?: number;
      /**
       * Whether to use single quote (true) or double quote (false) for quotation.
       */
      singleQuote?: boolean;
      /**
       * Define how prose should be wrapped in Markdown files.
       */
      proseWrap?: 'always' | 'never' | 'preserve';
      /**
       * Whether to prefer using semicolons.
       */
      semiColons?: boolean;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  /**
   * Enables or disables the use of a local node_modules folder for npm packages. Alternatively, use the `--node-modules-dir` or `--node-modules-dir=false` flag. Requires Deno 1.34 or later.
   */
  nodeModulesDir?: boolean;
  /**
   * Configuration for deno task
   */
  tasks?: {
    /**
     * Command to execute for this task name.
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[A-Za-z][A-Za-z0-9_\-:]*$".
     */
    [k: string]: string;
  };
  /**
   * Configuration for deno test
   */
  test?: {
    /**
     * List of files, directories or globs that will be searched for tests.
     */
    include?: string[];
    /**
     * List of files, directories or globs that will not be searched for tests.
     */
    exclude?: string[];
    files?: {
      /**
       * List of files, directories or globs that will be searched for tests.
       */
      include?: string[];
      /**
       * List of files, directories or globs that will not be searched for tests.
       */
      exclude?: string[];
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  /**
   * Configuration for deno bench
   */
  bench?: {
    /**
     * List of files, directories or globs that will be searched for benchmarks.
     */
    include?: string[];
    /**
     * List of files, directories or globs that will not be searched for benchmarks.
     */
    exclude?: string[];
    files?: {
      /**
       * List of files, directories or globs that will be searched for benchmarks.
       */
      include?: string[];
      /**
       * List of files, directories or globs that will not be searched for benchmarks.
       */
      exclude?: string[];
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  /**
   * Whether to use a lock file or the path to use for the lock file. Can be overridden by CLI arguments.
   */
  lock?: string | boolean;
  [k: string]: unknown;
}
