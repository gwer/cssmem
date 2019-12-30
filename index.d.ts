type Styles = { [key: string]: string };
type Exec = (mods?: object | null, mix?: string | string[]) => string;
type CreateElem = (elem: string) => Exec;
type Cssmem = (styles: Styles) => CreateElem;

export default function cssmem(styles: Styles): CreateElem;
