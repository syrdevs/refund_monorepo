import { DictionaryBaseML } from '@vitacore/shared-ui';
import { RcFile } from 'antd/lib/upload/interface';
export interface DocumentAttachment {
    id?: string;
    name: string;
    filename: string;
    fileDescription?: string;
    createDateTime?: string;
    attachmentType?: DictionaryBaseML;
    file?: RcFile;
}
