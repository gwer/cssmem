type Config = {
  elemDelimiter: string;
  modDelimiter: string;
};

type Styles = { [key: string]: string };
type Exec = (mods?: object | null, mix?: string | string[]) => string;
type CreateElem = (elem: string) => Exec;
type Cssmem = {
  (styles: Styles): CreateElem;
  config: Config;
};

declare const cssmem: Cssmem;

export default cssmem;
