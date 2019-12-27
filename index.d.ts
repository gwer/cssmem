type Styles = { [key: string]: string };
type Exec = (mods?: object, mix?: string) => string;
type CreateElem = (elem: string) => Exec;
type Cssmem = (styles: Styles) => CreateElem;

export default function cssmem(styles: Styles): CreateElem;
