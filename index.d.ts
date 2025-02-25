type Config = {
  elemDelimiter: string;
  modDelimiter: string;
};

type Styles = { [key: string]: string };
type Delimiter = '_' | '-' | '__' | '--';

type SplitBlock<K extends string> =
  K extends `${infer Block}${Delimiter}${string}` ? Block : K;

type BlockNames<S> = S extends Styles
  ? { [K in keyof S]: SplitBlock<K & string> }[keyof S]
  : string;

type ModKeys<S, B extends string> = S extends Styles
  ? {
      [K in keyof S & string]: K extends `${B}${Delimiter}${infer Rest}`
        ? Rest extends `${infer ModKey}${Delimiter}${string}`
          ? ModKey
          : Rest extends `${infer ModKey}`
          ? ModKey
          : never
        : never;
    }[keyof S & string]
  : string;

type HasBooleanMod<S, B extends string, K extends string> = S extends Styles
  ? [Extract<`${B}${Delimiter}${K}`, keyof S>] extends [never]
    ? false
    : true
  : true;

type ModValues<S, B extends string, K extends string> = S extends Styles
  ? {
      [P in keyof S &
        string]: P extends `${B}${Delimiter}${K}${Delimiter}${infer V}`
        ? V | null | false // null and false are used to remove the modifier
        : never;
    }[keyof S & string]
  : string;

type ModifierType<S, B extends string, K extends string> =
  | (HasBooleanMod<S, B, K> extends true ? boolean : never)
  | ModValues<S, B, K>;

type Mods<S, B extends string> = Partial<{
  [K in ModKeys<S, B>]: ModifierType<S, B, K>;
}>;

type BlockWithModifier<S, B extends BlockNames<S>> =
  | B
  | `${B}${Delimiter}${string}`;

type Exec<S, B extends string> = (
  mods?: Mods<S, B> | null,
  mix?: string | string[]
) => string;

type CreateElem<S> = <B extends BlockNames<S>>(
  block: BlockWithModifier<S, B>
) => Exec<S, B>;

type Cssmem = {
  <S>(styles: S): CreateElem<S>;
  config: Config;
};

declare const cssmem: Cssmem;

export default cssmem;
