type TSVGIcon = FunctionComponent<
  SVGProps<SVGSVGElement> & {
    title?: string | undefined;
    titleId?: string | undefined;
    desc?: string | undefined;
    descId?: string | undefined;
  }
>;
