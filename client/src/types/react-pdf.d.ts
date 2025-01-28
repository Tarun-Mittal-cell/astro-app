declare module '@react-pdf/renderer' {
  import { ReactNode } from 'react';

  interface SourceURLObject {
    uri: string;
    method?: string;
    headers?: Record<string, string>;
    body?: string;
  }

  interface ImageProps {
    src: string | SourceURLObject;
    style?: any;
    cache?: boolean;
  }

  interface PDFDownloadLinkProps {
    document: ReactNode;
    fileName?: string;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
    children?: ReactNode | ((props: { loading: boolean }) => ReactNode);
  }

  export const Image: React.FC<ImageProps>;
  export const PDFDownloadLink: React.FC<PDFDownloadLinkProps>;
}