type FnType = (...args: any) => ReturnType | void;

type OptFn = FnType | undefined;
type OptionFns = {} & {
  successAction?: OptFn;
  successHandler?: OptFn;
  selector?: OptFn;
};

type Status = {
  loading?: boolean;
  error?: string;
  success?: boolean;
};

/* MenuItem props: label, to, className, extFunction */
type ArgsType = [string, string?, string?, FnType?];

type MenuType = ArgsType[];

type ButtonType = 'button' | 'submit' | 'reset' | undefined;
