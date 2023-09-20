declare module 'react-color-extractor' {
  export interface ColorExtractorProps {
    getColors: (colors: string[]) => void;
    children: React.ReactNode;
  }

  export class ColorExtractor extends React.Component<ColorExtractorProps> {}
}
